import { useFlowContext } from '../../context/flowcontext';
import useNodeSelection from '../../hooks/useNodeSelection';
import { getNodeConfig } from '../flowcanvas/nodeTypes';




export default function NodeEditor() {
  const { updateNode, deleteNode } = useFlowContext();
  const { editingNode } = useNodeSelection();

  if (!editingNode) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-400 text-sm p-6 text-center">
        Select a node and double-click to edit its properties
      </div>
    );
  }

  const config = getNodeConfig(editingNode.type);

  const handleChange = (field, value) => {
    updateNode(editingNode.id, { [field]: value });
  };