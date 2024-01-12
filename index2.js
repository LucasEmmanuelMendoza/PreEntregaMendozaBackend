//Pruebas
const arr = [2, 4, 1, 55, 12, -5, 14, 8, 111];

let mayor = arr.reduce((num, numArr) => num > numArr ? num : numArr, arr[0]);

console.log(mayor); 