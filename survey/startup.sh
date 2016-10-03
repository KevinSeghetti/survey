#!/bin/bash

gnome-terminal --tab -e ./runserver.sh
gnome-terminal --window -e 'webpack --watch -d'

