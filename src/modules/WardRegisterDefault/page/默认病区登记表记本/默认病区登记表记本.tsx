import styled from "styled-components";
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
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
import createModal from "src/libs/createModal";
import SettingModal from "./modal/SettingModal";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import { signRowObj } from "../../utils/signRowObj";
import { NullBox } from "../../components/NullBox";
import { TableCon, Wrapper } from "../../utils/style/style";
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import { createFilterItem } from "../../components/Render.v1/FilterItem";
import classNames from "classnames";
import { createFilterInput } from "../../components/Render.v1/FilterInput";
// import TextArea from "antd/lib/input/TextArea";
// import { wardRegisterDefaultService } from "../../services/WardRegisterDefaultService";
// import { globalModal } from "src/global/globalModal";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from '../../components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from '../../components/Render.v1/DatePickerColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'

export interface Props {
  payload: any;
}

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 敏感指标登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangeConfigList, setRangeConfigList] = useState([]);
  const [selectedRange, setSelectedRange] = useState("")
  const [config, setConfig] = useState({} as any)
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [date, setDate]: any = useState(getCurrentMonth());
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [surplusHeight, setSurplusHeight]: any = useState(220);
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])

  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  );

  const settingModal = createModal(SettingModal);
  const previewModal = createModal(PreviewModal)
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

  // const flFilterItem = createFilterItem(
  //   "分类",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const bcFilterItem = createFilterItem(
  //   "班次",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const wzcdFilterItem = createFilterItem(
  //   "危重程度",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const hljbFilterItem = createFilterItem(
  //   "护理级别",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const zlnlFilterItem = createFilterItem(
  //   "自理能力",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const yzlxFilterItem = createFilterItem(
  //   "医嘱类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const zgFilterItem = createFilterItem(
  //   "转归",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const ypglflFilterItem = createFilterItem(
  //   "药品管理分类",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const ymFilterItem = createFilterItem(
  //   "药名",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const wpmcFilterItem = createFilterItem(
  //   "物品名称",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const bfzlxFilterItem = createFilterItem(
  //   "并发症类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const jmlxFilterItem = createFilterItem(
  //   "静脉类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const zhpjlxFilterItem = createFilterItem(
  //   "综合评价类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const rylxFilterItem = createFilterItem(
  //   "人员类别",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const yqmcFilterItem = createFilterItem(
  //   "仪器名称",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const sbztFilterItem = createFilterItem(
  //   "设备状态",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const chFilterItem = createFilterInput(
  //   "床号",
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   });

  // const xmFilterItem = createFilterInput(
  //   "姓名",
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   });
  // const zyzdFilterItem = createFilterItem(
  //   "中医诊断",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // )

  // const popoverContent = codeAdapter(
  //   {
  //     QCRG_03: (
  //       <div>
  //         <wzcdFilterItem.Component />
  //         <hljbFilterItem.Component />
  //         <zlnlFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_04: (
  //       <div>
  //         <bcFilterItem.Component />
  //         <yzlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_05: null,
  //     QCRG_08: (
  //       <div>
  //         <zgFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_10: (
  //       <div>
  //         <ypglflFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_13: (
  //       <div>
  //         <ymFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_14_1: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_14_2: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_16_1: (
  //       <div>
  //         <bfzlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_16_2: (
  //       <div>
  //         <jmlxFilterItem.Component />
  //         <bfzlxFilterItem.Component />
  //       </div>
  //     ),
  //     // QCRG_19_1: (
  //     //   <div>
  //     //     <jmlxFilterItem.Component />
  //     //   </div>
  //     // ),
  //     QCRG_19_2: (
  //       <div>
  //         <rylxFilterItem.Component />
  //         {/* <jmlxFilterItem.Component /> */}
  //       </div>
  //     ),
  //     QCRG_19_3: (
  //       <div>
  //         <jmlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_20_2: (
  //       <div>
  //         <yqmcFilterItem.Component />
  //         <sbztFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_15_1: (
  //       <div>
  //         <chFilterItem.Component />
  //         <xmFilterItem.Component />
  //         <zyzdFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_12_2: (
  //       <div>
  //         <flFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_21: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //   },
  //   registerCode
  // );

  /** 查询参数 */
  const paramMap = {
    // ...wzcdFilterItem.value,
    // ...hljbFilterItem.value,
    // ...zlnlFilterItem.value,
    // ...bcFilterItem.value,
    // ...hljbFilterItem.value,
    // ...yzlxFilterItem.value,
    // ...zgFilterItem.value,
    // ...ypglflFilterItem.value,
    // ...ymFilterItem.value,
    // ...wpmcFilterItem.value,
    // ...bfzlxFilterItem.value,
    // ...jmlxFilterItem.value,
    // ...zhpjlxFilterItem.value,
    // ...rylxFilterItem.value,
    // ...yqmcFilterItem.value,
    // ...sbztFilterItem.value,
    // ...flFilterItem.value,
    // ...chFilterItem.value,
    // ...xmFilterItem.value,
    // ...zyzdFilterItem.value,
    '班次': selectedRange,
  };

  /** 判断是否快过期 */
  const isEndTime = (record: any) => {
    let current = ''
    let endTime = ''
    let itemCode = '有效期'

    if (
      registerCode == "QCRG_14_1"
      || registerCode == 'QCRG_21'
    ) {
      itemCode = '失效日期'
    }

    endTime = record[itemCode] || ''
    current = moment().format('YYYY-MM-DD')

    var currentDate = moment(current);
    var endTimeDate = moment(endTime);
    if (
      currentDate.isValid() &&
      endTimeDate.isValid() &&
      current && endTime
    ) {
      let m = endTimeDate.diff(currentDate, "d");
      if (m <= 90) return "color-red";
      // if (m < 3) return "color-orange";
    }
    return "";
  };

  // const isEndTimeQCRG_12_2 = (record: any, item: any) => {
  //   const { itemCode, itemType } = item

  //   if (itemType == 'date' && record[itemCode]) {
  //     var currentDate = moment()
  //     var endDate = moment(record[itemCode])
  //     if (
  //       currentDate.isValid() &&
  //       endDate.isValid()
  //     ) {
  //       let m = endDate.diff(currentDate, "d");
  //       if (m <= 90) return "color-red";
  //     }
  //   }

  //   return ''
  // }

  const columns: ColumnProps<any>[] | any = [
    ...!config.hiddenDate ? [{
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
            onKeyUp={handleNextIptFocus}
            onChange={e => {
              record.modified = true
              record.recordDate = e.target.value
            }}
            onBlur={() => updateDataSource()}
            className={isEndTime(record) || ""}
          />
        );
      }
    }] : [],
    ...config.showRange ? [
      {
        title: "班次",
        width: 73,
        dataIndex: "range",
        className: "input-cell",
        align: "center",
        render(text: string, record: any, index: number) {
          let children = <InputColumnRender
            {...{
              cellDisabled,
              options: rangeConfigList.map((item: any) => item.itemCode),
              record,
              itemCode: 'range',
              updateDataSource,
              handleNextIptFocus
            }}
          />
          let obj = {
            children
          };
          return obj;
        }
      }
    ] : [],
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

          childrenClassName +=
            ` ${codeAdapter({
              other: isEndTime(record)
            }, registerCode)}`

          if (item.itemType == 'date' || item.itemType == 'date_time') {
            let format = 'YYYY-MM-DD'
            if (item.itemType == 'date_time') format = 'YYYY-MM-DD HH:mm'

            children = <DatePickerColumnRender
              {...{
                className: childrenClassName,
                cellDisabled,
                record,
                itemCfg: item,
                index,
                showTime: item.itemType == 'date_time',
                format,
                handleNextIptFocus,
                updateDataSource,
                registerCode,
              }}
            />
          }
          else if (item.itemType == "attachment") {
            //处理上传附件类型
            children = <FileUploadColumnRender
              {...{
                className: childrenClassName,
                record,
                itemCfg: item,
                index,
                cellDisabled,
                handleUpload,
                handlePreview,
                updateDataSource
              }} />

          } else {
            const multiple = (() => {
              if (item.itemType == "multiple_select")
                return true

              return false
            })()

            children = <InputColumnRender
              {...{
                cellDisabled,
                options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
                record,
                className: childrenClassName,
                itemCode: item.itemCode,
                updateDataSource,
                handleNextIptFocus,
                multiple,
                onBlur: (newVal: string, oldVal: any) => { },
                selectAll: multiple,
              }}
            />
          }

          let obj = { children }

          return obj
        }
      };
    }),
    ...config.showDesc ? [
      {
        title: "备注",
        width: 150,
        dataIndex: "description",
        className: "input-cell",
        render(text: string, record: any, index: number) {
          return <InputColumnRender
            {...{
              cellDisabled,
              itemCode: 'description',
              handleNextIptFocus,
              record,
              updateDataSource,
            }} />
        }
      },
    ] : [],
    ...(config.signList || []).map((signItem: any) =>
      signRowObj({
        title: signItem.title,
        width: 15 * signItem.width || 50,
        dataIndex: signItem.filedName,
        aside: signItem.title,
        registerCode,
        updateDataSource,
        selectedBlockId
      })),
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

  const handlePreview = (file: any) => {
    if (getFileType(file.name) == 'img') {
      reactZmage.browsing({ src: file.path, backdrop: 'rgba(0,0,0, .8)' })
    } else {
      previewModal.show({
        title: file.name,
        path: file.path
      })
    }
  }

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
    config,
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
    selectedRowKeys,
    setSelectedRowKeys,
    setConfig,
    paramMap
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedBlockId, selectedRange]);

  useLayoutEffect(() => {
    let tableHead: any = document.querySelector(".ant-table-thead");
    if (tableHead) {
      setSurplusHeight(tableHead.offsetHeight + 180);
    }
  });

  return (
    <Container>
      <PageHeader>
        {authStore.isAdmin && (
          <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
            修订
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
        {/* {popoverContent && (
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
        )} */}

        <Place />
        {rangeConfigList.length > 0 && <React.Fragment>
          <span className="label">班次</span>
          <Select
            style={{ width: 70, minWidth: 70 }}
            value={selectedRange}
            onChange={(value: any) => {
              setSelectedRange(value);
              setPageOptions({ ...pageOptions, pageIndex: 1 })
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {rangeConfigList.map((item: any) => (
              <Select.Option value={item.itemCode} key={item.itemCode}>
                {item.itemCode}
              </Select.Option>
            ))}
          </Select>
        </React.Fragment>}
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
            {authStore.isAdmin && (
              <Button
                onClick={() =>
                  settingModal.show({
                    blockId: selectedBlockId,
                    selectedBlockObj,
                    registerCode,
                    onOkCallBack: () => {
                      getPage();
                    }
                  })
                }>
                设置
              </Button>
            )}
            {authStore.isNotANormalNurse && (
              <Button onClick={onDelete}>删除</Button>
            )}
          </React.Fragment>
        )}
      </PageHeader>
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
              {(config?.signList || []).map((signItem: any) => (
                <Button
                  key={signItem.filedName}
                  disabled={
                    pageLoading ||
                    selectedRowKeys.length <= 0
                  }
                  type="primary"
                  onClick={() =>
                    handleAuditAll(signItem.title, signItem.filedName === 'auditorName' ? 'audit' : 'sign')}>
                  {signItem.title}签名
                </Button>
              ))}
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
      <settingModal.Component />
      <previewModal.Component />
    </Container >
  );
});

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
`;

const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
  &.height-50{
    min-height: 50px;
  }
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
