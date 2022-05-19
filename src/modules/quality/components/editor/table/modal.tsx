import { Button, Modal } from "antd";
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseTable, { DoCon } from 'src/components/BaseTable'

export interface Props {
  visible: boolean;
  title?: string | undefined;
  value: any[];
  getColumns: (flag: boolean, setVal?: Function) => any[]
  onOk: Function;
  onClose: Function;
}
export default observer(function TableModal(props: Props) {
  const { title, onOk, onClose} = props;
  const [val, setVal] = useState<any[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await onOk(val);
      onClose();
    } catch (e) {
    } finally {
      setConfirmLoading(false);
    }
  };
  const [blankItem, setBlankItem] = useState<Record<string, any>>({})
  const addItem = () => {
    
    setVal([...val, {...blankItem}])
  }
  const recursionList = (list: any[], obj: Record<string, any>) => {
    list.map((v: any) => {
      if (v.key) {
        obj[v.key] = ''
      }
      if(v.children) {
        recursionList(v.children, obj)
      }
    })
  }
  useEffect(() => {
    const item: Record<string, any> = {}
    recursionList(props.getColumns(false), item)
    setBlankItem(item)
  }, [])

  useEffect(() => {
    if (props.visible) {
      setVal(props.value);
    }
  }, [props.value, props.visible])

  return (
    <Modal
      title={title}
      visible={props.visible}
      confirmLoading={confirmLoading}
      okText="保存"
      onOk={() => handleOk()}
      onCancel={() => onClose()}
      width={700}
    >
      <Wrapper>
        <Button className="add" icon='plus' size='small' onClick={addItem}>
          添加
        </Button>
        <BaseTable dataSource={val} columns={props.getColumns(true, setVal)} pagination={false}/>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  position: relative;
  #baseTable {
    padding: 20px 0px 0px;
  }
  .add {
    position: absolute;
    right: 0;
    top: -13px;
  }
  .ant-input,
  .ant-select-selection {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    background: transparent;
    padding: 0 5px;
    border-radius: 0;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  td {
    padding: 0 !important;
  }
`