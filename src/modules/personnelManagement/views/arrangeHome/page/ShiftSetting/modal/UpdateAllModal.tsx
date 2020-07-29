import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Modal, message as Message, Switch, Tag, Input } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import service from "src/services/api";
import { scheduleStore, authStore, appStore } from "src/stores";
import { arrangeService } from "../../../services/ArrangeService";
import {
  ColumnProps,
  message,
  Select,
  InputNumber,
  AutoComplete
} from "src/vendors/antd";
export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default function TypeEditModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [shiftList, setShiftList] = useState(new Array());
  const [tableLoading, setTableLoading] = useState(false);
  const [disableArrangeList, setDisableArrangeList]: any = useState([]);
  const [colorMap, setColorMap]: [any, any] = useState({});
  const [colorMapCN, setColorMapCN]: [any, any] = useState({});
  const [colorList, setColorList] = useState([]);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: any) => index + 1
    },
    {
      title: "列入排班",
      dataIndex: "status",
      key: "是否排班",
      width: 80,
      align: "center",
      render: (text: any, record: any, index: any) =>
        record.id ? (
          <span>
            <Switch
              size="small"
              onChange={(check: any) => {
                record.status = check;
                setShiftList([...shiftList]);
              }}
              checked={text}
            />
          </span>
        ) : (
          ""
        )
    },
    {
      title: "班次名称",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 150
    },
    {
      title: "类别",
      dataIndex: "shiftType",
      key: "shiftType",
      align: "center",
      width: 100
    },
    {
      title: "颜色标记",
      dataIndex: "nameColor",
      key: "nameColor",
      align: "center",
      width: 100,
      render: (text: string, record: any) => {
        return text && text.length > 0 ? (
          <Select
            showArrow={false}
            defaultValue={text}
            onChange={(val: any) => {
              record.nameColor = val;
              setShiftList([...shiftList]);
            }}
          >
            {colorList.map((item: any, index: number) => (
              <Select.Option key={index} value={item.code}>
                <span>
                  <Tag key={text} color={item.code}>
                    {colorMapCN[item.code]}
                  </Tag>
                </span>
              </Select.Option>
            ))}
          </Select>
        ) : (
          ""
        );
      }
    },
    {
      title: "上班时间",
      dataIndex: "workTime",
      key: "workTime",
      align: "center",
      width: 150,
      render: (text: string, record: any) => {
        return (
          <Input
            defaultValue={text}
            onChange={(e: any) => {
              record.workTime = e.target.value;
              setShiftList([...shiftList]);
            }}
          />
        );
      }
    },
    {
      title: "工时(小时）",
      dataIndex: "effectiveTime",
      key: "effectiveTime",
      align: "center",
      width: 90,
      render: (text: string, record: any) => {
        return (
          <Input
            defaultValue={text}
            onChange={(e: any) => {
              record.effectiveTime = e.target.value;
              setShiftList([...shiftList]);
            }}
          />
        );
      }
    },
    {
      title: "白小时数",
      dataIndex: "settingMorningHour",
      key: "settingMorningHour",
      align: "center",
      width: 90,
      render: (text: string, record: any) => {
        return (
          <Input
            defaultValue={text}
            onChange={(e: any) => {
              record.settingMorningHour = e.target.value;
              setShiftList([...shiftList]);
            }}
          />
        );
      }
    },
    {
      title: "夜小时数",
      dataIndex: "settingNightHour",
      key: "settingNightHour",
      align: "center",
      width: 90,
      render: (text: string, record: any) => {
        return (
          <Input
            defaultValue={text}
            onChange={(e: any) => {
              record.settingNightHour = e.target.value;
              setShiftList([...shiftList]);
            }}
          />
        );
      }
    },
    {
      title: "  周班次数",
      dataIndex: "rangeLimit",
      key: "rangeLimit",
      align: "center",
      width: 70,
      render: (text: string, record: any) => {
        return (
          <Input
            defaultValue={text}
            onChange={(e: any) => {
              record.rangeLimit = e.target.value;
              setShiftList([...shiftList]);
            }}
          />
        );
      }
    }
  ];

  // 初始化页面渲染
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let deptCode = scheduleStore.getDeptCode();
        setTableLoading(true);
        service.commonApiService
          .multiDictInfo(["sch_range_shift_type", "sch_range_color"])
          .then(res => {
            setColorList(res.data.sch_range_color);
          });
        service.scheduleShiftApiService
          .getShiftListByCode(deptCode)
          .then(res => {
            setTableLoading(false);
            setShiftList(res.data);
          });
        service.commonApiService.dictInfo("sch_range_no_change").then(res => {
          setDisableArrangeList(res.data.map((item: any) => item.name));
        });
        service.commonApiService.dictInfo("sch_range_color").then(res => {
          let colorMap: any = {};
          let colorMapCN: any = {};
          res.data.map((item: any) => {
            colorMap[item.name] = item.code;
            colorMapCN[item.code] = item.name;
          });
          setColorMap(colorMap);
          setColorMapCN(colorMapCN);
        });
      }, 100);
    }
  }, [visible]);

  // 确定保存
  const checkForm = () => {
    shiftList.map((item: any) => {
      item.settingMorningHour = item.settingMorningHour
        ? item.settingMorningHour
        : 0;
      item.settingNightHour = item.settingNightHour ? item.settingNightHour : 0;
    });
    arrangeService
      .schShiftRangeNanYiSanUpdateList(shiftList)
      .then((res: any) => {
        if (res.code == "200") {
          message.success("批量修改成功！");
        } else {
          message.warning(`${res.desc}`);
        }
        onOk();
      });
  };

  // 取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={1200}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title="批量修改"
    >
      <Wrapper>
        <BaseTable
          bordered
          size="small"
          columns={columns}
          dataSource={shiftList}
          pagination={false}
          surplusHeight={300}
          fixedFooter={true}
          loading={tableLoading}
        />
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .ant-input {
    border: 0;
    border-radius: 0;
    text-align: center;
    outline: 0;
    box-shadow: none !important;
    padding: 4px;
  }
  .ant-select {
    width: 100%;
    border-radius: 0;
  }
  .ant-select-disabled .ant-select-selection {
    background: rgba(0, 0, 0, 0) !important;
  }
  .ant-select-selection {
    border: none !important;
    box-shadow: none !important;
    &:hover {
      border: none !important;
      box-shadow: none !important;
    }
  }
  .ant-select-selection-selected-value {
    margin-left: 26px !important;
  }
`;
