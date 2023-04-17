class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (const node in this.nodes) {
      if (node.adjacent.has(vertex)) node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let visited = [];
    while (toVisitStack.length) {
      let currNode = toVisitStack.pop();
      visited.push(currNode.value);
      currNode.adjacent.forEach((node) => {
        if (!visited.includes(node.value) && !toVisitStack.includes(node))
          toVisitStack.push(node);
      });
    }
    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visited = [];
    while (toVisitQueue.length) {
      let currNode = toVisitQueue.shift();
      visited.push(currNode.value);
      currNode.adjacent.forEach((node) => {
        if (!visited.includes(node.value) && !toVisitQueue.includes(node))
          toVisitQueue.push(node);
      });
    }
    return visited;
  }
}

module.exports = { Graph, Node };
