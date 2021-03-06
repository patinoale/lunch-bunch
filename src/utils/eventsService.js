// This is to provide access to the Events collection on the backend
import tokenService from './tokenService';

const BASE_URL = '/api/events'

export default {
    getEvents,
    getUserEvents,
    delEvent,
    updateEvent,
    create
};

function getEvents() {
    return fetch(BASE_URL).then(res => res.json());
}

function getUserEvents(userId) {
    return fetch(BASE_URL + `/${userId}/user`).then(res => res.json());
}

function create(event) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization':'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(event)
    };
    return fetch(BASE_URL, options).then(res => res.json());
}

function updateEvent(eventId, guestId, event) {
    console.log(`updateEvent ${eventId}`)
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization':'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(event)
    };
    return fetch(BASE_URL + `/${eventId}/${guestId}/event`, options)
    .then(res => res.json())
    // .then(res => res.text())
    // .then(text => console.log(text));
}

function delEvent(eventId) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization':'Bearer ' + tokenService.getToken()
        }
        
    };
    console.log(BASE_URL + `/${eventId}/delete`);
    return fetch((BASE_URL + `/${eventId}/delete`), options).then(res => res.json());
}