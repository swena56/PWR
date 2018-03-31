from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pprint import pprint

import threading
import codecs
import time
import sys
import MySQLdb
import pickle
import os.path

creds = {}

myfile = open("/home/ubuntu/PWR/PWR/.env","r")
lines = myfile.readlines()
for line in lines:
    if line.strip().find("DB_HOST") != -1:
        creds['host'] = line.strip().split("=")[1]
    if line.strip().find("DB_USERNAME") != -1:
        creds['user'] = line.strip().split("=")[1]
    if line.strip().find("DB_DATABASE") != -1:
        creds['database'] = line.strip().split("=")[1]
    if line.strip().find("DB_PASSWORD") != -1:
        creds['password'] = line.strip().split("=")[1]
    if line.strip().find("PWR_PASSWORD") != -1:
        creds['pwr_password'] = line.strip().split("=")[1]
    if line.strip().find("PWR_USER") != -1:
        creds['pwr_user'] = line.strip().split("=")[1]


#pprint(creds)

def get_db():
	return MySQLdb.connect(host=creds['host'],    # your host, usually localhost
                     user=creds['user'],         # your username
                     passwd=creds['password'],  # your password
                     db=creds['database'])        # name of the data base



def insert_status(store_id,num_orders, status):
	db = get_db()
	cur = db.cursor()
	try:
		cur.execute("INSERT INTO syncjobs (store_id, num_orders, status,created_at) VALUES (%s,%s,%s,now())",(store_id, num_orders, status))
		db.commit()
	except:
		db.rollback()
	db.close()

def save(deli):
	db = get_db()
        cur = db.cursor()
	add_delivery = ("INSERT INTO deliveries "
               "(store_id, order_id, timestamp, phone, address, price, status, service, source, CSR, driver, description) "
               "VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s,%s,%s,%s) "
               "ON DUPLICATE KEY UPDATE "
                        "timestamp = VALUES(timestamp),"
                        "phone = VALUES(phone),"
                        "address = VALUES(address),"
                        "price = VALUES(price),"
                        "status = VALUES(status),"
                        "service = VALUES(service),"
                        "source = VALUES(source),"
                        "CSR = VALUES(CSR),"
                        "driver = VALUES(driver),"
                        "description = VALUES(description);"
                )
        try:
              cur.execute(add_delivery,
                        (
                        deli[0],
                        deli[1],
                        deli[2],
                        deli[3],
                        deli[4],
                        deli[5],
                        deli[6],
                        deli[7],
                        deli[8],
                        deli[9],
                        deli[10],
                        deli[11]
                        )
                )
              db.commit()
	      print("Inserting: ", deli[1],deli[2])
        except:
                print "Failed to save: "
		pprint(deli)
                #db.rollback()
        db.close()

def login(driver):
    results = driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")
    html = results.encode('utf8')
    username = creds['pwr_user']
    password_txt = creds['pwr_password']
    #Pulse Web Reporting (Login)
    if "Pulse Web Reporting (Login)" in html: 
	print "logging in"
	user = driver.find_element_by_name("txtUsername")
    	if user is not None:
        	print("User")
	        user.clear()
        	user.send_keys(username)

	password = driver.find_element_by_name("txtPassword")
    	if password is not None:
        	print("password")
	        password.clear()
        	password.send_keys(password_txt)
	        password.send_keys(Keys.RETURN)

    	print("Sleeping 3")
    	time.sleep(3)
	
	pickle.dump( driver.get_cookies() , open("/tmp/cookies.pkl","wb"))

    	return False
    else:
    	return True


def sync(store_id):
    print("Syncing with PWR")

    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    driver = webdriver.Chrome(chrome_options=options)
    if os.path.exists('/tmp/cookies.pkl') == True:
    	cookies = pickle.load(open("/tmp/cookies.pkl", "rb"))
    	for cookie in cookies:
		print cookie
       		#driver.add_cookie(cookie)
    url = "https://pwr.dominos.com/PWR/RealTimeOrderDetail.aspx?PrintMode=false&FilterCode=sr_"+store_id+"&FilterDesc=Store-"+store_id;
    driver.get(url)

    #check if logged in
    login(driver)
    
    results = driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")
    driver.close()

    # parse
    html = results.encode('utf8')

    x = html.split('<td class="dxgv" align="center">')
    list = []
    for i in range(1, len(x) - 1):
        data = x[i].split('</td>')
        list.append(data[0])
        if(len(list) > 11):
            save(list)
            list = []

    insert_status(a[1], len(list), "success")


if __name__ == '__main__':
	a = sys.argv
	sync(a[1])
