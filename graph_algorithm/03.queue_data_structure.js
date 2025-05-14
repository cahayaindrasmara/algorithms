// implementasi queue menggunakan array
const queue = [];

// menambahkan elemen ke queue
queue.push(1);
queue.push(2);
queue.push(3);
console.log("in:", queue)

// menghapus dan mengembalikan elemen pertama dari queue
const firstElement = queue.shift()
console.log("out:", firstElement)

// sekarang queue
console.log("queue:", queue)
// [2,3]