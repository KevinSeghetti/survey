#!/bin/bash

gnome-terminal  --tab -e 'webpack --watch -d' --tab -e ./runserver.sh
