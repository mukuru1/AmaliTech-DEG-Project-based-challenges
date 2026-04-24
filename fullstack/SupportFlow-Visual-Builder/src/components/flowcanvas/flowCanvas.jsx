import { useRef, useState, useCallback, useEffect } from 'react';
import { useFlowContext } from '../../context/flowcontext';



export default function FlowCanvas() {
  const { nodes, connections, moveNode, addNode, selectNode, editNode } = useFlowContext();
  const canvasRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState(null);
  const [mousePos, setMousePos] = useState(null);

  const {
    connectingFrom,
    startConnecting,
    finishConnecting,
    cancelConnecting,
  } = useConnections();

  const { selectedNodeId, selectNode: handleSelect, clearSelection } =
    useNodeSelection();

  const handleCanvasPointerDown = useCallback(
    (e) => {
      if (e.target === canvasRef.current || e.target.classList.contains('canvas-grid')) {
        if (e.button === 1 || (e.button === 0 && e.altKey)) {
          setIsPanning(true);
          setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
          e.currentTarget.setPointerCapture(e.pointerId);
          return;
        }
        clearSelection();
        cancelConnecting();
      }
    },
    [pan, clearSelection, cancelConnecting]
  );