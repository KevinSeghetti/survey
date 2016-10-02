#!/usr/bin/env python3

# this script installs all python libraries listed in the manifest

# kts todo: pip install doesn't work on the mac, those packages were installed with another package manager

import os
import sys
import pprint
import pip

prefix = sys.argv[1]

def install(package):
    print("installing module named",package)
    pip.main(['install', '--prefix',prefix, package])

# instal pyaml before trying to use it
install('pyaml')

import yaml

with open('autoinstall.manifest', 'r') as f:
    doc = yaml.load(f)

for module in doc.get('pip',[]):
    install(module)
