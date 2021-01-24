import React from 'react';

// Pass in a userID, gets that user from the database. If no userID is passed, returns all users
async function getUser(userId, userName, fullName, limit) {
    let params = '?';
    let first = true;

    if (userId != null) {
        params += `userId=${userId}`
        first = false;
    }

    if (userName != null) {
        params += (first) ? '' : '&';
        params += `userName=${userName}`
        first = false;
    }

    if (fullName != null) {
        params += (first) ? '' : '&';
        params += `firstName=${fullName}`
        first = false
    }

    if (limit != null) {
        params += (first) ? '' : '&';
        params += `limit=${limit}`
    }

    // Replace link w actual server once deployed
    let response;
    response = await fetch(`http://localhost:5000/user`, {
        headers: { 'Access-Control-Allow-Origin': 'null' }
    });
    const data = await response.json();
    return data;
}

async function postUser(userName, fullName, pic, status) {
    let params = {
        'user_name': userName,
        'full_name': fullName,
    }

    if (pic != null) {
        params['pic'] = pic
    }

    if (status != null) {
        params['status'] = status
    }

    // Replace link w actual server once deployed
    let response;
    response = await fetch(`http://localhost:5000/user`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params)
    });
    const data = await response.json();
    return data;
}

// Pass in an id, gets that map from the database. If no id is passed, returns all maps
async function getMap(mapId, userId, title, limit) {
    let params = '?';
    let first = true;

    if (mapId != null) {
        params += `id=${mapId}`
        first = false
    }

    if (userId != null) {
        params += (first) ? '' : '&';
        params += `user=${userId}`
        first = false
    }

    if (title != null) {
        params += (first) ? '' : '&';
        params += `title=${title}`
        first = false
    }

    if (limit != null) {
        params += (first) ? '' : '&';
        params += `limit=${limit}`
    }

    // Replace link w actual server once deployed
    let response;
    response = await fetch('http://localhost:5000/map' + params, {
        headers: { 'Access-Control-Allow-Origin': '*' }
    });
    const data = await response.json();
    return data;
}

async function postMap(userId, title, desc, map) {
    let params = {
        'userId': userId,
        'title': title,
    }

    if (desc != null) {
        params['desc'] = desc
    }

    if (map != null) {
        params['map'] = map
    }

    // Replace link w actual server once deployed
    let response;
    response = await fetch(`http://localhost:5000/map`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(params)
    });
    const data = await response.json();
    return data;
}

export {
    getUser,
    postUser,
    getMap,
    postMap,
}