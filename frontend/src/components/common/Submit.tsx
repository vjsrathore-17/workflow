import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SERVER_URL, AlertTypes } from '../../_private/utils/consts';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SubmitButton({nodes, edges }) {
  const [showAlert,setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState<any>();
  const [severity, setAlertSeverity] = useState<AlertTypes>("success");

  const onProcessWorkflow = async () => {
    try {
      const response: AxiosResponse = await axios.post(`${SERVER_URL}/pipelines/parse`, {
        nodes: nodes.map((node: any) => node.id),
        edges: edges.map((edge: any) => ({
          source: edge.source,
          target: edge.target
        }))
      });
      setAlertMessage(<div style={{textAlign: "left"}}>
        Workflow processed successfully!<br />
        It has {response.data.num_nodes as number} node(s) and {response.data.num_edges as number} edge(s).<br />
        The nodes and edges in the pipeline {response.data.is_dag ? "": "do not"} form a directed acyclic graph (DAG).
      </div>);
      setAlertSeverity("success");
      setAlertState(true);
    } catch (error) {
      setAlertMessage(<div style={{textAlign: "left"}}>
        {error.response?.data || error.message}
      </div>);
      setAlertSeverity("error");
      setAlertState(true);
    }
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);
    setAlertMessage("");
  };
  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', color:'#fff', margin: '20px 0'}}>
        <button type="submit" onClick={onProcessWorkflow} style={{marginLeft: '10px'}}>Submit</button>
        <Snackbar
          open={showAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          style={{
            right: '24px',
            bottom: '87%',
            left: 'auto'
          }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
