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
import { signRowObj } from "../../utils/signRowObj";
export interface Props {
  payload: any;
}

const throttler = throttle();
const throttler2 = throttle();

export default observer(function 消毒隔离工作登记本(props: Props) {
  const registerCode = props.payload && props.payload.registerCode;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [wzcdConfigList, setWzcdConfigList] = useState([
    { label: "全部", value: "全部" },
    { label: "高", value: "高" },
    { label: "中", value: "中" },
    { label: "低", value: "低" }
  ]);
  const [selectedWzcd, setSelectedWzcd] = useState("");

  const [hljbConfigList, setHljbConfigList] = useState([
    { label: "全部", value: "全部" },
    { label: "特级护理", value: "特级护理" },
    { label: "一级护理", value: "一级护理" },
    { label: "二级护理", value: "二级护理" },
    { label: "三级护理", value: "三级护理" }
  ]);
  const [selectedHljb, setSelectedHljb] = useState("");

  const [zlnlConfigList, setZlnlConfigList] = useState([
    { label: "全部", value: "全部" },
    { label: "重度依赖", value: "重度依赖" },
    { label: "中度依赖", value: "中度依赖" },
    { label: "轻度依赖", value: "轻度依赖" },
    { label: "无需依赖", value: "无需依赖" }
  ]);
  const [selectedZlnl, setSelectedZlnl] = useState("");
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
  const settingModal = createModal(SettingModal);
  const updateDataSource = () => {
    throttler2(() => {
      setDataSource([...dataSource]);
    });
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
        return (
          <Input
            disabled={!!record.signerName}
            defaultValue={text}
            onChange={value => {
              record.recordDate = value;
            }}
            onBlur={() => updateDataSource()}
          />
        );
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
          const children = (
            <AutoComplete
              disabled={!!record.signerName}
              dataSource={
                item.options
                  ? item.options.split(";").map((item: any) => item || " ")
                  : undefined
              }
              defaultValue={text}
              onChange={value => {
                record[item.itemCode] = value;
              }}
              onBlur={() => updateDataSource()}
              onSelect={() => updateDataSource()}
            />
          );
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
        QCRG_06: [
          signRowObj({
            title: "执行者",
            width: 70,
            dataIndex: "signerName",
            aside: "执行者",
            registerCode,
            updateDataSource,
            selectedBlockId
          })
        ],
        other: []
      },
      registerCode
    )
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
          setWzcdConfigList([]);
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
        range: selectedWzcd,
        blockId: selectedBlockId,
        ...pageOptions
      })
      .then(res => {
        console.log(res, "res");
        setTotal(res.data.itemDataPage.totalPage);
        setDataSource(res.data.itemDataPage.list);
        setItemConfigList(res.data.itemConfigList);
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

  const createRow = () => {
    setDataSource([
      ...dataSource,
      { recordDate: moment().format("YYYY-MM-DD") }
    ]);
  };

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedWzcd, selectedBlockId]);

  return (
    <Wrapper>
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
        <DeptSelect onChange={() => {}} style={{ width: 150 }} />
        <span className="label">危重程度</span>
        <Select
          style={{ width: 70, minWidth: 70 }}
          value={selectedWzcd}
          onChange={(value: any) => {
            setSelectedWzcd(value);
          }}
        >
          {wzcdConfigList.map((item: any) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
        <span className="label">护理级别</span>
        <Select
          style={{ width: 70, minWidth: 70 }}
          value={selectedHljb}
          onChange={(value: any) => {
            setSelectedHljb(value);
          }}
        >
          {hljbConfigList.map((item: any) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
        <span className="label">自理能力</span>
        <Select
          style={{ width: 70, minWidth: 70 }}
          value={selectedZlnl}
          onChange={(value: any) => {
            setSelectedZlnl(value);
          }}
        >
          {zlnlConfigList.map((item: any) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>

        <Place />

        {selectedBlockId && (
          <React.Fragment>
            <Button onClick={getPage}>查询</Button>
            <Button type="primary" onClick={createRow}>
              新建
            </Button>
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
        {selectedBlockId && itemConfigList.length ? (
          <BaseTable
            loading={pageLoading}
            dataSource={dataSource.filter((item: any) => item)}
            columns={columns}
            surplusHeight={220}
            surplusWidth={300}
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
  .warning-value {
    input {
      color: red;
    }
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
