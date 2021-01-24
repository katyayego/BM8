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
import random
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
        limit = request.args.get('limit')
        return {'users':db.get_users(id, user_name, full_name, limit)}
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
        limit = request.args.get('limit')
        maps = db.get_maps(map_id, user_id, title, limit)
        for map in maps:
            map['map'] = json.loads(map['map'])
        return {'maps':maps}
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
            map = json.dumps({'nodes':[],'edges':[],'options':[]})
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
        label = req['label']
        res = req['res']
        group = req['group']
        edges = []
        if 'edges' in req:
            edges = req['edges']

        map = json.loads(db.get_maps(map_id=map_id, limit=1)[0]['map'])
        node = {}
        if 'node' in req:
            node = {
                'id'   : req['node'],
                'label': label,
                'group': group,
                'res'  : res
            }
        else:
            node = {
                'id'   : random.randint(1,100000),
                'label': label,
                'group': group,
                'res'  : res
            }
        map['nodes'].append(node)

        for e in edges:
            edge = {
                'id'  : random.randint(1,100000),
                'from': e,
                'to'  : node['id']
            }
            map['edges'].append(edge)
        map = json.dumps(map)

        db.update_map(map_id, user_id, map=map)
        return jsonify(success=True)

@current_app.route('/map/edit_node', methods=['POST'])
def map_edit_node():
    if request.method == 'POST':
        req = request.get_json()
        map_id = req['id']
        user_id = req['user']
        node_id = req['node']
        map = json.loads(db.get_maps(map_id=map_id, limit=1)[0]['map'])

        node_idx = 0
        for n in map['nodes']:
            if node_id == n['id']:
                break
            node_idx += 1

        if 'label' in req:
            map['nodes'][node_idx]['label'] = req['label']

        if 'res' in req:
            res = req['res']
            map['nodes'][node_idx]['res'] = req['res']

        if 'group' in req:
            group = req['group']
            map['nodes'][node_idx]['group'] = req['group']

        if 'edges' in req:
            edges = req['edges']
            for e in map['edges']:
                if e['from'] not in edges:
                    map['edges'].remove(e)
                else:
                    edges.remove(e['from'])

            for e in edges:
                edge = {
                    'id'  : random.randint(1,100000),
                    'from': e,
                    'to'  : node['id']
                }
                map['edges'].append(edge)
        
        map = json.dumps(map)
        db.update_map(map_id, user_id, map=map)
        return jsonify(success=True)

@current_app.route('/map/delete_node', methods=['POST'])
def map_delete_node():
    if request.method == 'POST':
        req = request.get_json()
        map_id = req['id']
        user_id = req['user']
        node_id = req['node']
        map = json.loads(db.get_maps(map_id=map_id, limit=1)[0]['map'])

        for n in map['nodes']:
            if node_id == n['id']:
                map['nodes'].remove(n)
                break

        for e in map['edges']:
            if e['from'] == node_id or e['to'] == node_id:
                map['edges'].remove(e)

        map = json.dumps(map)
        db.update_map(map_id, user_id, map=map)
        return jsonify(success=True)