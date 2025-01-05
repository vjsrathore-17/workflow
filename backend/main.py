from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from util import DAGRequest, DAGResponse, Graph

app = FastAPI()

origins = [
    "http://localhost:5173", # React application port
    "http://localhost:8000", # FastAPI default port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=DAGResponse)
def parse_pipeline(dag: DAGRequest):
    graph = Graph(dag.nodes,[tuple(dict(edge).values()) for edge in dag.edges])
    is_valid = graph.is_dag()
    return {'num_nodes': len(dag.nodes), 'num_edges': len(dag.edges), 'is_dag': is_valid}
