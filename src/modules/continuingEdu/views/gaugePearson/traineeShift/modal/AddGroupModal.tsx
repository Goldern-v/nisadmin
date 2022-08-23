import styled from "styled-components";
import React, { useState,useRef,useMemo,useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, message as Message, Input, Button, DatePicker,Tag } from "antd";
import { traineeShiftApi } from "../api/TraineeShiftApi"; // 接口
import { traineeShiftModal } from "../TraineeShiftModal";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { bacisManagData } from "../../bacisInformation/bacisPostgraduate";
import debounce from 'lodash/debounce';

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
  currentTrainTitle:string;
}

export default observer(function AddGroupModal(props: Props) {
  const { visible, onCancel, onOk,currentTrainTitle } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中的KEY值

  const [tabList, setTabList] = useState(['和规范的','rtyu','rtyu90','tyu','fvb','asd']);
//   选中的规培生对象
  const [selectStu, setSelectStu] = useState([]); 

  // 保存
	const checkForm = async () => {
		setEditLoading(true);
		if (selectStu.length < 1) {
			Message.warning('请先选择规培生')
			return false
		}
		let latPlanRotatePersonsList = [] as any
		selectStu.map((item:any)=>{
			latPlanRotatePersonsList.push({
				"sex": item.sex,
				"empName": item.name,
				"sapCode": item.sapCode
			})
		})
		traineeShiftApi
			.addRotatePersonsToRotate({
				sheetId: traineeShiftModal.sheetId,
				latPlanRotatePersonsList: latPlanRotatePersonsList
			})
			.then((res: any) => {
				setEditLoading(false);
				if (res.code == 200) {
					Message.success("成功添加规培生！");
					onOk();
					traineeShiftModal.onload();
					// 清空数据
					setSelectStu([])
					setSelectedRowKeys([])
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
    traineeShiftModal.addKeyYear = value
    traineeShiftModal.getStuByNameOrYear()
  }

  // 查询
  const handelInquire = ()=>{
    // bacisManagData.onload()
	traineeShiftModal.getStuByNameOrYear()
  }

  // 表格选中操作
  const rowSelection: any = {
	columnWidth:30,
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
    //   console.log(selectedRowKeys, selectedRows, 888)
	// selectedRows的值是这次查询表格选中值，上次查询表格选中的值不在这里
      setSelectedRowKeys(selectedRowKeys);
	  let newSelectAll = [...selectStu,...selectedRows] // 原有的和现在新表格的拼接
		let newSelect = [] as any
		let selectItem = {}
		// 根据selectedRowKeys筛选对象
	  selectedRowKeys.map((key:string)=>{
		// selectItem=
		newSelect.push(newSelectAll.find(it=>it.id==key))
	  })
	  setSelectStu(newSelect)
	//   console.log(newSelect)
      let arr: any = [];
      selectedRows.map((item: any) => {
        arr.push(item.deptCode);
      });
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
      dataIndex: "sapCode",
      align: "center",
      width: 80
    },
    {
      title: "性别",
      dataIndex: "sex",
      align: "center",
      width: 50,
	  render:(text:any,record:any,index:number)=>{
		if(text=='0'){
			return <span>男</span>
		}
		return <span>女</span>
	  }
    },
  ];

//   取消选中的规培生
  const handleCloseTab = (id:any)=>{
	// console.log(id)
	let newKeys = []
	let newSelectItem = []
	newKeys=selectedRowKeys.filter(it => it !==id );
	setSelectedRowKeys(newKeys)
	newSelectItem=selectStu.filter((item:any) => item.id !==id );
	setSelectStu(newSelectItem)
  }

//   输入名字防抖查询
const handleOnChange = () => {
    // console.log('first',traineeShiftModal.addKeyName)
	traineeShiftModal.getStuByNameOrYear()
  }
const searchByName = useRef(debounce(() => handleOnChange(), 1000)).current

  return (
    <Modal
      width="60%"
      visible={visible}
      onCancel={handleCancel}
      forceRender={true}
      title={"添加规培生("+currentTrainTitle+")"}
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
            value={traineeShiftModal.addKeyYear}
            open={yearPickerIsOpen}
            mode='year'
            className='year-picker'
            placeholder='全部'
            format='YYYY'
            // onChange={handleYearClear}
            onOpenChange={handleOpenChange}
            onPanelChange={handlePanelChange}
          />
          <Input
            style={{ width: 200, marginLeft: 15, marginRight: 5 }}
            placeholder="请输入要搜索的姓名"
            value={traineeShiftModal.addKeyName}
            onChange={e => {
				traineeShiftModal.addKeyName = e.target.value
				searchByName()
				
              
            }}
          />
          <Button
            type="primary"
            className="span"
            onClick={handelInquire}
            >查询</Button>
        </div>
        <BaseTable
          loading={traineeShiftModal.addStuTableLoading}
          dataSource={traineeShiftModal.addStuList}
          columns={columns}
          rowSelection={rowSelection}
		  rowKey={record =>record.id}
          // surplusHeight={100}
          // surplusWidth={100}
          pagination={{
            current: traineeShiftModal.addStuPageIndex,
            total: traineeShiftModal.addStuTotal,
            pageSize: traineeShiftModal.addStuPageSize,
          }}
          onChange={(pagination) => {
            traineeShiftModal.addStuPageIndex = pagination.current;
            traineeShiftModal.addStuTotal = pagination.total;
            traineeShiftModal.addStuPageSize = pagination.pageSize;
            // bacisManagData.onload();
			traineeShiftModal.getStuByNameOrYear()
          }}
        />
        <SelectTab>
			<div className="flex-ml">已选：</div>
			<div className="flex-mr">
				{selectStu.map((iy:any)=>{
					return <Tag className="select-tab" key={iy.id} closable onClose={() => handleCloseTab(iy.id)}>
					{iy.name}
				</Tag>
				})}
				
			</div>
			
			
		</SelectTab>
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
const SelectTab=styled.div`
display: flex;
.flex-ml{
	width: 44px;
    font-weight: bold;
    line-height: 30px;
    font-size: 14px;
}
.flex-mr{
	flex: 1;
}
.select-tab.ant-tag, .select-tab.ant-tag a, .select-tab.ant-tag a:hover{
	color: #fff;
    padding: 0 10px 0 15px;
    font-size: 13px;
    line-height: 30px;
	background-color: #00A680;
}
.select-tab.ant-tag .anticon-close{
	color: #fff;
}
`;
const Header = styled.div``