import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

import {
  ColumnProps,
  message,
  Select,
  InputNumber,
  Input,
  Switch,
  AutoComplete
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { wardRegisterService } from "src/modules/WardRegister/services/WardRegisterService";
import { authStore, appStore } from "src/stores";
import emitter from "src/libs/ev";
import { globalModal } from "src/global/globalModal";
import update from "immutability-helper";
import { Place } from "src/components/common";
import { observer } from "mobx-react-lite";
import _ from "lodash";
export interface Props {
  blockId: any;
  registerCode: any;
  onOkCallBack: any;
}

export default observer(function SetRange(props: Props) {
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource]: any[] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [moveAble, setMoveAble] = useState(false);
  const [rangeDictMap, setRangeDictMap]: any = useState({});
  const { blockId, registerCode, onOkCallBack } = props;
  const columns: ColumnProps<any>[] = [
    {
      title: "项目名称",
      dataIndex: "itemCode",
      align: "center",
      className: "input-cell",
      width: 150,
      render(text: any, record: any, index: any) {
        return (
          <AutoComplete
            onChange={value => {
              record.itemCode = value;
            }}
            onBlur={() => updateDataSource()}
            defaultValue={text}
            dataSource={Object.keys(rangeDictMap)}
          />
        );
      }
    },

    {
      title: "关联任务提醒(值之前用;隔开)",
      dataIndex: "vsRange",
      width: 300,
      className: "input-cell",
      render(text: any, record: any, index: any) {
        return (
          <Select
            mode="tags"
            style={{ width: "100%" }}
            onChange={(value: any) => {
              record.vsRange = value.join(";");
              updateDataSource();
            }}
            value={text ? text.split(";") : []}
            tokenSeparators={[";"]}
          >
            {(rangeDictMap[record.itemCode] || []).map((item: any) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
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
    setPageLoading(true);
    wardRegisterService
      .saveOrUpdateRangeConfig(blockId, dataSource)
      .then(res => {
        setPageLoading(false);
        getData();
        onOkCallBack();
      });
  };
  const getData = () => {
    setPageLoading(true);
    wardRegisterService.getRangeConfigByBlockId(blockId).then(res => {
      setDataSource(res.data.itemList);
      setPageLoading(false);
    });
    wardRegisterService.getArrangeMenu().then(res => {
      let map = _.groupBy(res.data, (item: any) => item.shiftType);
      console.log(map, "map");
      setRangeDictMap(map);
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
