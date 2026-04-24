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