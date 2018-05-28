/*
Arguments:

prevState (mandatory) -- the previous state for the reducer you are calling 
data (mandatory) -- the new data that you are updating the previous state with
optional_id (optional) -- the _id of the entity contained in data if it only contains one entity,
the presence of this param modifies the behaviour of addOrMerge.

This function will take the entitie(s) given to it via the data argument and combine it with the entities
that already exist in prevState. For each entity present in data it will either add it to prevState if it 
didn't already exist in prevState, or if it did exist it will merge it in such a way that all of the 
properties that exist on the entity in data get copied onto the entity in prevState, but any extra properties
which existed on the entity in prevState still get kept as well. 

When only the prevState and data arguments are present then the data argument should be an object where each
property of the object is an entity you wish to add or merge into prevState, and the key for each of the 
properties should be the _id for that entity.

With the optional_id argument also present, the data argument should just be the actual entity you want to 
add or merge (not an object with the entity as a property, just the actual entity itself), with the optional_id
argument being the _id of the entity. 

The goal of this function is to hide any complexities that might arise from updating the state, so that whenever
you want to update a slice of state with new entities you can just call this function and it will take care of the 
details for you. 

*/




export const addOrMerge = (prevState, data, optional_id) => {
    const newState = { ...prevState };
    if (optional_id) {
        newState[optional_id] = newState[optional_id] ? 
        { ...newState[optional_id], ...data } : 
        { ...data };
    } else {
        for (const user in data) {
            newState[user] = newState[user] ? 
            { ...newState[user], ...data[user] } :
            { ...data[user] };
        }
    }
    return newState;
};