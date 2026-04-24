export const NODE_WIDTH = 220;
export const NODE_HEADER_HEIGHT = 36;
export const PORT_SIZE = 12;
export const PORT_OFFSET = 6;

export function getNodeCenter(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + NODE_HEADER_HEIGHT / 2,
  };
}

export function getOutputPortPosition(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y + getNodeHeight(node),
  };
}

export function getInputPortPosition(node) {
  return {
    x: node.position.x + NODE_WIDTH / 2,
    y: node.position.y,
  };
}

export function getOptionPortPosition(node, optionIndex, totalOptions) {
  const spacing = NODE_WIDTH / (totalOptions + 1);
  return {
    x: node.position.x + spacing * (optionIndex + 1),
    y: node.position.y + getNodeHeight(node),
  };
}