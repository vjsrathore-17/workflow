import React, { ComponentType, ReactNode, useEffect, useState } from "react";
import { InfoOutlined, CancelOutlined } from '@mui/icons-material';
import '../../styles/node.scss';
import { Handle, Position } from 'reactflow';
import IconButton from "@mui/material/IconButton";

interface NodeData {
    title: string;
    leftIcon: ReactNode;
    leftHandles: Array<string>;
    rightHandles: Array<string>;
}

const NodeWrapper = (nodeData: NodeData) => (Node: ComponentType<any>) => {
    return (props) => {
      const removeNode = () => {
        
      }
      return <>
        <div className="node">
            {nodeData.leftHandles.map((handle,index) =>
                <Handle
                    type="target"
                    position={Position.Left}
                    key={`${props.data.nodeType}-${index}-left`}
                    id={`${props.id}-${index}-value`}
                    style={{top: `${(index+1)*100/(nodeData.leftHandles.length+1)}%`}}
                >
                    {handle}
                </Handle>
            )}
            <div className="node-header">
                <div className="left">
                    {nodeData.leftIcon}
                    {nodeData.title}
                </div>
                <div className="right">
                    <IconButton aria-label="info">
                        <InfoOutlined />
                    </IconButton>
                    <IconButton aria-label="cancel" onClick={removeNode}>
                        <CancelOutlined />
                    </IconButton>
                </div>
            </div>
            <div className="node-body">
                <Node {...props} />
            </div>
            {nodeData.rightHandles.map((handle,index) =>
                <Handle
                    type="source"
                    position={Position.Right}
                    key={`${props.data.nodeType}-${index}-right`}
                    id={`${props.id}-${index}-value`}
                    style={{top: `${(index+1)*100/(nodeData.rightHandles.length+1)}%`}}
                >
                    {handle}
                </Handle>
            )}
        </div>
      </>
    };
};

export default NodeWrapper;