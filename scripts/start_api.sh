#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
source $dir/../env/Scripts/activate
export FLASK_APP=$dir/../wsgi.py
export FLASK_DEBUG=1
export DATABASE_URI=$dir/../mydb.db
python -m flask run