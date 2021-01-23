#!/usr/bin/env python

"""Wraps functions to manage sqlite database.
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

from flask import current_app as app, g
from flask.cli import with_appcontext
from datetime import datetime as dt
import sqlite3
import click

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

def init_db():
    db = get_db()

    with app.open_resource('./schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            app.config['DATABASE_URI'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = dict_factory
    return g.db

def query_db(query, args=()):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return rv

def insert_db(insert, args=()):
    db = get_db()
    cur = db.cursor()
    cur.execute(insert, args)
    db.commit()
    rv = cur.lastrowid
    cur.close()
    return rv

def add_user(user_name, full_name, pic=None, status=None):
    if pic is not None and status is not None:
        sql = 'INSERT INTO user(user_name, full_name, pic, status) VALUES (?, ?, ?, ?)'
        insert_db(sql, [user_name, full_name, pic, status])
    elif pic is not None:
        sql = 'INSERT INTO user(user_name, full_name, pic) VALUES (?, ?, ?)'
        insert_db(sql, [user_name, full_name, pic])
    elif status is not None:
        sql = 'INSERT INTO user(user_name, full_name, status) VALUES (?, ?, ?)'
        insert_db(sql, [user_name, full_name, status])
    else:
        sql = 'INSERT INTO user(user_name, full_name) VALUES (?, ?)'
        insert_db(sql, [user_name, full_name])

# TODO: Add limit
def get_users(id=None, user_name=None, full_name=None):
    query = 'SELECT * FROM user '
    args = []
    append_query = False

    if id is not None:
        query += 'WHERE id = (?) '
        args.append(id)
        append_query = True
    
    if user_name is not None:
        if append_query:
            query += 'OR user_name like (?) '
        else:
            query += 'WHERE user_name like (?) '
            append_query = True
        args.append('%' + user_name + '%')

    if full_name is not None:
        if append_query:
            query += 'OR full_name like (?) '
        else:
            query += 'WHERE full_name like (?) '
        args.append('%' + full_name + '%')
    
    return query_db(query, args)

def add_map(user_id, title, desc, map):
    sql = 'INSERT INTO map(title, desc, map) VALUES (?, ?, ?)'
    map_id = insert_db(sql, (title, desc, map))
    print(map_id)
    sql = 'INSERT INTO user_map(user_ref, map_ref) VALUES (?, ?)'
    insert_db(sql, (user_id, map_id))
    return True

# TODO: Add limit
def get_maps(map_id=None, user_id=None, title=None):
    query = 'SELECT * FROM map '
    args = []

    if map_id is not None:
        query += 'WHERE map.id = ? '
        args.append(map_id)
    elif user_id is not None:
        query += 'INNER JOIN ( '
        query += 'SELECT map_ref FROM user_map '
        query += 'WHERE user_ref = ? '
        args.append(user_id)
        query += 'GROUP BY map_ref ) '
        query += 'ON map.id = map_ref '

    if title is not None:
        query += 'WHERE map.title LIKE ? '
        args.append("%" + title + "%")

    print(query)

    return query_db(query, list(args))

@app.teardown_appcontext
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')