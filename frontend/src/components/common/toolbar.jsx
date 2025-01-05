import React from 'react';
import DraggableNode from './DraggableNode';
import { Input, Assistant, TextSnippet, Output } from '@mui/icons-material';
import '../../styles/toolbar.scss';

function PipelineToolbar() {
    return (
        <div className='toolbar'>
            <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' icon={<Input />} />
                <DraggableNode type='llm' label='LLM' icon={<Assistant />} />
                <DraggableNode type='customOutput' label='Output' icon={<Output />} />
                <DraggableNode type='text' label='Text' icon={<TextSnippet />} />
            </div>
        </div>
    );
};

export default PipelineToolbar;
