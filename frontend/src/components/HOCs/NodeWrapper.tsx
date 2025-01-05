import React, { ComponentType, ReactNode, useEffect, useState, useContext } from "react";
import { InfoOutlined, CancelOutlined } from '@mui/icons-material';
import '../../styles/node.scss';
import { Handle, Position } from 'reactflow';
import IconButton from "@mui/material/IconButton";
import { NodesContext } from "../Home";

interface NodeData {
    title: string;
    leftIcon: ReactNode;
    handles: {
        leftHandles: Array<string>;
        rightHandles: Array<string>;
    }
}

const NodeWrapper = (nodeData: NodeData) => (Node: ComponentType<any>) => {
    return (props) => {
      const { nodes, edges, onNodesChange, onEdgesChange } = useContext(NodesContext);
      const [handles, setHandles] = useState(nodeData.handles);
      const removeNode = () => {
        const nodeIndex = nodes.findIndex(node => node.id == props.id);
        const extraEdges = edges.filter((edge) => edge.source == nodes[nodeIndex].id || edge.target == nodes[nodeIndex].id);
        extraEdges.forEach((edge) => {
            const edgeIndex = edges.findIndex(e => e.id == edge.id)
            edges.splice(edgeIndex, 1)
        })
        onEdgesChange(edges);
        nodes.splice(nodeIndex,1);
        onNodesChange(nodes);
      }
      return <>
        <div className="node">
            {handles.leftHandles.map((handle,index) =>
                <Handle
                    type="target"
                    position={Position.Left}
                    key={`${props.data.nodeType}-${index}-left`}
                    id={`${props.id}-${index}-value`}
                    style={{top: `${(index+1)*100/(handles.leftHandles.length+1)}%`}}
                >
                    <div style={{marginLeft: '-60px'}}>
                        {handle}
                    </div>
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
                <Node handles={handles} changeHandles={(handles) => setHandles(handles)} {...props} />
            </div>
            {handles.rightHandles.map((handle,index) =>
                <Handle
                    type="source"
                    position={Position.Right}
                    key={`${props.data.nodeType}-${index}-right`}
                    id={`${props.id}-${index}-value`}
                    style={{top: `${(index+1)*100/(handles.rightHandles.length+1)}%`}}
                >
                    {handle}
                </Handle>
            )}
        </div>
      </>
    };
};

export default NodeWrapper;