import api from '@/api'
import RoleMenuTree from '@/rbac/role/RoleMenuTree.tsx'
import { Modal } from 'antd'
import { useState } from 'react'

export default ({ id }: { id: number }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <a onClick={() => setModalVisible(true)}>Manage Menus</a>
      <Modal
        width={500}
        destroyOnClose
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <RoleMenuTree
          id={id}
          onOk={body => api.roleService.saveMenus({ id, body })}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </>
  )
}
