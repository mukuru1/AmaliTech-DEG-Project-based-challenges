import { clsx } from 'clsx';
import { getNodeConfig } from './nodeTypes';



export default function FlowNode({
  node,
  selected,
  onPointerDown,
  onDoubleClick,
  onPortPointerDown,
  onPortPointerUp,
  connectingFrom,
}) {
  const config = getNodeConfig(node.type);
  const height = getNodeHeight(node);

return (
    <div
      className={clsx(
        'absolute rounded-xl border-2 cursor-grab active:cursor-grabbing select-none',
        'transition-shadow duration-150',
        selected && 'ring-2 ring-primary-500/30 shadow-lg',
        !selected && 'shadow-sm hover:shadow-md'
      )}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: NODE_WIDTH,
        height,
        backgroundColor: config.bgColor,
        borderColor: selected ? 'var(--primary-500)' : config.borderColor,
        zIndex: selected ? 15 : 10,
      }}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    >

        <div
        className="flex items-center gap-2 px-3 rounded-t-xl"
        style={{
          height: 36,
          color: config.color,
          borderBottom: `1px solid ${config.borderColor}`,
        }}
      >
        <span className="flex-shrink-0">{config.icon}</span>
        <span className="text-xs font-semibold truncate">
          {node.data.label || config.label}
        </span>
      </div>