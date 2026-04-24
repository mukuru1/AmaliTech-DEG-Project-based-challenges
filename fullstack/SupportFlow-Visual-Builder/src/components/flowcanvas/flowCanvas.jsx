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