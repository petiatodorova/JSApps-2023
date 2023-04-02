import { get, post, put, del } from "./api.js";


const endpoints = {
    catalog: '/data/fruits?sortBy=_createdOn%20desc',
    byId: '/data/fruits/'
};

export async function getAllOffers() {
    return get(endpoints.catalog);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

// post
export async function createOffer(data) {
    return post(endpoints.catalog, data);
}

// put
export async function updateOffer(id, data) {
    return put(endpoints.byId + id, data)
}

// delete
export async function deleteOffer(id) {
    return del(endpoints.byId + id)
}

