#!/bin/sh

sass -I static/css static/css/style.scss >static/css/style.css
sass -I static/css checklist/static/checklist/style.scss >checklist/static/checklist/style.css
