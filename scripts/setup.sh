#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
python3 -m venv $dir/../env
source $dir/../env/bin/activate
python3 -m pip install -r $dir/requirements.txt
export FLASK_APP=$dir/../wsgi.py
export FLASK_DEBUG=1
export DATABASE_URI=$dir/../mydb.db