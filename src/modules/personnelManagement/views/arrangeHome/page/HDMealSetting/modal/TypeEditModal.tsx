import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Input, Row, Col, Modal, message as Message, Cascader, Button, Switch } from "antd";
import { numToChinese } from 'src/utils/number/numToChinese'
import { mealSettingViewModel } from '../MealSettingViewModel'
import { mealSettingService } from "../services/MealSettingService";
export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function TypeEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const { name, status, loop, schMealDetailHds, id } = params;
  const [schMealDetailHdsAll, setSchMealDetailHdsAll] = useState([] as any)// 班次套餐数据
  const [query, setQuery] = useState({
    name: '',
    status: 1,
    loop: 1
  }) // 名称、状态(1启用 0禁止 默认启用)、循环（1循环 0不循环 暂时不用，默认循环班次）
  const [editLoading, setEditLoading] = useState(false); // 弹窗loading
  const [btnHidden, setBtnHidden] = useState(false); // 新增按钮禁止点击开关（true禁止  false可新增）

  // 弹窗数据初始化
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (id) {
          // 修改时数据回显
          setQuery({
            name,
            status,
            loop
          })
          setSchMealDetailHdsAll(schMealDetailHds)
        } else {
          // 添加时默认有第一天
          setSchMealDetailHdsAll([{
            shiftType: '',
            name: '',
            deptCode: ''
          }])
        }
      }, 100);
    }
  }, [visible]);

  // 添加天数函数
  const addDays = () => {
    if (schMealDetailHdsAll.length > 6) {
      setBtnHidden(true);
      Message.warning('天数至多可添加7天！');
      return;
    }
    setSchMealDetailHdsAll([...schMealDetailHdsAll, {
      shiftType: '',
      name: '',
      deptCode: ''
    }])
  }

  // 保存
  const checkForm = () => {
    let msg = "班次套餐添加成功";
    let obj: any = {
      ...query,
      deptCode: mealSettingViewModel.deptCode,
      schMealDetailHds: schMealDetailHdsAll
    };
    if (id) {
      obj.id = id;
      msg = "班次套餐修改成功";
    }
    setEditLoading(true)
    mealSettingService.saveOrUpdate(obj).then((res: any) => {
      setEditLoading(false);
      Message.success(msg);
      onOk();
      clearInit()
    }).catch(e => {
    });
  };

  // 选择展示的最终数据
  const displayRender = (label: any) => {
    return label[label.length - 1];
  }

  // 清空数据
  const clearInit = () => {
    setSchMealDetailHdsAll([] as any);
    setQuery({ name: '', status: 1, loop: 1 });
    setBtnHidden(false)
  }

  // 取消弹窗
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
    clearInit()
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={id ? "修改套餐设置" : "添加套餐设置"}
    >
      <Wrapper>
        <Row>
          <Col span={5} className='label'>
            套餐名称：
          </Col>
          <Col span={18}>
            <Input
              style={{ width: 280, marginBottom: '20px' }}
              placeholder="请输入套餐名称"
              value={query.name}
              onChange={e => setQuery({ ...query, name: e.target.value })}
            />
          </Col>
        </Row>
        {schMealDetailHdsAll && schMealDetailHdsAll.length && schMealDetailHdsAll.map((item: any, index: any) =>
          <Row>
            <Col span={5} className='label'>
              {`第${numToChinese(index + 1)}天：`}
            </Col>
            <Col span={18}>
              <Cascader
                placeholder='请选择班次'
                style={{ width: 280, marginBottom: '20px' }}
                value={[item.shiftType, item.name]}
                options={mealSettingViewModel.treeData}
                displayRender={displayRender}
                onChange={(val: any) => {
                  item.shiftType = val[0];
                  item.name = val[1];
                  item.deptCode = mealSettingViewModel.deptCode
                  setSchMealDetailHdsAll([...schMealDetailHdsAll])
                }}
              />
            </Col>
          </Row>
        )}
        <Button
          type='primary'
          style={{ marginLeft: '275px' }}
          disabled={btnHidden}
          onClick={() => addDays()}
        >
          新增天数
        </Button>
        <Row>
          <Col span={5} className='label'>
            启用：
          </Col>
          <Col span={18}>
            <Switch
              onChange={(check: any) => {
                let status: any = check ? 1 : 0
                setQuery({ ...query, status })
              }}
              checked={!!query.status}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
})
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
`;
