//Flatten the Array

let arr = [
  [1, 2],
  [3, 4],
  [5, 6, [7, 8], 9],
  [10, 11, 12],
];

let flattened = [].concat(...arr); //spread the array one level

console.log(flattened); //[1, 2, 3, 4, 5, 6, [7, 8], 9, 10, 11, 12]

//concat example
// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = array1.concat(array2);

// console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

//since only one level, we write our custom flat function
function customFlat(arr, depth = 1) {
  let result = [];
  arr.forEach((ar) => {
    if (Array.isArray(ar) && depth > 0) {
      result.push(...customFlat(ar, depth - 1));
    } else result.push(ar);
  });

  return result;
}
//explanation is at 13:00

console.log(customFlat(arr, 2)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
