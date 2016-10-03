# UPDATE PACKAGES
sudo apt-get update
sudo apt-get -y dist-upgrade

# INSTALL VARIOUS PACKAGES
sudo apt-get -y install vim

# INSTALL NODE
sudo apt-get -y install npm
sudo npm install -g n
sudo n stable

# INSTALL NODE MODULES
sudo npm install -g nodemon

# INSTALL MONGO
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
