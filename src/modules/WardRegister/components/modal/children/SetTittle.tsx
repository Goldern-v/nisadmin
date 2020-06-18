import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

import {
  ColumnProps,
  message,
  Select,
  InputNumber,
  Input,
  Switch
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { wardRegisterService } from "src/modules/WardRegister/services/WardRegisterService";
import { authStore, appStore } from "src/stores";
// import emitter from "src/libs/ev";
import { globalModal } from "src/global/globalModal";
import update from "immutability-helper";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import { codeAdapter } from "src/modules/WardRegister/utils/codeAdapter";
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

  // const showEmpName = [
  //   "责任护士",
  //   "人员调配",
  //   "责任组长",
  //   "签名",
  //   "护士长签名",
  //   "责任人",
  //   "责护名字",
  //   "消毒液擦拭床单位执行者",
  //   "床单位消毒机消毒执行者",
  //   "带教老师签名",
  //   "带教组长签名"
  // ];

  //不允许删除的选项
  const staticOptions: { [p: string]: string[] } =
    codeAdapter({
      QCRG_06: {
        '消毒类别': [
          '无水酒精擦拭灯管',
          '更换灯管'
        ]
      },
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
    'QCRG_01,QCRG_02,QCRG_07,QCRG_12,QCRG_20_1,QCRG_20_2': [
      { name: '√', value: '√' },
      { name: '×', value: '×' },
    ],
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
        QCRG_01: [],
        other: [
          {
            title: "类型",
            dataIndex: "itemType",
            className: "input-cell",
            width: 100,
            render: (text: any, record: any, index: any) => {
              return <Select
                value={text}
                onChange={(val: string) => {
                  record.itemType = val
                  record.options = ''
                  updateDataSource()
                }}>
                <Option value="">下拉选项</Option>
                <Option value="ward_user">科室护士</Option>
                <Option value="attachment">附件上传</Option>
                {codeAdapter({
                  QCRG_08: <Option value="date">日期选择</Option>,
                  other: null,
                }, registerCode, true)}
              </Select>
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
        QCRG_01: [baseNumCol],
        QCRG_12: [baseNumCol],
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
        if (record.itemType == 'date') {
          return <span></span>
        } else if (record.itemType == 'attachment') {
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
        } else {
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
        }
      }
    },
    {
      title: " 操作 ",
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            {selectedBlockObj && selectedBlockObj.itemSizeEditable && (
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

    params.splice(index, 1)

    wardRegisterService
      .saveOrUpdateItemConfig(registerCode, blockId, params)
      .then(res => {
        message.success('删除成功')
        dataSource.splice(index, 1)
        updateDataSource()
      })
  };
  const addRow = () => {
    dataSource.push({});
    updateDataSource();
  };

  const onSave = () => {
    setPageLoading(true);
    wardRegisterService
      .saveOrUpdateItemConfig(registerCode, blockId, dataSource)
      .then(res => {
        setPageLoading(false);
        getData();
        onOkCallBack();
      });
  };
  const getData = () => {
    setPageLoading(true);
    wardRegisterService
      .getItemConfigByBlockId(registerCode, blockId)
      .then(res => {
        setDataSource(res.data.itemList);
        setPageLoading(false);
      });
    service.commonApiService
      .userDictInfo(authStore.selectedDeptCode)
      .then(res => setEmpNameList(res.data.map((item: any) => item.name)));
  };

  useEffect(() => {
    getData();
  }, []);

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
        {selectedBlockObj && selectedBlockObj.itemSizeEditable && (
          <Button onClick={addRow}>添加</Button>
        )}
        <Button onClick={onSave} type="primary">
          保存
        </Button>
      </ToolCon>
      <EditTableCon>
        <BaseTable
          rowKey="itemCode"
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
