import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Col, message, Pagination, Row, Select } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import {
  ColumnProps,
  // PaginationConfig,
  // AutoComplete,
  // message,
  Input,
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
// import { getSeaonsStartAndEnd } from 'src/utils/date/season'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'
import SubTable from './components/SubTable'
import { wardRegisterService } from '../../services/WardRegisterService';
import { globalModal } from 'src/global/globalModal';
import YearPicker from 'src/components/YearPicker';
import { numToChinese } from 'src/utils/number/numToChinese';

const Option = Select.Option

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
  const [rangeConfigList, setRangeConfigList]: any = useState([]);
  const [dataMap, setDataMap]: any = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [surplusHeight, setSurplusHeight]: any = useState(540);
  // const [date, setDate]: any = useState(getSeaonsStartAndEnd());
  const [date, setDate]: any = useState([]);
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

  const zyzdFilterItem = createFilterItem(
    "中医诊断",
    itemConfigList,
    [],
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  )

  const popoverContent = <div>
    <zyzdFilterItem.Component />
  </div>

  /** 查询参数 */
  const paramMap = {
    ...zyzdFilterItem.value
  }

  /** 选中的blockObj */
  const selectedBlockObj: any = blockList.find(
    (item: any) => item.id == selectedBlockId
  ) || {};

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

  /**自定义 新增修订 弹窗*/
  const onAddBlock = () => {
    let createTime = ''

    globalModal
      .confirm(`是否新建${registerName}`,
        <ModalContent handleCreateTimeChange={(time: string) => createTime = time} registerName={registerName} />)
      .then(res => {
        // console.log(createTime)
        wardRegisterService
          .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode, { createTime })
          .then(res => {
            message.success("创建成功");
            onInitData();
          });
      }, err => console.log(err))
  };

  /** 公共函数 */
  const {
    onInitData,
    getPage,
    // onAddBlock,
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
    paramMap,
    setRangeConfigList,
    dataMap,
    setDataMap
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [
    pageOptions,
    date,
    selectedBlockId
  ]);

  useLayoutEffect(() => {
    let tableHead: any = document.querySelector(".ant-table-thead");
    if (tableHead) {
      setSurplusHeight(tableHead.offsetHeight + 400);
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
              moment(item.createTime).format("YYYY年") +
              `第${numToChinese(moment(item.createTime).quarter())}季度`}
          </Select.Option>
        ))}
      </Select>
      <span className="label">创建日期</span>
      <Input value={selectedBlockObj?.createTime || ''} style={{ width: 100 }} readOnly />
      <span className="label">科室</span>
      <DeptSelect onChange={() => { }} style={{ width: 150 }} />
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
    <TableCon>
      {selectedBlockId ? (
        <React.Fragment>
          <div className="main-table">
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
            // useOuterPagination
            // pagination={{
            //   onChange: (pageIndex: number) => {
            //     setPageOptions({ ...pageOptions, pageIndex })
            //   },
            //   onShowSizeChange: (pageIndex: number, pageSize: number) => {
            //     setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })
            //   },
            //   pageSizeOptions: ['20', '30', '40', '50', '100'],
            //   current: pageOptions.pageIndex,
            //   pageSize: pageOptions.pageSize,
            //   total: total
            // }}
            // rowClassName={(record: any, idx: number) => {
            //   if (cellDisabled(record)) return 'disabled-row'

            //   return ''
            // }}
            />
          </div>
          <div className="sub-part">
            <SubTable
              data={dataMap}
              onDataChange={(newDataMap: any) => setDataMap(newDataMap)} />
            <div style={{ textAlign: 'right' }}>
              <Pagination
                size="small"
                showSizeChanger
                onChange={(pageIndex: number) =>
                  setPageOptions({ ...pageOptions, pageIndex })}
                onShowSizeChange={(pageIndex: number, pageSize: number) =>
                  setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })}
                pageSizeOptions={['20', '30', '40', '50', '100']}
                current={pageOptions.pageIndex}
                pageSize={pageOptions.pageSize}
                total={total} />
            </div>
          </div>
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

const ModalContent = (props: {
  handleCreateTimeChange: Function,
  registerName: string,
}) => {
  const { handleCreateTimeChange, registerName } = props

  const [year, setYear] = useState(moment())
  const [quarter, setQuarter] = useState(1)
  const [time, setTime] = useState(moment())

  useEffect(() => {
    if (time)
      handleCreateTimeChange(time.format("YYYY-MM-DD"))
  }, [time])

  const handleYearOrQuarterChange = (_year: moment.Moment, _quarter: number) => {
    let yearStr = _year.format('YYYY')
    let dateStr = (() => {
      switch (_quarter) {
        case 2:
          return '04-01'
        case 3:
          return '07-01'
        case 4:
          return '10-01'
        default:
          return '01-01'
      }
    })()

    setTime(moment(`${yearStr}-${dateStr}`))
    if (year !== _year) setYear(_year)
    if (quarter !== _quarter) setQuarter(_quarter)
  }

  const handleTimeChange = (val: moment.Moment) => {
    setTime(val)

    if (val.format('YYYY') !== year.format('YYYY'))
      setYear(val)

    if (val.quarter() !== quarter)
      setQuarter(val.quarter())
  }

  const ContentWrapper = styled.div`
    .ant-row{
      margin-top: 10px;
      .ant-col:first-of-type{
        line-height: 30px;
        text-align: right;
      }
    }
  `

  return <div>
    <div>{`新建${registerName}，历史${registerName}请切换修订版本查看`}</div>
    <ContentWrapper>
      <Row>
        <Col span={6}>
          年
          <span style={{ width: 28, height: 10, display: 'inline-block' }}></span>
          份：
        </Col>
        <Col span={18}>
          <YearPicker
            allowClear={false}
            value={year}
            onChange={(_year: moment.Moment) =>
              handleYearOrQuarterChange(_year, quarter)} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          季
          <span style={{ width: 28, height: 10, display: 'inline-block' }}></span>
          度：
        </Col>
        <Col span={18}>
          <Select
            value={quarter}
            onChange={(_quarter: number) =>
              handleYearOrQuarterChange(year, _quarter)}>
            <Option value={1}>第一季度</Option>
            <Option value={2}>第二季度</Option>
            <Option value={3}>第三季度</Option>
            <Option value={4}>第四季度</Option>
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={6}>创建时间：</Col>
        <Col span={18}>
          <DatePicker
            allowClear={false}
            value={time}
            onChange={(val: moment.Moment) => handleTimeChange(val)} />
        </Col>
      </Row>
    </ContentWrapper>
  </div>
}

// @ts-ignore
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
  .sub-part{
    background: #fff;
    padding: 0 15px 15px 15px;
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