import { Modal } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Obj } from 'src/libs/types'
import BaseTable from 'src/components/BaseTable'

interface IProps {
  onCancel: any,
  onOk: any,
  data: any,
  visible:boolean
}

export default observer(function AddModal(props: IProps) {
  const { visible, onOk, onCancel,data } = props

  const [tableData, setTableData] = useState<Obj[]>([])
  const columns = [
    {
      dataIndex: 'tableName',
      title: '目录',
      width: 150,
    },
  ]

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    tableData.splice(dragIndex, 1, ...tableData.splice(hoverIndex, 1, tableData[dragIndex]));
    tableData.forEach((item:any,index:number)=>item.sort = index+1)
    setTableData([...tableData])
  };
  
  useEffect(() => {
    if(visible){
      setTableData([...data])
    }
  }, [visible])

  return (
    <Modal
      title="目录编辑"
      width={800}
      visible={visible}
      onOk={()=>onOk(tableData)}
      onCancel={onCancel}
    >
      <Wrapper>
        <div className='form-con'>
          <BaseTable
            dataSource={tableData}
            columns={columns}
            moveRow={moveRow}
            type={['index','diagRow']}
          />
        </div>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
.form-con {
  display: flex;
  height: 500px;
  .ant-tree-node-content-wrapper {
    height: auto;
  }
}
`
