

<VirtualHost *:80>
  ServerName PWR
  DocumentRoot "/home/vagrant/PWR/public"
  <Directory "/home/vagrant/PWR/public">
    AllowOverride all
  </Directory>
</VirtualHost>

cd /etc/apache2/sites-available
cd ../sites-enabled
sudo ln -s ../sites-available/pwr.conf
sudo service apache2 restart


cd /etc/apache2
sudo nano envvars

#Change the lines below to contain the desired user and group

export APACHE_RUN_USER=vagrant
export APACHE_RUN_GROUP=vagrant
#Save the file and restart apache.

sudo service apache2 restart
