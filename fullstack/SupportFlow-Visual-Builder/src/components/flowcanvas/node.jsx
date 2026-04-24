import { clsx } from 'clsx';
import { getNodeConfig } from './nodeTypes';



export default function FlowNode({
  node,
  selected,
  onPointerDown,
  onDoubleClick,
  onPortPointerDown,
  onPortPointerUp,
  connectingFrom,
}) {
  const config = getNodeConfig(node.type);
  const height = getNodeHeight(node);