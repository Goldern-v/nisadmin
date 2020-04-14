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
import emitter from "src/libs/ev";
import { globalModal } from "src/global/globalModal";
import update from "immutability-helper";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import { codeAdapter } from "src/modules/WardRegister/utils/codeAdapter";
export interface Props {
  blockId: any;
  registerCode: any;
  onOkCallBack: any;
}

export default observer(function SetTittle(props: Props) {
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource]: any[] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [moveAble, setMoveAble] = useState(false);
  const { blockId, registerCode, onOkCallBack } = props;

  const defaultOptions = [
    { name: '√', value: '√' },
    { name: '×', value: '×' },
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: "项目名称",
      dataIndex: "itemCode",
      align: "center",
      className: "input-cell",
      width: 150,
      render(text: any, record: any, index: any) {
        return (
          <Input
            onChange={e => {
              record.itemCode = e.target.value;
            }}
            onBlur={() => updateDataSource()}
            defaultValue={text}
          />
        );
      }
    },
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
        QCRG_01: [
          {
            title: "基数",
            width: 100,
            dataIndex: "checkSize",
            className: "input-cell",
            render(text: any, record: any, index: any) {
              return (
                <InputNumber
                  defaultValue={text}
                  onChange={value => {
                    record.checkSize = value;
                  }}
                  onBlur={() => updateDataSource()}
                />
              );
            }
          }
        ],
        QCRG_02: []
      },
      registerCode
    ),

    {
      title: "下拉选项预设值(值之前用;隔开)",
      dataIndex: "options",
      width: 300,
      className: "input-cell",
      render(text: any, record: any, index: any) {
        return (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={(value: any) => {
              record.options = value.join(";");
              updateDataSource();
            }}
            value={text ? text.split(";") : []}
            // open={false}
            tokenSeparators={[";", "；"]}>
            {defaultOptions.map((item: any, idx: number) =>
              <Select.Option
                key={idx}
                value={item.value}>
                {item.name}
              </Select.Option>)}
          </Select>
        );
      }
    },
    {
      title: " 操作 ",
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
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
          </DoCon>
        );
      }
    }
  ];

  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };

  const delRow = (index: number) => {
    dataSource.splice(index, 1);
    updateDataSource();
  };
  const addRow = () => {
    dataSource.push({});
    updateDataSource();
  };

  const onSave = () => {
    wardRegisterService
      .saveOrUpdateItemConfig(registerCode, blockId, dataSource)
      .then(res => {
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
  };

  useEffect(() => {
    getData();
  }, []);

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
        <Button onClick={addRow}>添加</Button>
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
  .input-cell {
    padding: 0 !important;
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

    .ant-select{
      .ant-select-remove-icon{
        color: #00A680;
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
