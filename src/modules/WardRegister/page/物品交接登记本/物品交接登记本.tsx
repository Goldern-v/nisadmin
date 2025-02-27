import styled from "styled-components";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Popover } from "antd";
import BaseTable from "src/components/BaseTable";
import {
  ColumnProps,
  PaginationConfig,
  AutoComplete,
  message,
  Input,
  Select,
  DatePicker,
  Modal,
  Row,
  Col
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
// import AddMessageModal from "./modal/AddMessageModal";
import { wardLogService } from "src/modules/wardLog/services/WardLogService";
import { getCurrentMonth } from "src/utils/date/currentMonth";
import { useLayoutEffect } from "src/types/react";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import TextArea from "antd/lib/input/TextArea";
import { fileDownload } from "src/utils/file/file";
import { createContextMenu } from "src/modules/personnelManagement/views/arrangeHome/components/arrangeSheet/ContextMenu";
import TdCell from "./components/TdCell";
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'

import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from '../../components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from '../../components/Render.v1/DatePickerColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'

import MessageListEditModal from './../../components/modal/MessageListEditModal'

export interface Props {
  payload: any;
}

const throttler = throttle();
let contextMenu = createContextMenu();
const MemoContextMenu = React.memo(contextMenu.Component);

export default observer(function HandoverRegister(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangeConfigList, setRangeConfigList] = useState([] as any[]);
  const [selectedRange, setSelectedRange] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [date, setDate]: any = useState(getCurrentMonth());
  const [surplusWidth, setSurplusWidth]: any = useState(false);
  const [surplusHeight, setSurplusHeight] = useState(200)
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  )

  /**表格勾选 */
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])

  const dateItemArr = codeAdapter({
    other: [],
    // [['QCRG_11', 'QCRG_11_2', 'QCRG_11_2'].join(',')]: [{
    //   itemCode: '开始时间',
    //   showTime: true,
    //   format: "YYYY-MM-DD HH:mm"
    // }, {
    //   itemCode: '结束时间',
    //   showTime: true,
    //   format: "YYYY-MM-DD HH:mm"
    // }],
  }, registerCode, true)

  const settingModal = createModal(SettingModal);
  const previewModal = createModal(PreviewModal);
  //提醒设置相关参数
  const [msgMap, setMsgMap] = useState({} as any)
  const [msgListEditVisible, setMsgListEditVisible] = useState(false)
  const [selectedMsgList, setSelectedMsgList] = useState([] as any[])
  const [selectedRowData, setSelectedRowData] = useState({} as any)
  const [selectedDataIndex, setSelectedDataIndex] = useState('')

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    record: any,
    dataIndex: string,
  ) => {
    event.persist();
    event.preventDefault();

    let target = (event as any).target;
    target.blur();

    let { left: x, top: y, width, height } = target.getBoundingClientRect();

    // return
    if (record.id) {
      contextMenu.show(
        [
          {
            icon: require("../../images/提醒@2x.png"),
            label: "提醒设置",
            type: "text",
            onClick: () => {
              let msgList = []
              if (msgMap[record.id] && msgMap[record.id][dataIndex])
                msgList = msgMap[record.id][dataIndex]

              setSelectedDataIndex(dataIndex)
              setSelectedRowData(record)
              setSelectedMsgList(msgList)
              setMsgListEditVisible(true)
            }
          }
        ],
        {
          x: x + width,
          y: y + height / 2,
          menuHeight: 34,
        }
      );
    }
  };

  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };

  const cellDisabled = (record: any) => {
    if (record.auditorNo) return true
    if (!record.signerNo) return false
    if (authStore.isNotANormalNurse) return false
    if (!authStore.user?.empNo) return true
    if (record.signerNo.toLowerCase() !== authStore.user?.empNo.toLowerCase())
      return true

    return false
    // return (
    //   record.signerName && record.auditorName && !authStore.isNotANormalNurse
    // );
  };

  const columns: ColumnProps<any>[] | any = [
    {
      title() {
        return codeAdapter(
          {
            QCRG_01: (
              <LineCon>
                <TextCon>
                  <Text x="20%" y="75%" deg="0">
                    日期
                  </Text>
                  <Text x="65%" y="77%" deg="22">
                    班次
                  </Text>
                  <Text x="80%" y="62%" deg="21">
                    质量
                  </Text>
                  <Text x="83%" y="35%" deg="12">
                    基数
                  </Text>
                  <Text x="82%" y="8%" deg="0">
                    物品
                  </Text>
                </TextCon>
                <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <line x1="0" y1="0" x2="60%" y2="100%" />
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="0" y1="0" x2="100%" y2="33%" />
                  <line x1="0" y1="0" x2="100%" y2="66%" />
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                </SvgCon>
              </LineCon>
            ),
            QCRG_02: (
              <LineCon>
                <TextCon>
                  <Text x="20%" y="70%" deg="0">
                    日期
                  </Text>
                  <Text x="65%" y="70%" deg="22">
                    班次
                  </Text>
                  <Text x="65%" y="20%" deg="0">
                    交班内容
                  </Text>
                </TextCon>
                <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <line x1="0" y1="0" x2="60%" y2="100%" />
                  <line x1="0" y1="0" x2="100%" y2="80%" />
                </SvgCon>
              </LineCon>
            ),
            other: '日期'
          },
          registerCode
        );
      },
      dataIndex: "recordDate",
      align: "center",
      className: 'input-cell',
      colSpan: codeAdapter({
        [
          ['QCRG_11', 'QCRG_11_2', 'QCRG_11_3',
            'QCRG_18', 'QCRG_15_3', 'QCRG_16_3']
            .join(',')
        ]: 1,
        other: 2
      }, registerCode, true),
      width: 107,
      fixed: false && surplusWidth && "left",
      render: (text: string, record: any) => {
        if (record.editType && record.editType == 'new') {
          return <TdCell>
            <Input
              style={{ textAlign: 'center' }}
              disabled={cellDisabled(record)}
              onKeyUp={handleNextIptFocus}
              defaultValue={text}
              onChange={e => {
                record.recordDate = e.target.value;
              }}
              onBlur={() => updateDataSource()}
            />
          </TdCell>
        } else {
          return <span>{text}</span>
        }
      }
    },
    ...codeAdapter({
      [
        ['QCRG_11', 'QCRG_11_2', 'QCRG_11_3',
          'QCRG_18', 'QCRG_15_3', 'QCRG_16_3']
          .join(',')
      ]: [],
      other: [
        {
          title: "班次",
          colSpan: 0,
          width: 73,
          dataIndex: "range",
          align: "center",
          className: 'input-cell',
          fixed: false && surplusWidth && "left",
          render: (text: string, record: any, index: number) => {
            if (record.editType && record.editType == 'new') {
              return <TdCell>
                <InputColumnRender
                  {...{
                    cellDisabled,
                    options: rangeConfigList.map((item: any) => item.itemCode),
                    record,
                    itemCode: 'range',
                    updateDataSource,
                    handleNextIptFocus
                  }}
                />
              </TdCell>
            } else {
              return <span>{text}</span>
            }
          }
        },
      ]
    }, registerCode, true),
    ...itemConfigList.map((item: any) => ({
      title(text: string, record: any, index: number) {
        return item.children ? (
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
          <ThBox>
            <div className="title">
              <span className="title-text">{item.itemCode}</span>
            </div>
            <div className="aside">{item.checkSize}</div>
          </ThBox>
        ) : (
              item.itemCode
            )
      },
      align: "center",
      dataIndex: item.itemCode,
      width: (15 * item.width || 50) + 8,
      colSpan: item.colSpan,
      className: (() => {
        let tdClassName = "input-cell input-cell-custom"
        if (registerCode === 'QCRG_02') tdClassName += ' QCRG_02'

        return tdClassName
      })(),
      onCell: (record: any) => ({
        onContextMenu: (e: any) => {
          if (registerCode === 'QCRG_02') {
            onContextMenu(e, record, item.itemCode)
          }
        }
      }),
      render(text: string, record: any, index: number) {
        let className = ''
        if (item.checkSize) className = text != item.checkSize && text != "√"
          ? "checkSize-warning"
          : ""

        //处理时间选择类型
        let target = dateItemArr.find((dateItem: any) => dateItem.itemCode == item.itemCode)

        let child = <span></span>

        if (item.itemType == 'date' || item.itemType == 'date_time' || target) {
          let format = 'YYYY-MM-DD'
          if (item.itemType == 'date_time') format = 'YYYY-MM-DD HH:mm'
          if (target?.format) format = target.format

          child = <DatePickerColumnRender
            {...{
              className: '',
              cellDisabled,
              record,
              itemCfg: item,
              index,
              format,
              showTime: item.itemType == 'date_time' || target?.showTime || false,
              handleNextIptFocus,
              updateDataSource,
              registerCode
            }}
          />
        }

        //处理上传附件类型
        if (item.itemType == "attachment")
          child = <FileUploadColumnRender
            {...{
              record,
              itemCfg: item,
              index,
              cellDisabled,
              handleUpload,
              handlePreview,
              updateDataSource
            }} />

        if (item.itemType == "")
          child = <TdCell>
            <InputColumnRender
              {...{
                cellDisabled,
                itemCode: item.itemCode,
                handleNextIptFocus,
                record,
                updateDataSource,
                multiple: (() => {
                  if (registerCode == 'QCRG_18' && item.itemCode == '参加人员')
                    return true
                  else
                    return false
                })(),
                selectAll: (() => {
                  if (registerCode == 'QCRG_18' && item.itemCode == '参加人员')
                    return true
                  else
                    return false
                })(),
                options: (item.options || "")
                  .split(";")
                  .filter((item: any) => item)
              }} />
          </TdCell>

        if (registerCode == 'QCRG_02') {
          let msgList = []
          if (record.id && msgMap[record.id] && msgMap[record.id][item.itemCode])
            msgList = msgMap[record.id][item.itemCode]
          // return child

          // return <Popover
          //   placement="bottomRight"
          //   title="提醒设置"
          //   content={<React.Fragment>
          //     {msgMap[record.id][item.itemCode].map((msg: any, msgIdx: number) => <MsgRow key={msgIdx}>
          //       <span className="msg-content">{msg.content}</span>
          //       <span className="msg-appointHandleTime">{msg.appointHandleTime}({msg.appointRange})</span>
          //       <span className="msg-vsUserList">{msg.vsUserList.map((emp: any) => emp.empName).join('、')}</span>
          //     </MsgRow>)}
          //   </React.Fragment>}
          //   trigger="hover">
          //   <MsgCard>{msgMap[record.id][item.itemCode].length}</MsgCard>
          //   <div>{child}</div>
          // </Popover>

          return <div>
            {msgList.map((msg: any, msgIdx: number) =>
              <MsgGroup key={msgIdx}>
                <span className="msg-content">{msgList.length > 1 ? `${msgIdx + 1}.` : ''}{msg.content} </span>
                <span className="msg-appointHandleTime">[{msg.appointRange}]</span>
                <span className="msg-vsUserList"> [{msg.vsUserList.map((emp: any) => emp.empName).join('、')}]</span>
              </MsgGroup>)}
          </div>
        } else {
          return child
        }
      }
    })),

    {
      title: "备注",
      width: 150,
      dataIndex: "description",
      className: "input-cell input-cell-description",
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
    ...codeAdapter({
      QCRG_18: [
        {
          title: "操作",
          width: 80,
          fixed: false && surplusWidth && "right",
          align: "center",
          render: (text: any, record: any, idx: number) => {
            return <DoCon>
              <span onClick={() => handleDeleteRow(record, idx)}>删除</span>
            </DoCon>
          }
        }
      ],
      other: [
        {
          title: "交班者签名",
          width: 110,
          dataIndex: "signerName",
          align: "center",
          fixed: false && surplusWidth && "right",
          render(text: string, record: any, index: number) {
            if (record.editType && record.editType == 'new')
              return <span style={{ cursor: 'not-allowed', color: '#999' }}>签名</span>

            return text ? (
              <div
                className="sign-name"
                onClick={() => {
                  globalModal
                    .confirm("交班签名取消", "你确定取消交班签名吗？")
                    .then(res => {
                      wardRegisterService
                        .cancelSign(registerCode, [{ id: record.id }])
                        .then(res => {
                          message.success("取消交班签名成功");
                          Object.assign(record, res.data.list[0]);
                          updateDataSource();
                        });
                    });
                }}
              >
                {text +
                  (record.chiefNurseName || record.chiefNurseNo
                    ? `/${record.chiefNurseName || record.chiefNurseNo}`
                    : "")}
              </div>
            ) : (
                <DoCon>
                  <span
                    onClick={() => {
                      globalModal
                        .confirm("交班签名确认", "你确定交班签名吗？")
                        .then(res => {
                          wardRegisterService
                            .saveAndSignAll(
                              registerCode,
                              selectedBlockId,
                              [record],
                              true
                            )
                            .then(res => {
                              message.success("交班签名成功");
                              Object.assign(record, res.data.itemDataList[0]);
                              updateDataSource();
                            });
                        });
                    }}
                  >
                    签名
                </span>
                </DoCon>
              );
          }
        },
        {
          title: "接班者签名",
          width: 80,
          dataIndex: "auditorName",
          fixed: false && surplusWidth && "right",
          align: "center",
          render(text: string, record: any, index: number) {
            if (record.editType && record.editType == 'new')
              return <span style={{ cursor: 'not-allowed', color: '#999' }}>签名</span>

            return text ? (
              <div
                className="sign-name"
                onClick={() => {
                  globalModal
                    .confirm("接班签名取消", "你确定取消接班签名吗？")
                    .then(res => {
                      wardRegisterService
                        .cancelAudit(registerCode, [{ id: record.id }])
                        .then(res => {
                          message.success("取消接班签名成功");
                          onSave();
                        });
                    });
                }}
              >
                {text}
              </div>
            ) : (
                <DoCon>
                  <span
                    onClick={() => {
                      globalModal
                        .confirm("接班签名确认", "你确定接班签名吗？")
                        .then(res => {
                          wardRegisterService
                            .auditAll(registerCode, [{ id: record.id }])
                            .then(res => {
                              message.success("接班签名成功");
                              onSave();
                            });
                        });
                    }}
                  >
                    签名
                </span>
                </DoCon>
              );
          }
        },
        {
          title: "操作",
          width: 80,
          fixed: false && surplusWidth && "right",
          align: "center",
          render: (text: any, record: any, idx: number) => {
            return <DoCon>
              <span onClick={() => handleDeleteRow(record, idx)}>删除</span>
            </DoCon>
          }
        }
      ]
    }, registerCode)
  ];

  //预览附件
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
    handleNextIptFocus,
    handleUpload,
    exportExcel,
    handleDeleteRow,
    createRow,
    onSave,
    onInitData,
    onDelete,
    onAddBlock,
    getPage,
    fixInputValue,
    deleteSelectedRows,
    getMsgList,
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
    rangeConfigList,
    selectedBlockId,
    dataSource,
    paramMap: { '班次': selectedRange },
    selectedRowKeys,
    setSelectedRowKeys,
    setMsgMap,
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedRange, selectedBlockId]);

  useLayoutEffect(() => {
    try {
      setTimeout(() => {
        // if (
        //   (document as any).querySelector(
        //     "#HandoverRegisterTable .ant-table-body"
        //   ) &&
        //   (document as any).querySelector(
        //     "#HandoverRegisterTable .ant-table-body"
        //   ).scrollWidth ==
        //   (document as any).querySelector(
        //     "#HandoverRegisterTable .ant-table-body"
        //   ).clientWidth
        // ) {
        //   /** noscorll */
        //   (document as any).querySelector(
        //     "#HandoverRegisterTable #baseTable"
        //   ).style.width =
        //     columns.reduce((total: number, current: any) => {
        //       return total + current.width;
        //     }, 0) +
        //     10 +
        //     "px";
        //   setSurplusWidth(false);
        // } else {
        //   (document as any).querySelector(
        //     "#HandoverRegisterTable #baseTable"
        //   ) &&
        //     ((document as any).querySelector(
        //       "#HandoverRegisterTable #baseTable"
        //     ).style.width = "auto");
        //   setSurplusWidth(280);
        // }

        if (itemConfigList.length > 0) {
          let target = document.querySelector('#baseTable .ant-table-header') as any
          if (target) {
            setSurplusHeight(target.offsetHeight ? target.offsetHeight + (200 - 25) : 200)
          }
        }
      }, 100);
    } catch (error) { }
  }, [itemConfigList]);

  return (
    <Wrapper id="HandoverRegisterTable">
      <PageHeader>
        {authStore.isNotANormalNurse && (
          <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
            修订
          </Button>
        )}

        <span className="label">记录</span>
        <Select
          style={{ width: 150 }}
          value={selectedBlockId}
          onChange={(value: any) => {
            setSelectedBlockId(value);
            setPageOptions({ ...pageOptions, pageIndex: 1 })
          }}
        >
          {blockList.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {// item.registerName +
                //   " " +
                moment(item.createTime).format("YYYY-MM-DD") + " 修订"}
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
          style={{ width: 210 }}
        />
        <span className="label">科室</span>
        <DeptSelect onChange={() => { }} style={{ width: 150 }} />
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
                    selectedBlockObj: selectedBlockObj,
                    registerCode,
                    onOkCallBack: () => {
                      getPage();
                    }
                  })
                }
              >
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
              loading={pageLoading}
              dataSource={dataSource}
              columns={columns}
              surplusWidth={300}
              surplusHeight={surplusHeight}
              useOuterPagination={true}
              rowClassName={(record: any, idx: number) => {
                if (cellDisabled(record)) return 'disabled-row'

                return ''
              }}
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
              rowSelection={{
                selectedRowKeys,
                onChange: handleSelectedChange,
              }}
            />
            <div className="selected-operate-con">
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
            <NullBox onClick={onAddBlock} registerName={registerName} />
          )}
      </TableCon>
      <settingModal.Component />
      <previewModal.Component />
      {/* <messageListEditModal.Component /> */}
      <MessageListEditModal
        dataIndex={selectedDataIndex}
        registerCode={registerCode}
        blockId={selectedBlockId || ''}
        visible={msgListEditVisible}
        originList={selectedMsgList}
        rowData={selectedRowData}
        onCancel={(reload: boolean) => {
          if (reload) getMsgList(true)
          setMsgListEditVisible(false)
        }} />
      {/* <MemoAddMessageModal /> */}
      <MemoContextMenu />
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
        创建{props.registerName || '登记本'}
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
  .ant-btn {
    padding: 0 6px;
    letter-spacing: -1px;
  }
`;
const TableCon = styled.div`
  padding: 0 15px;
  position: relative;
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
    input {
      border: 0;
      border-radius: 0;
      text-align: center;
    }
  }
  .input-cell {
    padding: 0 !important;
    position: relative;
    &.QCRG_02.input-cell-custom{
      &:hover{
        background: #eee!important;
      }
    }
  }
  input,textarea {
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
  .td-date-picker,.td-range-picker{
    border: 0;
    border-radius: 0;
    height: 100%;
    width: 100%;
    outline: none;
    position: absolute;
    left: 0;
    top: 50%;
    height: 32px;
    transform: translateY(-50%);
    .ant-select-selection,input{
      border: 0;
      border-radius: 0;
    }
  }
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    .input-cell-custom,.input-cell-description{
      background: rgba(0,0,0,0.03)!important;
    }
  }
  .ant-input[disabled]{
    color: #000!important;
      background: rgba(0,0,0,0.0)!important;
  }
  textarea.ant-input{
    overflow:hidden!important;
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
  .selected-operate-con{
    position: absolute;
    bottom: 12px;
    left: 24px;
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

const MsgCard = styled.div`
  position: absolute;
  z-index: 1;
  display: inline-block;
  background: red;
  height: 16px;
  border-radius: 50%;
  min-width: 16px;
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  right: -4px;
  top: 0px;
  padding: 0 4px;
`

const MsgRow = styled.div`
  border-bottom: 1px solid #eee;

  &:last-of-type{
    border-bottom:0;
  }

  &>span{
    margin-right: 5px;
    word-break: break-all;
    vertical-align: middle;
    display: inline-block;
    &:last-of-type{
      margin-right:0;
    }
  }

  .msg-content{
    width: 150px;
  }
  .msg-appointHandleTime{
    width: 120px;
    text-align: center;
  }
  .msg-vsUserList{
    width: 100px;
    text-align: center;
  }
`

const MsgGroup = styled.div`
  text-align: left;
  .msg-appointHandleTime,.msg-vsUserList{
    color: #aaa;
  }
`