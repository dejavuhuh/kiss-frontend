import type { InputOf } from '@/api'
import api from '@/api'
import { ModalForm } from '@/components'
import { useMenuTree } from '@/rbac/hooks'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { ProCard, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'
import { Button, Tree } from 'antd'
import { useState } from 'react'

type MenuInput = InputOf<typeof api.menuService.create>

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])
  const [selectedKey, setSelectedKey] = useState<number>()
  const { data: treeData, reload: reloadMenuTree } = useMenuTree()

  const reload = async () => {
    await reloadMenuTree()
    setCheckedKeys([])
    setSelectedKey(undefined)
  }

  return (
    <ProCard>
      <div className="space-y-4">
        <div className="space-x-4">
          <ModalForm<MenuInput>
            width={500}
            initialValues={{
              parentId: selectedKey,
            }}
            onSubmit={
              body => api.menuService
                .create({ body })
                .then(reload)
            }
            trigger={(
              <Button icon={<PlusOutlined />} color="default" variant="dashed">
                New Menu
              </Button>
            )}
          >
            <ProFormTreeSelect
              name="parentId"
              label="Parent"
              fieldProps={{
                treeDefaultExpandAll: true,
                treeData,
              }}
            />
            <ProFormText name="name" label="Name" rules={[{ required: true }]} />
            <ProFormText name="title" label="Title" rules={[{ required: true }]} />
          </ModalForm>
          {checkedKeys.length > 0 && (
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="filled"
              onClick={
                () => api.menuService
                  .deleteByIds({ ids: checkedKeys })
                  .then(reload)
              }
            >
              Delete
            </Button>
          )}
        </div>

        <Tree
          blockNode
          checkable
          draggable
          onDrop={({ dragNode, node, dropToGap, dropPosition }) => {
            if (dropToGap) {
              const dropPos = node.pos.split('-')
              const position = dropPosition - Number(dropPos[dropPos.length - 1])
              const order = position === -1 ? node.order : node.order + 1
              api.menuService.moveTo({
                body: {
                  sourceId: dragNode.key,
                  parentId: node.parentId,
                  order,
                },
              }).then(reload)
            }
            else {
              api.menuService.moveInto({
                body: {
                  sourceId: dragNode.key,
                  targetId: node.key,
                },
              }).then(reload)
            }
          }}
          autoExpandParent
          selectedKeys={selectedKey ? [selectedKey] : []}
          onSelect={selectedKeys => selectedKeys.length > 0 ? setSelectedKey(selectedKeys[0] as number) : setSelectedKey(undefined)}
          checkedKeys={checkedKeys}
          onCheck={keys => setCheckedKeys(keys as number[])}
          defaultExpandAll
          treeData={treeData}
        />
      </div>
    </ProCard>
  )
}
