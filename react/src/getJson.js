import React from 'react';

// Pass in a userID, gets that user from the database. If no userID is passed, returns all users
async function getUserJson(userId) {
    // Replace link w actual server once deployed
    let response;
    if (userId != null) {
        response = await fetch(`http://localhost:5000/user?id=${userId}`, {
            headers: { 'Access-Control-Allow-Origin': 'null' }
        });
    } else {
        response = await fetch(`http://localhost:5000/user`, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
    const data = await response.json();
    return data;
}

// Pass in an id, gets that map from the database. If no id is passed, returns all maps
async function getMapJson(mapId = null, userId = null) {
    let params = '?';
    let first = true;

    if (mapId != null) {
        params += `id=${mapId}`
    }

    if (userId != null) {
        params += (first) ? '' : '&';
        params += `user=${userId}`
    }

    // Replace link w actual server once deployed
    let response;
    response = await fetch('http://localhost:5000/map' + params, {
        headers: { 'Access-Control-Allow-Origin': '*' }
    });
    const data = await response.json();
    return data;
}

export default getUserJson;