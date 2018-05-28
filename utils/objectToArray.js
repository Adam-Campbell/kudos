/*
Takes in an object, return an array consisting of all enumerable properties on the object that was supplied.
*/

export const objectToArray = obj => {
    const arr = [];
    for (const prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
};
