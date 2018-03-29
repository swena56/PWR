sudo apt-get install python-pip -y
sudo apt-get install python-pip python-dev libmysqlclient-dev -y 

sudo pip install selenium pprint mysqlclient

#pickle


echo "Add to crontab"
echo "crontab -e"
echo "*/5 *  * * * /usr/bin/screen -dmS pwr bash -c 'DISPLAY=127.0.0.1:0.0; cd /home/ubuntu/PWR; /usr/bin/python scripts/pwr_sync.py 1953; sleep 5;'"


