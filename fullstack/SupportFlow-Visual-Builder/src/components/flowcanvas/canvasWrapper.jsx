import { useFlowContext } from '../../context/flowcontext';



export default function CanvasWrapper() {
  const { addNode } = useFlowContext();

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('nodeType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };