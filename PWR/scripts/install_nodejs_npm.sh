#!/bin/bash
## Install NodeJS and NPM ##

# might be necessary to remove the node_modules directory from project directory
# before doing npm install

#sudo apt-get remove npm nodejs -y
#sudo apt-get purge npm nodejs -y

#curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo sh ~/PWR/scripts/nodesource_setup.sh

sudo apt-get install nodejs npm -y
sudo npm cache clean -f
npm config set registry="http://registry.npmjs.org/"
sudo npm install npm@latest -g
sudo n stable

sudo ln -sf `which node` /usr/bin/nodejs
sudo ln -sf /usr/local/bin/npm /usr/bin/npm

sudo chown -R $USER:$(id -gn $USER) /home/vagrant/.config
sudo chown -R $(whoami) ~/.npm

sudo npm cache clean -f
sudo npm install -g n
sudo n stable

#sudo ln -sf /usr/local/n/versions/node/9.10.0/bin/node /usr/bin/nodejs


npm -v
nodejs -v
