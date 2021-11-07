import React, { useLayoutEffect, useState, useEffect } from "react"
import { observer } from "mobx-react"
import {
  Modal,
  Button,
} from "antd"
import { ModalComponentProps } from "src/libs/createModal";
import { evalTypeGroup } from "../utils/evalType"
import styled from "styled-components"
import SelectPeople from "src/modules/continuingEdu/modal/SelectPeople/SelectPeople"

export interface Props extends ModalComponentProps {
  id?: any;
  // 教学质量管理的tab
  evalType: '1' | '2' | '3';
  people: any[];
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => any
}

export default observer(function SelectPeopleModal(props: Props) {

  let { visible, onCancel, onOkCallBack, evalType, people } = props;
  const [checkedUserList, setCheckedUserList]: any = useState([]);

  const onReset = () => {

  }
  const onSave = () => {
    console.log('test-')
  }
  // 初始化数据
  useEffect(() => {
    // setCheckedUserList(people)
  }, [])

  return (
    <Modal
      width={600}
      visible={visible}
      onCancel={onCancel}
      centered
      okText="确定"
      forceRender
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onReset}>重置</Button>
          <Button
            type="primary"
            onClick={() => onSave()}>
            确定
          </Button>
        </div>
      }>
      <Wrapper>
        <SelectPeople checkedUserList={checkedUserList} />
      </Wrapper>
    </Modal >
  )
})

const Wrapper = styled.div`
  .form__student {
    justify-content: space-between;
    .formField-container {
      display: flex;
      min-height: 32px;
      justify-content: flex-end;
      align-items: center;
    }
  }
`