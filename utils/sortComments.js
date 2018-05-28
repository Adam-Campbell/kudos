/*

Function takes in an unordered array of comment objects, and it will sort the comments into a 'threaded' order, 
although they will still be a flat array. Returns the new sorted array.

Comments will be sorted such that the oldest top level comment will be first in the array, followed
by any direct replies to that comment, and each of those will be followed by their own replies if they have
any, this pattern continues until all the comments in that 'thread' have been sorted.
The next item in the array will then be the second oldest top level comment, followed by all the comments from 
it's own 'thread', and on until all the comments have been sorted. 

Now the rendering logic can simply map over the array to create 'threaded' comments in the dom. 

*/

export const sortComments = commentArr => {
    let newArr = [];
    // sort the comments primarily by the number of parents they have, and secondarily
    // by when they were created.
    const initialSort = [...commentArr].sort((a,b) => {
        if (a.parents.length < b.parents.length) {
            return -1;
        } else if (a.parents.length > b.parents.length) {
            return 1;
        } 
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // loop through the sorted array and append the comment to newArr. If the comment is a top
    // level comment we just push it onto the array (they are already sorted from oldest to newest).
    // If it isn't top level, we find it's parent comments index in the new array and add the comment
    // after it's parent. It's parent will always be there because we've already sorted them by the 
    // amount of parents they have (ascending).
    initialSort.forEach(comment => {
        if (comment.parents.length === 1) {
            newArr.unshift(comment);
            return;
        }
        const parent_id = comment.parents[comment.parents.length-2];
        const parentIndex = newArr.findIndex(parentComment => parentComment._id === parent_id);
        newArr = [
            ...newArr.slice(0, parentIndex + 1),
            comment,
            ...newArr.slice(parentIndex + 1)
        ];
    });
    return newArr.map(commentObject => commentObject._id);
};