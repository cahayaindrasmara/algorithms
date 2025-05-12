// membuat struktur dasar untuk simpul (node)
class Node {
    constructor(value) {
        this.value = value;
        this.edges = [];
    }

    addEdge(node) {
        this.edges.push(node);
    }
}

// kemudian, kita bisa membuat kelas untuk merepresentasikan graph itu sendiri

class Graph {
    constructor() {
        this.nodes = [];
    }

    addNode(value) {
        const newNode = new Node(value);
        console.log("newNode:", newNode)
        this.nodes.push(newNode);
        return newNode;
    }

    addEdge(node1, node2) {
        node1.addEdge(node2);
        // jika graph tidak berarah, tambahkkan ini juga:
        // node2.addEdge(node1);
    }
}

// sekarang mari kita buat contoh penggunaan dari struktur graph yang sudah kita buat

const myGraph = new Graph(); // membuat objek baru myGraph dari class Graph
/*
isi awal myGraph:
Graph {
    nodes : []
}
*/

const nodeA = myGraph.addNode("A");
console.log("nodeA:", nodeA)
const nodeB = myGraph.addNode("B");
const nodeC = myGraph.addNode("C");
// membuat objek baru dari class Node dengan nilai yang diberikan ("A", "B", "C"), dan menambahkan nya ke array nodes milih myGraph

/*
nodeA = Node {value: "A", edges: []}
nodeB = Node {value: "B", edges: []}
nodeC = Node {value: "C", edges: []}

hasil nya:
myGraph = Graph {
    nodes: [
        Node {value : "A", edges : []},
        Node {value : "B", edges : []},
        Node {value : "C", edges : []}
    ]
}
*/

myGraph.addEdge(nodeA, nodeB);
myGraph.addEdge(nodeB, nodeC);
myGraph.addEdge(nodeC, nodeA);

// menambahkan node2 kedalam array edges milik node1, yang menghubungkan node1 ke node2

/*
nodeA.addEdge(nodeB) // nodeA.edges.push(nodeB)

hasilnya:
nodeA = Node {value : "A", edges : [Node {value : "B", edges : []}]}

-sehingga nodeA terhubung ke nodeB melalui array edges miliknya

-nodeB tidak otomatis terhubung balik ke nodeA, kecuali kamu menambahkan: nodeB.addEdge(nodeA)
*/

console.log(myGraph)

for (const node of myGraph.nodes) {
    console.log(`Node ${node.value} terhubung ke:`);
    for (const edge of node.edges) {
        console.log(`   ->${edge.value}`)
    }
}


