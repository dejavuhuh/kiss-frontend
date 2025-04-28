import type { BuiltInEdge, BuiltInNode, DefaultEdgeOptions, Edge, EdgeProps, FitViewOptions, Node, NodeProps, OnConnect, OnEdgesChange, OnNodeDrag, OnNodesChange } from '@xyflow/react'
import type { MenuProps } from 'antd'
import { cn } from '@/utils'
import { BranchesOutlined, CaretRightOutlined, CheckCircleOutlined, CodeSandboxOutlined, DeploymentUnitOutlined, PauseCircleOutlined, PlusOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons'
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, BaseEdge, Controls, EdgeLabelRenderer, getStraightPath, Handle, Position, ReactFlow, useOnSelectionChange } from '@xyflow/react'
import { Button, Dropdown } from 'antd'
import { useCallback, useState } from 'react'
import '@xyflow/react/dist/style.css'

const initialNodes: CustomNodeType[] = [
  { id: crypto.randomUUID(), data: { label: '开始节点' }, position: { x: 0, y: 0 }, type: 'start' },
  { id: crypto.randomUUID(), data: { label: '结束节点' }, position: { x: 0, y: 130 }, type: 'end' },
]

const initialEdges: CustomEdgeType[] = [
  { id: crypto.randomUUID(), source: initialNodes[0].id, target: initialNodes[1].id, type: 'addNode' },
]

const fitViewOptions: FitViewOptions = {
  padding: 3,
}

type StartNodeType = Node<{ label: string }, 'start'>

function StartNode({ data, selected }: NodeProps<StartNodeType>) {
  return (
    <>
      <div className={cn(
        'cursor-pointer card w-[200px] nodrag py-3 text-sm font-semibold flex items-center gap-2 transition-colors',
        {
          'text-primary outline-1 outline-primary': selected,
        },
      )}
      >
        <DeploymentUnitOutlined className="text-base" />
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

type EndNodeType = Node<{ label: string }, 'end'>

function EndNode({ data, selected }: NodeProps<EndNodeType>) {
  return (
    <>
      <div className={cn(
        'cursor-pointer card w-[200px] nodrag py-3 text-sm font-semibold flex items-center gap-2 transition-colors',
        {
          'text-primary outline-1 outline-primary': selected,
        },
      )}
      >
        <CheckCircleOutlined className="text-base" />
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  )
}

type AddNodeEdgeType = Edge<{ label: string }, 'addNode'>

function AddNodeEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<AddNodeEdgeType>) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })
  const items: MenuProps['items'] = [
    {
      label: (
        <div className="flex w-full items-center">
          审批人
        </div>
      ),
      key: '0',
      icon: <UserOutlined className="text-[15px] text-[#f80]" />,
    },
    {
      label: (
        <div className="flex w-full items-center">
          触发器
        </div>
      ),
      key: '1',
      icon: <CodeSandboxOutlined className="text-[15px] text-[#935af6]" />,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="flex w-full items-center">
          条件分支
          <QuestionCircleOutlined className="ml-auto text-secondary" />
        </div>
      ),
      key: '2',
      icon: <BranchesOutlined className="text-[15px] text-[#2dbeab]" />,
    },
  ]
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Dropdown overlayStyle={{ width: 180 }} menu={{ items }} trigger={['click']} placement="bottomLeft">
          <Button
            shape="circle"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            icon={<PlusOutlined />}
          />
        </Dropdown>

      </EdgeLabelRenderer>
    </>
  )
}

type CustomNodeType = BuiltInNode | StartNodeType | EndNodeType
type CustomEdgeType = BuiltInEdge | AddNodeEdgeType

export function FlowDesigner() {
  const [nodes, setNodes] = useState<CustomNodeType[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange: OnNodesChange<CustomNodeType> = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes],
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges],
  )
  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges],
  )

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        start: StartNode,
        end: EndNode,
      }}
      edgeTypes={{
        addNode: AddNodeEdge,
      }}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <Background variant={BackgroundVariant.Dots} style={{ background: '#f9f9f9' }} />
      <Controls />
    </ReactFlow>
  )
}
