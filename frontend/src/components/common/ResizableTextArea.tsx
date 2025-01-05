import TextField from '@mui/material/TextField';
import React, { useState, useRef, useEffect } from 'react';

const ResizableTextArea = ({text, handleTextChange}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust based on scrollHeight
    }
  }, [text]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handleTextChange(event.target.value);
  };

  return (
    <textarea
      ref={textAreaRef}
      value={text}
      onChange={handleChange}
      style={{
        width: '100%',
        minHeight: '30px',
        resize: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ResizableTextArea;
