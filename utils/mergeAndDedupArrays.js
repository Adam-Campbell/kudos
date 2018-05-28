/*

Arguments

oldArray -- The data from the existing slice of state. Must be an array of primitive values.
newArray -- The array of new data to be merged into state, must also consist of primitive values.

Function takes two arrays and merges them together whilst removing any duplicated and returns the resulting
array. The arrays are merged such that the results from the array passed in as the argument newArray will appear
first in the resulting array. The elements of newArray are given priority over the elements of oldArray, so any 
elements which are featured in both arrays will be dropped from oldArray, but kept in newArray. 

*/

export const mergeAndDedupArrays = (oldArray, newArray) => Array.from(new Set([...newArray, ...oldArray]));
