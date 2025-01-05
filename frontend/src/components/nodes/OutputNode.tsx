import React, { useState } from 'react';
import NodeWrapper from '../HOCs/NodeWrapper';
import { Output } from '@mui/icons-material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const outputNodeData = {
  title: 'Output',
  handles: {
    leftHandles: [''],
    rightHandles: [],
  },
  leftIcon: <Output />
}

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setOutputType(e.target.value);
  };
  return <>
    <div>
      <div className='text-input'>
        <TextField value={currName} fullWidth={true} label="Name" variant="outlined" onChange={handleNameChange} />
      </div>
      <Box sx={{ width: 100, marginTop: '10px'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={outputType}
            label="Type"
            onChange={handleTypeChange}
            sx={{height: '50px'}}
            MenuProps={{
              PaperProps: {
                style: {
                  zIndex: 1300, // Ensure the dropdown is above other elements
                },
              },
            }}
          >
            <MenuItem value={"Text"}>Text</MenuItem>
            <MenuItem value={"File"}>File</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  </>
}

export default NodeWrapper(outputNodeData)(OutputNode);