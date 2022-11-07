import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

import {
  ColumnProps,
  message,
  Select,
  InputNumber,
  Tag,
  Input,
  Switch,
  Cascader
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { wardRegisterDefaultService } from "src/modules/WardRegisterDefault/services/WardRegisterDefaultService";
import { authStore, appStore } from "src/stores";
// import emitter from "src/libs/ev";
import { globalModal } from "src/global/globalModal";
import update from "immutability-helper";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import { codeAdapter } from "src/modules/WardRegisterDefault/utils/codeAdapter";
import service from "src/services/api";

const Option = Select.Option

export interface Props {
  blockId: any;
  selectedBlockObj: any;
  registerCode: any;
  onOkCallBack: any;
}

export default observer(function SetTittle(props: Props) {
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource]: any[] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [moveAble, setMoveAble] = useState(false);
  const [empNameList, setEmpNameList] = useState([]);
  const { blockId, registerCode, onOkCallBack, selectedBlockObj } = props;
  const [iderateList, setIderateList]:any[] = useState([]);
  const [calculationList, setCalculationList]:any[] = useState([]);
  const calLabel = ['date','date_time','time']// 自动计算项
  const calLabel2 = ['','timeCalculation']// 累加

  // const showEmpName = [
  //   "责任护士",
  //   "人员调配",
  //   "责任组长",
  //   "签名",
  //   "检查者签名",
  //   "责任人",
  //   "责护名字",
  //   "消毒液擦拭床单位执行者",
  //   "床单位消毒机消毒执行者",
  //   "带教老师签名",
  //   "带教组长签名"
  // ];
	 let value = [] as any
	//  const [cascaderOptions, setCascaderOptions]:any = useState([
		let cascaderOptions:any = [{
		  value: '',
		  label: '文本框',
		},
		{
		  value: 'radio',
		  label: '下拉选项',
		},
		{
		  value: 'multiple_select',
		  label: '多项选择',
		},
		{
		  value: 'ward_user',
		  label: '科室护士',
		},
		{
		  value: 'attachment',
		  label: '附件上传',
		},
		{
		  value: 'date',
		  label: '日期选择',
		},
		{
		  value: 'date_time',
		  label: '日期时间选择',
		},
		{
		  value: 'time',
		  label: '时间选择',
		},
		{
		  value: 'timeCalculation',
		  label: '自动计算项',
		  multiple:true,
		//   isLeaf:false,
		  children:[...calculationList],
		// children:[
		// 	{value: '时间选择',
		// 	label: '时间选择',}
		// ],
		 //这里的内容要动态计算
		},
		{
		  value: 'cumulative',
		  label: '自动累加项',
		//   children:[
		// 	{value: '时间选择',
		// 	label: '时间选择',}
		// ],
		//   isLeaf:false,
		  children:[...iderateList],
		},
	  ];

	  /**计算定时器和叠加器 */
	  const updateCascaderOptions = ()=>{
		let calculationList2 = []as any
		let iderateList2 = [] as any
		dataSource.map((it:any)=>{
			if(calLabel.includes(it.itemType)){
				calculationList2.push({
					value: it.itemCode,
					label: it.itemCode,
				})
			}
			if(calLabel2.includes(it.itemType)){
				iderateList2.push({
					value: it.itemCode,
					label: it.itemCode,
				})
			}
	  })
	  setCalculationList(calculationList2)
		setIderateList(iderateList2)
	}

  //不允许删除的选项
  const staticOptions: { [p: string]: string[] } =
    codeAdapter({
      other: {}
    }, registerCode)

  const trimStringArr = (arr: any[]) => {
    return arr.map((str: string) => str.trim()).filter((str: string) => str)
  }


  const baseNumCol: ColumnProps<any> = {
    title: "基数",
    width: 100,
    dataIndex: "checkSize",
    className: "input-cell",
    render(text: any, record: any, index: any) {
      return (
        <Input
          defaultValue={text}
          onChange={e => {
            record.checkSize = e.target.value;
          }}
          onBlur={() => updateDataSource()}
        />
      );
    }
  }

  const defaultOptions = codeAdapter({
    other: []
  }, registerCode, true)

  const fileTypeOptions = [
    { name: '文档', value: '.doc;.docx;.pdf' },
    { name: '表格', value: '.xls;.xlsx' },
    { name: '图片', value: '.jpg;.jpeg;.jpeg;.png;.gif' },
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: "项目名称",
      dataIndex: "itemCode",
      align: "center",
      className: [
        "input-cell",
        (selectedBlockObj && !selectedBlockObj.itemSizeEditable) ? 'disabled' : ''
      ].join(' '),
      width: 150,
      render(text: any, record: any, index: any) {
        return (
          <Input.TextArea
            autosize={{ minRows: 1 }}
            disabled={selectedBlockObj && !selectedBlockObj.itemSizeEditable}
            onChange={e => {
              record.itemCode = e.target.value;
            }}
            onBlur={() => updateDataSource()}
            defaultValue={text}
          />
        );
      }
    },
    ...codeAdapter(
      {
        other: [
          {
            title: "类型",
            dataIndex: "itemType",
            className: "input-cell",
            width: 300,
            render: (text: any, record: any, index: any) => {
              return <>
			  {["qhwy"].includes(appStore.HOSPITAL_ID)? <Cascader changeOnSelect={true}
              options={cascaderOptions} 
			//   expandTrigger="click"
			  style={{width:'100%',textAlign:'center'}}
              expandTrigger="hover"
			  defaultValue={record.cascaderCode || ['']}
              displayRender={(label:any,selectedOptions:any)=>{
				
				// 多选
				if(selectedOptions[0].multiple){
					if(record.itemType==''){
						return <span>文本框</span>
					}
					// 是给多选
					// else if(record.timeBeginCode!='' || record.timeEndCode!=''){
						return <div className="tag-list">
						{record.timeBeginCode&& <Tag color="lime" closable onClose={() => {
							record.timeBeginCode = ''
							if(record.timeBeginCode=="" && record.timeEndCode==""){
								// 默认
								record.cascaderCode = ['']
								record.itemType = ''
							}
							}}
							>
							开始:{record.timeBeginCode}
						</Tag>}
						{record.timeEndCode&& <Tag color="lime" closable onClose={() => {
							record.timeEndCode = ""
							if(record.timeBeginCode=="" && record.timeEndCode==""){
								record.cascaderCode = ['']
								record.itemType = ''
							}
							}}
							>
							结束:{record.timeEndCode}
							</Tag>
						}
						</div>
					// }
					
				}else if(selectedOptions[0].value == 'cumulative'){
					// console.log('444===',record)
					// 累计
					if(record.cumulativeTarget && record.cumulativeTarget!=''){
						return <span style={{color:'#10c8ff'}}>{record.cumulativeTarget}</span>
					}
				}
				return label[label.length - 1]
              }}

              onChange={(value:any, l:any)=>{
				if(record.itemCode == l[l.length-1].label){
					message.warning('不可选择自己')
					return
				}
				record.itemType = value[0] //提交给后端的主要看第一级value
				record.cascaderCode = value//记录级联选择的code
				if(value[0]=='cumulative' || value[0]=='timeCalculation'){
					// console.log('first')
					// getNextList(l[l.length-1])
				}
				
				if(value[0]=='cumulative' && value.length>1){//累加
					// 累加目标列
					// console.log('222')
					record.cumulativeTarget = value[1]
				}else{
					// console.log('111')
					record.cumulativeTarget = ''
				}
				if(l[0].multiple && value.length>1){
					// 自动计算项 记录2个计算项
					if([record.timeBeginCode,record.timeEndCode].includes(l[l.length-1].label)){
						// 选择的值已经被选择过，就反选
						if([record.timeBeginCode].includes(l[l.length-1].label)){
							record.timeBeginCode = ''
							record.itemType = ''
							record.cascaderCode = ['']
						}else{
							record.timeEndCode = ''
							record.itemType = ''
							record.cascaderCode = ['']
						}
					}else{
						if(record.timeBeginCode==''){
							// 开始时间为空，设置开始时间
							// 为什么用l[1].label,不用l[l.length-1].label,因为l[l.length-1].label会把第一层级填充
							// if(l.length>1){
								record.timeBeginCode = l[l.length-1].label
							// }
						}else{
							if(record.timeEndCode==''){
								// 已有开始时间，结束时间为空 设置结束时间
								record.timeEndCode = l[l.length-1].label
							}else{
								message.warning('只能选择2个项目')
								// 开始时间，结束时间都有值，提示
							}
						}
					}
				}else{
					record.timeBeginCode = ''
					record.timeEndCode = ''
				}
				setDataSource([...dataSource])
				
              }}
            /> :<Select
			value={text}
			onChange={(val: string) => {
			  let oldType = record.itemType
			  record.itemType = val

			  let ignoreTypes = ['multiple_select']

			  if (
				(ignoreTypes.indexOf(oldType) >= 0 || !oldType) &&
				(ignoreTypes.indexOf(val) >= 0 || !val)
			  ) {

			  } else {
				record.options = ''
			  }

			  updateDataSource()
			}}>
			<Option value="">下拉选项</Option>
			<Option value="multiple_select">多项选择</Option>
			<Option value="ward_user">科室护士</Option>
			<Option value="attachment">附件上传</Option>
			<Option value="date">日期选择</Option>
			<Option value="date_time">日期时间选择</Option>
			<Option value="time">时间选择</Option>
		  </Select>}
			  </>
			  
            }
          },
        ]
      },
      registerCode
    ),
    {
      title: "列宽度(字数)",
      dataIndex: "width",
      className: "input-cell",
      width: 100,
      render(text: any, record: any, index: any) {
        return (
          <InputNumber
            defaultValue={text}
            onChange={value => {
              record.width = value;
            }}
            onBlur={() => updateDataSource()}
          />
        );
      }
    },
    ...codeAdapter(
      {
        other: []
      },
      registerCode
    ),
    {
      title: "下拉选项预设值(值之前用;隔开)",
      dataIndex: "options",
      width: 300,
      className: "input-cell",
      render(text: any, record: any, index: any) {
        // if (['date_time','date','time','','timeCalculation','cumulative'].includes(record.itemType)) {
        //   return <span></span>
        // } else 
		if (record.itemType == 'attachment') {
          return <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={(value: any) => {
              let formatVal = value.join(';').split(';')
              let newVal: string[] = []
              for (let i = 0; i < formatVal.length; i++) {
                if (newVal.indexOf(formatVal[i]) < 0) newVal.push(formatVal[i])
              }

              record.options = trimStringArr(newVal).join(";")

              updateDataSource();
            }}
            value={text ? text.split(";") : []}
            tokenSeparators={[";", "；"]}
          >
            {/* <Option value="全选">全选</Option> */}
            {fileTypeOptions.map((item: any) => (
              <Option
                key={item.value}
                value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        } else if (record.itemType == 'ward_user') {
          return <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={(value: any) => {
              let target = value.find((item: any) => item == '全选')

              if (target) {
                record.options = empNameList.join(";")
              } else {
                record.options = value.join(";");
              }

              updateDataSource();
            }}
            value={text ? text.split(";") : []}
            tokenSeparators={[";", "；"]}
          >
            <Option value="全选">全选</Option>
            {empNameOptions()}
          </Select>
        } else if(record.itemType=='radio' || record.itemType == 'multiple_select') {
          return defaultOptions.length > 0 ?
            <Select
              mode="tags"
              style={{ width: "100%" }}
              onChange={(value: any) => {
                //是否允许提交改动
                let canSubmint = true

                let targetOptions = staticOptions[record.itemCode] || null
                if (targetOptions) {
                  for (let i = 0; i < targetOptions.length; i++) {
                    if (value.indexOf(targetOptions[i]) < 0) {
                      value.push(targetOptions[i])
                    }
                  }
                }

                if (canSubmint) {
                  record.options = trimStringArr(value).join(";");
                  updateDataSource()
                }
              }}
              value={text ? text.split(";") : []}
              tokenSeparators={[";", "；"]}
            >
              {defaultOptions.map((item: any, idx: number) =>
                <Option
                  key={idx}
                  value={item.value}>
                  {item.name}
                </Option>)}
            </Select> :
            <Select
              mode="tags"
              style={{ width: "100%" }}
              open={false}
              onChange={(value: any) => {
                //是否允许提交改动
                let canSubmint = true

                let targetOptions = staticOptions[record.itemCode] || null
                if (targetOptions) {
                  for (let i = 0; i < targetOptions.length; i++) {
                    if (value.indexOf(targetOptions[i]) < 0) {
                      value.push(targetOptions[i])
                    }
                  }
                }

                if (canSubmint) {
                  record.options = trimStringArr(value).join(";")
                  updateDataSource()
                }
              }}
              value={text ? text.split(";") : []}
              tokenSeparators={[";", "；"]}
            >
              {defaultOptions.map((item: any, idx: number) =>
                <Option
                  key={idx}
                  value={item.value}>
                  {item.name}
                </Option>)}
            </Select>
        }else{
			return <span></span>
		}
      }
    },
	{
		title: "必填项 ",
      	width: 80,
		align: "center",
		dataIndex:'notNull',
		render(text: boolean, record: any, index: number){
			return <Switch defaultChecked={text} onChange={(checked:boolean)=>{
				record.notNull = checked
			}} />
		}
	},
    {
      title: " 操作 ",
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            {selectedBlockObj &&
              selectedBlockObj.itemSizeEditable &&
              (
                <span
                  onClick={() => {
                    globalModal
                      .confirm("删除确认", "你确定删除该配置项吗？")
                      .then(res => {
                        delRow(index);
                      });
                  }}
                >
                  删除
                </span>
              )}
          </DoCon>
        );
      }
    }
  ];

  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };

  const delRow = (index: number) => {
    let params = JSON.parse(JSON.stringify(dataSource))

    if (params[index].oldItemCode) {
      params.splice(index, 1)

      wardRegisterDefaultService
        .saveOrUpdateItemConfig(registerCode, blockId,
          params.filter((item: any) => item.oldItemCode))
        .then(res => {
          message.success('删除成功')

          setDataSource([])
          setTimeout(() => setDataSource(params))
        })
    } else {
      params.splice(index, 1)
      setDataSource([])
      setTimeout(() => setDataSource(params))
    }
  };
  const addRow = () => {
    dataSource.push({ itemType: '', itemCode: '' });
    updateDataSource();
  };

  const onSave = () => {
	// console.log(registerCode, blockId, dataSource)
	// return
    setPageLoading(true);
    wardRegisterDefaultService
      .saveOrUpdateItemConfig(registerCode, blockId, dataSource)
      .then(res => {
        setPageLoading(false);
        getData();
        onOkCallBack();
      });
  };
  const getData = () => {
    setPageLoading(true);
    wardRegisterDefaultService
      .getItemConfigByBlockId(registerCode, blockId)
      .then(res => {
		
		
		res.data.itemList.map((it:any)=>{
			if(it.itemType !=''){
				it.cascaderCode = [it.itemType]
			}
			
		})
		
        setDataSource(res.data.itemList);
        setPageLoading(false);
		// updateCascaderOptions()
      });
    service.commonApiService
      .userDictInfo(authStore.selectedDeptCode)
      .then(res => setEmpNameList(res.data.map((item: any) => item.name)));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
	updateCascaderOptions()
  }, [dataSource])
  

  const empNameOptions = () =>
    empNameList.map((item: any) => (
      <Option key={item}>{item}</Option>
    ));
  return (
    <Wrapper>
      <ToolCon>
        <Place />
        <span>排序：</span>
        <Switch
          style={{ marginRight: 10 }}
          checked={moveAble}
          onChange={(value: any) => setMoveAble(value)}
        />
        {selectedBlockObj &&
          selectedBlockObj.itemSizeEditable &&
          (
            <Button onClick={addRow}>添加</Button>
          )}
        <Button onClick={onSave} type="primary">
          保存
        </Button>
      </ToolCon>
      <EditTableCon>
        <BaseTable
          // rowKey="itemCode"
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          type={["index", moveAble ? "diagRow" : ""]}
          surplusHeight={appStore.wih - (appStore.wih * 0.8 - 200)}
          moveRow={(dragIndex: number, hoverIndex: number) => {
            const dragRow = dataSource[dragIndex];
            setDataSource(
              update(dataSource, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
              })
            );
          }}
        />
      </EditTableCon>
    </Wrapper>
  );
});
const Wrapper = styled.div``;
const EditTableCon = styled.div`
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  
  .ant-table-tbody > tr.ant-table-row:hover{
    .input-cell{
      &.disabled{
        background-color: #f5f5f5!important;
      }
    }
  }

  .input-cell {
    padding: 0 !important;
    &.disabled{
      background-color: #f5f5f5;
    }

    .ant-input, .ant-select, .ant-select-selection, .ant-input-number {
      position: relative;
      z-index: 1000;
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      /* &:focus {
        background: ${p => p.theme.$mlc};
      } */
      input {
        text-align: center;
      }
    }
  }
  .ant-select{
    .ant-select-remove-icon{
      color: #00A680;
    }
  }
  textarea{
    resize:none;
    overflow: hidden;
  }
  .ant-cascader-picker-label{
	/* position: relative; */
	z-index: 1009;
  }
  .ant-cascader-picker-label{
	overflow: visible;
  }
  .tag-list{
	width: 100%;
	display: flex;
	.ant-tag{
		/* flex: 1; */
		position: relative;
    padding-right: 17px;
	max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
		.anticon-close{
			position: absolute;
    top: 20%;
    right: 3px;
		}
	}
	
  }
`;

const ToolCon = styled.div`
  display: flex;
  margin: 0 15px;
  padding-top: 10px;
  margin-bottom: -5px;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;
