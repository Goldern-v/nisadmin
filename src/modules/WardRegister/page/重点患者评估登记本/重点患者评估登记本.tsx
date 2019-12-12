import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "antd";
import BaseTable from "src/components/BaseTable";
import {
  ColumnProps,
  PaginationConfig,
  AutoComplete,
  message,
  Input,
  Select,
  DatePicker,
  Popover
} from "src/vendors/antd";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { PageHeader, Place } from "src/components/common";
import DeptSelect from "src/components/DeptSelect";
import createModal from "src/libs/createModal";
import SettingModal from "./modal/SettingModal";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import { signRowObj } from "../../utils/signRowObj";
import { NullBox } from "../../components/NullBox";
import { TableCon, Wrapper } from "../../utils/style/style";
import { getFun } from "../../utils/fun/fun";
import { createFilterItem } from "../../components/FilterItem";
import classNames from "classnames";
export interface Props {
  payload: any;
}

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 重点患者评估登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangConfigList, setRangeConfigList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [date, setDate]: any = useState([null, null]);
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  const settingModal = createModal(SettingModal);
  const updateDataSource = () => {
    throttler2(() => {
      setDataSource([...dataSource]);
    });
  };

  const bcFilterItem = createFilterItem(
    "班次",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const wzcdFilterItem = createFilterItem(
    "危重程度",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );

  const hljbFilterItem = createFilterItem(
    "护理级别",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );

  const zlnlFilterItem = createFilterItem(
    "自理能力",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const yzlxFilterItem = createFilterItem(
    "医嘱类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const zgFilterItem = createFilterItem(
    "转归",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const ypglflFilterItem = createFilterItem(
    "药品管理分类",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );

  const popoverContent = codeAdapter(
    {
      QCRG_03: (
        <div>
          <wzcdFilterItem.Component />
          <hljbFilterItem.Component />
          <zlnlFilterItem.Component />
        </div>
      ),
      QCRG_04: (
        <div>
          <bcFilterItem.Component />
          <yzlxFilterItem.Component />
        </div>
      ),
      QCRG_05: null,
      QCRG_08: (
        <div>
          <zgFilterItem.Component />
        </div>
      ),
      QCRG_10: (
        <div>
          <ypglflFilterItem.Component />
        </div>
      )
    },
    registerCode
  );

  /** 判断是否快过期 */
  const isEndTime = (current: string, endTime: string) => {
    var currentDate = moment(current);
    var endTimeDate = moment(endTime);
    if (
      currentDate.isValid() &&
      endTimeDate.isValid() &&
      current &&
      endTime &&
      registerCode == "QCRG_10"
    ) {
      let m = endTimeDate.diff(currentDate, "M");
      if (m < 1) return "color-red";
      if (m < 3) return "color-orange";
    }
    return "";
  };

  const columns: ColumnProps<any>[] | any = [
    {
      title: "日期",
      dataIndex: "recordDate",
      align: "center",
      className: "input-cell",
      width: 100,
      render(text: string, record: any, index: number) {
        return (
          <Input
            disabled={!!record.signerName}
            defaultValue={text}
            onChange={value => {
              record.recordDate = value;
            }}
            onBlur={() => updateDataSource()}
            className={isEndTime(record.recordDate, record.有效期) || ""}
          />
        );
      }
    },
    codeAdapter(
      {
        QCRG_04: {
          title: "班次",
          width: 73,
          dataIndex: "range",
          align: "center"
        }
      },
      registerCode
    ),
    ...itemConfigList.map((item: any) => {
      return {
        title: item.itemCode,
        align: "center",
        className: "input-cell",
        width: (15 * item.width || 50) + 8,
        dataIndex: item.itemCode,
        render(text: string, record: any, index: number) {
          return (
            <AutoComplete
              className={classNames({
                "warning-value": text == "未完成",
                [isEndTime(record.recordDate, record.有效期)]: isEndTime(
                  record.recordDate,
                  record.有效期
                )
              })}
              disabled={!!record.signerName}
              dataSource={
                item.options
                  ? item.options.split(";").map((item: any) => item || " ")
                  : undefined
              }
              defaultValue={text}
              onChange={value => {
                record[item.itemCode] = value;
              }}
              onBlur={() => updateDataSource()}
              onSelect={() => updateDataSource()}
            />
          );
        }
      };
    }),

    ...codeAdapter(
      {
        QCRG_03: [
          signRowObj({
            title: "护士长",
            width: 70,
            dataIndex: "signerName",
            aside: "交班",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_04: [
          signRowObj({
            title: "签名",
            width: 70,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "护士长签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_05: [
          signRowObj({
            title: "检查者签名",
            width: 70,
            dataIndex: "signerName",
            aside: "检查者",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_08: [
          signRowObj({
            title: "责护签名",
            width: 70,
            dataIndex: "signerName",
            aside: "责护",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_10: [
          signRowObj({
            title: "备注者签名",
            width: 70,
            dataIndex: "signerName",
            aside: "备注者",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "护士长签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        other: []
      },
      registerCode
    )
  ];
  /** 查询参数 */
  const paramMap = {
    ...wzcdFilterItem.value,
    ...hljbFilterItem.value,
    ...zlnlFilterItem.value,
    ...bcFilterItem.value
  };
  /** 公共函数 */
  const {
    onInitData,
    getPage,
    onAddBlock,
    onSave,
    onDelete,
    createRow
  } = getFun({
    registerCode,
    setBlockList,
    setSelectedBlockId,
    setPageOptions,
    pageOptions,
    setTotal,
    setDataSource,
    setItemConfigList,
    setRangeConfigList,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    paramMap
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedBlockId]);

  return (
    <Container>
      <PageHeader>
        <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
          修订登记本
        </Button>
        <span className="label">修订记录</span>
        <Select
          value={selectedBlockId}
          onChange={(value: any) => {
            setSelectedBlockId(value);
          }}
        >
          {blockList.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {item.registerName +
                " " +
                moment(item.createTime).format("MM-DD")}
            </Select.Option>
          ))}
        </Select>
        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => setDate(value)}
          allowClear={true}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect onChange={() => {}} style={{ width: 150 }} />
        {popoverContent && (
          <Popover
            placement="bottom"
            title={"筛选条件"}
            visible={popoverVisible}
            content={popoverContent}
            trigger="hover"
            onVisibleChange={visible => setPopoverVisible(visible)}
          >
            <Button>筛选</Button>
          </Popover>
        )}

        <Place />

        {selectedBlockId && (
          <React.Fragment>
            <Button onClick={getPage}>查询</Button>
            <Button type="primary" onClick={createRow}>
              新建行
            </Button>
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
            <Button>导出</Button>
            <Button
              onClick={() =>
                settingModal.show({
                  blockId: selectedBlockId,
                  registerCode,
                  onOkCallBack: () => {
                    getPage();
                  }
                })
              }
            >
              设置
            </Button>
            <Button onClick={onDelete}>删除</Button>
          </React.Fragment>
        )}
      </PageHeader>
      <TableCon>
        {selectedBlockId && itemConfigList.length ? (
          <BaseTable
            loading={pageLoading}
            dataSource={dataSource}
            columns={columns.filter((item: any) => item)}
            surplusHeight={220}
            surplusWidth={300}
            pagination={{
              current: pageOptions.pageIndex,
              pageSize: pageOptions.pageSize,
              total: total
            }}
            onChange={(pagination: PaginationConfig) => {
              setPageOptions({
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
              });
            }}
          />
        ) : (
          <NullBox onClick={onAddBlock} text={"创建登记本"} />
        )}
      </TableCon>
      <settingModal.Component />
    </Container>
  );
});

const Container = styled(Wrapper)`
  .color-red,
  .color-red * {
    color: red !important;
  }
  .color-orange,
  .color-orange * {
    color: orange !important;
  }
`;
