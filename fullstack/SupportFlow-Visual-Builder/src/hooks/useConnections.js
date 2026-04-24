import { useState, useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import { getOutgoingConnections, getIncomingConnections } from '../utils/graph';

export default function useConnections() {
  const { connections, addConnection, deleteConnection } = useFlowContext();
  const [connectingFrom, setConnectingFrom] = useState(null);

  const startConnecting = useCallback((nodeId, port) => {
    setConnectingFrom({ nodeId, port });
  }, []);