import styled from "styled-components";
import React, { useState, useEffect } from "react";
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
import { wardRegisterService } from "../../services/WardRegisterService";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { globalModal } from "src/global/globalModal";
import { DoCon } from "src/modules/nurseFiles/view/nurseFiles-hj/views/nurseFilesList/NurseFilesListView";
import { arrangeService } from "src/modules/personnelManagement/views/arrangeHome/services/ArrangeService";
import service from "src/services/api";
import { PageHeader, Place } from "src/components/common";
import DeptSelect from "src/components/DeptSelect";
import createModal from "src/libs/createModal";
import SettingModal from "./modal/SettingModal";
import { wardLogService } from "src/modules/wardLog/services/WardLogService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import { useLayoutEffect } from "src/types/react";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import { signRowObj } from "../../utils/signRowObj";
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import DatePickerColumnRender from '../../components/Render.v1/DatePickerColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'
import { createFilterItem } from "../../components/Render.v1/FilterItem"
export interface Props {
  payload: any;
}

const TextArea = Input.TextArea

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 紫外线空气消毒登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);

  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [date, setDate]: any = useState([null, null]);
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  );
  const [popoverVisible, setPopoverVisible]: any = useState(false);

  const settingModal = createModal(SettingModal);
  const updateDataSource = () => {
    throttler2(() => {
      setDataSource([...dataSource]);
    });
  };

  const xdlbFilter = createFilterItem(
    "消毒类别",
    itemConfigList,
    [],
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  )

  const syffFilter = createFilterItem(
    "使用方法",
    itemConfigList,
    [],
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  )

  const syddFilter = createFilterItem(
    "使用地点",
    itemConfigList,
    [],
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  )

  /** 查询参数 */
  const paramMap = {
    ...xdlbFilter.value,
    ...syffFilter.value,
    ...syddFilter.value,
  }

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
            disabled={cellDisabled(record)}
            defaultValue={text}
            onChange={(e: any) => {
              record.modified = true
              record.recordDate = e.target.value;
            }}
            onKeyUp={handleNextIptFocus}
            onBlur={() => updateDataSource()}
          />
        );
      }
    },
    ...itemConfigList.map((item: any) => {
      return {
        title: item.itemCode,
        align: "center",
        className: "input-cell",
        width: (15 * item.width || 50) + 8,
        dataIndex: item.itemCode,
        render(text: string, record: any, index: number) {
          let children: JSX.Element

          let dateItemCodeArr = ['开始时间', '结束时间']
          if (dateItemCodeArr.indexOf(item.itemCode) >= 0) {
            children = <DatePickerColumnRender
              {...{
                className: '',
                cellDisabled,
                record,
                itemCfg: item,
                index,
                format: "YYYY-MM-DD HH:mm",
                showTime: true,
                handleNextIptFocus,
                updateDataSource,
                registerCode
              }}
            />
          } else {
            children = <InputColumnRender
              {...{
                cellDisabled,
                record,
                itemCfg: item,
                itemCode: item.itemCode,
                options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
                updateDataSource,
                handleNextIptFocus
              }} />
          }

          if (
            item.itemCode == "消毒类别" &&
            (text == "酒精擦拭灯管" || text == "更换灯管")
          ) {
            const obj = {
              children,
              props: {
                colSpan: itemConfigList.length
              }
            };
            return obj;
          }

          if (
            item.itemCode != "消毒类别" &&
            (record["消毒类别"] == "酒精擦拭灯管" ||
              record["消毒类别"] == "更换灯管")
          ) {
            const obj = {
              children,
              props: {
                colSpan: 0
              }
            };
            return obj;
          }

          return children;
        }
      };
    }),

    ...codeAdapter(
      {
        QCRG_06: [
          signRowObj({
            title: "执行者",
            width: 70,
            dataIndex: "signerName",
            aside: "执行者",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ]
      },
      registerCode
    ),
    {
      title: "操作",
      width: 50,
      className: "",
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            {cellDisabled(record) ? (
              <aside style={{ color: "#aaa" }}>删除</aside>
            ) : (
                <span
                  onClick={() => handleDeleteRow(record, index)}>
                  删除
                </span>
              )}
          </DoCon>
        );
      }
    }
  ];

  const {
    onInitData,
    getPage,
    onAddBlock,
    onSave,
    onDelete,
    createRow,
    cellDisabled,
    exportExcel,
    handleNextIptFocus,
    handleDeleteRow,
    fixInputValue
  } = getFun({
    registerCode,
    registerName,
    setBlockList,
    setSelectedBlockId,
    setPageOptions,
    pageOptions,
    setTotal,
    setDataSource,
    setItemConfigList,
    setRangeConfigList: Function,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    paramMap
  })

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [
    pageOptions,
    date,
    // selectedWzcd, 
    selectedBlockId
  ]);

  return (
    <Wrapper>
      <PageHeader>
        {authStore.isNotANormalNurse &&
          <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
            修订登记本
        </Button>}
        <span className="label">修订记录</span>
        <Select
          value={selectedBlockId}
          onChange={(value: any) => {
            setSelectedBlockId(value);
            setPageOptions({ ...pageOptions, pageIndex: 1 })
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
        {/* <PageTitle>{pageTitle}</PageTitle> */}
        {/* <Place /> */}

        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => {
            setDate(value)
            setPageOptions({ ...pageOptions, pageIndex: 1 })
          }}
          allowClear={true}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect onChange={() => { }} style={{ width: 150 }} />
        <Popover
          placement="bottom"
          title={"筛选条件"}
          visible={popoverVisible}
          content={<div>
            <xdlbFilter.Component />
            <syffFilter.Component />
            <syddFilter.Component />
          </div>}
          trigger="hover"
          onVisibleChange={visible => setPopoverVisible(visible)}
        >
          <Button>筛选</Button>
        </Popover>
        <Place />

        {selectedBlockId && (
          <React.Fragment>
            <Button onClick={getPage}>查询</Button>
            <Button type="primary" onClick={createRow} disabled={pageLoading}>
              新建行
            </Button>
            <Button type="primary" onClick={onSave} disabled={pageLoading}>
              保存
            </Button>
            <Button onClick={exportExcel}>导出</Button>
            {authStore.isNotANormalNurse &&
              <Button
                onClick={() =>
                  settingModal.show({
                    selectedBlockObj,
                    blockId: selectedBlockId,
                    registerCode,
                    onOkCallBack: () => {
                      getPage();
                    }
                  })
                }
              >
                设置
            </Button>}
            {authStore.isNotANormalNurse &&
              <Button onClick={onDelete}>删除</Button>}
          </React.Fragment>
        )}
      </PageHeader>
      <TableCon>
        {selectedBlockId && itemConfigList.length ? (
          <BaseTable
            className="record-page-table"
            loading={pageLoading}
            dataSource={dataSource}
            columns={columns}
            surplusHeight={220}
            surplusWidth={300}
            useOuterPagination
            pagination={{
              onChange: (pageIndex: number) => {
                setPageOptions({ ...pageOptions, pageIndex })
              },
              onShowSizeChange: (pageIndex: number, pageSize: number) => {
                setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })
              },
              pageSizeOptions: ['20', '30', '40', '50', '100'],
              current: pageOptions.pageIndex,
              pageSize: pageOptions.pageSize,
              total: total
            }}
            rowClassName={(record: any, idx: number) => {
              if (cellDisabled(record)) return 'disabled-row'

              return ''
            }}
            onChange={(pagination: PaginationConfig) => {
              setPageOptions({
                pageIndex: pagination.current,
                pageSize: pagination.pageSize
              });
            }}
          />
        ) : (
            <NullBox onClick={onAddBlock} />
          )}
      </TableCon>
      <settingModal.Component />
    </Wrapper>
  );
});

function NullBox(props: any) {
  const { onClick } = props;
  const Wrapper = styled.div`
    width: 334px;
    height: 313px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid rgba(170, 170, 170, 1);
    margin: calc((100vh - 100px - 313px) / 2) auto;
    .file {
      width: 79px;
      display: block;
      margin: 63px auto 37px;
    }
    button {
      display: block;
      margin: 0 auto !important;
    }
  `;
  return (
    <Wrapper>
      <img
        src={require("../../images/登记本icon@2x.png")}
        alt=""
        className="file"
      />
      <Button type="primary" icon="file-add" size={"large"} onClick={onClick}>
        创建紫外线空气消毒登记本
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .label {
    margin-left: 10px !important;
    margin-right: 5px !important;
  }
  .ant-btn {
    margin-left: 5px;
    padding: 0 10px;
  }
  .warning-value {
    input {
      color: red;
    }
  }
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
  }
  .ant-input[disabled]{
    color: #000!important;
      background: rgba(0,0,0,0.0)!important;
  }
`;
const TableCon = styled.div`
  padding: 0 15px;
  .ant-table-header-column {
    height: 100%;
    > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .ant-table-column-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-select {
    width: 100%;
    border-radius: 0;
  }
  input {
    border: 0;
    border-radius: 0;
    text-align: center;
  }
  .input-cell {
    padding: 0 !important;
  }
  textarea {
    border: 0;
    border-radius: 0;
    height: 100%;
    width: 100%;
    outline: none;
    resize: none;
    /* margin: 0 -8px; */
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .sign-name {
    cursor: pointer;
  }
  .checkSize-warning {
    input {
      color: red;
    }
  }
  .ant-calendar-picker{
    i{
      opacity: 0;
    }
    &:hover{
      i{
        opacity: 1;
      }
    }
  }
`;

const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
    display: flex;
  }
  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`;

const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
`;

const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: #e8e8e8;
    stroke-width: 1;
  }
`;
const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${p => p.x};
  top: ${p => p.y};
  white-space: nowrap;
  transform: rotate(${p => p.deg}deg);
`;
