class Node {
    constructor(value) {
        // membuat property value dan edges
        this.value = value;
        this.edges = []; //menyimpan tetangga (node lain yang terhubung)
    }

    /*
    output:
    Node {
        value: 'A',
        edges: []
    }
    */

    addEdge(node) {
        this.edges.push(node); //tambahkan hubungan (edge) ke node lain
    }

    /*
    output:
    Node {
        value: 'A',
        edges: [ Node { value: 'B', edges: [] } ]
    }

    */

    removeEdge(node) {
        const index = this.edges.indexOf(node); // mencari index posisi node didalam array edges, jika ditemukan, maka index akan bernilai 0,1 dst. jika tidak ditemukan, maka index === -1. untuk tipe data obj, arr, function indexOf akan mencocokan referensi (alamat memorinya) bukan value
        if (index !== -1) {
            this.edges.splice(index, 1) // jika node ditemukan di array, maka hapus 1 item di posisi index tersebut menggunakan splice()
        }
    }
    /*
    output:
    Node {
        value: 'A',
        edges: []
    }
    */
}

class Graph {
    constructor() {
        // membuat property map
        this.nodes = new Map();

        /* Output:
            Graph {
                nodes: Map {}
            }
        */
    }

    addNode(value) { //digunakan untuk menambah node baru kedalam graph
        this.nodes.set(value, new Node(value)); //membuat objek node baru dengan nilai value, dan memasukannya kedalam map menggunakan set(). kunci value digunakan untuk mengidentifikasi node ini didalam map

        /* Output:
            Graph {
                nodes: Map {
                    'A' => Node { value: 'A', edges: [] },
                    'B' => Node { value: 'B', edges: [] }
                }
            }
        */
    }

    addEdge(source, destination) { //digunakan untuk menambahkan hubungan (edge) antara dua node dalam graph atau sisi
        if (!this.nodes.has(source) || !this.nodes.has(destination)) { // sebelum menambahkan edge, kita periksa apakah node yang dituju ada dalam graf atau tidak. jika salah satu node tidak ada kita lemparkan error
            throw new Error("Source or destination node does not exist.");
        }

        const sourceNode = this.nodes.get(source); //mendapatkan node sumber dari graph berdasarkan source
        const destinationNode = this.nodes.get(destination); //mendapatkan node tujuan dari graph berdasarkan destination
        sourceNode.addEdge(destinationNode); //menambahkan node tujuan kedalam daftar edges dari node sumber

        /* Output:
            Graph {
                nodes: Map {
                    'A' => Node { value: 'A', edges: [Node { value: 'B', edges: [] }] },
                    'B' => Node { value: 'B', edges: [] }
                }
        }
        */
    }

    removeNode(value) { //digunakan untuk menghapus node dari graph
        const nodeToRemove = this.nodes.get(value); //mendapatkan node yang akan dihapus berdasarkan value
        if (!nodeToRemove) return; //jika node tidak ada, keluar dari fungsi

        for (const node of this.nodes.values()) { //untuk setiap node didalam graph, kita menghapus edges yang mengarah ke node yang akan dihapus menggunakan code dibawah
            node.removeEdge(nodeToRemove);
        }

        this.nodes.delete(value); // setelah menghapus semua edges agar tidak terjadi error atau salah logika, maka selanjutnya kita hapus nodenya

        /* Output:
            Graph {
                nodes: Map {
                    'A' => Node { value: 'A', edges: [] }
                }
            }
        */
    }

    removeEdge(source, destination) { //digunakan untuk menghapus edge antara dua node dalam graph
        const sourceNode = this.nodes.get(source); // mendapatkan node sumber dari graph berdasarkan source
        const destinationNode = this.nodes.get(destination); // mendapatkan node tujuan dari graph berdasarkan destination
        if (!sourceNode || !destination) return; //jika salah satu node tidak ada, keluar dari fungsi

        sourceNode.removeEdge(destinationNode); //menghapus node tujuan dari daftar edges milik node sumber

        /* Output:
            Graph {
                nodes: Map {
                    'A' => Node { value: 'A', edges: [Node { value: 'B', edges: [] }] },
                    'B' => Node { value: 'B', edges: [] }
                }
            }
        */
    }

    //Bread-first search
    bfs(startValue, targetValue) {
        const visited = new Set(); //Set untuk melacak simpul yang telah dikunjungi
        const queue = []; //Antrian untuk menjaga simpul yang akan diperiksa

        //menambahkan simpul awal ke antrian dan tKalian sebagai sudah dikunjunngi
        queue.push(this.nodes.get(startValue));

        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode.value === targetValue) return true;

            visited.add(currentNode);
            for (const neighbor of currentNode.edges) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
        return false;
    }

    dfs(startValue, targetValue, visited = new Set()) {
        if (visited.has(startValue)) return false;

        visited.add(startValue);
        if (startValue === targetValue) return true;

        const startNode = this.nodes.get(startValue);
        for (const neighbor of startNode.edges) {
            if (this.dfs(neighbor.value, targetValue, visited)) {
                return true;
            }
        }
        return false;
    }
}

// membuat graph dan menambahkan simpul serta sisi
const myGraph = new Graph();

myGraph.addNode("A");
myGraph.addNode("B");
myGraph.addNode("C");
myGraph.addNode("D");

myGraph.addEdge("A", "B");
myGraph.addEdge("B", "C");
myGraph.addEdge("C", "A");
myGraph.addEdge("C", "D");

console.log("Graph awal:");
console.log(myGraph);

// menghapus simpul "B" dan sisi antara "C" dan "D"
myGraph.removeNode("B");
myGraph.removeEdge("C", "D");

console.log("Setelah penghapusan simpul dan sisi:")
console.log(myGraph);

//pencarian jarak terpendek menggunakan BFS dari "A" ke "D"
const bfsResult = myGraph.bfs("A", "D");
console.log("Pencarian jarak terpendek menggunakan BFS:", bfsResult);

//pencarian jarak terpendek menggunakan DFS dari "A" ke "D"
const dfsResult = myGraph.dfs("A", "D");
console.log("Pencarian jarak terpendek menggunakan DFS:", dfsResult)
