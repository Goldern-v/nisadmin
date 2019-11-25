import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import HeadCon from "../../components/HeadCon/HeadCon";
import BaseTable from "src/components/BaseTable";
import {
  ColumnProps,
  PaginationConfig,
  AutoComplete,
  message,
  Input,
  Select,
  DatePicker
} from "src/vendors/antd";
import { wardRegisterService } from "../../services/WardRegisterService";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { wardRegisterViewModal } from "../../WardRegisterViewModal";
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
export interface Props {}
const registerCode = "qc_register_handover";
export default observer(function HandoverRegister() {
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangeConfigList, setRangeConfigList] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [date, setDate]: any = useState(getCurrentMonth());
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  const settingModal = createModal(SettingModal);
  const updateDataSource = () => {
    setDataSource([...dataSource]);
  };
  const columns: ColumnProps<any>[] | any = [
    {
      title() {
        return (
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
        );
      },
      dataIndex: "recordDate",
      align: "center",
      colSpan: 2,
      width: 107,
      fixed: "left"
    },
    {
      title: "头部",
      colSpan: 0,
      width: 73,
      dataIndex: "range",
      align: "center",
      fixed: "left"
    },
    ...itemConfigList.map((item: any) => {
      if (item.checkSize) {
        return {
          title(text: string, record: any, index: number) {
            return (
              <ThBox>
                <div className="title">
                  <span className="title-text">{item.itemCode}</span>
                </div>
                <div className="aside">{item.checkSize}</div>
              </ThBox>
            );
          },
          align: "center",
          dataIndex: item.itemCode,
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                dataSource={(item.options || "").split(";")}
                value={text}
                onChange={value => {
                  record[item.itemCode] = value;
                  updateDataSource();
                }}
              />
            );
          }
        };
      } else {
        return {
          title(text: string, record: any, index: number) {
            return (
              <ThBox>
                <div className="title">
                  <span className="title-text">{item.itemCode}</span>
                </div>
              </ThBox>
            );
          },
          align: "center",
          dataIndex: item.itemCode,
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                dataSource={(item.options || "").split(";")}
                value={text}
                onChange={value => {
                  record[item.itemCode] = value;
                  updateDataSource();
                }}
              />
            );
          }
        };
      }
    }),

    {
      title: "备注",
      width: 150,
      dataIndex: "description",
      className: "input-cell",
      render(text: string, record: any, index: number) {
        return (
          <Input.TextArea
            autosize={true}
            value={text}
            onChange={e => {
              record.description = e.target.value;
              updateDataSource();
            }}
          />
        );
      }
    },
    {
      title: "交班者签名",
      width: 80,
      dataIndex: "signerName",
      align: "center",
      render(text: string, record: any, index: number) {
        return text;
      }
    },
    {
      title: "接班者签名",
      width: 80,
      dataIndex: "auditorName",
      align: "center",
      render(text: string, record: any, index: number) {
        return (
          text || (
            <DoCon>
              <span
                onClick={() => {
                  globalModal
                    .confirm("交班签名确认", "你确定交班签名吗？")
                    .then(res => {
                      wardRegisterService.auditAll([record.id]).then(res => {
                        message.success("接班签名成功");
                        // onLoad();
                      });
                    });
                }}
              >
                签名
              </span>
            </DoCon>
          )
        );
      }
    }
  ];

  const onInitData = async () => {
    // setPageLoading(true);
    await wardRegisterService
      .qcRegisterBlockGetList(registerCode, authStore.selectedDeptCode)
      .then(res => {
        setBlockList(res.data);
        if (res.data[blockList.length]) {
          setSelectedBlockId((res.data[blockList.length] as any)!.id);
        }
      });
  };

  const getPage = () => {
    setPageLoading(true);
    wardRegisterService
      .getPage(registerCode, {
        wardCode: authStore.selectedDeptCode,
        startDate: date[0].format("YYYY-MM-DD"),
        endDate: date[1].format("YYYY-MM-DD"),
        range: wardRegisterViewModal.selectedClasses,
        blockId: selectedBlockId,
        ...pageOptions
      })
      .then(res => {
        setTotal(res.data.itemDataPage.totalPage);
        setDataSource(res.data.itemDataPage.list);
        setItemConfigList(res.data.itemConfigList);
        setRangeConfigList(res.data.rangeConfigList);
        // setOldData(res.data);
        setPageLoading(false);
      });
  };

  const onAddBlock = () => {
    wardRegisterService
      .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode)
      .then(res => {
        message.success("创建成功");
      });
  };

  const onSave = () => {
    wardRegisterService
      .saveAndSignAll(registerCode, selectedBlockId, dataSource)
      .then(res => {
        message.success("保存成功");
        getPage();
      });
  };

  const onInit = () => {};

  useEffect(() => {
    onInitData();
  }, []);

  useEffect(() => {
    selectedBlockId && getPage();
  }, [pageOptions, authStore.selectedDeptCode, date, wardRegisterViewModal.selectedClasses, selectedBlockId]);
  return (
    <Wrapper>
      <PageHeader>
        <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
          新建
        </Button>

        {/* <PageTitle>{pageTitle}</PageTitle> */}
        {/* <Place /> */}
        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => setDate(value)}
          allowClear={false}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect onChange={() => {}} />
        <span className="label">班次</span>
        <Select
          value={selectedRange}
          onChange={(value: any) => {
            setSelectedRange(value);
          }}
        >
          <Select.Option value="">全部</Select.Option>
          {rangeConfigList.map((item: any) => (
            <Select.Option value={item.itemCode} key={item.itemCode}>
              {item.itemCode}
            </Select.Option>
          ))}
        </Select>
        <span className="label">修订</span>
        <Select
          value={selectedBlockId}
          onChange={(value: any) => {
            setSelectedBlockId(value);
          }}
        >
          {blockList.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {item.registerName}
            </Select.Option>
          ))}
        </Select>
        <Place />
        <Button onClick={getPage}>查询</Button>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
        <Button>导出</Button>
        <Button
          onClick={() =>
            settingModal.show({
              blockId: selectedBlockId,
              registerCode,
              onOkCallBack: () => {
                getPage();
              }
            })
          }
        >
          设置
        </Button>
        {/* <Button>筛选</Button> */}
      </PageHeader>
      <TableCon>
        <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          surplusWidth={190}
          surplusHeight={300}
          pagination={{
            current: pageOptions.pageIndex,
            pageSize: pageOptions.pageSize,
            total: total
          }}
          onChange={(pagination: PaginationConfig) => {
            setPageOptions({
              pageIndex: pagination.current,
              pageSize: pagination.pageSize
            });
          }}
        />
      </TableCon>
      <settingModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
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
    margin: 0 -8px;
    border-radius: 0;
    input {
      border: 0;
      border-radius: 0;
      text-align: center;
    }
  }
  .input-cell {
    padding: 0;
  }
  textarea {
    border: 0;
    border-radius: 0;
    height: 100%;
    width: 100%;
    outline: none;
    resize: none;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
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
