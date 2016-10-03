#!/usr/bin/env python3

# this script installs all python libraries listed in the manifest

# kts todo: pip install doesn't work on the mac, those packages were installed with another package manager

import os
import sys
import pprint
import pip

if len(sys.argv) < 2:
    print("must pass in full path to directory to locally install packages")
    sys.exit(1)
prefix = sys.argv[1]

print("Installing python libraries to",prefix)

def install(package):
    print("installing module named",package)
    pip.main(['install', '--prefix',prefix, package])

try:
    import yaml
except:
    # instal pyaml before trying to use it
    install('pyaml')
    os.execl(sys.executable, sys.executable, *sys.argv)

with open('autoinstall.manifest', 'r') as f:
    doc = yaml.load(f)

for module in doc.get('pip',[]):
    install(module)
