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
import { getFun, ItemConfigItem, lastWeekDatesAMonth } from "../../utils/fun/fun";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from '../../components/Render.v1/FileUploadColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'

const TextArea = Input.TextArea

export interface Props {
  payload: any;
}

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 消毒隔离工作登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;

  //当月最后一周的日期
  const lastWeekDatesThisMonth = lastWeekDatesAMonth()
  //今日是否当月最后一周
  // const currentInLastWeek = lastWeekDatesThisMonth.indexOf(moment().format('YYYY-MM-DD')) >= 0

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
  //选中的条目
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  const handleSelectedChange = (payload: any[]) => {
    setSelectedRowKeys(payload)
  }

  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  );

  const settingModal = createModal(SettingModal);
  const previewModal = createModal(PreviewModal);

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

  const columns: ColumnProps<any>[] | any = [
    {
      title: () => {
        return (
          <LineCon>
            <TextCon>
              <Text x="20%" y="70%" deg="0">
                日期
              </Text>
              <Text x="60%" y="60%" deg="0">
                合格
              </Text>
              <Text x="65%" y="20%" deg="0">
                名称
              </Text>
            </TextCon>
            <SvgCon xmlns="http://www.w3.org/2000/svg" version="1.1">
              <line x1="0" y1="0" x2="60%" y2="100%" />
              <line x1="0" y1="0" x2="100%" y2="70%" />
            </SvgCon>
          </LineCon>
        );
      },
      dataIndex: "recordDate",
      align: "center",
      className: "input-cell",
      width: 100,
      render(text: string, record: any, index: number) {
        // if (appStore.isDev) 
        return (
          <Input
            disabled={cellDisabled(record)}
            defaultValue={text}
            onKeyUp={handleNextIptFocus}
            onChange={e => {
              record.modified = true
              record.recordDate = e.target.value;
            }}
            onBlur={() => updateDataSource()}
          />
        );

        // return text
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
          let { itemCode } = item

          //是否符合操作的时间
          const timeDisabled = (() => {
            if (!moment(record.recordDate).isValid()) return true
            //当月最后一周
            let lastWeek = lastWeekDatesAMonth(record.recordDate)
            let recordMoment = moment(record.recordDate)
            if (itemCode.match(/每月/)) {
              //每月项目只能每月最后一周包含的日期填写
              //每月项目 记录日期为最后一周内可填写 不限制填写日期
              let recordDate = recordMoment.format('YYYY-MM-DD')
              if (
                record.recordDate
                && recordMoment.isValid()
                && lastWeek.indexOf(recordDate) >= 0
                // && currentInLastWeek
              )
                return false

              return true
            } else if (itemCode == '监测报告') {
              //监测报告只有3/6/9/12月的30日才能填写(作废)
              //检测报告 记录日期为最后一周内可填写 不限制填写日期
              let recordDate = recordMoment.format('YYYY-MM-DD')
              if (
                record.recordDate
                && recordMoment.isValid()
                && lastWeek.indexOf(recordDate) >= 0
                // && [3, 6, 9, 12].indexOf(recordMoment.get('M') + 1) >= 0
                // &&moment().get('date') == 30
              )
                return false

              return true
            }
            return false
          })()

          //处理上传附件类型
          if (item.itemType == "attachment") {
            if (timeDisabled) {
              children = <span
                style={{
                  display: 'inline-block',
                  width: '100%',
                  cursor: 'not-allow',
                  background: '#f5f5f5',
                  height: '33px',
                  lineHeight: '33px',
                  verticalAlign: 'middle'
                }}></span>
            } else {
              children = <FileUploadColumnRender
                {...{
                  record,
                  itemCfg: item,
                  index,
                  cellDisabled,
                  handleUpload,
                  handlePreview,
                  updateDataSource
                }} />
            }
          } else {
            children = <InputColumnRender
              {...{
                cellDisabled: (record: any) => {
                  return cellDisabled(record) || timeDisabled
                },
                itemCode: item.itemCode,
                handleNextIptFocus,
                record,
                updateDataSource,
                options: (item.options || "")
                  .split(";")
                  .filter((item: any) => item)
              }} />
          }

          if (
            item.itemCode == "消毒类别" &&
            (text == "酒精擦拭灯管" || text == "更换灯管")
          ) {
            const obj = {
              children,
              props: {
                colSpan: 6
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
        QCRG_07: [
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
          signRowObj({
            title: "护士签名",
            width: 70,
            dataIndex: "signerName",
            aside: "护士",
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
        other: []
      },
      registerCode
    ),
    // ...(appStore.isDev ?
    //   [
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
    // ] : []),
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
    paramMap: {},
    selectedRowKeys,
    setSelectedRowKeys,
  })

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage(undefined,{stopCreateRow:true});
    selectedBlockId && throttler(() => {
      getPage(undefined, { stopCreateRow: true })
    });
  }, [
    pageOptions,
    date,
    // selectedWzcd, 
    selectedBlockId
  ]);

  return (
    <Wrapper>
      <PageHeader>
        {authStore.isNotANormalNurse && <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
          修订登记本
        </Button>}
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
        {/* <PageTitle>{pageTitle}</PageTitle> */}
        {/* <Place /> */}

        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => setDate(value)}
          allowClear={true}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect onChange={() => { }} style={{ width: 150 }} />
        <Place />

        {selectedBlockId && (
          <React.Fragment>
            <Button onClick={() => getPage(undefined, { stopCreateRow: true })}>查询</Button>
            {/* {appStore.isDev &&  */}
            <Button type="primary" onClick={createRow}>新建</Button>
            {/* } */}
            <Button type="primary" onClick={onSave}>
              保存
            </Button>
            <Button onClick={exportExcel}>导出</Button>
            {authStore.isNotANormalNurse && <Button
              onClick={() =>
                settingModal.show({
                  selectedBlockObj,
                  blockId: selectedBlockId,
                  registerCode,
                  onOkCallBack: () => {
                    getPage(undefined, { stopCreateRow: true });
                  }
                })
              }>
              设置
            </Button>}
            {authStore.isNotANormalNurse && <Button onClick={onDelete}>删除</Button>}
          </React.Fragment>
        )}
      </PageHeader>
      <TableCon>
        {selectedBlockId && itemConfigList.length ? (
          <React.Fragment>
            <BaseTable
              loading={pageLoading}
              dataSource={dataSource.filter((item: any) => item)}
              columns={columns}
              surplusHeight={280}
              surplusWidth={300}
              pagination={{
                onChange: (pageIndex: number) => {
                  setPageOptions({ ...pageOptions, pageIndex })
                },
                onShowSizeChange: (pageIndex: number, pageSize: number) => {
                  setPageOptions({ ...pageOptions, pageSize })
                },
                current: pageOptions.pageIndex,
                pageSize: pageOptions.pageSize,
                total: total
              }}
              useOuterPagination
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
            </div>
          </React.Fragment>
        ) : (
            <NullBox onClick={onAddBlock} />
          )}
      </TableCon>
      <settingModal.Component />
      <previewModal.Component />
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
        创建消毒隔离工作登记本
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
`;
const TableCon = styled.div`
  padding: 0 15px;
  position: relative;

  .selected-operate-con{
    position: absolute;
    bottom: 12px;
    left: 24px;
  }
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
  
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .ant-input[disabled]{
      color: #000!important;
      background: rgba(0,0,0,0.0)!important;
    }
    .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
    }
  }
  textarea.ant-input{
    overflow:hidden!important;
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
