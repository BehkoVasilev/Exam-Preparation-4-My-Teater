import { get, post } from "./api.js";

export async function like(theaterId) {
    return post("/data/likes", {
        theaterId
    });
}

export async function getLikes(theaterId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`)
}

export async function getOwnLike(theaterId, userId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}