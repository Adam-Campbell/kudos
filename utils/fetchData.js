import fetch from 'isomorphic-fetch';

export const fetchData = async (url, settings=null) => {
    // make request
    const response = await fetch(url, settings);
    // return if request resulted in an error
    if (!response.ok) {
        return Promise.reject({status: response.status});
    }
    // return if request succeeds but doesn't yield any data
    if (response.status === 204) {
        return Promise.resolve({status: response.status});
    } else {
        // if requests succeeds and yields data, convert data to JSON and return it
        const responseJSON = await response.json();
        return responseJSON;
    }
};