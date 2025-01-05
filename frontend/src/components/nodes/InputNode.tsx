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
  leftHandles: [],
  rightHandles: [''],
  leftIcon: <Input />
}

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState('Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: SelectChangeEvent) => {
    setInputType(e.target.value as string);
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
            sx={{height: '50px'}}
          >
            <MenuItem value={"Text"}>Text</MenuItem>
            <MenuItem value={"File"}>File</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  </>
}

export default NodeWrapper(inputNodeData)(InputNode);