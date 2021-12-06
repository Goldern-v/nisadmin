import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { initBodyModal } from "./function/render"
import Common from "./formType/Common"
import masterInfo from "./config/testCode"
export interface Props {

}
export default function NurseHandBookFormPage(props: Props) {
  const [bodyModal, setBodyModal]: any = useState([])
  const [visible, setVisible]: any = useState(false)

  // 取代失焦事件,用来关闭弹窗
  const closeSelect = (e: any) => {
    let targetClass = [...e.target.classList]
    if (!targetClass.includes("common")) {
      setVisible(false)
    }
  }

  let tHead = ["第1列", "第2列", "第3列", "第4列", "第5列", "第6列", "第3列", "第4列", "第5列", "第6列"];
 
  useEffect(() => {
    initBodyModal( masterInfo, setBodyModal )
  }, [])
  return (
    <Wrapper onClickCapture={closeSelect}>
      <div className="page">
        <div className="space-div"></div>
        <div className="bottom-list">
          <div className="table-head">新生儿监护单</div>
          <div style={{ background: '#f9f9f9', display: 'flex', justifyContent: 'center', }}>
            {tHead.map((item: any, idx: any) =>
              <div className="t-b-1" key={idx}>{item}</div>)}
          </div>
            <Common bodyModal={bodyModal} setBodyModal={setBodyModal} visible={visible} setVisible={setVisible} masterInfo={masterInfo}></Common>
        </div>
        <div className="space-div"></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .page {
    margin: 20px auto;
    padding: 50px;
    padding-top: 0px;
    display: flex;
    background-color: #fff;
    width: fit-content;
  }
  .space-div{
  }
  .bottom-list{
    .table-head {
      font-size: 21px;
      padding: 20px 0;
      text-align: center;
      font-weight: 700;
      font-family: 'simsun', 'Times New Roman', 'Georgia', 'Serif'!important;
    }
  }
  .bottom-list .t-b-1{
    border: 1px solid #000;
    min-height: 30px;
    width: 100px;
    font-size: 16px;
    text-align: center;
    margin-right:-1px; 
    margin-bottom:-1px;
  }
  
`