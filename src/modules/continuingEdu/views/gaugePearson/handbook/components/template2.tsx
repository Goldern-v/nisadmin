import styled from "styled-components";
import React, {useState, useEffect, useLayoutEffect, useRef, useMemo} from "react";
import BaseTable, {DoCon} from "src/components/BaseTable";
import {
    ColumnProps,
    message,
} from "src/vendors/antd";
import {authStore, appStore} from "src/stores";
import {observer} from "mobx-react-lite";
import {PageHeader, Place} from "src/components/common";
import createModal from "src/libs/createModal";
import moment from "moment";
import {throttle} from "src/utils/throttle/throttle";
import {codeAdapter} from "src/modules/WardRegisterDefault/utils/codeAdapter";
import {TableCon, Wrapper} from "src/modules/WardRegisterDefault/utils/style/style";
import {getFun, ItemConfigItem} from "src/modules/WardRegisterDefault/utils/fun/fun";
import {numberFormat} from "src/utils/number/numberFormat";
import classNames from "classnames";
import {getFileType} from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/DatePickerColumnRender'
import InputColumnRender from 'src/modules/WardRegisterDefault/components/Render.v1/InputColumnRender'
import InputRender from 'src/modules/WardRegisterDefault/components/Render.v1/InputRender'
import SignColumnRender from "src/modules/WardRegisterDefault/components/Render.v1/SignColumnRender";
import {Obj} from "src/libs/types";
import {handbookModel} from "src/modules/continuingEdu/views/gaugePearson/handbook/model";

export interface Props {
    payload: any;
}

const throttler = throttle(500);
const throttler2 = throttle();
/** 可以显示选择患者的表单，以及需要获取的字段信息 */
const configListByPatientSelect = {
    QCRG_GSY_07: (item: Obj = {}) => ({
        '患者姓名': item?.name,
        '床号': item?.bedLabel,
    }),
    QCRG_GSY_12: (item: Obj) => ({
        '姓名': item?.name,
        '床号': item?.bedLabel,
        '疾病诊断': item?.diagnosis,
        '电话号码': item?.phone,
        '入院日期': item?.admissionDate,
        '出院日期': item?.dischargeDate,
    }),
}
export default observer(function Template2(props: Props) {
    const [data2, setData2]: any = useState([]);
    const [data3, setData3]: any = useState([]);
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
    const [date, setDate]: any = useState('');
    /**抢救记录 */
    const [firstAid, setFirstAid] = useState(false)
    const [surplusHeight, setSurplusHeight]: any = useState(220);
    const [pageOptions, setPageOptions]: any = useState({
        pageIndex: 1,
        pageSize: 20,
        total: 0
    });
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
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


    // 计算器
    const getTrueVal = (item: any, record: any) => {
        console.log(record[item.timeEndCode].length)
        let deval = null
        let incremental = false //记录是否要递增
        if (item.calculationType == 'hour') {
            deval = moment(record[item.timeEndCode], "hh:mm").diff(moment(record[item.timeBeginCode], "hh:mm"), 'hours', true)
        } else if (item.calculationType == 'dayTime') {
            // 日期时间，天数+1，保留小数
            incremental = true
            deval = moment(record[item.timeEndCode]).diff(moment(record[item.timeBeginCode]), 'days', true)
        } else {
            incremental = true
            // 是否保留小数，天数+1
            deval = moment(record[item.timeEndCode]).diff(moment(record[item.timeBeginCode]), 'days')
        }
        if (isNaN(deval)) {
            return ''
        } else {
            // 如果是天数，就要+1
            if (incremental) {
                return numberFormat(deval + 1, 1)
            }
            return numberFormat(deval, 1)
        }
    }
    // 叠加器
    const getTrueIderate = (item: any, record: any, index: number) => {
        // console.log('计算叠加器啦')
        if (index == dataSource.length - 1) {
            // 改的是组后一条数据
            return isNaN(Number(record[item.cumulativeTarget])) ? '' : record[item.cumulativeTarget] || ''
        } else {
            if (isNaN(Number(record[item.cumulativeTarget]))) {
                // 当输入非数字
                return dataSource[index + 1][item.itemCode] || ''
            }
            if (isNaN(Number(dataSource[index + 1][item.itemCode]))) {
                // 下一条数据是空的
                return record[item.cumulativeTarget] || ''
            }
            return numberFormat(Number(dataSource[index + 1][item.itemCode]) + Number(record[item.cumulativeTarget]), 1)
        }
    }


    const gotoContiun = (itemConfig: any, record: any, index: number) => {
        if (itemConfig.linkList.length > 0) {
            // 计算使用时间
            // console.log('计算器')
            itemConfig.linkList.forEach((element: any) => {
                // if(element.itemType == 'timeCalculation'){
                // 自动计算
                record[element.itemCode] = String(getTrueVal(element, record))
                // 这个计算器实体可能有叠加器和计算器,就是会联动第三级计算
                if (element.linkList.length > 0 || element.iderateList.length > 0) {
                    gotoContiun(element, record, index)
                }
                // }
            });
        }
        if (itemConfig.iderateList.length > 0) {
            // 计算使用时间
            // console.log('叠加器')
            itemConfig.iderateList.forEach((element: any) => {
                // 自动计算
                record[element.itemCode] = String(getTrueIderate(element, record, index)) || ''
                if (element.linkList.length > 0 || element.iderateList.length > 0) {
                    gotoContiun(element, record, index)
                }
            });
        }

    }
    //registerName
    const isWhyx = ['whyx', 'lyyz', 'qhwy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID)
    const trimStringArr = (arr: any[]) => {
        return arr.map((str: string) => str.trim()).filter((str: string) => str)
    }
    const columns: ColumnProps<any>[] | any = [
        //后端返回的自定义项目
        ...(handbookModel.catalogueData?.formItems || []).map((item: any, index: number) => {
            item['itemCode'] = item.title
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
                                            ...{flex: (15 * cItem.width || 50) + 8, width: 0},
                                            ...(index == arr.length - 1 ? {border: 0} : {})
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
          </pre>),
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

                    if (item.type == 'date' || item.type == 'date_time' || item.type == 'time') {
                        let format = 'YYYY-MM-DD'
                        if (item.type == 'date_time') format = 'YYYY-MM-DD HH:mm'
                        if (item.type == 'time') format = 'HH:mm';
                        children = <DatePickerColumnRender
                            {...{
                                className: childrenClassName,
                                cellDisabled,
                                record,
                                itemCfg: item,
                                index,
                                showTime: item.type == 'date_time' || item.type == 'time',
                                format,
                                handleNextIptFocus,
                                updateDataSource,
                                registerCode,
                            }}
                        />
                    } else if (item.type == "attachment") {
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

                    } else if (item.type == "text") {
                        children = <InputRender
                            {...{
                                cellDisabled,
                                record,
                                className: childrenClassName,
                                itemCode: item.itemCode,
                                updateDataSource,
                                handleNextIptFocus,
                                onBlur: (newVal: string, oldVal: any) => {
                                    record.title = newVal
                                    // 失去焦点,判断是否有影响项
                                    // gotoContiun(item, record, index)
                                },
                            }}
                        />
                    } else {
                        // const multiple = (() => {
                        //     if (item.type == "multiple_select")
                        //         return true
                        //
                        //     return false
                        // })()

                        children = <InputColumnRender
                            {...{
                                cellDisabled,
                                options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
                                record,
                                className: childrenClassName,
                                itemCode: item.itemCode,
                                updateDataSource,
                                handleNextIptFocus,
                                multiple: item.type == "multiple_select",
                                selectAll: item.type == "multiple_select",
                            }}
                        />
                    }

                    let obj = {children}

                    return obj
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
                            <aside style={{color: "#aaa"}}>删除</aside>
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


    let handlePer = (arr: string[], data: any) => {
        let hours: any = ''
        if (data[arr[0]] && data[arr[1]]) {
            let startDate = moment(moment(data[arr[0]]).format('YYYY-MM-DD HH:MM'))
            let endDate = moment(moment(data[arr[1]]).format('YYYY-MM-DD HH:MM'))
            const m = startDate && endDate ? endDate.diff(startDate, "m") : 0;
            hours = Math.floor(m / 30) * 0.5 + '小时';

        }
        data[arr[2]] = String(hours)
    }
    const watchRecordSeries = {
        '起始时间': ['起始时间', '终止时间', '消毒时长'],
        '终止时间': ['起始时间', '终止时间', '消毒时长'],
        '消毒时长': ['起始时间', '终止时间', '消毒时长'],
    }
    const watchRecord = (value: any, data: any) => {
        let key = value
        if (!key || !watchRecordSeries[key]) return
        handlePer(watchRecordSeries[key], data)
    }

    const handlePreview = (file: any) => {
        if (getFileType(file.name) == 'img') {
            reactZmage.browsing({src: file.path, backdrop: 'rgba(0,0,0, .8)'})
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
    /**自定义签名按钮配置 */
    const [customSign, setCustomSign] = useState<any[]>([])
    // 自定义批量按钮
    const [customBatch, setCustomBatch] = useState<any[]>([])
    useEffect(() => {
        setCustomSign(itemConfigList.filter((v: any) => v.type.indexOf('autograph') == 0))
        setCustomBatch(itemConfigList.filter((v: any) => v.itemCode == '班次'))
    }, [itemConfigList])


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
        deleteSelectedRows,
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
        setData2,
        setData3,
        setItemConfigList,
        setRangeConfigList,
        setPageLoading,
        date,
        selectedBlockId,
        dataSource,
        data2,
        data3,
        selectedRowKeys,
        setSelectedRowKeys,
        setConfig,
        customSign,
        customBatch,
        itemConfigList,
        firstAid,
    });

    useEffect(() => {
        onInitData();
    }, [authStore.selectedDeptCode]);


    useEffect(() => {
        /*数据源传递进去*/
        // setDataSource(handbookModel.catalogueData?.formItems)
        // console.log("handbookModel.catalogueData.formItems====",handbookModel.catalogueData?.formItems);
        // selectedBlockId && getPage();
        // selectedBlockId && throttler(getPage);
        // selectedBlockId && throttler(getStatistics)
    }, []);

    const pageHeaderRef = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        let tableHead: any = document.querySelector(".ant-table-thead");
        if (appStore.HOSPITAL_ID === 'wjgdszd' && tableHead && pageHeaderRef?.current) {
            let footerHeight: any = 0;
            if (data2.length > 0) {
                footerHeight += 30
            }
            if (data3.length > 0) {
                footerHeight += data3.length * 21
            }
            setSurplusHeight(footerHeight + tableHead.offsetHeight + 140 + pageHeaderRef.current?.offsetHeight);
        } else if (tableHead && pageHeaderRef?.current) {
            setSurplusHeight(tableHead.offsetHeight + 140 + pageHeaderRef.current?.offsetHeight);
        }

    });


    return (
        <Container>
            <TableCon
                className='whyxTable'
            >
                <BaseTable
                    className="record-page-table"
                    loading={pageLoading}
                    dataSource={handbookModel.catalogueData?.formItems}
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
                            setPageOptions({...pageOptions, pageIndex})
                        },
                        onShowSizeChange: (pageIndex: number, pageSize: number) => {
                            setPageOptions({...pageOptions, pageSize, pageIndex: 1})
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
            </TableCon>
        </Container>
    );
});

// @ts-ignore
const Container = styled(Wrapper)`
  .ant-select-disabled .ant-select-selection {
    background: rgba(0, 0, 0, 0.0) !important;
  }

  .disabled-row {
    td.input-cell {
      background: rgba(0, 0, 0, 0.03) !important;
    }

    .ant-input[disabled] {
      color: #000 !important;
      background: rgba(0, 0, 0, 0.0) !important;
    }
  }

  .ant-input[disabled] {
    color: #000 !important;
    background: rgba(0, 0, 0, 0.03) !important;
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

  #baseTable .footer-page-table .ant-table-body {
    overflow-y: auto !important;
  }

  .ant-table-footer {
    padding: 0 !important;

    .footer-page-table td {
      color: #00A680;
      /* padding: 0; */

    }
  }

`;
const NewPageHeader = styled(PageHeader)`
  height: auto;
  min-height: 50px;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-top: 5px;

  .ant-btn {
    margin-bottom: 5px;
  }`;

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
