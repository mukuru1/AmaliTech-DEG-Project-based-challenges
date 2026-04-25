import { useState, useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import CanvasWrapper from '../components/flowcanvas/canvasWrapper';
import EditPanel from '../components/Editor/editPanel';
import ChatWindow from '../components/Preview/chatWindow';




export default function BuilderPage() {
  const { nodes, connections, loadFlow } = useFlowContext();
  const [showPreview, setShowPreview] = useState(false);

  const handleAutoLayout = useCallback(() => {
    const laid = autoLayout(nodes, connections);
    loadFlow({ nodes: laid, connections });
  }, [nodes, connections, loadFlow]);