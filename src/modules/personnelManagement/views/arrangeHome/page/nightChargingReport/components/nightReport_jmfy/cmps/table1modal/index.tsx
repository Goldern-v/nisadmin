import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Modal } from "antd";

interface Props {
  modalId?: string
  visible: boolean
  onOk: Function
  onCancel: Function
}

export default observer((props: Props) => {
  const { modalId, visible, onOk, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData]: any[] = useState([])

  useEffect(() => {
  })

  const handleAdd = () => {
    setTableData([...tableData, {}])
  }

  const handleCreate = () => {
  }

  return (
    <Modal
      centered
      width={1200}
      visible={visible}
      confirmLoading={loading}
      onOk={handleCreate}
      onCancel={() => onCancel()}
      title={'编辑'}
    >
      <Wrapper>
        <div className="button-wrapper">
          <Button icon={"edit"} onClick={() => handleAdd()}>添加</Button>
        </div>
        <table>
          <colgroup>
            <col width="50"/>
            <col width="70"/>
            <col width="300"/>
            <col width="50"/>
            <col width="50"/>
            <col width="50"/>
            <col width="300"/>
            <col width="70"/>
            <col width="70"/>
            <col width="70"/>
            <col width="90"/>
          </colgroup>
          <tbody>
          <tr>
            <td>序号</td>
            <td>姓名</td>
            <td>起止</td>
            <td>天数</td>
            <td>标准</td>
            <td>金额</td>
            <td>起止</td>
            <td>天数</td>
            <td>标准</td>
            <td>金额</td>
            <td>总金额</td>
          </tr>
          {tableData.map((item: any, index: number) =>
            <tr key={index}>
              <td>{index}</td>
            </tr>
          )}
          </tbody>
        </table>
      </Wrapper>
    </Modal>

  )
})

const Wrapper = styled.div`
  padding: 0px 20px;
  line-height: 28px;
  min-height: 500px;
  
  .button-wrapper{
    display: flex;
    justify-content: flex-end;

    button {
      border: 0
    }
  }
  
  table{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    tr{
      td{
        border: 1px solid #000;
      }
    }
  }
`