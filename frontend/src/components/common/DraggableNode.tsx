import React from "react";

interface DraggableNodeProps {
  type: string;
  label: string;
  icon: React.ReactNode;
}

interface AppData {
  nodeType: string;
}

function DraggableNode({ type, label, icon }: DraggableNodeProps){
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData: AppData = { nodeType };
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => ((event.target as HTMLElement).style.cursor = 'grab')}
      style={{ 
        cursor: 'grab', 
        minWidth: '80px', 
        height: '80px',
        display: 'flex', 
        alignItems: 'center', 
        borderRadius: '8px',
        backgroundColor: '#fff',
        justifyContent: 'center', 
        flexDirection: 'column'
      }} 
      draggable
    >
      {icon}
      <span style={{ backgroundColor: "#fff", color: '#1C2536' }}>{label}</span>
    </div>
  );
};
export default DraggableNode;