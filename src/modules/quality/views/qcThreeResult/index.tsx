import { Button, DatePicker, Empty, Icon, Input, message, Radio, Select } from "antd";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useState } from "react";
import { PageHeader, PageTitle, Place } from "src/components/common";
import styled from "styled-components";
import moment from "moment";
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
import TextareaSection from "../../components/editor/textarea";
import TableSection from "../../components/editor/table";
import TableInput from "../../components/editor/common/TableInput";
import CreateAnalysisModal from "./components/CreateAnalysisModal";
import AnalysisService, { analysisService } from "src/modules/quality/views/analysisWhyx/api/index";
import { getSearchTempName, getTempName } from "../analysisWhyx/utils";
import { fileDownload } from "src/utils/file/file";
import { analysisDetailApi } from "../analysisDetail/api";
import { PUBLISH_STATUS_ARR } from "../../utils/enums";
import { authStore } from "src/stores";

const api = new AnalysisService();
const reportLevel = 3;
const templateName = getSearchTempName(reportLevel);
/**
 * 三级质控结果汇总表 by亚心
 */
export default observer(function QcThreeResult(props) {
  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
  } as any);
  const [data, setData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [groupRoleListSelf, setGroupRoleListSelf] = useState([]);
  const handleYearClear = (e: any) => {
    setQuery({ ...query, reportYear: e });
  };

  const handleSearch = () => {
    getData();
  };
  const getData = () => {
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel,
      reportYear,
      templateName,
    };
    api.getOneReport(reqQuery).then(res => {
      setData(res)
    });
  };
  const handleExport = () => {
    setLoading(true)
    analysisDetailApi.exportReport(data.id)
      .then((res: any) => {
        fileDownload(res)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  };
  const handleSave = () => {
    const params = {
      reportId: data.id,
      // data: list
    }
    analysisDetailApi.saveReportFieldData(params)
      .then(res => {
        message.success('保存成功')
        getData()
      })
      .catch(e => {})
  }
  const handlePublishOrCancel = () => {
    let fn = analysisDetailApi.revokeReport
    let text = PUBLISH_STATUS_ARR[data.status].btn
    if (data.status == 0) {
      fn = analysisDetailApi.publishReport
    }
    fn.call(analysisDetailApi, data.id)
      .then(res => {
        message.success(text + '成功')
        getData()
      })
      .catch(e => {})
  }
  useEffect(() => {
    handleSearch();
    return () => {};
  }, [query]);
  /**
   * 撤销、发布、保存权限
   */
  const btnRules = useMemo(() => authStore.level3Check && data.id, [data])
  
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const handleCreateOk = (params: any) => {
    setLoading(true);
    analysisService
      .createReport({
        ...params,
        reportLevel,
        templateName,
      })
      .then((res) => {
        if (res.code == "200") {
          let { reportYear, reportMonth } = params;
          setLoading(false);
          setCreateAnalysisVisible(false)

          setQuery({
            reportYear: moment(reportYear),
            reportMonth,
          });
          return;
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  }
  /**新建取消 */
  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const [activeTab, setActiveTab] = useState(0);

  const [val, setVal] = useState("");
  const [tab, setTab] = useState<any[]>([]);
  const getColumns1 = (isEdit: boolean, setVal: any) => {
    return [
      {
        title: "序号",
        render(text: any, record: any, index: number) {
          return index + 1;
        },
        width: 60,
      },
      {
        title: "科室",
        key: "deptName",
        width: 120,
      },
      {
        title: "抽查数",
        key: "index1",
        width: 90,
      },
      {
        title: "问题汇总",
        key: "index2",
        width: 300,
        render(text: any, row: any, index: number) {
          return !isEdit ? (
            row.index2
          ) : (
            <TableInput
              row={row}
              str="index2"
              index={index}
              setVal={setVal}
              type="TextArea"
            />
          );
        },
      },
      {
        title: "分子",
        key: "index3",
        width: 70,
        render(text: any, row: any, index: number) {
          return !isEdit ? (
            row.index3
          ) : (
            <TableInput row={row} str="index3" index={index} setVal={setVal} />
          );
        },
      },
      {
        title: "分母",
        key: "index4",
        width: 70,
        render(text: any, row: any, index: number) {
          return !isEdit ? (
            row.index4
          ) : (
            <TableInput row={row} str="index4" index={index} setVal={setVal} />
          );
        },
      },
      {
        title: "合格率",
        key: "index5",
        width: 90,
        render(text: any, row: any, index: number) {
          return !isEdit ? (
            row.index5
          ) : (
            <TableInput row={row} str="index5" index={index} setVal={setVal} />
          );
        },
      },
      {
        title: "得分",
        key: "index6",
        width: 90,
        render(text: any, row: any, index: number) {
          return !isEdit ? (
            row.index6
          ) : (
            <TableInput row={row} str="index6" index={index} setVal={setVal} />
          );
        },
      },
      {
        title: "是否达标",
        key: "index7",
        width: 100,
      },
    ];
  };
  const [tab1, setTab1] = useState<any[]>([]);
  const getColumns2 = (isEdit: boolean, setVal: any) => {
    return [
      {
        title: "序号",
        render(text: any, record: any, index: number) {
          return index + 1;
        },
        width: 60,
      },
      {
        title: "监测指标",
        key: "deptName",
        width: 120,
      },
      {
        title: "目标值",
        children: [
          {
            title: "目标合格率",
            key: "index1",
            width: 90,
          },
          {
            title: "目标合格分",
            key: "index2",
            width: 90,
          },
        ],
      },
      {
        title: "公式",
        children: [
          {
            title: "抽查人（项）数",
            key: "index3",
            width: 100,
          },
          {
            title: "合格人（项）数",
            key: "index4",
            width: 100,
          },
        ],
      },
      {
        tile: "监测结果",
        children: [
          {
            title: "本月合格率",
            key: "index5",
            width: 90,
          },
          {
            title: "本月平均分",
            key: "index6",
            width: 90,
          },
          {
            title: "是否达标",
            key: "index7",
            width: 100,
          },
        ],
      },
    ];
  };

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>三级质控结果汇总表</PageTitle>
        <Place />
        <div className="label">报告年度：</div>
        <YearPicker
          style={{ width: 100 }}
          value={query.reportYear}
          onChange={handleYearClear}
        />

        <div className="label">报告月份：</div>
        <Select
          style={{ width: 100 }}
          className="month-select"
          value={query.reportMonth}
          onChange={(month: any) => {
            setQuery({ ...query, reportMonth: month });
          }}
        >
          {MonthList()}
        </Select>
        <div className="label">状态：</div>
        <Select
          style={{ width: 100 }}
          value={query.status}
          onChange={(status: any) => {
            setQuery({ ...query, status });
          }}
        >
          <Select.Option value="">全部</Select.Option>
          <Select.Option value="0">保存</Select.Option>
          <Select.Option value="1">发布</Select.Option>
        </Select>
        <Button onClick={handleSearch}>查询</Button>

        <Button onClick={handleCreate} type="primary">
          创建
        </Button>
        <Button onClick={handleExport}>导出</Button>
        <Button
          disabled={groupRoleListSelf.length <= 0}
          title="推送科室未审核记录"
          type="primary"
        >
          <Icon type="bell" style={{ fontSize: "16px" }} />
        </Button>
      </PageHeader>
      {!data.id && (
        <div className="contain--empty">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      <Main className="contain">
        <div className="contain-top">
          <div className="contain-top__tabs">
            <Radio.Group
              value={activeTab}
              buttonStyle="solid"
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <Radio.Button value={0}>科室问题汇总表</Radio.Button>
              <Radio.Button value={1}>指标监测结果表</Radio.Button>
            </Radio.Group>
          </div>
          <div className="contain-top__title">1234</div>
        </div>
        <div>
          <TextareaSection
            text={val}
            onSave={(text: any) => setVal(text)}
            sectionTitle="上月问题"
          />
          {activeTab == 0 && (
            <TableSection
              list={tab}
              getColumns={getColumns1}
              onSave={(val: any) => setTab(val)}
              modalTitle="编辑"
            />
          )}
          {activeTab == 1 && (
            <TableSection
              list={tab1}
              getColumns={getColumns2}
              onSave={(val: any) => setTab1(val)}
              modalTitle="编辑"
            />
          )}
          <CreateAnalysisModal
            allowClear={true}
            visible={createAnalysisVisible}
            onOk={handleCreateOk}
            onCancel={handleCreateCancel}
            
          />
        </div>
      </Main>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  .contain--empty {
    margin: 0 15px;
    height: calc(100% - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .ant-spin-container {
    height: 100%;
  }
`;
const Main = styled.div`
  height: calc(100% - 50px);
  overflow-y: auto;
  .contain {
    margin: 0px 15px 15px;
    padding: 10px;
    min-height: calc(100% - 15px);
    background: #fff;

    .contain__title {
      position: relative;
      p {
        text-align: center;
        font-size: 22px;
        font-weight: bold;
      }
      span {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 33px;
      }
    }
    .contain__main {
      display: flex;
      flex-wrap: wrap;
      .contain__main__title {
        font-size: 17px;
        line-height: 32px;
        flex-basis: 25%;
        border: 1px solid #eeeeee;
        background: rgb(242, 244, 245);
        text-align: center;
      }
      .contain__main__ipt {
        font-size: 14px;
        padding: 1px;
        line-height: 20px;
        flex-basis: 25%;
        /* min-height: 148px; */
        white-space: pre-wrap;
        word-break: break-all;
        border: 1px solid #eeeeee;
        .ant-input {
          border-radius: 0px;
          border: none;
          height: 100%;
          resize: none;
        }
      }
    }
    .contain__main--published {
      pointer-events: none;
    }
    .contain__footer {
      line-height: 40px;
      border: 1px solid #eee;
      border-top: none;
    }
  }
`;
