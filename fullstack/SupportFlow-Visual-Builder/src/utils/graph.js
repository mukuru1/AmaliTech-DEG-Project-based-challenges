export function getOutgoingConnections(connections, nodeId) {
  return connections.filter((c) => c.sourceId === nodeId);
}

export function getIncomingConnections(connections, nodeId) {
  return connections.filter((c) => c.targetId === nodeId);
}

export function getChildren(nodes, connections, nodeId) {
  const outgoing = getOutgoingConnections(connections, nodeId);
  return outgoing
    .map((c) => nodes.find((n) => n.id === c.targetId))
    .filter(Boolean);
}