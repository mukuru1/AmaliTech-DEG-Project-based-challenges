import { useFlowContext } from '../../context/flowcontext';
import useNodeSelection from '../../hooks/useNodeSelection';
import NodeEditor from './nodeEditor';



export default function EditPanel() {
  const { nodes, connections, editingNodeId } = useFlowContext();
  const { selectedNode, editingNode, clearSelection } = useNodeSelection();

  const errors = validateFlow(nodes, connections);

  return (
    <div className="w-72 bg-white border-l border-neutral-200 flex flex-col overflow-hidden">
   
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-800">
          {editingNode ? 'Edit Node' : 'Properties'}
        </h2>
        {editingNode && (
          <button
            onClick={clearSelection}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>