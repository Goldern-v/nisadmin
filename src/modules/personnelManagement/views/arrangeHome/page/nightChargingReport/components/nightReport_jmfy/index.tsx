import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Row, Col } from "antd";
import config from './config'
import Table1modal from './cmps/table1modal'
import Table2modal from './cmps/table2modal'

interface Props {

}

export default observer((props: Props) => {
  const [modal1visible, setModal1visible] = useState(false)
  const [modal2visible, setModal2visible] = useState(false)

  useEffect(() => {
  })

  const handleEdit = (type: string) => {
    type === '1' ? setModal1visible(true) : setModal2visible(true)
  }

  const handleModalOk = () => {

  }

  const handleModalCancel = () => {

  }

  return (
    <Wrapper>
      <div className="title">江门市妇幼保健院夜班补助签领单</div>
      <div className="button-wrapper">
        <Button icon={"edit"} onClick={() => handleEdit('1')}>编辑</Button>
      </div>
      <Row style={{ textAlign: 'center' }}>
        <Col span={3}>科室：急诊护理单元</Col>
        <Col span={9}>一值P班</Col>
        <Col span={9}>一值N班</Col>
        <Col span={3}>2021年6月</Col>
      </Row>
      {config.table1()}
      {/* 第二个表格 */}
      <div className="table2wrapper">
        <div className="title">江门市妇幼保健院夜班补助签领单</div>
        <div className="button-wrapper">
          <Button icon={"edit"} onClick={() => handleEdit('2')}>编辑</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>科室：急诊护理单元</span>
          <span>突发回院2021年6月</span>
        </div>
        {config.table2()}
      </div>

      {/* 表格1弹窗 */}
      <Table1modal visible={modal1visible} onOk={handleModalOk} onCancel={() => setModal1visible(false)}/>
      {/* 表格2弹窗 */}
      <Table2modal visible={modal2visible} onOk={handleModalOk} onCancel={() => setModal2visible(false)}/>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  padding: 60px 50px 30px;
  line-height: 28px;

  .title{
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
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

.table2wrapper{
  margin-top:60px;
  padding: 0 240px;
}
`