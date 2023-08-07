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
import { appStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import { codeAdapter } from "src/modules/WardRegisterDefault/utils/codeAdapter";
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
import moment from "moment";

const Option = Select.Option

export interface Props {
  blockId?: any;
  selectedBlockObj?: any;
  registerCode?: any;
  onOkCallBack?: any;
}

export default observer(function SetConfig(props: Props) {
  const {queryObj}=appStore
  const [dataSource, setDataSource]: any[] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [moveAble, setMoveAble] = useState(false);
  const { registerCode,selectedBlockObj} = props;

  let cascaderOptions: any = [{
    value: 'text',
    label: '文本',
  },
  {
    value: 'radio',
    label: '单项',
  },
  {
    value: 'multiple_select',
    label: '多选',
  },
  {
    value: 'attachment',
    label: '文件(文件支持pdf/word/图片上传)',
  },
  {
    value: 'date',
    label: '日期(年月日)',
  },
  {
    value: 'date_time',
    label: '日期(年月)',
  },
  {
    value: 'time',
    label: '时间(年月日时分秒)',
  },
    {
      value: 'sign',
      label: '签名',
    },
  ];


  //不允许删除的选项
  const staticOptions: { [p: string]: string[] } =
    codeAdapter({
      other: {}
    }, registerCode)

  const trimStringArr = (arr: any[]) => {
    return arr.map((str: string) => str.trim()).filter((str: string) => str)
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
      title: "名称",
      dataIndex: "title",
      align: "center",
      className: [
        "input-cell",
        (selectedBlockObj && !selectedBlockObj.itemSizeEditable) ? 'disabled' : '',
       'required-cell'
      ].join(' '),
      width: 150,
      render(text: any, record: any, index: any) {
        return (
          <Input.TextArea
            autosize={{ minRows: 1 }}
            disabled={selectedBlockObj && !selectedBlockObj.itemSizeEditable}
            onChange={e => {
              record.title = e.target.value;
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
            title: "字段控件",
            dataIndex: "type",
            className: ['input-cell','required-cell'],
            width: 300,
            render: (text: any, record: any, index: any) => {
              return(
                  <Cascader changeOnSelect={true}
                            options={cascaderOptions}
                            style={{ width: '100%', textAlign: 'center' }}
                            expandTrigger="hover"
                            defaultValue={record.cascaderCode || ['text']}
                            displayRender={(label: any, selectedOptions: any) => {
                              // 多选
                              if(selectedOptions.length<1){
                                // 没有的类型，比如护士长签名，护士签名
                                return <span>文本框</span>
                              }
                              if (selectedOptions[0].multiple) {
                                if (record.type == '') {
                                  return <span>文本框</span>
                                }
                                // 是给多选
                                return <div className="tag-list">
                                  {record.timeBeginCode && <Tag color="lime" closable onClose={() => {
                                    record.timeBeginCode = ''
                                    if (record.timeBeginCode == "" && record.timeEndCode == "") {
                                      // 默认
                                      record.cascaderCode = ['']
                                      record.type = ''
                                    }
                                  }}
                                  >
                                    开始:{record.timeBeginCode}
                                  </Tag>}
                                  {record.timeEndCode && <Tag color="lime" closable onClose={() => {
                                    record.timeEndCode = ""
                                    if (record.timeBeginCode == "" && record.timeEndCode == "") {
                                      record.cascaderCode = ['']
                                      record.type = ''
                                    }
                                  }}
                                  >
                                    结束:{record.timeEndCode}
                                  </Tag>
                                  }
                                </div>
                                // }
                              }
                              return label[label.length - 1]
                            }}
                            onChange={(value: any, l: any) => {
                              if (record.itemCode == l[l.length - 1].label) {
                                message.warning('不可选择自己')
                                return
                              }
                              record.type = value[0] //提交给后端的主要看第一级value
                              record.cascaderCode = value//记录级联选择的code
                              if (l[0].multiple && value.length > 1) {
                                // 自动计算项 记录2个计算项
                                if ([record.timeBeginCode, record.timeEndCode].includes(l[l.length - 1].label)) {
                                  // 选择的值已经被选择过，就反选
                                  if ([record.timeBeginCode].includes(l[l.length - 1].label)) {
                                    record.timeBeginCode = ''
                                    record.type = ''
                                    record.cascaderCode = ['']
                                  } else {
                                    record.timeEndCode = ''
                                    record.type = ''
                                    record.cascaderCode = ['']
                                  }
                                } else {
                                  if (record.timeBeginCode == '') {
                                    // 开始时间为空，设置开始时间
                                    // 为什么用l[1].label,不用l[l.length-1].label,因为l[l.length-1].label会把第一层级填充
                                    record.timeBeginCode = l[l.length - 1].label
                                  } else {
                                    if (record.timeEndCode == '') {
                                      // 已有开始时间，结束时间为空 设置结束时间
                                      record.timeEndCode = l[l.length - 1].label
                                    } else {
                                      message.warning('只能选择2个项目')
                                      // 开始时间，结束时间都有值，提示
                                    }
                                  }
                                }
                              } else {
                                record.timeBeginCode = ''
                                record.timeEndCode = ''
                              }
                              /*设置对应默认值*/
                              if(value[0] == 'date'){ record.defaultValue = moment().format('YYYY-MM-DD') }
                              if(value[0] == 'date_time'){ record.defaultValue = moment().format('YYYY-MM') }
                              if(value[0] == 'time'){ record.defaultValue = moment().format('YYYY-MM-DD HH:mm:ss') }
                              setDataSource([...dataSource])
                            }}
                  />
              )
          }
          },
        ]
      },
      registerCode
    ),
    {
      title: "列宽度(字数)",
      dataIndex: "width",
      className:'input-cell',
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
        if (record.type == 'attachment') {
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
        }else if ((!["qhwy", 'dglb','whyx'].includes(appStore.HOSPITAL_ID) && (record.type == '' || record.type == 'multiple_select'))
        || (["qhwy", 'dglb','whyx'].includes(appStore.HOSPITAL_ID) && (record.type == 'radio' || record.type == 'multiple_select'))) {
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
        } else {
          return <span></span>
        }
      }
    },
    {
      title: "默认值 ",
      width: 100,
      align: "center",
      dataIndex: 'defaultValue',
      className: "input-cell",
      render(text: any, record: any) {
        /*文件，签名，不可编辑*/
        return (
            <Input
                disabled={['attachment','sign'].includes(record.type) }
                value={text}
                onChange={e => {
                  record.defaultValue = e.target.value;
                  updateDataSource()
                }}
            />
        );
      }
    },
    /*默认关闭*/
    {
      title: "是否开启默认值 ",
      width: 80,
      align: "center",
      dataIndex: 'defaultUse',
      render(text: boolean, record: any) {
        return <Switch defaultChecked={text} checked={text} onChange={(checked: boolean) => {
          if(!record.defaultValue){
             message.info('未填写默认值')
            record.defaultUse = text
            return  updateDataSource()
          }
          record.defaultUse = checked
          updateDataSource()
        }}/>
      }
    },
    /*默认开启*/
    {
      title: "是否必填项 ",
      width: 80,
      align: "center",
      dataIndex: 'nullUse',
      render(text: boolean, record: any) {
        return <Switch defaultChecked={text} onChange={(checked: boolean) => {
          record.nullUse = checked
          updateDataSource()
        }}/>
      }
    },
    {
      title: " 操作 ",
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={()=>handleCopy(index)}>复制</span>
            <span
                onClick={() => {
                  globalModal
                      .confirm("删除确认", "你确定删除该配置项吗？")
                      .then(res => {
                        delRow(index);
                      });
                }}>
                  删除
                </span>
          </DoCon>
        );
      }
    }
  ];
const handleCopy =(index:number)=>{
    let obj = dataSource.filter((item:any,key:number)=>key == index)
    let newItem = JSON.parse(JSON.stringify(obj))
  console.log("newItem===",newItem);
  // if(newItem.id)delete  newItem.id
  /* 如果已经有id 需要删除   let newItem = JSON.parse(JSON.stringify(item)) */
  // obj.
  let newDataSource = [...newItem, ...dataSource]
  setDataSource([])
  setTimeout(() => {
    setDataSource(newDataSource)
  })
}
  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };

  const delRow = (index: number) => {
    let params = JSON.parse(JSON.stringify(dataSource))
     params.splice(index, 1)
     setDataSource([])
     setTimeout(() => setDataSource(params))
    // if (params[index].oldItemCode) {
    //   params.splice(index, 1)
    //
    //   wardRegisterDefaultService
    //     .saveOrUpdateItemConfig(registerCode, blockId,
    //       params.filter((item: any) => item.oldItemCode))
    //     .then(res => {
    //       message.success('删除成功')
    //
    //       setDataSource([])
    //       setTimeout(() => setDataSource(params))
    //     })
    // } else {
    //   params.splice(index, 1)
    //   setDataSource([])
    //   setTimeout(() => setDataSource(params))
    // }
  };
  const addRow = () => {
    dataSource.push({ type: 'text', itemCode: '',nullUse:true,defaultUse:false});
    updateDataSource();
  };

  const onSave = () => {
    let contentText:string =''
    let indexList = dataSource
        .map((item: any, index: number) => {
          if (!item.title || !item.type) {
            return index;
          }
          return null;
        })
        .filter((index:number) => index !== null);
    if (indexList.length > 0) {
      for (let i = 0; i < indexList.length; i++) {
         contentText = indexList.map((index:number) => `第${index + 1}条数据没有设置完整内容，请设置完成后保存!`).join('<br>');
      }
      message.info(contentText);
      return; // Stop further execution since there are incomplete items
    }
    let params={
      id:queryObj.id,
      isUse:queryObj.isUse,
      latHandbookFormItemList:dataSource
    }
    setPageLoading(true);
    trainingSettingApi.updateFormItem(params).then((res:any)=>{
          message.success('保存成功')
          setPageLoading(false);

          getData();
    })
    //     "latHandbookFormItemList": [
    //         {
    //             "title": "string",
    //             "type": "string",
    //             "options": "string",
    //             "width": "string",
    //             "defaultValue": "string"
    //         }
    //     ]
    // wardRegisterDefaultService
    //   .saveOrUpdateItemConfig(registerCode, blockId, dataSource)
    //   .then(res => {
    //     setPageLoading(false);
    //     getData();
    //     onOkCallBack();
    //   });
  };
  const getData = () => {
    setPageLoading(true);
    trainingSettingApi.getTemplateItems({
      id:queryObj.id,
      templateType:2
    }).then((res:any)=>{
      res.data.map((it: any) => {
        if (it.type != '') {
          it.cascaderCode = [it.type]
        }
      })
      setDataSource(res.data);
      setPageLoading(false);
    })
  };
  useEffect(() => {
    getData();
  }, [queryObj.id]);

  return (
    <Wrapper>
      <ToolCon>
        <Place />
        {/*{selectedBlockObj &&*/}
        {/*  selectedBlockObj.itemSizeEditable &&*/}
        {/*  (*/}
        {/*    <Button onClick={addRow}>添加</Button>*/}
        {/*  )}*/}
        <Button onClick={addRow}>添加</Button>
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
.required-cell{
  .ant-table-column-title :before{
    content: '*';
    color: red;
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
