import styled from "styled-components";
import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { Button } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
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
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import { createFilterItem } from "../../components/FilterItem";
import classNames from "classnames";
import { createFilterInput } from "../../components/FilterInput";
import TextArea from "antd/lib/input/TextArea";
import { wardRegisterService } from "../../services/WardRegisterService";
import { globalModal } from "src/global/globalModal";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from './../../components/FileUploadColumnRender'
import DatePickerColumnRender from './../../components/DatePickerColumnRender'

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
  const [date, setDate]: any = useState([null, null]);
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
  const ymFilterItem = createFilterItem(
    "药名",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const wpmcFilterItem = createFilterItem(
    "物品名称",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const bfzlxFilterItem = createFilterItem(
    "并发症类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const jmlxFilterItem = createFilterItem(
    "静脉类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const zhpjlxFilterItem = createFilterItem(
    "综合评价类型",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const rylxFilterItem = createFilterItem(
    "人员类别",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const yqmcFilterItem = createFilterItem(
    "仪器名称",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const sbztFilterItem = createFilterItem(
    "设备状态",
    itemConfigList,
    rangConfigList,
    () => {
      setPopoverVisible(false);
      getPage();
    }
  );
  const chxmFilterItem = createFilterInput("床号或姓名", () => {
    setPopoverVisible(false);
    getPage();
  });

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
          <chxmFilterItem.Component />
        </div>
      )
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
    ...rylxFilterItem.value
  };

  /** 判断是否快过期 */
  const isEndTime = (record: any) => {
    let current = ''
    let endTime = ''
    let itemCode = '有效期'

    if (registerCode == "QCRG_14_1") {
      itemCode = '失效日期'
    } else if (registerCode == 'QCRG_14_2') {
      itemCode = '生产日期'
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
                    <Text x="58%" y="70%" deg="0">
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
            width: 160
          },
          // {
          //   title: "班次",
          //   colSpan: 0,
          //   width: 73,
          //   dataIndex: "range",
          //   align: "center"
          // }
        ],
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
                  onChange={value => {
                    record.recordDate = value;
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
            width: 107
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
          align: "center",
          render(text: string, record: any, index: number) {
            let children = (
              <AutoComplete
                disabled={cellDisabled(record)}
                dataSource={rangConfigList.map((item: any) => item.itemCode)}
                defaultValue={text}
                onChange={value => {
                  record.modified = true
                  record["range"] = value;
                }}
                onBlur={() => updateDataSource()}
                onSelect={value => {
                  updateDataSource();
                }}
              >
                <TextArea
                  autosize
                  data-key={'range'}
                  onKeyUp={handleNextIptFocus}
                  style={{
                    lineHeight: 1.2,
                    overflow: "hidden",
                    padding: "9px 2px",
                    textAlign: "center"
                  }}
                />
              </AutoComplete>
            );
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
            <MergeTitle>{item.pTitle || item.itemCode}</MergeTitle>
            <PTitleCon>
              {item.children.map(
                (cItem: ItemConfigItem, index: number, arr: any) => (
                  <CTitleBox
                    key={index}
                    style={{
                      ...{ flex: cItem.width, width: 0 },
                      ...(index == arr.length - 1 ? { border: 0 } : {})
                    }}
                  >
                    {cItem.checkSize ? (
                      <ThBox>
                        <div className="title">
                          <span className="title-text">
                            {cItem.label || cItem.itemCode}
                          </span>
                        </div>
                        <div className="aside">{cItem.checkSize}</div>
                      </ThBox>
                    ) : (
                        <span className="title-text">
                          {cItem.label || cItem.itemCode}
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
              <div className="title">
                <span className="title-text">{item.itemCode}</span>
              </div>
              <div className="aside">{item.checkSize}</div>
            </ThBox>
          )
        ) : (
              item.itemCode
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
            [isEndTime(record)]: isEndTime(record),
            "checkSize-warning":
              item.checkSize && (text != item.checkSize && text != "√")
          })

          let dateItemCodeArr = codeAdapter({
            QCRG_10: ['有效期'],
            QCRG_14_1: ['生产日期', '失效日期'],
            QCRG_14_2: ['失效日期'],
            QCRG_19_2: ['开始时间', '结束时间'],
            QCRG_08: ['入院时间'],
            other: []
          }, registerCode)

          if (dateItemCodeArr.indexOf(item.itemCode) >= 0) {
            children = <DatePickerColumnRender
              {...{
                className: childrenClassName,
                cellDisabled,
                record,
                itemCfg: item,
                index,
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
            children = (
              <AutoComplete
                className={childrenClassName}
                disabled={cellDisabled(record)}
                dataSource={
                  item.options
                    ? item.options.split(";").filter((item: any) => item)
                    : undefined
                }
                onFocus={() => fixInputValue(record, codeAdapter({
                  QCRG_19_2: ['总计天数'],
                  other: []
                }, registerCode), index, 100)}
                defaultValue={text}
                onChange={value => {
                  console.log('change')
                  record.modified = true
                  record[item.itemCode] = value.toString().replace(/\n/g, '');

                }}
                onBlur={() => {
                  updateDataSource()
                  fixInputValue(record, codeAdapter({
                    QCRG_19_2: ['总计天数'],
                    other: []
                  }, registerCode), index, 100)
                }}
                onSelect={value => {
                  if (
                    registerCode == "QCRG_04" &&
                    item.itemCode == "组号及床号"
                  ) {
                    let prevValue = record[item.itemCode] || '';
                    setTimeout(() => {
                      record[item.itemCode] =
                        prevValue + (prevValue ? ";" : "") + value;
                      updateDataSource(true);
                    }, 0);
                  } else {
                    // updateDataSource();
                  }
                }}
              >
                <TextArea
                  autosize
                  data-key={item.itemCode}
                  onKeyUp={handleNextIptFocus}
                  style={{
                    lineHeight: 1.2,
                    overflow: "hidden",
                    padding: "9px 2px",
                    textAlign: "center"
                  }}
                />
              </AutoComplete>
            );
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
            title: "护士长",
            width: 70,
            dataIndex: "signerName",
            aside: "",
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
            title: "登记人签名",
            width: 90,
            dataIndex: "signerName",
            aside: "责护",
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
            title: "护士长签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
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
            title: "护士长签名",
            width: 70,
            dataIndex: "auditorName",
            aside: "护士长",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        QCRG_14_2: [
          signRowObj({
            title: "责任护士签名",
            width: 90,
            dataIndex: "signerName",
            aside: "责任护士",
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
        'QCRG_20_1,QCRG_20_2': [
          {
            title: "备注",
            width: 150,
            dataIndex: "description",
            className: "input-cell",
            render(text: string, record: any, index: number) {
              return (
                <Input.TextArea
                  disabled={cellDisabled(record)}
                  autosize={true}
                  defaultValue={text}
                  onChange={e => {
                    record.description = e.target.value;
                  }}
                  onBlur={() => updateDataSource()}
                />
              );
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
    handleCopyCreateRow
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
            <Button type="primary" onClick={createRow}>
              新建行
            </Button>
            <Button type="primary" onClick={onSave}>
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
        {/* {JSON.stringify(columns)} */}
        {selectedBlockId && itemConfigList.length ? (
          <React.Fragment>
            <BaseTable
              className="record-page-table"
              loading={pageLoading}
              dataSource={dataSource}
              rowSelection={codeAdapter({
                'QCRG_14_1,QCRG_10,QCRG_14_2': {
                  selectedRowKeys,
                  onChange: handleSelectedChange,
                },
                other: undefined
              }, registerCode, true)}
              columns={columns.filter((item: any) => item)}
              surplusHeight={surplusHeight}
              surplusWidth={300}
              pagination={{
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
            <div className="selected-operate-con">
              {codeAdapter({
                'QCRG_14_2':
                  <Button
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() => handleCopyCreateRow()}>
                    复制新增
                  </Button>,
                'QCRG_14_1,QCRG_10':
                  <React.Fragment>
                    <Button
                      disabled={
                        pageLoading ||
                        !authStore.isRoleManage ||
                        selectedRowKeys.length <= 0
                      }
                      type="primary"
                      onClick={() => handleAuditAll('护士长')}>
                      护士长签名
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
                  </React.Fragment>,
                other: <span></span>,
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
