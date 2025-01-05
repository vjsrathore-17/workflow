from typing import List, Set
from collections import defaultdict
from pydantic import BaseModel

class Edge(BaseModel):
    source: str
    target: str

class DAGRequest(BaseModel):
    nodes: List[str]
    edges: List[Edge]

class DAGResponse(BaseModel):
    is_dag: bool
    num_nodes: int
    num_edges: int

class Graph:
    def __init__(self, nodes: List[str], edges: List[tuple[str, str]]):
        """
        Initialize the graph with nodes and edges.
        
        Args:
            nodes: List of node IDs
            edges: List of tuples (source_node, target_node)
        """
        self.nodes = nodes
        self.edges = edges
        # Create adjacency list
        self.graph = defaultdict(list)
        for source, target in edges:
            self.graph[source].append(target)
            
    def is_dag(self) -> bool:
        """
        Check if the graph is a Directed Acyclic Graph (DAG).
        Returns True if the graph is a DAG, False otherwise.
        """
        # Keep track of visited nodes and nodes in current path
        visited: Set[str] = set()
        current_path: Set[str] = set()
        
        def has_cycle(node: str) -> bool:
            """
            DFS helper function to detect cycles.
            Returns True if a cycle is found, False otherwise.
            """
            # If node is in current path, we found a cycle
            if node in current_path:
                return True
                
            # If node was already visited and no cycle was found, we're safe
            if node in visited:
                return False
                
            # Add node to current path and visited set
            current_path.add(node)
            visited.add(node)
            
            # Check all neighbors
            for neighbor in self.graph[node]:
                if has_cycle(neighbor):
                    return True
                    
            # Remove node from current path (backtrack)
            current_path.remove(node)
            return False
        
        # Check for cycles starting from each unvisited node
        for node in self.nodes:
            if node not in visited:
                if has_cycle(node):
                    return False  # Found a cycle, not a DAG
                    
        # Additional check: verify topological ordering
        node_order = {node: idx for idx, node in enumerate(visited)}
        # Verify all edges go forward in the ordering
        for source, target in self.edges:
            if node_order[source] >= node_order[target]:
                return False
                
        return True