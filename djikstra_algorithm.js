class PriorityQueue { //antrian prioritas
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) { //dalam antrian
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() { //keluar dari antrian
        return this.elements.shift().element;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function dijkstra(graph, start) {
    const distances = {} //jarak
    const previous = {} //sebelumnya
    const pq = new PriorityQueue();

    //inisialisasi
    for (let vertex in graph) { //vertex= puncak
        console.log("vertex:", vertex)
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue();

        for (let neighbor in graph[currentVertex]) {
            const distance = distances[currentVertex] + graph[currentVertex][neighbor];

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = currentVertex;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return { distances, previous };
}

function getPath(previous, end) {
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
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

console.log("Jarak terpendek dari node A:");
for (let node in distances) {
    console.log(`Ke ${node}: ${distances[node]}`);

    const path = getPath(previous, node);
    console.log(`Jalur: ${path.join(" -> ")}`)
}