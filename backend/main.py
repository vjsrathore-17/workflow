from fastapi import FastAPI, Form # type: ignore

app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'num_nodes': 1, 'num_edges': 1, 'is_dag': True}
