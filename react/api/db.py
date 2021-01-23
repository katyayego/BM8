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

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            app.config['DATABASE_URI'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
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

def get_map(map_id):
    query = 'SELECT * FROM map '
    query += 'WHERE map.id == ?'
    args = [map_id]
    return query_db(query, list(args))

def get_user_maps(user_id):
    query = 'SELECT * FROM map '
    query += 'INNER JOIN ( '
    query += 'SELECT map_ref FROM user_map '
    query += 'WHERE user_ref = ? '
    args = [user_id]
    query += 'GROUP BY map_ref ) '
    query += 'ON id = map_ref'
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