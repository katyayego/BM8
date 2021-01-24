#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
python -m venv $dir/../env
source $dir/../env/Scripts/activate
python -m pip install -r $dir/requirements.txt