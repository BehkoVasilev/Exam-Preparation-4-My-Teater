import { del, get, post, put } from "./api.js";



export async function getAllTheaters() {
    return get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getTheaterById(id) {
    return get("/data/theaters/" + id)
}

export async function delTheaterById(id) {
    return del("/data/theaters/" + id);
}

export async function addTheater(theaterData) {
    return post("/data/theaters", theaterData)
}

export async function editTheater(id, theaterData) {
    return put("/data/theaters/" + id, theaterData)
}

export async function getOwnTheaters(userId) {
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
