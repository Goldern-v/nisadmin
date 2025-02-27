import moment from "moment";
import YearPicker from "src/components/YearPicker";
import styled from "styled-components";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Empty, Icon, message, Select, Spin } from "antd";
import { observer } from "mobx-react";
import { PageHeader, PageTitle, Place } from "src/components/common";

import CreateAnalysisModal from "./components/CreateAnalysisModal";
import { MonthList } from "../../utils/toolCon";
import { getTempName } from "../analysisWhyx/utils";
import { analysisService } from "../analysisWhyx/api";
import { analysisDetailApi } from "../analysisDetail/api";

import TTextArea from "./components/TTextArea";
import { authStore } from "src/stores";
import { fileDownload } from "src/utils/file/file";
import { PUBLISH_STATUS_ARR } from "../../utils/enums";
import { globalModal } from "src/global/globalModal";
import { Obj } from "src/libs/types";

const columns = [
  "A级评价标准",
  "问题及科室",
  "原因分析",
  "改进措施",
  "评价效果",
  "formName1",
  "mainProblem1",
  "causeAnalysis1",
  "correctiveWay1",
  "evaluation1",
  'B->A级评价标准',
  "问题及科室",
  "原因分析",
  "改进措施",
  "评价效果",
  'formName2',
  "mainProblem2",
  "causeAnalysis2",
  "correctiveWay2",
  "evaluation2",
  '其他评价标准',
  "问题及科室",
  "原因分析",
  "改进措施",
  "评价效果",
  'formName3',
  "mainProblem3",
  "causeAnalysis3",
  "correctiveWay3",
  "evaluation3",
];

const initList = () => ({
  formName1: '',
  mainProblem1: "",
  causeAnalysis1: "",
  correctiveWay1: "",
  evaluation1: "",
  formName2: '',
  mainProblem2: "",
  causeAnalysis2: "",
  correctiveWay2: "",
  evaluation2: "",
  formName3: '',
  mainProblem3: "",
  causeAnalysis3: "",
  correctiveWay3: "",
  evaluation3: "",
})
/**
 * 三级质控问题分析改进 by亚心
 */
export default observer(function QcThreeProblem(props) {
  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
  } as Record<string, any>);

  const [loading, setLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [groupRoleListSelf, setGroupRoleListSelf] = useState([]);
  const [data, setData] = useState<Record<string, any>>({});
  const [list, setList] = useState(initList);
  const [dataList, setDataList] = useState<Obj[]>([]);
  const [id, setId] = useState('');

  const handleYear = (e: any) => {
    setQuery({ ...query, reportYear: e });
  };

  const handleChangeList = useCallback((e: ChangeEvent<HTMLTextAreaElement>, key: string) => {
    try {
      if (e.target && e.target.value != undefined) {
        let {value} = e.target
        setList((val) => ({...val, [key]: value}))
      }
    } catch (e) {
    }
  }, [])

  const getList = () => {
    setLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel: 3,
      reportYear,
      templateName: getTempName(3.3),
    };
    analysisService.getPage(reqQuery).then(res => {
      setDataList(res?.data?.list || [])
      if (res?.data?.list?.length) {
        setId(res?.data?.list[0].id)
      } else (
          setId('')
      )
      setLoading(false);
    })
        .catch((e) => setLoading(false));
  }

  const getData = () => {
    setLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel: 3,
      reportYear,
      templateName: getTempName(3.3),
    };
    if (id) {
      analysisDetailApi
          .getPageDetaile(id)
          .then((res: any) => {
            if (authStore.level3Check || (res.data && res.data.status === 1)) {
              setData(res.data || {});
              setList({ ...initList(), ...(res?.data?.fieldDataMap || {}) })
            } else {
              setData({});
              setList(initList)
            }
            setLoading(false);
          })
          .catch((e) => setLoading(false));
    } else {
      setLoading(false);
    }

  };
  const handleSearch = () => {
    getList();
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
      data: list
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
  useEffect(() => {
    getData();
    return () => {};
  }, [id]);
  /**
   * 撤销、发布、保存权限
   */
  const btnRules = useMemo(() => authStore.level3Check && data.id, [data])

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };

  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;
    setLoading(true);
    analysisService
      .createReport({
        ...params,
        reportLevel: 3,
        templateName: getTempName(3.3),
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
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleDel = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      analysisDetailApi.deleteReport(data.id).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          getList()
        }, 500)
      })
    })
  }

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <PageHeader>
          <PageTitle>三级质控问题分析改进</PageTitle>
          <Place />
          <div className="label">报告年度：</div>
          <YearPicker
            style={{ width: 100 }}
            value={query.reportYear}
            onChange={handleYear}
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

          <Select
              value={id}
              onChange={(e: any) => {
                setId(e)
              }}
          >
            {
              dataList.map(v => (
                  <Select.Option value={v.id}>{v.reportName}</Select.Option>
              ))
            }
          </Select>

          <Button onClick={handleSearch}>查询</Button>

          {authStore.level3Check && <Button onClick={handleCreate} type="primary">
            创建
          </Button>}
          {btnRules && <Button onClick={handlePublishOrCancel}>{PUBLISH_STATUS_ARR[data.status].btn}</Button>}
          {btnRules && data.status == 0 && <Button onClick={handleSave}>保存</Button>}
          {authStore.level3Check && data.id && <Button onClick={handleDel}>删除</Button>}
          <Button disabled={!data.id} onClick={handleExport}>导出</Button>
        </PageHeader>
        {!id && (
          <div className="contain--empty">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
        {id && (
          <Main>
            <div className="contain">
              <div className="contain__title">
                <p>{data.reportName}</p>
                {PUBLISH_STATUS_ARR[data.status] && <span style={{color: PUBLISH_STATUS_ARR[data.status].color}}>{PUBLISH_STATUS_ARR[data.status].text}</span>}
              </div>
              <div className={"contain__main" + (data.status == 1 || !authStore.level3Check ? ' contain__main--published' : '')}>
                {columns.map((v: any, i: number) => {
                  if (i % 10 <= 4) {
                    return (
                      <div className="contain__main__title" key={i}>
                        {v}
                      </div>
                    );
                  }
                  return (
                    <div className="contain__main__ipt" key={i}>
                      <TTextArea autosize={{minRows: 7}} value={list[v]} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        handleChangeList(e, v)
                      }} />
                    </div>
                  );
                })}
              </div>
              <div className="contain__footer">
                整改方式选项：①发放纠正预防措施报告 ②下月再次跟进 ③现场立即纠正
                （填写说明：针对问题选择相应整改方式，注明跟进内容。）
              </div>
            </div>
          </Main>
        )}
        <CreateAnalysisModal
          allowClear={true}
          visible={createAnalysisVisible}
          loading={loading}
          onCancel={() => setCreateAnalysisVisible(false)}
          onOk={handleCreateOk}
        />
      </Spin>
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
  .month-select {
    margin-right: 15px;
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
        flex-basis: 20%;
        border: 1px solid #eeeeee;
        background: rgb(242, 244, 245);
        text-align: center;
      }
      .contain__main__ipt {
        font-size: 14px;
        padding: 1px;
        line-height: 20px;
        flex-basis: 20%;
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
