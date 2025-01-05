import React, { useState } from 'react';
import NodeWrapper from '../HOCs/NodeWrapper';
import { Input } from '@mui/icons-material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import '../../styles/input.scss';

const inputNodeData = {
  title: 'Input',
  handles: {
    leftHandles: [],
    rightHandles: ['']
  },
  leftIcon: <Input />
}

const InputNode = ({handles, changeHandles, id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState('1');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setInputType(e.target.value);
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
            value={inputType}
            label="Type"
            onChange={handleTypeChange}
            MenuProps={{
              PaperProps: {
                style: {
                  zIndex: 1300, // Ensure the dropdown is above other elements
                },
              },
            }}
            sx={{height: '50px'}}
          >
            <MenuItem value={1}>Text</MenuItem>
            <MenuItem value={2}>File</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  </>
}

export default NodeWrapper(inputNodeData)(InputNode);