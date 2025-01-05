import { createContext, useContext, useState } from 'react';
import ResizableTextArea from '../common/ResizableTextArea.tsx';
import React from 'react';
import NodeWrapper from '../HOCs/NodeWrapper.tsx';
import { TextSnippet } from '@mui/icons-material';

let textNodeData = {
  title: 'Text',
  leftHandles: [''],
  rightHandles: [''],
  leftIcon: <TextSnippet />
}

const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [leftHandles, setLeftHandles] = useState(['']);

  const handleTextChange = (value) => {
    setCurrText(value);
    // Regular expression to find values within {{}}
    const matches = value.match(/{{(.*?)}}/g);

    // Extract values without the curly braces
    const extracted = matches ? matches.map(match => match.slice(2, -2).trim()) : [];
    setLeftHandles(extracted);
  };

  return (
    <label>
        <ResizableTextArea 
            text={currText}
            handleTextChange={handleTextChange}
        />
    </label>
  );
}

export default NodeWrapper(textNodeData)(TextNode);

