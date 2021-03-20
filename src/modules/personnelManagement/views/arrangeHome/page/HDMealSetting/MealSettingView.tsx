import styled from 'styled-components'
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Button, Select, Modal, message } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import TypeEditModal from './modal/TypeEditModal'
import { mealSettingViewModel } from './MealSettingViewModel'
import { mealSettingService } from "./services/MealSettingService";

export interface Props extends RouteComponentProps { }

export default observer(function MealSettingView() {
  const [editParams, setEditParams] = useState({} as any); //修改弹窗回显数据
  const [editVisible, setEditVisible] = useState(false); // 控制弹窗状态

  const columns: any = [
    {
      title: '序号',
      dataIndex: 'index',
      align: "center",
      width: 40,
      render: (text: string, record: any, index: any) =>
        record.id ? <span style={{ width: '60px' }}>{index + 1}</span> : ''
    },
    {
      title: '班次套餐名',
      dataIndex: 'name',
      align: "center",
      width: 100
    },
    {
      title: '第一天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[0] ? text[0].name : ''
    },
    {
      title: '第二天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[1] ? text[1].name : ''
    },
    {
      title: '第三天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[2] ? text[2].name : ''
    },
    {
      title: '第四天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[3] ? text[3].name : ''
    },
    {
      title: '第五天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[4] ? text[4].name : ''
    },
    {
      title: '第六天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[5] ? text[5].name : ''
    },
    {
      title: '第七天',
      dataIndex: 'schMealDetailHds',
      align: "center",
      width: 70,
      render: (text: any) => text[6] ? text[6].name : ''
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: 60,
      render: (text: string, record: any) => (
        <DoCon>
          <span onClick={() => handleEdit(record)}>编辑</span>
          <span onClick={() => handleDelete(text)}>删除</span>
        </DoCon>
      )
    }
  ]

  // 初始化数据
  useEffect(() => {
    mealSettingViewModel.init()
  }, [])

  // 编辑
  const handleEdit = (record: any) => {
    setEditParams(record)
    setEditVisible(true);
  }

  // 删除
  const handleDelete = (id: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的班次套餐吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        mealSettingService.delete(id)
          .then(res => {
            if (res.code == 200) {
              message.success("删除成功");
              mealSettingViewModel.onload();
            } else {
              message.error("删除失败");
            }
          })
          .catch(e => { });
      }
    });
  }

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    mealSettingViewModel.onload();
    handleEditCancel();
  };

  return (
    <Wrapper>
      <ToolBarCon>
        <BreadcrumbBox
          data={[
            {
              name: '排班管理',
              link: '/personnelManagement/arrangeHome'
            },
            {
              name: '班次套餐设置'
            }
          ]}
        />
        <Content>
          <Title>班次套餐设置</Title>
          <div style={{ flex: 1 }} />
          <Select
            style={{ width: 200, marginRight: '10px' }}
            value={mealSettingViewModel.deptCode}
            onChange={(val: string) => {
              mealSettingViewModel.deptCode = val;
              mealSettingViewModel.onload();
              mealSettingViewModel.getTreeData();
            }}
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {mealSettingViewModel.deptCodeList.length && mealSettingViewModel.deptCodeList.map((item: any) => (
              <Select.Option value={item.code} key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
          <Button
            onClick={() => setEditVisible(true)}
            style={{ marginLeft: 3, marginRight: 3 }}
          >
            添加班次套餐
          </Button>
          <Button onClick={() => { }}
            style={{ marginLeft: 3, marginRight: 3 }}>
            刷新
          </Button>
          <Button
            style={{ marginLeft: 3, marginRight: 3 }}
            onClick={() => { }}
            className='button-tools'
          >
            返回
          </Button>
        </Content>
      </ToolBarCon>
      <MainBoxCon>
        <BaseTable
          loading={mealSettingViewModel.tableLoading}
          dataSource={mealSettingViewModel.tableList}
          columns={columns}
          surplusHeight={260}
          surplusWidth={300}
        />
      </MainBoxCon>
      <TypeEditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
`

const MainBoxCon = styled.div`
  background: #fff;
  padding-bottom: 50px;
  margin-bottom: -50px;
  overflow: hidden;
`
const Content = styled.div`
  padding: 0 20px 20px 20px;
  display: inline-flex;
  width: 100%;
  align-items: flex-end;
`
const ToolBarCon = styled.div`
  height: 70px;
  width: 100%;
  background: #fff;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`
