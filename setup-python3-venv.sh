#!/bin/bash

# setup for development

SOURCE_PATH=`pwd`
DEST_PATH=`pwd`

echo --- SOURCE_PATH=$SOURCE_PATH, DEST_PATH=$DEST_PATH ---

echo --- downloading and building python ---
mkdir $SOURCE_PATH/pythonsrc
cd $SOURCE_PATH/pythonsrc
wget http://python.org/ftp/python/3.4.3/Python-3.4.3.tar.xz
tar xvfJ Python-3.4.3.tar.xz 
cd Python-3.4.3
./configure --prefix=$DEST_PATH/Python34 --with-ensurepip=install
#--enable-shared

make
echo --- installing python to $DEST_PATH/Python34 ---
make install

echo --- creating venv ---

#echo 'export PATH=$DEST_PATH/Python34/bin:$PATH' >> ~/.bash_profile
export PATH=$DEST_PATH/Python34/bin:$PATH
         
cd $DEST_PATH      

$DEST_PATH/Python34/bin/pyvenv-3.4 venv
source $DEST_PATH/venv/bin/activate

# kts moved pip install commands into asseessment_platform/setup.sh

echo venv set up. To use:
echo source $DEST_PATH/venv/bin/activate
echo or
echo source $DEST_PATH/venv/bin/activate.csh

 


