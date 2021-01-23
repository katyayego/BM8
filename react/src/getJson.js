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
async function getMapJson(mapId) {
    // Replace link w actual server once deployed
    let response;
    if (mapId != null) {
        response = await fetch(`http://localhost:5000/map?id=${mapId}`, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } else {
        response = await fetch(`http://localhost:5000/map`, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
    const data = await response.json();
    return data;
}

export default getUserJson;