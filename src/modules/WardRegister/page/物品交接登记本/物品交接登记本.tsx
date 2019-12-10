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
  DatePicker
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
export interface Props {
  payload: any;
}

const throttler = throttle();

export default observer(function HandoverRegister(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const [oldData, setOldData]: any = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangeConfigList, setRangeConfigList] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [date, setDate]: any = useState([null, null]);
  const [surplusWidth, setSurplusWidth]: any = useState(false);
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
            )
          },
          registerCode
        );
      },
      dataIndex: "recordDate",
      align: "center",
      colSpan: 2,
      width: 107,
      fixed: surplusWidth && "left"
    },
    {
      title: "头部",
      colSpan: 0,
      width: 73,
      dataIndex: "range",
      align: "center",
      fixed: surplusWidth && "left"
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
          width: (15 * item.width || 50) + 8,
          className: "input-cell",
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                className={
                  text != item.checkSize && text != "√"
                    ? "checkSize-warning"
                    : ""
                }
                disabled={!!record.signerName}
                dataSource={(item.options || "").split(";")}
                defaultValue={text}
                onChange={value => {
                  record[item.itemCode] = value;
                }}
                onBlur={() => updateDataSource()}
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
          className: "input-cell",
          width: (15 * item.width || 50) + 8,
          dataIndex: item.itemCode,
          render(text: string, record: any, index: number) {
            return (
              <AutoComplete
                disabled={!!record.signerName}
                dataSource={item.options ? item.options.split(";") : []}
                defaultValue={text}
                onChange={value => {
                  record[item.itemCode] = value;
                }}
                onBlur={() => updateDataSource()}
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
            disabled={!!record.signerName}
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
    {
      title: "交班者签名",
      width: 80,
      dataIndex: "signerName",
      align: "center",
      fixed: surplusWidth && "right",
      render(text: string, record: any, index: number) {
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
            {text}
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
      fixed: surplusWidth && "right",
      align: "center",
      render(text: string, record: any, index: number) {
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
    }
  ];

  const onInitData = async () => {
    // setPageLoading(true);
    await wardRegisterService
      .qcRegisterBlockGetList(registerCode, authStore.selectedDeptCode)
      .then(async res => {
        setBlockList(res.data);
        if (res.data[res.data.length - 1]) {
          let blockId = (res.data[res.data.length - 1] as any)!.id;
          let lastPageIndex = await getLastPageIndex(blockId);
          setSelectedBlockId(blockId);
          setPageOptions({
            ...pageOptions,
            pageIndex: lastPageIndex
          });
        } else {
          setSelectedBlockId(null);
          setTotal(0);
          setDataSource([]);
          setItemConfigList([]);
          setRangeConfigList([]);
        }
      });
  };

  const getLastPageIndex = async (blockId: any) => {
    return await wardRegisterService
      .getPage(registerCode, {
        blockId: blockId,
        ...pageOptions
      })
      .then(res => res.data.itemDataPage.totalPage);
  };

  const getPage = () => {
    setPageLoading(true);
    wardRegisterService
      .getPage(registerCode, {
        startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
        endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
        range: selectedRange,
        blockId: selectedBlockId,
        ...pageOptions
      })
      .then(res => {
        console.log(res, "res");
        setTotal(res.data.itemDataPage.totalPage);
        setDataSource(res.data.itemDataPage.list);
        setItemConfigList(res.data.itemConfigList);
        setRangeConfigList(res.data.rangeConfigList);
        setPageLoading(false);
      });
  };

  const onAddBlock = () => {
    globalModal
      .confirm(
        "是否新建物品交接登记本",
        `新建物品交接登记本开始日期为${moment().format(
          "YYYY-MM-DD"
        )}，历史交接登记本请切换修订版本查看`
      )
      .then(res => {
        wardRegisterService
          .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功");
            onInitData();
          });
      });
  };

  const onSave = () => {
    wardRegisterService
      .saveAndSignAll(registerCode, selectedBlockId, dataSource, false)
      .then(res => {
        message.success("保存成功");
        getPage();
      });
  };

  const onDelete = () => {
    globalModal.confirm("删除确认", "确定要删除此修订版本吗？").then(res => {
      wardRegisterService
        .qcRegisterBlockDelete(registerCode, selectedBlockId)
        .then(res => {
          message.success("保存成功");
          onInitData();
        });
    });
  };

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
        if (
          (document as any).querySelector(
            "#HandoverRegisterTable .ant-table-body"
          ) &&
          (document as any).querySelector(
            "#HandoverRegisterTable .ant-table-body"
          ).scrollWidth ==
            (document as any).querySelector(
              "#HandoverRegisterTable .ant-table-body"
            ).clientWidth
        ) {
          /** noscorll */
          (document as any).querySelector(
            "#HandoverRegisterTable #baseTable"
          ).style.width =
            columns.reduce((total: number, current: any) => {
              return total + current.width;
            }, 0) +
            10 +
            "px";
          setSurplusWidth(false);
        } else {
          (document as any).querySelector(
            "#HandoverRegisterTable #baseTable"
          ) &&
            ((document as any).querySelector(
              "#HandoverRegisterTable #baseTable"
            ).style.width = "auto");
          setSurplusWidth(280);
        }
      }, 10);
    } catch (error) {}
  }, [dataSource, surplusWidth]);

  return (
    <Wrapper id="HandoverRegisterTable">
      <PageHeader>
        <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
          修订登记本
        </Button>
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
        <DeptSelect onChange={() => {}} style={{ width: 100 }} />
        <span className="label">班次</span>
        <Select
          style={{ width: 70, minWidth: 70 }}
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

        <Place />

        {selectedBlockId && (
          <React.Fragment>
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
            <Button onClick={onDelete}>删除</Button>
          </React.Fragment>
        )}
      </PageHeader>
      <TableCon>
        {selectedBlockId ? (
          <BaseTable
            loading={pageLoading}
            dataSource={dataSource}
            columns={columns}
            surplusWidth={surplusWidth}
            surplusHeight={280}
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
        ) : (
          <NullBox onClick={onAddBlock} />
        )}
      </TableCon>
      <settingModal.Component />
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
        创建物品交接登记本
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
`;
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
