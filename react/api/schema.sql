DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS map;
DROP TABLE IF EXISTS user_map;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    pic TEXT,
    status TEXT
);

CREATE TABLE map (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    map TEXT NOT NULL
);

CREATE TABLE user_map (
    user_ref INTEGER,
    map_ref INTEGER
);