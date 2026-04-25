import { useFlowContext } from '../../context/flowcontext';
import useNodeSelection from '../../hooks/useNodeSelection';
import NodeEditor from './nodeEditor';



export default function EditPanel() {
  const { nodes, connections, editingNodeId } = useFlowContext();
  const { selectedNode, editingNode, clearSelection } = useNodeSelection();

  const errors = validateFlow(nodes, connections);

  return()