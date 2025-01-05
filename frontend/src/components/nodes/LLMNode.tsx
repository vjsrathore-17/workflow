import React from 'react';
import NodeWrapper from '../HOCs/NodeWrapper';
import { Assistant } from '@mui/icons-material';

const llmNodeData = {
  title: 'OpenAI',
  handles: {
    leftHandles: ['',''],
    rightHandles: [''],
  },
  leftIcon: <Assistant />
}

const LLMNode = ({handles, changeHandles,  id, data }) => {
  return <>
    <div>
        <span>LLM</span>
    </div>
    <div>
        <span>This is a LLM.</span>
    </div>
  </>
}

export default NodeWrapper(llmNodeData)(LLMNode);