import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import {
  ColumnProps,
  // PaginationConfig,
  // AutoComplete,
  // message,
  Input,
  Select,
  DatePicker,
  Popover
} from "src/vendors/antd";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { PageHeader, Place } from "src/components/common";
import DeptSelect from "src/components/DeptSelect";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import { NullBox } from "../../components/NullBox";
import { TableCon, Wrapper } from "../../utils/style/style";
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import { createFilterItem } from "../../components/Render.v1/FilterItem";
import classNames from "classnames";
// import { getCurrentMonth } from 'src/utils/date/currentMonth'
import { getSeaonsStartAndEnd } from 'src/utils/date/season'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'

export interface Props {
  payload: any;
}

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 中医护理方案季度评价总结表(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList]: any = useState([]);
  const [dataMap, setDataMap]: any = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [surplusHeight, setSurplusHeight]: any = useState(220);
  const [date, setDate]: any = useState(getSeaonsStartAndEnd());
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])

  const updateDataSource = (isAll?: boolean) => {
    if (isAll) {
      setDataSource([]);
      setDataSource([...dataSource]);
    } else {
      throttler2(() => {
        setDataSource([...dataSource]);
      });
    }
  };

  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  );

  const columns: ColumnProps<any>[] | any = [
    //后端返回的自定义项目
    ...itemConfigList.map((item: any) => {
      return {
        title: item.children ? (
          <PTitleTh>
            <MergeTitle>
              <pre>{item.pTitle || item.itemCode}</pre>
            </MergeTitle>
            <PTitleCon>
              {item.children.map(
                (cItem: ItemConfigItem, index: number, arr: any) => (
                  <CTitleBox
                    key={index}
                    style={{
                      ...{ flex: (15 * cItem.width || 50) + 8, width: 0 },
                      ...(index == arr.length - 1 ? { border: 0 } : {})
                    }}
                  >
                    {cItem.checkSize ? (
                      <ThBox>
                        <div className="title">
                          <span className="title-text">
                            <pre>
                              {cItem.label || cItem.itemCode}
                            </pre>
                          </span>
                        </div>
                        <div className="aside">{cItem.checkSize}</div>
                      </ThBox>
                    ) : (
                        <span className="title-text">
                          <pre>
                            {cItem.label || cItem.itemCode}
                          </pre>
                        </span>
                      )}
                  </CTitleBox>
                )
              )}
            </PTitleCon>
          </PTitleTh>
        ) : item.checkSize ? (
          () => (
            <ThBox>
              <div className="title"><span className="title-text">
                <pre>
                  {item.itemCode}
                </pre>
              </span>
              </div>
              <div className="aside">{item.checkSize}</div>
            </ThBox>
          )
        ) : (
              <pre>
                {item.label || item.itemCode}
              </pre>
            ),
        align: "center",
        className: "input-cell",
        colSpan: item.colSpan,
        width: (15 * item.width || 50) + 8,
        dataIndex: item.itemCode,
        render(text: string, record: any, index: number) {
          let children: JSX.Element
          let childrenClassName = classNames({
            "warning-value": text == "未完成",
            "checkSize-warning":
              item.checkSize && (text != item.checkSize && text != "√")
          })

          children = <InputColumnRender
            {...{
              cellDisabled,
              options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
              record,
              className: childrenClassName,
              itemCode: item.itemCode,
              updateDataSource,
              handleNextIptFocus,
              onBlur: (newVal: string, oldVal: any) => {
                if (registerCode == 'QCRG_16_1' && item.itemCode == '并发症类型') {
                  if (newVal != oldVal && (newVal == '导管相关感染' || oldVal == '导管相关感染')) {
                    record['培养结果'] = ''
                    record['检验结果粘贴处'] = ''
                    updateDataSource()
                  }
                }
              },
            }}
          />

          let obj = {
            children
          };
          return obj;
        }
      };
    }),
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
  ]

  const handleSelectedChange = (payload: any[]) => {
    setSelectedRowKeys(payload)
    // console.log(payload)
  }

  /** 公共函数 */
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
    handleUpload,
    handleDeleteRow,
    handleAuditAll,
    fixInputValue,
    handleCopyCreateRow,
    deleteSelectedRows
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
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    selectedRowKeys,
    setSelectedRowKeys,
    paramMap: {}
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedBlockId]);

  useLayoutEffect(() => {
    let tableHead: any = document.querySelector(".ant-table-thead");
    if (tableHead) {
      setSurplusHeight(tableHead.offsetHeight + 180);
    }
  });

  return <Container>
    <PageHeader>
      {authStore.isNotANormalNurse && (
        <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
          新建
        </Button>
      )}
      <span className="label">记录</span>
      <Select
        value={selectedBlockId}
        onChange={(value: any) => {
          setSelectedBlockId(value)
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
          {authStore.isNotANormalNurse && (
            <Button onClick={onDelete}>删除</Button>
          )}
        </React.Fragment>
      )}
    </PageHeader>
    <Place />
    <TableCon>
      {selectedBlockId ? (
        <React.Fragment>
          <BaseTable
            className="record-page-table"
            loading={pageLoading}
            dataSource={dataSource}
            rowSelection={{
              selectedRowKeys,
              onChange: handleSelectedChange,
            }}
            columns={columns.filter((item: any) => item)}
            surplusHeight={surplusHeight}
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
          />
          <div className="selected-operate-con">
            <Button
              disabled={
                pageLoading ||
                selectedRowKeys.length <= 0
              }
              type="primary"
              onClick={() => handleCopyCreateRow()}>
              复制新增
                    </Button>
            <Button
              disabled={
                pageLoading ||
                selectedRowKeys.length <= 0
              } type="primary"
              onClick={() => deleteSelectedRows()}>
              删除
            </Button>
          </div>
        </React.Fragment>
      ) : (
          <NullBox
            onClick={onAddBlock}
            text={"创建登记本"}
            registerName={registerName}
          />
        )}
    </TableCon>
  </Container>
})

const Container = styled(Wrapper)`
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .ant-input[disabled]{
      color: #000!important;
        background: rgba(0,0,0,0.0)!important;
    }
  }
  
  .ant-input[disabled]{
    color: #000!important;
    background: rgba(0,0,0,0.03)!important;
  }

  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }

  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
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

const PTitleTh = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PTitleCon = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  .title-text {
    display: block;
    padding: 4px 0;
  }
`;
const CTitleBox = styled.div`
  flex: 1;
  border-right: 1px solid #e8e8e8;
  box-sizing: content-box;
  /* padding: 4px 0; */
`;

const MergeTitle = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid #e8e8e8;
`;

const DisableSpan = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
`