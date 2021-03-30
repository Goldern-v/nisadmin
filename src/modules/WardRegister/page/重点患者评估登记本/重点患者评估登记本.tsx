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
// import { wardRegisterService } from "../../services/WardRegisterService";
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

export default observer(function 重点患者评估登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangConfigList, setRangeConfigList] = useState([]);
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

  const flFilterItem = createFilterItem(
    "分类",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );

  const bcFilterItem = createFilterItem(
    "班次",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const wzcdFilterItem = createFilterItem(
    "危重程度",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );

  const hljbFilterItem = createFilterItem(
    "护理级别",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );

  const zlnlFilterItem = createFilterItem(
    "自理能力",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const yzlxFilterItem = createFilterItem(
    "医嘱类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const zgFilterItem = createFilterItem(
    "转归",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const ypglflFilterItem = createFilterItem(
    "药品管理分类",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const ymFilterItem = createFilterItem(
    "药名",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false)
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const wpmcFilterItem = createFilterItem(
    "物品名称",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const bfzlxFilterItem = createFilterItem(
    "并发症类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const jmlxFilterItem = createFilterItem(
    "静脉类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const zhpjlxFilterItem = createFilterItem(
    "综合评价类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const rylxFilterItem = createFilterItem(
    "人员类别",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const yqmcFilterItem = createFilterItem(
    "仪器名称",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const sbztFilterItem = createFilterItem(
    "设备状态",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  );
  const chFilterItem = createFilterInput(
    "床号",
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    });

  const xmFilterItem = createFilterInput(
    "姓名",
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    });
  const zyzdFilterItem = createFilterItem(
    "中医诊断",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      setPageOptions({ ...pageOptions, pageIndex: 1 })
    }
  )

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
      ),
      QCRG_13: (
        <div>
          <ymFilterItem.Component />
        </div>
      ),
      QCRG_14_1: (
        <div>
          <wpmcFilterItem.Component />
        </div>
      ),
      QCRG_14_2: (
        <div>
          <wpmcFilterItem.Component />
        </div>
      ),
      QCRG_16_1: (
        <div>
          <bfzlxFilterItem.Component />
        </div>
      ),
      QCRG_16_2: (
        <div>
          <jmlxFilterItem.Component />
          <bfzlxFilterItem.Component />
        </div>
      ),
      // QCRG_19_1: (
      //   <div>
      //     <jmlxFilterItem.Component />
      //   </div>
      // ),
      QCRG_19_2: (
        <div>
          <rylxFilterItem.Component />
          {/* <jmlxFilterItem.Component /> */}
        </div>
      ),
      QCRG_19_3: (
        <div>
          <jmlxFilterItem.Component />
        </div>
      ),
      QCRG_20_2: (
        <div>
          <yqmcFilterItem.Component />
          <sbztFilterItem.Component />
        </div>
      ),
      QCRG_15_1: (
        <div>
          <chFilterItem.Component />
          <xmFilterItem.Component />
          <zyzdFilterItem.Component />
        </div>
      ),
      QCRG_12_2: (
        <div>
          <flFilterItem.Component />
        </div>
      ),
      QCRG_21: (
        <div>
          <wpmcFilterItem.Component />
        </div>
      ),
    },
    registerCode
  );

  /** 查询参数 */
  const paramMap = {
    ...wzcdFilterItem.value,
    ...hljbFilterItem.value,
    ...zlnlFilterItem.value,
    ...bcFilterItem.value,
    ...hljbFilterItem.value,
    ...yzlxFilterItem.value,
    ...zgFilterItem.value,
    ...ypglflFilterItem.value,
    ...ymFilterItem.value,
    ...wpmcFilterItem.value,
    ...bfzlxFilterItem.value,
    ...jmlxFilterItem.value,
    ...zhpjlxFilterItem.value,
    ...rylxFilterItem.value,
    ...yqmcFilterItem.value,
    ...sbztFilterItem.value,
    ...flFilterItem.value,
    ...chFilterItem.value,
    ...xmFilterItem.value,
    ...zyzdFilterItem.value,
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

  //实习进修新职工登记 计算综合成绩
  const colcTotalScore = (record: any, item: any) => {
    let sumItemCodeArr = ['理论成绩', '操作成绩', '实践能力', '平时表现']
    let percentArr = [0.3, 0.3, 0.2, 0.2]
    let needColc = false

    for (let i = 0; i < sumItemCodeArr.length; i++) {
      if (item.itemCode.indexOf(sumItemCodeArr[i]) >= 0) {
        needColc = true
        break
      }
    }

    if (needColc) {
      let keys = Object.keys(record)
      let totalSum = 0

      for (let i = 0; i < sumItemCodeArr.length; i++) {
        let itemCodePart = sumItemCodeArr[i]
        let score = 0
        let target0 = keys.find((key) => {
          return key.indexOf(itemCodePart) >= 0 &&
            key.indexOf('综合成绩') < 0
        })
        if (target0) score = Number(record[target0])

        if (!isNaN(score)) totalSum += score * percentArr[i]
      }

      let sunTarget = '综合成绩（理论成绩30%+操作成绩30%+实践能力20%+平时表现20%）'

      record[sunTarget] = (Math.round(totalSum * 100) / 100).toString()
      updateDataSource()
    }
  }

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
    //不同登记本固定的项目
    ...codeAdapter(
      {
        QCRG_12: [
          {
            title() {
              return (
                <LineCon>
                  <TextCon>
                    <Text x="20%" y="75%" deg="0">
                      日期
                    </Text>
                    <Text x="58%" y="67%" deg="0">
                      使用
                      <br />
                      及补充
                    </Text>
                    <Text x="83%" y="63%" deg="0">
                      基数
                    </Text>
                    <Text x="82%" y="8%" deg="0">
                      名称
                    </Text>
                  </TextCon>
                  <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <line x1="0" y1="0" x2="60%" y2="100%" />
                    <line x1="0" y1="0" x2="100%" y2="100%" />
                    <line x1="0" y1="0" x2="100%" y2="60%" />
                    <line x1="0" y1="0" x2="100%" y2="100%" />
                  </SvgCon>
                </LineCon>
              );
            },
            dataIndex: "recordDate",
            align: "center",
            colSpan: 1,
            width: 160,
            render(text: string, record: any, index: number) {
              return (
                <Input
                  disabled={cellDisabled(record)}
                  defaultValue={text}
                  onChange={e => {
                    record.recordDate = e.target.value
                    record.modified = true
                  }}
                  onBlur={() => updateDataSource()}
                  className={isEndTime(record) || ""}
                />
              );
            }
          },
        ],
        // QCRG_12_2: [
        //   {
        //     title() {
        //       return (
        //         <LineCon className="height-50">
        //           <TextCon>
        //             <Text x="20%" y="65%" deg="0">
        //               日期
        //             </Text>
        //             <Text x="70%" y="58%" deg="0">
        //               属性
        //             </Text>
        //             <Text x="70%" y="8%" deg="0">
        //               名称
        //             </Text>
        //           </TextCon>
        //           <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
        //             <line x1="0" y1="0" x2="100%" y2="50%" />
        //             <line x1="0" y1="0" x2="100%" y2="100%" />
        //           </SvgCon>
        //         </LineCon>
        //       );
        //     },
        //     dataIndex: "recordDate",
        //     align: "center",
        //     colSpan: 1,
        //     width: 120,
        //     render(text: string, record: any, index: number) {
        //       return (
        //         <Input
        //           disabled={cellDisabled(record)}
        //           defaultValue={text}
        //           onChange={e => {
        //             record.recordDate = e.target.value
        //             record.modified = true
        //           }}
        //           onBlur={() => updateDataSource()}
        //           className={isEndTime(record) || ""}
        //         />
        //       );
        //     }
        //   },
        //   // {
        //   //   title: "班次",
        //   //   colSpan: 0,
        //   //   width: 73,
        //   //   dataIndex: "range",
        //   //   align: "center"
        //   // }
        // ],
        QCRG_14_1: [
          {
            title: "入库日期",
            dataIndex: "recordDate",
            align: "center",
            className: "input-cell",
            width: 100,
            render(text: string, record: any, index: number) {
              return (
                <Input
                  disabled={cellDisabled(record)}
                  defaultValue={text}
                  onChange={e => {
                    record.recordDate = e.target.value
                    record.modified = true
                  }}
                  onBlur={() => updateDataSource()}
                  className={isEndTime(record) || ""}
                />
              );
            }
          }
        ],
        QCRG_15_2: [
          {
            title() {
              return (
                <LineCon>
                  <TextCon>
                    <Text x="20%" y="75%" deg="0">
                      时间
                    </Text>
                    <Text x="73%" y="68%" deg="0">
                      例数
                    </Text>
                    <Text x="62%" y="12%" deg="0">
                      项目名称
                    </Text>
                  </TextCon>
                  <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <line x1="0" y1="0" x2="70%" y2="100%" />
                    <line x1="0" y1="0" x2="100%" y2="60%" />
                  </SvgCon>
                </LineCon>
              );
            },
            dataIndex: "recordDate",
            align: "center",
            width: 107,
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
          }
        ],
        other: [
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
          }
        ]
      },
      registerCode
    ),
    codeAdapter(
      {
        'QCRG_04,QCRG_20_1': {
          title: "班次",
          width: 73,
          dataIndex: "range",
          className: "input-cell",
          align: "center",
          render(text: string, record: any, index: number) {
            let children = <InputColumnRender
              {...{
                cellDisabled,
                options: rangConfigList.map((item: any) => item.itemCode),
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
      },
      registerCode,
      true
    ),
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
              QCRG_14_2: isEndTimeQCRG_14_2(record, item),
              other: isEndTime(record)
            }, registerCode)}`

          let dateItemCodeArr = codeAdapter({
            // QCRG_10: ['有效期'],
            // QCRG_14_1: ['生产日期', '失效日期'],
            // QCRG_19_2: ['开始时间', '结束时间'],
            // QCRG_08: ['入院时间'],
            other: []
          }, registerCode)
          if (item.itemType == 'date' || item.itemType == 'date_time' || dateItemCodeArr.indexOf(item.itemCode) >= 0) {
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
              if (
                registerCode == "QCRG_04" &&
                item.itemCode == "组号及床号"
              )
                return true

              if (
                registerCode == "QCRG_16_3" &&
                item.itemCode == "参会人员"
              )
                return true

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
                onBlur: (newVal: string, oldVal: any) => {
                  if (registerCode == 'QCRG_16_1' && item.itemCode == '并发症类型') {
                    if (newVal != oldVal && (newVal == '导管相关感染' || oldVal == '导管相关感染')) {
                      record['培养结果'] = ''
                      record['检验结果粘贴处'] = ''
                      updateDataSource()
                    }
                  }
                  if (registerCode == 'QCRG_19_2')
                    colcTotalScore(record, item)
                },
                selectAll: multiple,
              }}
            />
          }

          //特殊处理
          if (registerCode == 'QCRG_16_1' && record['并发症类型'] !== '导管相关感染') {
            if (item.itemCode == '培养结果' || item.itemCode == '检验结果粘贴处') {
              children = <DisableSpan />
            }
          }

          let obj = {
            children
          };
          return obj;
        }
      };
    }),
    //不同登记本固定的项目
    ...codeAdapter(
      {
        QCRG_03: [
          signRowObj({
            title: "负责人",
            width: 70,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_04: [
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
            title: "核对者签名",
            width: 70,
            dataIndex: "checkerName",
            aside: "核对者",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
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
            title: "登记人签名",
            width: 90,
            dataIndex: "signerName",
            aside: "登记人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_10: [
          signRowObj({
            title: "检查者签名",
            width: 70,
            dataIndex: "signerName",
            aside: "检查者",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_10_2: [
          signRowObj({
            title: "检查者签名",
            width: 70,
            dataIndex: "signerName",
            aside: "检查者",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_11_2: [
          {
            title: "备注",
            width: 150,
            dataIndex: "description",
            className: "input-cell",
            render(text: string, record: any, index: number) {
              const _cellDisabled = (record: any) => {
                if (record['消毒处理'] !== '待消毒') return true
                return cellDisabled(record)
              }
              return <InputColumnRender
                {...{
                  cellDisabled: _cellDisabled,
                  itemCode: 'description',
                  handleNextIptFocus,
                  record,
                  updateDataSource,
                }} />
            }
          }
        ],
        QCRG_11_3: [
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
          }
        ],
        QCRG_12: [
          signRowObj({
            title: "签名",
            width: 70,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_12_2: [
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
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_13: [
          {
            title: "备注",
            width: 150,
            dataIndex: "description",
            className: "input-cell",
            render(text: string, record: any, index: number) {
              return <Input.TextArea
                disabled={cellDisabled(record)}
                autosize={true}
                defaultValue={text}
                onKeyUp={handleNextIptFocus}
                onChange={e => {
                  record.modified = true
                  record.description = e.target.value.replace(/\n/g, '');
                }}
                onBlur={() => updateDataSource()}
              />
            }
          },
          signRowObj({
            title: "执行人签名",
            width: 90,
            dataIndex: "signerName",
            aside: "执行人",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "核对人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "核对人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_14_1: [
          signRowObj({
            title: "责任护士签名",
            width: 90,
            dataIndex: "signerName",
            aside: "责任护士",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        'QCRG_14_2,QCRG_21': [
          {
            title: "备注",
            width: 150,
            dataIndex: "description",
            className: "input-cell",
            render(text: string, record: any, index: number) {
              return <Input.TextArea
                disabled={cellDisabled(record)}
                autosize={true}
                defaultValue={text}
                onKeyUp={handleNextIptFocus}
                onChange={e => {
                  record.modified = true
                  record.description = e.target.value.replace(/\n/g, '');
                }}
                onBlur={() => updateDataSource()}
              />
            }
          },
          signRowObj({
            title: "检查者签名",
            width: 90,
            dataIndex: "signerName",
            aside: "检查者",
            registerCode,
            updateDataSource,
            selectedBlockId
          }),
          signRowObj({
            title: "负责人签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "负责人",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_16_1: [
          signRowObj({
            title: "签名",
            width: 90,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_16_2: [
          signRowObj({
            title: "签名",
            width: 90,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        // QCRG_19_1: [
        //   signRowObj({
        //     title: "护士长签名",
        //     width: 90,
        //     dataIndex: "signerName",
        //     aside: "护士长",
        //     registerCode,
        //     updateDataSource,
        //     selectedBlockId
        //   })
        // ],
        QCRG_19_2: [
          signRowObj({
            title: "护士长签名",
            width: 90,
            dataIndex: "signerName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        // QCRG_19_3: [
        //   signRowObj({
        //     title: "护士长签名",
        //     width: 90,
        //     dataIndex: "signerName",
        //     aside: "护士长",
        //     registerCode,
        //     updateDataSource,
        //     selectedBlockId
        //   })
        // ],
        'QCRG_20_1,QCRG_20_2,QCRG_16_4': [
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
          signRowObj({
            title: "签名",
            width: 90,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_15_1: [
          signRowObj({
            title: "护士长签名",
            width: 90,
            dataIndex: "signerName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_15_2: [
          signRowObj({
            title: "签名",
            width: 90,
            dataIndex: "signerName",
            aside: "",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_15_4: [
          signRowObj({
            title: "护士长签名",
            width: 90,
            dataIndex: "signerName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        other: []
      },
      registerCode,
      true
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
    paramMap
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

  return (
    <Container>
      <PageHeader>
        {authStore.isNotANormalNurse && (
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
            // onChange={(pagination: PaginationConfig) => {
            //   setPageOptions({
            //     pageIndex: pagination.current,
            //     pageSize: pagination.pageSize
            //   });
            // }}
            />
            <div className="selected-operate-con">
              {codeAdapter({
                'QCRG_20_2,QCRG_11_3,QCRG_11_2': (
                  <React.Fragment>
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
                  </React.Fragment>
                ),
                'QCRG_04': (
                  <React.Fragment>
                    <Button
                      disabled={
                        pageLoading ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => handleAuditAll('负责人', 'audit')}>
                      负责人签名
                    </Button>
                    <Button
                      disabled={
                        pageLoading ||
                        selectedRowKeys.length <= 0
                      } type="primary"
                      onClick={() => deleteSelectedRows()}>
                      删除
                    </Button>
                  </React.Fragment>
                ),
                'QCRG_14_1,QCRG_10,QCRG_10_2,QCRG_03,QCRG_14_2,QCRG_21': (
                  <React.Fragment>
                    <Button
                      disabled={
                        pageLoading ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => handleAuditAll(
                        '负责人',
                        codeAdapter({
                          QCRG_03: 'sign',
                          other: 'audit'
                        }, registerCode)
                      )}>
                      负责人签名
                    </Button>
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
                  </React.Fragment>
                ),
                'QCRG_12_2': (
                  <React.Fragment>
                    <Button
                      disabled={
                        pageLoading ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => handleAuditAll('护士', 'sign')}>
                      签名
                    </Button>
                    <Button
                      disabled={
                        pageLoading ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => handleAuditAll('负责人', 'audit')}>
                      负责人签名
                    </Button>
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
                  </React.Fragment>
                ),
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
