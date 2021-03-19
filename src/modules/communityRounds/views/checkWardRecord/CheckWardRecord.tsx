import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { PageTitle } from 'src/components/common'
import { Button, Select, DatePicker, message, Modal } from 'antd'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import { checkWardRecordModal } from './CheckWardRecordModal'
import { checkWardService } from "../../services/CheckWardService";
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import EditModal from '../../modal/EditModal'
export interface Props { }

export default observer(function CheckWardRecord() {
  const [editParams, setEditParams] = useState({} as any);
  const [editVisible, setEditVisible] = useState(false);

  // 获取查房初始化数据
  useEffect(() => {
    checkWardRecordModal.init();
  }, [])

  // 判断编辑权限
  const canHandleEdit = (record: any) => {
    let loginName: any = authStore.user && authStore.user.empName;
    if (loginName == record.creatorName && record.status == '0') {
      return (
        <span>
          <span onClick={() => toSaveOrUpdate(record)} style={{ marginRight: '18px' }}>编辑</span>
          <span onClick={() => handleDelete(record.id)}>删除</span>
        </span>
      );
    } else {
      return (
        <span>
          <span style={{ color: " #ccc", marginRight: '18px' }}>编辑</span>
          <span style={{ color: " #ccc" }}>删除</span>
        </span>
      );
    }
  }

  const columns: any = [
    {
      title: "时间",
      dataIndex: "srDate",
      width: 120,
      align: "center"
    },
    {
      title: "人员",
      dataIndex: "empName",
      width: 80,
      align: "center"
    },
    {
      title: "社区",
      dataIndex: "community",
      width: 100,
      align: "center"
    },
    {
      title: "检查重点",
      dataIndex: "keyPoints",
      width: 200,
      align: "center"
    },
    {
      title: "本周质控检查记录",
      children: [
        {
          title: "存在问题",
          dataIndex: "existProblems",
          width: 100,
          align: "center"
        },
        {
          title: "持续改进",
          dataIndex: "improvement",
          width: 100,
          align: "center"
        },
        {
          title: "其他",
          dataIndex: "recordExpand",
          width: 100,
          align: "center"
        }
      ]
    },
    {
      title: "护理业务查房",
      children: [
        {
          title: "查房内容",
          dataIndex: "srContent",
          width: 100,
          align: "center"
        },
        {
          title: "小讲课人员",
          dataIndex: "lecturer",
          width: 100,
          align: "center"
        },
        {
          title: "小讲课",
          dataIndex: "lectureContent",
          width: 100,
          align: "center"
        },
        {
          title: "其他",
          dataIndex: "lectureExpand",
          width: 100,
          align: "center"
        }
      ]
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 130,
      render(text: string, record: any) {
        return (
          <DoCon>
            {canHandleEdit(record)}
            <span onClick={() => toDetails(record)}>查看</span>
          </DoCon>
        );
      }
    }
  ]

  // 修改
  const toSaveOrUpdate = (record?: any) => {
    setEditParams(record);
    setEditVisible(true);
  };

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
    setEditParams({});
  };
  const handleEditOk = () => {
    checkWardRecordModal.onload()
    handleEditCancel();
  };

  // 查看详情
  const toDetails = (record: any) => {
    appStore.history.push(`/CommunityDetailsView/${record.id}`);
  };

  // 删除
  const handleDelete = (id: any) => {
    let content = (
      <div>
        <div>您确定要删除选中的查房记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        checkWardService.delete(id)
          .then(res => {
            if (res.code == 200) {
              message.success("删除成功");
              checkWardRecordModal.onload();
            } else {
              message.error("删除失败");
            }
          })
          .catch(e => { });
      }
    });
  }

  return (
    <Wrapper>
      <HeaderCon>
        <LeftIcon>
          <PageTitle>社区查房记录</PageTitle>
        </LeftIcon>
        <RightIcon>
          <span>查房日期：</span>
          <DatePicker.RangePicker
            style={{ width: 250 }}
            value={checkWardRecordModal.selectedDate}
            onChange={(date: any) => {
              checkWardRecordModal.selectedDate = date
              checkWardRecordModal.onload()
            }}
            allowClear={false}
          />

          <span>查房社区：</span>
          <Select
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 220 }}
            placeholder="请选择科室"
            value={checkWardRecordModal.community}
            onChange={(val: string) => {
              checkWardRecordModal.community = val;
              checkWardRecordModal.onload();
            }}
          >
            <Select.Option value=''>全部</Select.Option>
            {checkWardRecordModal.communityList.map((item: any) => {
              return (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>

          <span>状态：</span>
          <Select
            style={{ width: 120 }}
            value={checkWardRecordModal.status}
            onChange={(val: string) => {
              checkWardRecordModal.status = val
              checkWardRecordModal.pageIndex = 1
              checkWardRecordModal.onload()
            }}
          >
            <Select.Option value=''>全部</Select.Option>
            <Select.Option value='0'>待提交</Select.Option>
            <Select.Option value='1'>待科护士长审核</Select.Option>
            <Select.Option value='2'>待护理部审核</Select.Option>
            <Select.Option value='3'>已完成</Select.Option>
          </Select>
          <Button type='primary' onClick={() => checkWardRecordModal.onload()}>
            查询
          </Button>
          <Button type='primary' onClick={() => setEditVisible(true)} className='checkButton'>
            添加
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableWrapper>
        <BaseTable
          loading={checkWardRecordModal.tableLoading}
          dataSource={checkWardRecordModal.tableList}
          columns={columns}
          surplusHeight={260}
          surplusWidth={300}
          pagination={{
            current: checkWardRecordModal.pageIndex,
            total: checkWardRecordModal.total,
            pageSize: checkWardRecordModal.pageSize
          }}
          onRow={record => {
            return {
              onDoubleClick: (e: any) => {
                toDetails(record);
              }
            };
          }}
          onChange={pagination => {
            checkWardRecordModal.pageIndex = pagination.current;
            checkWardRecordModal.total = pagination.total;
            checkWardRecordModal.pageSize = pagination.pageSize;
            checkWardRecordModal.onload();
          }}
        />
      </TableWrapper>
      <EditModal
        visible={editVisible}
        params={editParams}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  )
})

const TableWrapper = styled(TabledCon)`
td{
  position: relative;
  word-break: break-all;
  .ellips{
    position: absolute;
    left:0;
    top: 0;
    height: 30px;
    line-height: 30px;
    right: 0;
    padding: 0 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
`

const HeaderCon = styled(TableHeadCon)`
  justify-content: space-between;
  .ant-select {
    width: 150px;
    margin-right: 20px;
  }
  .ant-calendar-picker {
    margin-right: 20px;
  }
  .checkButton {
    margin-left: 20px;
  }
  .month-select{
    width: 70px;
  }
  .year-select{
    width: 100px;
    display:inline-block;
  }
`
const Wrapper = styled.div`
  .operate-group{
    .delete{
      color: red;
    }
  }
`

const LeftIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  /* padding: 0 0 0 15px; */
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

