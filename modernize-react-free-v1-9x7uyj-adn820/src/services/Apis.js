import { commonrequest } from "./ApiCall"
import { BASE_URL } from "./helper"

export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/data/Add`, data, header);
}

export const usergetfunc = async (search, gender, status, sort, page) => {
    return await commonrequest("GET", `${BASE_URL}/data/list?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "");
}

export const usergetdata = async () => {
    return await commonrequest("GET", `${BASE_URL}/data/list`, "");
}

export const singleUsergetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/data/List/${id}`, "");
}

export const editfunc = async (id, data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/data/edit/${id}`, data, header);
}

export const deletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/data/delete/${id}`, {});
}
export const deletmanyfunc = async (ids, header) => {
    return await commonrequest("DELETE", `${BASE_URL}/data/deletemany`, JSON.stringify({ ids }), header);
}
export const statuschangefunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/data/status/${id}`, { data })
}
export const allstatuschangefunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/data/status/`, { id, data })
}
export const exporttocsvfunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/data/export`, "");
}