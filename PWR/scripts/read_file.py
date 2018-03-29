
print "Read from file"

creds = {}

myfile = open(".env.example","r")
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



print creds['password']
