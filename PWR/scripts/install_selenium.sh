#!/bin/bash

sudo apt-get install openjdk-9-jre-headless wget -y

if [ -e ./selenium-server-standalone-3.8.1.jar ]
then
       echo "exists"
else
       cd ~/
	wget http://selenium-release.storage.googleapis.com/3.8/selenium-server-standalone-3.8.1.jar
fi

screen -X -S selenium kill
screen -dmS selenium bash -c "cd ~/; sudo java -jar selenium-server-standalone-3.8.1.jar; exec bash;"

echo "Selenium server is running"

sleep 4
screen -ls


