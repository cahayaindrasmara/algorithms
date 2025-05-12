class PriorityQueue {
    constructor() {
        this.element = [];
    }

    enqueue(element, priority) {
        this.element.push({ element, priority });
        this.element.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.element.shift().element;
    }

    isEmpty() {
        return this.element.length === 0;
    }
}

function dijkstraExplained(graph, start, end) {
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    const visited = new Set();

    //inisialisai
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            pq.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            pq.enqueue(vertex, Infinity)
        }
        previous[vertex] = null;
    }
    console.log("Langkah - langkah algoritma dijkstra:")

    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue();

        if (currentVertex === end) {
            console.log(`\nNode tujuan ${end} tercapai. Algoritma selesai.`);
            break;
        }

        if (visited.has(currentVertex)) continue;
        visited.add(currentVertex);

        console.log(`\nMemeriksa node ${currentVertex}:`);

        for (let neighbor in graph[currentVertex]) {
            if (visited.has(neighbor)) continue;

            const distance = distances[currentVertex] + graph[currentVertex][neighbor];
            console.log(`  Tetangga ${neighbor}: jarak saat ini = ${distances[neighbor]}, jarak baru = ${distance}`);

            if (distance < distance[neighbor]) {
                distance[neighbor] = distance;
                previous[neighbor] = currentVertex;
                pq.enqueue(neighbor, distance);
                console.log(`    Memperbarui jarak ke ${neighbor}: ${distance}`);
            } else {
                console.log(`    Tidak ada pembaruan untuk ${neighbor}`);
            }
        }
    }
    return { distances, previous }
}

function getPath(previous, start, end) {
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        if (current === start) break;
        current = previous[current];
    }
    return path;
}

function findShortestPath(graph, start, end) {
    const { distances, previous } = dijkstraExplained(graph, start, end)
    const path = getPath(previous, start, end);

    console.log(`\nJarak terpendek dari ${start} ke ${end}: ${distances[end]}`);
    console.log(`Jalur: ${path.join(' -> ')}`);
}

// Contoh penggunaan
// const startNode = 'B';
// const endNode = 'F';

const graph = {
    'A': { 'B': 8, 'E': 3 },
    'B': { 'A': 8, 'C': 5, 'E': 2 },
    'C': { 'B': 5, 'D': 1, 'F': 3 },
    'D': { 'C': 1, 'F': 5 },
    'E': { 'A': 3, 'B': 2 },
    'F': { 'C': 3, 'D': 5 }
};

// TESTCASE 3
findShortestPath(graph, 'F', 'A');
// Jarak terpendek dari B ke F: 8 
// Jalur: B -> C -> F

// TESTCASE 3
findShortestPath(graph, 'A', 'F');
// Jarak terpendek dari A ke F: 13
// Jalur: A -> E -> B -> C -> F

// TESTCASE 3
findShortestPath(graph, 'C', 'E');
// Jarak terpendek dari C ke E: 7
// Jalur: C -> B -> E