import { useCallback } from 'react';
import { useFlowContext } from '../context/flowcontext';
import { traverseFromStart, getChildren, getStartNode } from '../utils/graph';

export default function useTraversal() {
  const { nodes, connections } = useFlowContext();

  const getFlowOrder = useCallback(
    () => traverseFromStart(nodes, connections),
    [nodes, connections]
  );