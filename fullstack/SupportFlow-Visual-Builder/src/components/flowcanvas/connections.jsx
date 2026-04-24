import { getOutputPortPosition, getInputPortPosition, getOptionPortPosition, getNodeHeight } from '../../utils/coordinates';

export default function Connections({ nodes, connections, connectingFrom, mousePos }) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="var(--color-connection)"
          />
        </marker>
        <marker
          id="arrowhead-active"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill="var(--color-connection-highlight)"
          />
        </marker>
      </defs>

      {connections.map((conn) => {
        const sourceNode = nodes.find((n) => n.id === conn.sourceId);
        const targetNode = nodes.find((n) => n.id === conn.targetId);
        if (!sourceNode || !targetNode) return null;

        const from =
          conn.sourcePort !== null && conn.sourcePort !== undefined
            ? getOptionPortPosition(
                sourceNode,
                conn.sourcePort,
                sourceNode.data.options?.length || 1
              )
            : getOutputPortPosition(sourceNode);

        const to = getInputPortPosition(targetNode);

        return (
          <g key={conn.id}>
            <ConnectionPath from={from} to={to} />
          </g>
        );
      })}