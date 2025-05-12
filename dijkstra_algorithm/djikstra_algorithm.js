class PriorityQueue { //antrian prioritas
    constructor() {
        this.elements = []; //array kosong yang akan menyimpan elemen antrian,setiap elemen yang masuk akan berbentuk objek {element, priority}
    }

    enqueue(element, priority) { //dalam antrian, memasukan elemen kedalam antrian dengan prioritas tertentu
        this.elements.push({ element, priority }); //push akan menambahkan object {element, priority}ke array
        this.elements.sort((a, b) => a.priority - b.priority); // setelah itu, array langsung diurutkan dari prioritas terkeceil ke terbesar
    }

    dequeue() { //keluar dari antrian, mengeluarkan elemen dengan prioritas tertinggi(yang paling kecil nilainya)
        return this.elements.shift().element; // shift() mengambil element pertama dari array (karena sudah diurutkan), .element mengambil hanya nilai data(bukan prioritasnya)

        /*
        Jika this.elements = [{ element: 'B', priority: 1 }, ...], maka:
        pq.dequeue(); // Mengembalikan 'B'
        */
    }

    isEmpty() { //memeriksa apakah antrian kosong
        return this.elements.length === 0; // mengembalikan true jika tidak ada elemen lagi dalam antrian

        /*
        Penting digunakan dalam algoritma seperti Dijkstra:
        while (!pq.isEmpty()) { ... }
        */
    }
}

function dijkstra(graph, start) {
    const distances = {} //jarak,objek ini akan menyimpan jarak terpendek dari simpul start ke semua simpul lain. 
    // format akhirnya seperti ini
    /*
        {
            A: 0,
            B: 5,
            C: 3,
            D: Infinity
        }
    */
    const previous = {} //sebelumnya, objek ini menyimpan simpul sebelumnya untuk setiap simpul dijalur terpendek, berguna untuk melacak rute dari start ke simpul akhir nanti.
    /* 
        {
            B: 'A',
            C: 'B',
            D: 'C'
        }
    */
    const pq = new PriorityQueue(); //inisialisai antrian prioritas, memastikan kita selalu memproses simpul dengan jarak terkecil terlebih dahulu

    //inisialisasi
    for (let vertex in graph) { //vertex= puncak, ini berarti loop setiap kunci (nama simpul) dalam objek graph
        console.log("vertex:", vertex)
        /*
            vertex: A
            vertex: B
            vertex: C
            vertex: D
            vertex: E
        */

        // cek apakah simpul adalah titik awal
        if (vertex === start) { //kalau vertex adalah simpul awal, maka
            distances[vertex] = 0; //jarak dari start ke dirinya sendiri adalah 0
            pq.enqueue(vertex, 0); //masukan ke antrian prioritas
        } else { //jika bukan
            distances[vertex] = Infinity; //kita anggap awalnya tidak tahu jaraknya (anggap infinity)
            pq.enqueue(vertex, Infinity); //tapi tetap masukan ke antrian, karena nanti akan diproses jika ditemukan jalur yang terpendek
        }

        //set nilai awal previous
        previous[vertex] = null; // semua simpul diatur dulu null, karena belum ada rute yang ditemukan kesana, nanti saat rute ditemukan, ini akan diisi dengan simpul sebelumnya dalam jalur terpendek

        /* 
        output:
        distances = {
            A: 0,
            B: Infinity,
            C: Infinity
        }

        previous = {
            A: null,
            B: null,
            C: null
        }

        pq = PriorityQueue berisi:
        [
            { element: 'A', priority: 0 },
            { element: 'B', priority: Infinity },
            { element: 'C', priority: Infinity }
        ]
        */
    }

    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue(); //ambil dan hapus simbol dengan prioritas paling kecil dari pq, ini adalah simpul yang akan kita proses saat ini (currentVertex) Misalnya: A, B, C, dst

        for (let neighbor in graph[currentVertex]) { //ambil semua tetangga dari simpul saat ini
            // misalnya, kalau currentVertex ="B" dan graph["B"] = {A:1, C:2}, maka neighbor akan A, lalu C

            const distance = distances[currentVertex] + graph[currentVertex][neighbor]; // hitung jarak baru dari titik awal ke tetangga neighbor melalui currentVex, rumusnya jarak ke simpul saat ini + jarak dari simpul ini ke tetangganya
            /* 
                jika distances['B'] = 3 dan graph['B']['C'] = 2, maka distance 3 + 2
            */

            if (distance < distances[neighbor]) { //cek apakah jarak baru lebih pendek daripada jarak lama yang tersimpan, kalau iya berarti kita menemukan jalur yang lebih efisien. jika ia lakukan pembaruan 

                distances[neighbor] = distance; // simpan jarak baru ini sebagai jarak terpendek sementara ke neighbor
                previous[neighbor] = currentVertex; //simpan dari mana kita datang ke neighbor, ini akan berguna saat kita ingin menelusuri jalur terpendek nantinya.
                pq.enqueue(neighbor, distance); // masukan simpul tetangga kedalam antrian prioritas dengan jarak barunya. supaya nanti dia diproses jika jadi simpul terkecil selanjutnya
            }
        }
    }

    // setelah while, kita kembalikan hasil,
    // distances berisi jarak terpendek dari titik awal ke semua simpul
    // previous berisi rute atau jalur terpendek dari titik awal ke setiap simpul
    return { distances, previous };
}

function getPath(previous, end) {
    const path = []; // inisialisasi array kosong untuk menyimpan jalur terpendek
    let current = end; //mulai dari simpul tujuan, kita akan menelusuri mundur dari end ke start lewat previous

    while (current !== null) { //loop sampai kita mencapai simpul awal (karena previous [start] = null)
        path.unshift(current); // tambahkan current ke awal array path, kenapa unshifit ? bukan push, karena kita sedang menelusuri dari end ke start, misalnya D → C → B → A, maka kita tambahkan ke depan agar hasil akhirnya A → B → C → D.
        current = previous[current]; //update current ke simpul sebelumnya. proses ini menelusuri jejak mundur dari akhir ke awal berdasarkan hasil djikstra
    }

    return path;
}

// Definisi graf
const graph = {
    A: { B: 7, E: 1 },
    B: { A: 7, C: 3, E: 8 },
    C: { B: 3, D: 6, E: 2 },
    D: { C: 6, E: 7 },
    E: { A: 1, B: 8, C: 2, D: 7 }
};

const startNode = "A";
const { distances, previous } = dijkstra(graph, startNode);
console.log("distances:", distances);
console.log("previous:", previous)

console.log("Jarak terpendek dari node A:");
for (let node in distances) {
    console.log(`Ke ${node}: ${distances[node]}`);

    const path = getPath(previous, node);
    console.log(`Jalur: ${path.join(" -> ")}`)
}