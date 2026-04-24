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

   const handleCanvasPointerMove = useCallback(
    (e) => {
      if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
        return;
      }

      if (dragState) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = snapToGrid(e.clientX - rect.left - pan.x - dragState.offsetX);
        const y = snapToGrid(e.clientY - rect.top - pan.y - dragState.offsetY);
        moveNode(dragState.nodeId, { x: Math.max(0, x), y: Math.max(0, y) });
        return;
      }

      if (connectingFrom) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left - pan.x,
          y: e.clientY - rect.top - pan.y,
        });
      }
    },
    [isPanning, panStart, dragState, connectingFrom, pan, moveNode]
  );

  const handleCanvasPointerUp = useCallback(
    (e) => {
      if (isPanning) {
        setIsPanning(false);
        return;
      }
      if (dragState) {
        setDragState(null);
        return;
      }
    },
    [isPanning, dragState]
  );

   const handleNodePointerDown = useCallback(
    (nodeId, e) => {
      e.stopPropagation();
      handleSelect(nodeId);

      const rect = canvasRef.current.getBoundingClientRect();
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      setDragState({
        nodeId,
        offsetX: e.clientX - rect.left - pan.x - node.position.x,
        offsetY: e.clientY - rect.top - pan.y - node.position.y,
      });

      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [nodes, pan, handleSelect]
  );