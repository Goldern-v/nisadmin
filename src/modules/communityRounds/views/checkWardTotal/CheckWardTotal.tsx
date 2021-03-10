import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { PageTitle } from 'src/components/common'
import { Button, Select, message, Modal } from 'antd'
import BaseTable, { TabledCon, DoCon, TableHeadCon } from 'src/components/BaseTable'
import YearPicker from "src/components/YearPicker";
import { checkWardTotalModal } from './CheckWardTotalModal'
import { checkWardService } from "../../services/CheckWardService";
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import TotalEditModal from '../../modal/TotalEditModal'
export interface Props { }

export default observer(function CheckWardTotal() {
  const [editVisible, setEditVisible] = useState(false);// 弹窗状态
  const monthList = [
    { code: '', name: '全部' },
    { code: 1, name: '1' },
    { code: 2, name: '2' },
    { code: 3, name: '3' },
    { code: 4, name: '4' },
    { code: 5, name: '5' },
    { code: 6, name: '6' },
    { code: 7, name: '7' },
    { code: 8, name: '8' },
    { code: 9, name: '9' },
    { code: 10, name: '10' },
    { code: 11, name: '11' },
    { code: 12, name: '12' }
  ]; //月份
  const statusList = [
    { code: '', name: '全部' },
    { code: 0, name: '未发布' },
    { code: 1, name: '已发布' }
  ]

  // 获取查房总列表初始化数据
  useEffect(() => {
    checkWardTotalModal.onload()
  }, [])

  const columns: any = [
    {
      title: '序号',
      dataIndex: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: string, index: number) {
        return index + 1
      }
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 320,
      align: "center"
    },
    {
      title: "月份",
      dataIndex: "month",
      width: 100,
      align: "center",
      render(text: any, record: any) {
        return <span>{text ? `${record.year}年${text}月` : `${record.year}年`}</span>
      }
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 80,
      align: "center",
      render(text: any) {
        return <span>{text == '1' ? '已发布' : '未发布'}</span>
      }
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      width: 100,
      align: "center"
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      width: 150,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "操作",
      width: 120,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleRelease(record.id)}>发布</span>
            <span onClick={() => toDetails(record)}>查看</span>
            <span onClick={() => handleDelete(record.id)}>删除</span>
          </DoCon>
        );
      }
    }
  ]

  // 弹窗
  const handleEditCancel = () => {
    setEditVisible(false);
  };
  const handleEditOk = () => {
    checkWardTotalModal.onload()
    handleEditCancel();
  };

  // 查看详情
  const toDetails = (record: any) => {
    appStore.history.push(`/CommunityDetailsView/${record.id}`);
  };

  // 发布
  const handleRelease = (id: any) => {
    let content = (
      <div>
        <div>您确定要发布该条查房报告吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        checkWardService.releaseTotal(id)
          .then(res => {
            if (res.code == 200) {
              message.success("发布成功！");
              checkWardTotalModal.onload();
            } else {
              message.error("发布失败！");
            }
          })
          .catch(e => { });
      }
    });
  }

  // 删除
  const handleDelete = (id: any) => {
    let content = (
      <div>
        <div>您确定要删除该条查房报告吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        checkWardService.deleteTotal(id)
          .then(res => {
            if (res.code == 200) {
              message.success("删除成功！");
              checkWardTotalModal.onload();
            } else {
              message.error("删除失败！");
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
          <PageTitle>社区查房汇总</PageTitle>
        </LeftIcon>
        <RightIcon>
          <span>年份：</span>
          <YearPicker
            allowClear={false}
            style={{ width: 120 }}
            value={checkWardTotalModal.selectedYear}
            onChange={(year: any) => {
              checkWardTotalModal.selectedYear = year;
              checkWardTotalModal.pageIndex = 1;
              checkWardTotalModal.onload();
            }}
          />
          <span>月份：</span>
          <Select
            style={{ width: 120 }}
            value={checkWardTotalModal.month}
            onChange={(val: string) => {
              checkWardTotalModal.month = val
              checkWardTotalModal.pageIndex = 1
              checkWardTotalModal.onload()
            }}
          >
            {monthList.map((item: any, index: any) =>
              <Select.Option value={item.code} key={index}>{item.name}</Select.Option>
            )}
          </Select>

          <span>状态：</span>
          <Select
            style={{ width: 120 }}
            value={checkWardTotalModal.status}
            onChange={(val: string) => {
              checkWardTotalModal.status = val
              checkWardTotalModal.pageIndex = 1
              checkWardTotalModal.onload()
            }}
          >
            {statusList.map((item: any) =>
              <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
            )}
          </Select>
          <Button type='primary' onClick={() => checkWardTotalModal.onload()}>
            查询
          </Button>
          <Button type='primary' onClick={() => setEditVisible(true)} className='checkButton'>
            添加
          </Button>
        </RightIcon>
      </HeaderCon>
      <TableWrapper>
        <BaseTable
          loading={checkWardTotalModal.tableLoading}
          dataSource={checkWardTotalModal.tableList}
          columns={columns}
          surplusHeight={220}
          surplusWidth={300}
          pagination={{
            current: checkWardTotalModal.pageIndex,
            total: checkWardTotalModal.total,
            pageSize: checkWardTotalModal.pageSize
          }}
          onRow={record => {
            return {
              onDoubleClick: (e: any) => {
                toDetails(record);
              }
            };
          }}
          onChange={pagination => {
            checkWardTotalModal.pageIndex = pagination.current;
            checkWardTotalModal.total = pagination.total;
            checkWardTotalModal.pageSize = pagination.pageSize;
            checkWardTotalModal.onload();
          }}
        />
      </TableWrapper>
      <TotalEditModal
        visible={editVisible}
        onCancel={handleEditCancel}
        onOk={handleEditOk}
      />
    </Wrapper >
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

