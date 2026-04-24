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

}