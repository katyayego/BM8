#!/usr/bin/env python

"""Defines the URL routes for a Flask application.
BSD 3-Clause License
Copyright (c) 2020, Harrison McCarty
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""

import json
from datetime import datetime as dt

from flask import current_app, g, render_template, request, send_file, jsonify
from flask.cli import with_appcontext

from . import db

@current_app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == "GET":
        id = request.args.get('id')
        user_name = request.args.get('user_name')
        full_name = request.args.get('full_name')
        return {'users':db.get_users(id, user_name, full_name)}
    elif request.method == "POST":
        req = request.get_json()
        user_name = req['user_name']
        full_name = req['full_name']
        pic = None
        if 'pic' in req:
            pic = req['pic']
        status = None
        if 'status' in req:
            status = req['status']
        db.add_user(user_name, full_name, pic, status)
        return jsonify(success=True)

@current_app.route('/map', methods=['GET', 'POST'])
def map():
    if request.method == 'GET':
        map_id = request.args.get('id')
        user_id = request.args.get('user')
        title = request.args.get('title')
        return {'maps':db.get_maps(map_id, user_id, title)}
    elif request.method == 'POST':
        req = request.get_json()
        user = req['user']
        title = req['title']
        desc = None
        if 'desc' in req:
            desc = req['desc']
        map = None
        if 'map' in req:
            map = str(req['map'])
        else:
            map = str({'nodes':[],'edges':[],'options':[]})
        db.add_map(user, title, desc, map)
        return jsonify(success=True)

@current_app.route('/map/update', methods=['POST'])
def map_update():
    if request.method == 'POST':
        req = request.get_json()
        map_id = req['id']
        user_id = req['user']
        title = None
        if 'title' in req: 
            title = req['title']
        desc = None
        if 'desc' in req:
            desc = req['desc']
        db.update_map(map_id, user_id, title=title, desc=desc)
        return jsonify(success=True)

@current_app.route('/map/add_node', methods=['POST'])
def map_add_node():
    if request.method == 'POST':
        req = request.get_json()
        map_id = req['id']
        user_id = req['user']
        res = req['res']
        edges = req['edges']

        print(db.get_maps(map_id=map_id))
        map = json.loads(db.get_maps(map_id=map_id))
        node = {
            'id' : len(map['nodes']),
            'res': res
        }
        map['nodes'].append(node)

        for e in edges:
            edge = {
                'id'  : len(map['edges']),
                'from': e,
                'to'  : node['id']
            }
            map['edges'].append(edge)
        map = json.dumps(map)
        print(map)

        # db.update_map(map_id, user_id, map=map)
        return jsonify(success=True)
