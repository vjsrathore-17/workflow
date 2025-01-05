import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../_private/utils/consts';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function SubmitButton({nodes,edges}) {
  const [showAlert,setAlertState] = useState(false);
  const onProcessWorkflow = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/pipelines/parse`, {
        nodes: nodes.map(node => node.id),
        edges: edges.map(edge => ({
          source: edge.source,
          target: edge.target
        }))
      });
      setAlertState(true);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      throw error;
    }
  }
  const onReset = () => {

  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);
  };
  // const action = (
  //   <React.Fragment>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );
  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', color:'#fff', margin: '20px 0'}}>
        <button type="button" onClick={onReset}>Reset</button>
        <button type="submit" onClick={onProcessWorkflow} style={{marginLeft: '10px'}}>Submit</button>
        <Snackbar
          open={showAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          style={{
            right: '24px',
            bottom: 'calc(100% - 80px)',
            left: 'auto'
          }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
