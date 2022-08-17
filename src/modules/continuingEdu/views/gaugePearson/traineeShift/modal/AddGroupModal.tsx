import styled from "styled-components";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Input, Button, DatePicker } from "antd";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { bacisManagData } from "../../bacisInformation/bacisPostgraduate";

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function AddGroupModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值

  // 保存
  const checkForm = async () => {
    // let isOk: any = /^[1-9]\d*$/.test(groupName.replace(/(^\s+)|(\s+$)/g, ""));
    // let isHavedGroupName: any = traineeShiftModal.tableList.find(
    //   (item: any) => item.groupNum == groupName
    // );
    // if (groupName) {
    //   if (isHavedGroupName) {
    //     Message.warning("该小组名称已存在，请重新命名！");
    //     return;
    //   }
    //   if (!isOk) {
    //     Message.warning("小组名称必须为正整数！");
    //     return;
    //   }
      setEditLoading(true);
      traineeShiftApi
        .createRotateGroup(groupName)
        .then((res: any) => {
          setEditLoading(false);
          if (res.code == 200) {
            Message.success("已成功添加分组！");
            onOk();
            traineeShiftModal.onload();
          } else {
            setEditLoading(false);
            Message.error(`${res.desc}`);
          }
        })
        .catch(() => {
          setEditLoading(false);
        });
    // } else {
    //   Message.warning("保存前请填写小组名称！");
    // }
  };

  // 关闭取消
  const handleCancel = async () => {
    if (editLoading) return;
    await (onCancel && onCancel());
  };

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    bacisManagData.year = undefined
  }

  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    bacisManagData.year = value
    bacisManagData.onload()
  }

  // 查询
  const handelInquire = ()=>{
    bacisManagData.onload()
  }

  // 表格选中操作
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRowKeys, selectedRows, 888)
      setSelectedRowKeys(selectedRowKeys);
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.deptCode);
      });
      // console.log(arr, 7776)
      // setIdArr(arr);
    }
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 40
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
      width: 100
    },
    {
      title: "SAP代码",
      dataIndex: "name",
      align: "center",
      width: 80
    },
    {
      title: "科室",
      dataIndex: "sex",
      align: "center",
      width: 100
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 50
    },
  ];

  return (
    <Modal
      width="60%"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      title="添加规培生"
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => handleCancel()}>取消</Button>
          <Button
            type="primary"
            loading={editLoading}
            onClick={() => checkForm()}
          >
            保存
          </Button>
        </div>
      }
    >
      {/* <Wrapper>
        <Row>
          <Col span={6} className="label">
            <span style={{ color: "red", marginRight: "3px" }}>*</span>
            小组名称：
          </Col>
          <Col span={17}>
            <Input
              style={{ width: 250 }}
              placeholder="请输入要小组名"
              value={groupName}
              onChange={e => {
                setGroupName(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Wrapper> */}
      <Wrapper>
        <div>
          <span>年份：</span>
          <DatePicker
            style={{ width: 100 }}
            value={bacisManagData.year}
            open={yearPickerIsOpen}
            mode='year'
            className='year-picker'
            placeholder='全部'
            format='YYYY'
            onChange={handleYearClear}
            onOpenChange={handleOpenChange}
            onPanelChange={handlePanelChange}
          />
          <Input
            style={{ width: 200, marginLeft: 15, marginRight: 5 }}
            placeholder="请输入要搜索的姓名"
            value={bacisManagData.keyWord}
            onChange={e => {
              bacisManagData.keyWord = e.target.value
              bacisManagData.onload()
            }}
          />
          <Button
            type="primary"
            className="span"
            onClick={handelInquire}
            >查询</Button>
        </div>
        <BaseTable
          loading={bacisManagData.tableLoading}
          dataSource={bacisManagData.tableList}
          columns={columns}
          rowSelection={rowSelection}
          // surplusHeight={100}
          // surplusWidth={100}
          pagination={{
            current: bacisManagData.pageIndex,
            total: bacisManagData.total,
            pageSize: bacisManagData.pageSize,
          }}
          onChange={(pagination) => {
            bacisManagData.pageIndex = pagination.current;
            bacisManagData.total = pagination.total;
            bacisManagData.pageSize = pagination.pageSize;
            bacisManagData.onload();
          }}
        />
      </Wrapper>
    </Modal>
  );
});
const Wrapper = styled.div`
  /* width: 85%;
  margin: 10px auto;
  .label {
    margin-top: 5px;
  } */
`;
const Header = styled.div``