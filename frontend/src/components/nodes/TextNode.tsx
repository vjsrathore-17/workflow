import { createContext, useContext, useState } from 'react';
import ResizableTextArea from '../common/ResizableTextArea.tsx';
import React from 'react';
import NodeWrapper from '../HOCs/NodeWrapper.tsx';
import { TextSnippet } from '@mui/icons-material';

const textNodeData = {
  title: 'Text',
  handles: {
    leftHandles: [''],
    rightHandles: ['']
  },
  leftIcon: <TextSnippet />
}

const TextNode = ({handles, changeHandles, id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (value) => {
    setCurrText(value);
    // Regular expression to find values within {{}}
    const matches = value.match(/{{(.*?)}}/g);

    // Extract values without the curly braces
    const extracted = matches ? matches.map(match => match.slice(2, -2).trim()) : [];
    changeHandles((prevState) => ({
      leftHandles: extracted,
      rightHandles: prevState.rightHandles
    }));
  };

  return (
    <ResizableTextArea
      text={currText}
      handleTextChange={handleTextChange}
    />
  );
}

export default NodeWrapper(textNodeData)(TextNode);

