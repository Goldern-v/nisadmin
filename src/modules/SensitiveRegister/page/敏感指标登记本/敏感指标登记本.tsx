import styled from "styled-components";
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { Button, Divider } from "antd";
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
// import { sensitiveRegisterService } from "../../services/SensitiveRegisterService";
// import { globalModal } from "src/global/globalModal";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from '../../components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from '../../components/Render.v1/DatePickerColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'
import { baseRegisterMode } from "../../data/BaseRegisterModel"
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
  const [rangConfigList, setRangeConfigList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [date, setDate]: any = useState(getCurrentMonth());
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
  const [isDate, setIsDate]: any = useState(false);
  const [year, setYear]: any = useState(moment(new Date(moment().format('YYYY'))));


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
    }
    return "";
  };

  const isEndTimeQCRG_14_2 = (record: any, item: any) => {
    const { itemCode } = item

    if
      ((itemCode.indexOf('失效日期') >= 0
        || itemCode.indexOf('失效期') >= 0)
      && record[itemCode]
    ) {
      console.log(itemCode)
      var currentDate = moment()
      var endDate = moment(record[itemCode])
      if (endDate.isValid()) {
        let m = endDate.diff(currentDate, "d")
        if (m <= 90) return "color-red"
      }
    }

    return ''
  }

  const columns: ColumnProps<any>[] | any = [
    {
      title: "日期",
      dataIndex: "recordDate",
      align: "center",
      className: "input-cell",
      width: 100,
      render(text: string, record: any, index: number) {
        if (registerCode == 'QCRG_22_3') return text.split('-')[0] + '年'
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
    },

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
            if (item.itemType == 'date_time') format = 'HH:mm'
            // if ()
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
                onBlur: (newVal: string, oldVal: any) => { watchRecord(item.itemCode, record) },
                selectAll: multiple,
                registerCode,
              }}
            />
          }

          let obj = { children }

          return obj
        }
      };
    }),
    //不同登记本固定的项目
    ...codeAdapter({
      "QCRG_22_3": [],
      other: [{
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
      }]
    },
      registerCode,
      true
    ),
    // {
    //   title: "操作",
    //   width: 50,
    //   className: "",
    //   render(text: string, record: any, index: number) {
    //     return (
    //       <DoCon>
    //         {cellDisabled(record) ? (
    //           <aside style={{ color: "#aaa" }}>删除</aside>
    //         ) : (
    //           <span
    //             onClick={() => handleDeleteRow(record, index)}>
    //             删除
    //           </span>
    //         )}
    //       </DoCon>
    //     );
    //   }
    // }
  ];
  let handlePer = (arr: string[], data: any) => {
    let per: any = ''
    if (data[arr[1]] == '0')
      per = '0'
    else if (data[arr[0]] != '' && data[arr[1]] !== '') {
      per = (Number(data[arr[0]]) / Number(data[arr[1]]))
      per = isNaN(per) ? '' : (Number(per).toFixed(4) || 0)
    }
    data[arr[2]] = String(per)
  }
  const watchRecordSeries = {
    '疼痛评分': ['疼痛评分：疼痛评估正确例数', '疼痛评分：被抽查的患者总数', '疼痛评分：疼痛评估符合率'],
    '分级护理': ['分级护理：被抽查的患者总人数', '分级护理：分级护理执行合格人数', '分级护理：分级护理合格率'],
    '给药技术': ['给药技术：考核护士技术操作合格人数', '给药技术：考核护士技术操作总人数', '给药技术：给药技术正确率'],
    '护理文件': ['护理文件：护理文件书写合格份数', '护理文件：被抽查的护理病历总份数', '护理文件：护理文件正确率'],
    '急救药械': ['急救药械：急救药械完好件数', '急救药械：急救药械总件数', '急救药械：急救药械完好率'],
    '健康教育': ['健康教育：健康教育知晓80%条目的患者人数', '健康教育：被抽查的患者总人数', '健康教育：健康教育知晓率'],
    '洗手': ['洗手：洗手正确的护理人员数', '洗手：被抽查的护理人员数', '洗手：洗手正确率'],
    '手卫生': ['手卫生：被抽查人员实际洗手次数', '手卫生：被抽查人员应洗手次数', '手卫生：手卫生执行率'],
    '身份识别': ['身份识别：患者身份识别执行正确护理人员数', '身份识别：被抽查的护理人员数', '身份识别：身份识别执行正确率'],
  }
  /**
   * 根据数据计算百分比
   * @param value 字段名
   * @param data 当前行数据
   */
  const watchRecord = (value: any, data: any) => {
    let key = value.split('：')[0]
    if (!key || !watchRecordSeries[key]) return
    handlePer(watchRecordSeries[key], data)
    // if (data['疼痛评分：疼痛评估正确例数'] && data['疼痛评分：被抽查的患者总数']) {
    //   let scale: any = (Number(data['疼痛评分：疼痛评估正确例数']) / Number(data['疼痛评分：被抽查的患者总数']))
    //   scale = Number(scale).toFixed(4) || 0;
    //   data['疼痛评分：疼痛评估符合率'] = String(scale)
    // } else {
    //   data['疼痛评分：疼痛评估符合率'] = ''
    // }
    // if (data['分级护理：被抽查的患者总人数'] && data['分级护理：分级护理执行合格人数']) {
    //   let scale: any = (Number(data['分级护理：分级护理执行合格人数']) / Number(data['分级护理：被抽查的患者总人数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['分级护理：分级护理合格率'] = String(scale)
    // } else {
    //   data['分级护理：分级护理合格率'] = ''
    // }
    // if (data['给药技术：考核护士技术操作合格人数'] && data['给药技术：考核护士技术操作总人数']) {
    //   let scale: any = (Number(data['给药技术：考核护士技术操作合格人数']) / Number(data['给药技术：考核护士技术操作总人数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['给药技术：给药技术正确率'] = String(scale)
    // } else {
    //   data['给药技术：给药技术正确率'] = ''
    // }
    // if (data['护理文件：护理文件书写合格份数'] && data['护理文件：被抽查的护理病历总份数']) {
    //   let scale: any = (Number(data['护理文件：护理文件书写合格份数']) / Number(data['护理文件：被抽查的护理病历总份数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['护理文件：护理文件正确率'] = String(scale)
    // } else {
    //   data['护理文件：护理文件正确率'] = ''
    // }
    // if (data['急救药械：急救药械完好件数'] && data['急救药械：急救药械总件数']) {
    //   let scale: any = (Number(data['急救药械：急救药械完好件数']) / Number(data['急救药械：急救药械总件数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['急救药械：急救药械完好率'] = String(scale)
    // } else {
    //   data['急救药械：急救药械完好率'] = ''
    // }
    // if (data['健康教育：健康教育知晓80%条目的患者人数'] && data['健康教育：被抽查的患者总人数']) {
    //   let scale: any = (Number(data['健康教育：健康教育知晓80%条目的患者人数']) / Number(data['健康教育：被抽查的患者总人数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['健康教育：健康教育知晓率'] = String(scale)
    // } else {
    //   data['健康教育：健康教育知晓率'] = ''
    // }
    // if (data['洗手：洗手正确的护理人员数'] && data['洗手：被抽查的护理人员数']) {
    //   let scale: any = (Number(data['洗手：洗手正确的护理人员数']) / Number(data['洗手：被抽查的护理人员数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['洗手：洗手正确率'] = String(scale)
    // } else {
    //   data['洗手：洗手正确率'] = ''
    // }
    // if (data['手卫生：被抽查人员实际洗手次数'] && data['手卫生：被抽查人员应洗手次数']) {
    //   let scale: any = (Number(data['手卫生：被抽查人员实际洗手次数']) / Number(data['手卫生：被抽查人员应洗手次数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['手卫生：手卫生执行率'] = String(scale)
    // } else {
    //   data['手卫生：手卫生执行率'] = ''
    // }
    // if (data['身份识别：患者身份识别执行正确护理人员数'] && data['身份识别：被抽查的护理人员数']) {
    //   let scale: any = (Number(data['身份识别：患者身份识别执行正确护理人员数']) / Number(data['身份识别：被抽查的护理人员数']))
    //   scale = Number(scale).toFixed(4) || 0
    //   data['身份识别：身份识别执行正确率'] = String(scale)
    // } else {
    //   data['身份识别：身份识别执行正确率'] = ''
    // }
  }
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
  }
  const changeDept = (val: string) => {
    if (registerCode === 'QCRG_22_3') {
      baseRegisterMode.isAll = (val == '全院' ? 1 : 0)
      authStore.selectedDeptCode = val;
    }
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
    setRangeConfigList,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    selectedRowKeys,
    setSelectedRowKeys,
    paramMap,
    itemConfigList
  });
  useEffect(() => {
    if (registerCode == 'QCRG_22_3') {
      setDate([moment(new Date(moment().format('YYYY'))), null])
    }
    baseRegisterMode.registerCode = registerCode
  }, [])
  useEffect(() => {
    onInitData();
    baseRegisterMode.isAll = (authStore.selectedDeptCode == '全院' ? 1 : 0)
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

  return (
    <Container>
      <PageHeader>
        {appStore.hisMatch({
            map: {
              nys : (
                authStore.isRoleManage&&(<Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
                  修订
                </Button>)
              ),
              other: (
                authStore.isAdmin&&<Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
                  修订
              </Button>
              )
            }
        })}
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
        {
          codeAdapter({
            "QCRG_22_3": <React.Fragment>
              <span className="label">年份</span>
              <DatePicker
                value={year}
                open={isDate}
                mode="year"
                placeholder="请选择年份"
                format="YYYY"
                onOpenChange={(status) => {
                  setIsDate(status)
                }}
                onPanelChange={(v) => {
                  let date = new Date(moment(v).format('YYYY'))
                  setIsDate(false)
                  setYear(v)
                  setDate([moment(date), null])
                }}
              />
            </React.Fragment>,
            other: <React.Fragment>
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
            </React.Fragment>
          },
            registerCode,
            true
          )
        }
        {/* <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => {
            setDate(value)
            setPageOptions({ ...pageOptions, pageIndex: 1 })
          }}
          allowClear={true}
          style={{ width: 220 }}
        /> */}
        {/* <span className="label">年份</span>
        <DatePicker
          value={year}
          open={isDate}
          mode="year"
          placeholder="请选择年份"
          format="YYYY"
          onOpenChange={(status) => {
            setIsDate(status)
          }}
          onPanelChange={(v) => {
            let date = new Date(moment(v).format('YYYY'))
            setIsDate(false)
            setYear(v)
            setDate([moment(date), null])
          }}
        /> */}
        <span className="label">科室</span>
        {/* <DeptSelect onChange={() => { }} style={{ width: 150 }} /> */}
        <DeptSelect hasAllDept={registerCode === 'QCRG_22_3'} onChange={(e) => changeDept(e)} style={{ width: 150 }} />
        <Place />

        {selectedBlockId && (
          baseRegisterMode.isAll == 0 ?
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
            </React.Fragment> :
            <React.Fragment>
              <Button onClick={getPage}>查询</Button>
              <Button onClick={exportExcel}>导出</Button>
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
            // onChange={(pagination: PaginationConfig) => {
            //   setPageOptions({
            //     pageIndex: pagination.current,
            //     pageSize: pagination.pageSize
            //   });
            // }}
            />
            <div className="selected-operate-con">
              {codeAdapter({
                QCRG_22_3: [],
                other: (<React.Fragment>
                  <Button
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    } type="primary"
                    onClick={() => deleteSelectedRows()}>
                    删除
                  </Button>
                </React.Fragment>),
              }, registerCode, true)}
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
    </Container>
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
