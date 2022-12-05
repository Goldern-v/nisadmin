import { Button, Empty, Icon, Input, message, Radio, Select } from "antd";
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
import { analysisService } from "src/modules/quality/views/analysisWhyx/api/index";
import { getSearchTempName, getTempName } from "../analysisWhyx/utils";
import { fileDownload } from "src/utils/file/file";
import { analysisDetailApi } from "../analysisDetail/api";
import { PUBLISH_STATUS_ARR } from "../../utils/enums";
import { authStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { useInstance } from "../committeeWorkReportDetail/hook/useModel";
import { Obj } from "src/libs/types";
import { Report } from "../analysisDetail/types";

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
  const {instance} = useInstance()

  const [data, setData] = useState<Obj>({})
  const [list, setList] = useState<Obj[]>([])
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const handleYearClear = (e: any) => {
    setQuery({ ...query, reportYear: e });
  };

  const handleSearch = () => {
    // getData();
    getList()
  };
  const getList = () => {
    setLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel,
      reportYear,
      templateName,
    };
    analysisService.getPage(reqQuery).then(res => {
      setList(res?.data?.list || [])
      if (res?.data?.list?.length) {
        setId(res?.data?.list[0].id)
      } else (
        setId('')
      )
      setLoading(false);
    })
    .catch((e) => setLoading(false));
  }
  const getData = async() => {
    if (!id) {
      setData({})
      return
    }
    await instance.init(id)
    setData(instance.getDataInAllData('pageInfo'))

    // setLoading(true);
    // let reportYear = "";
    // if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    // let reqQuery = {
    //   ...query,
    //   reportLevel,
    //   reportYear,
    //   templateName,
    // };
    // api.getOneReport(reqQuery).then(res => {
    //   if (authStore.level3Check || (res.data && res.data.status === 1)) {
    //     setData(res.data || {});
    //     instance.init(res.data.id)
    //   } else {
    //     setData({});
    //   }
    //   setLoading(false);
    // })
    // .catch((e) => setLoading(false));
  };
  const handleExport = () => {
    setLoading(true)
    analysisDetailApi.exportReport(id)
      .then((res: any) => {
        fileDownload(res)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  };

  /**发布/撤销 */
  const handlePublishOrCancel = () => {
    let fn = analysisDetailApi.revokeReport
    let text = PUBLISH_STATUS_ARR[data.status].btn
    if (data.status == '0') {
      fn = analysisDetailApi.publishReport
    }
    fn.call(analysisDetailApi, id)
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
    getData()
  }, [id])
  
  /**
   * 撤销、发布、保存权限
   */
  const btnRules = useMemo(() => authStore.level3Check && id, [data])
  
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  /**创建成功 */
  const handleCreateOk = (params: any) => {
    setLoading(true);
    analysisService
      .createReport({
        ...params,
        reportLevel,
        templateName,
      })
      .then(async(res) => {
        if (res.code == "200") {
          let { reportYear, reportMonth } = params;
          setLoading(false);
          setCreateAnalysisVisible(false)
          /**初始化 */
          const { reportTemplateDto, renderTableDataMap: renderData = {} } = res.data
          await instance.initRender(res.data.id, { renderData, tableTempList: reportTemplateDto?.reportTableFieldTemplateList || {} })
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
  const handleDel = () => {
    globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
      analysisDetailApi.deleteReport(id).then((res) => {
        message.success('删除成功')
        setTimeout(() => {
          getData()
        }, 500)
      })
    })
  }

  const [activeTab, setActiveTab] = useState(0);
  
  const handleShow: (id: string)=> boolean = (id) => {
    if (id === '2') return activeTab === 0
    if (id === '3') return activeTab === 1
    return true
  }

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
          value={query.reportMonth}
          className="month-select"
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
            list.map(v => (
              <Select.Option value={v.id}>{v.reportName}</Select.Option>
            ))
          }
        </Select>
        
        <Button onClick={handleSearch}>查询</Button>

        {authStore.level3Check && <Button onClick={handleCreate} type="primary">
          创建
        </Button>}
        {btnRules && <Button onClick={handlePublishOrCancel}>{PUBLISH_STATUS_ARR[data.status]?.btn}</Button>}
        {authStore.level3Check && id && <Button onClick={handleDel}>删除</Button>}
        <Button disabled={!id} onClick={handleExport}>导出</Button>
      </PageHeader>
      {!id ? (
        <div className="contain--empty">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )
      :
      <Main>
        <div className={`contain${data.status == '1' || !authStore.level3Check ? ' contain--published' : '' }`}>
          <Radio.Group
            className="contain__tabs"
            value={activeTab}
            buttonStyle="solid"
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <Radio.Button value={0}>科室问题汇总表</Radio.Button>
            <Radio.Button value={1}>指标监测结果表</Radio.Button>
          </Radio.Group>
          <div className="contain__title">
            <p>{data.reportName}</p>
            {PUBLISH_STATUS_ARR[data.status] && <span style={{color: PUBLISH_STATUS_ARR[data.status].color}}>{PUBLISH_STATUS_ARR[data.status].text}</span>}
          </div>
          {instance.sectionList.map((item: any, index: number) => {
            if (item.sectionId) {
              let Components = instance.getSection(item.sectionId)
              if (Components && Components.section && handleShow(item.sectionId)) {
                return (
                  <Components.section
                    key={item.sectionId}
                    sectionId={item.sectionId}
                    modalTitle={item.modalTitle}
                    sectionTitle={item.sectionTitle}
                    keyName={item.keyName}
                  />
                )
              }
            }
          })}
          {instance.baseModal && <instance.baseModal.Component />}
          {/* <TextareaSection
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
          )} */}
        </div>
      </Main>}
      <CreateAnalysisModal
        allowClear={true}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
      />
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
    &.contain--published  button{
      display: none;
      pointer-events: none;
    }
    .contain__footer {
      line-height: 40px;
      border: 1px solid #eee;
      border-top: none;
    }
  }
`;
