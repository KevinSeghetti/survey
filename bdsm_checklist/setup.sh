#!/bin/bash

SOURCE_PATH=~
BASE_PATH=~
DEST_PATH=~

mkdir $SOURCE_PATH/python
cd $SOURCE_PATH/python
wget http://python.org/ftp/python/3.4.3/Python-3.4.3.tar.xz
tar xvfJ Python-3.4.3.tar.xz 
cd Python-3.4.3
./configure --prefix=$DEST_PATH/Python34
make
make install

echo 'export PATH=$DEST_PATH/Python34/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile              
         
cd $DEST_PATH      
pyvenv-3.4 venv
#source venv/bin/activate
source venv/bin/activate.csh
pip install django

pip install psycopg2

               
