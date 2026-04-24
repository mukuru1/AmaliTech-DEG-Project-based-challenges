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