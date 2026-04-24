import { createContext, useContext, useReducer, useCallback } from 'react';
import { nanoid } from 'nanoid';
import flowData from '../flow_data.json';

const FlowContext = createContext(null);

function convertFlowData(raw) {
  const nodes = raw.nodes.map((n) => ({
    id: n.id,
    type: n.type,
    position: n.position,
    data: {
      label: n.type === 'start' ? 'Start' : n.type === 'end' ? 'End' : n.text?.slice(0, 30) || n.type,
      text: n.text || '',
      options: n.options?.map((opt, i) => ({
        id: nanoid(6),
        label: opt.label,
        nextId: opt.nextId,
      })) || [],
    },
  }));

   const connections = [];
  raw.nodes.forEach((n) => {
    if (n.options) {
      n.options.forEach((opt, i) => {
        if (opt.nextId) {
          connections.push({
            id: nanoid(8),
            sourceId: n.id,
            targetId: opt.nextId,
            sourcePort: i,
          });
        }
      });
    }
  });

  return { nodes, connections };
}
const convertedData = convertFlowData(flowData);

const initialState = {
  nodes: convertedData.nodes,
  connections: convertedData.connections,
  selectedNodeId: null,
  editingNodeId: null,
  previewState: null,
};

}