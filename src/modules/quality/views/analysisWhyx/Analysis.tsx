import qs from 'qs'
import YearPicker from 'src/components/YearPicker'
import service from 'src/services/api'
import styled from 'styled-components'
import moment, { duration } from 'moment'
import React, { useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, Icon, message, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { PageHeader, PageTitle, Place } from 'src/components/common'

import AnalysisService, {analysisService} from './api'
import CreateAnalysisModal from './components/CreateAnalysisModal'
import useLevel from './utils/useLevel'
import {getModuleCode, getSearchTempName, getTempName} from './utils'
import { MonthList } from '../../utils/toolCon'
import { analysisModal } from './AnalysisModal'
import { obj as obj1Dept } from '../analysisDetail/config/callback/callback1_dept'
import { obj as obj1Em } from '../analysisDetail/config/callback/callback1_em'
import { obj as obj2 } from '../analysisDetail/config/callback/callback2'

const api = new AnalysisService();
const Option = Select.Option;
const rankTextList = ["", "一", "二", "三"];

export default observer(function Analysis() {
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [createClear, setCreateClear] = useState(true);
  const { history } = appStore;
  // 科室列表、2级质控是片区列表
  const [wardList, setWardList] = useState([]);
  // 状态列表
  const [statusList, setStatusList] = useState([]);
  // 默认科室
  const [defDept, setDefDept] = useState('');

  //进度条相关
  const [createProgressVisible, setCreateProgressVisible] = useState(false);
  const [createLoading, setCreateLoading] = useState("");

  const [query, setQuery] = useState({
    reportYear: moment() as null | moment.Moment,
    reportMonth: moment().month() + 1 + "",
    pageIndex: 1,
    pageSize: 20,
    status: "",
    wardCode: "",
  } as any);
  // 质控等级
  const level = useLevel();

  useEffect(() => {
    if (level == 2) {
      service.commonApiService.getTwoInpatientArea().then((res) => {
        let data = res.data

        if (Array.isArray(res.data)) {
          data.unshift({
            "code": "",
            "name": "全部"
          })
          setWardList(data)
        }
        setDefDept(res.data[1].code)
      })
    }
    else {
      service.commonApiService.getNursingUnitSelf().then((res) => {
        if (res.data.deptList instanceof Array) setWardList(res.data.deptList);
        setDefDept(res.data.defaultDept)
      });
    }

  }, []);

  useEffect(() => {
    analysisService.getModuleNodeList(getModuleCode(level)).then((res) => {
      setStatusList(res.data);
    });
  }, []);

  useEffect(() => {
    getTableData();
  }, [query]);

  const [dataTotal, setDataTotal] = useState(0 as number);

  const [tableData, setTableData] = useState([] as any);

  const [tableLoading, setTableLoading] = useState(false);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      key: "index",
      width: 50,
      align: "center",
      render: (text: string, record: any, index: any) => index + 1,
    },
    {
      title: "报告名称",
      key: "reportName",
      dataIndex: "reportName",
      align: "left",
      width: 200,
      render: (name: string) => <div title={name}>{name}</div>,
    },
    {
      title: "片区",
      key: "wardName",
      dataIndex: 'wardName',
      align: "left",
      width: 120,
    },

    {
      title: "质控开始日期",
      key: "startDate",
      dataIndex: "startDate",
      width: 90,
      align: "center",
    },
    {
      title: "质控结束日期",
      key: "endDate",
      dataIndex: "endDate",
      width: 90,
      align: "center",
    },
    {
      title: "创建人",
      key: "creatorName",
      dataIndex: "creatorName",
      width: 90,
      align: "center",
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
      width: 120,
      align: "center",
    },
    {
      title: '发布人',
      key: 'publisherName',
      dataIndex: 'publisherName',
      width: 120,
    },
    {
      title: "状态",
      key: "statusName",
      dataIndex: "statusName",
      width: 80,
      align: "center",
      render: (value: any, record: any) => {
        if ('whyx' === appStore.HOSPITAL_ID && level == 1 && record.status === 0) return '待发布'
        return value
      },
    },
    {
      title: "操作",
      key: "operation",
      width: 80,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span onClick={() => handleReview(record)}>查看</span>
          </DoCon>
        );
      },
    },
  ];

  const handleYearClear = () => {
    setQuery({ ...query, reportYear: null, reportMonth: "" });
  };

  const handleReview = async (record: any) => {
    const obj = {
      deptName: getTempName(level, record.wardCode),
      level,
      id: record.id
    };
    history.push(`/qualityAnalysisReport?${qs.stringify(obj)}`);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const initRenderData = async (data: any) => {
    const params: Record<string, any> = {
      id: data.id || '',
      level,
      deptName: getTempName(level, data.wardCode)
    }
    const { reportTemplateDto, renderTableDataMap } = data
    analysisModal.setRenderData({ renderTableDataMap, reportTableFieldTemplateList: reportTemplateDto.reportTableFieldTemplateList || {} })

    if (level == '1') {
      if (getTempName(level, data.wardCode).indexOf('急诊') > -1) {
        await obj1Em.initRender(data.id)
      } else {
        await obj1Dept.initRender(data.id)
      }

    } else {
      await obj2.initRender(data.id)
    }
    appStore.history.push(
      `/qualityAnalysisReport?${qs.stringify(params)}`
    );
  }
  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;

    setCreateClear(false);
    // setCreateAnalysisVisible(false)
    setCreateProgressVisible(true);
    setCreateLoading("start");

    let failedCallback = (msg?: string) => {
      // setCreateLoading('failed')

      setCreateProgressVisible(false);
      // setCreateAnalysisVisible(true)
      setCreateClear(true);
      setCreateLoading("");
    };

    api
      .createReport({
        ...params,
        reportLevel: level,
        templateName: getTempName(level, params.wardCode),
        moduleCode: getModuleCode(level),
      })
      .then((res) => {
        if (res.code == '200') {
          handleCreateCancel();
          setCreateProgressVisible(false);
          // setCreateAnalysisVisible(true)
          setCreateClear(true);
          setCreateLoading("");
          initRenderData(res.data)
        } else {
          failedCallback(res.desc || "");
        }
      })
      .catch((err) => {
        failedCallback(err || "");
      });
  };

  const handleCreateCancel = () => {
    setCreateAnalysisVisible(false);
  };

  const getTableData = () => {
    setTableLoading(true);
    let reportYear = "";
    if (query.reportYear !== null) reportYear = query.reportYear.format("YYYY");

    let reqQuery = {
      ...query,
      reportLevel: level,
      reportYear,
      templateName: getSearchTempName(level),
    };
    api
      .getPage(reqQuery)
      .then((res) => {
        setTableLoading(false);

        if (res.data.totalCount) setDataTotal(res.data.totalCount);
        else setDataTotal(0);

        if (res.data.list instanceof Array)
          setTableData(
            res.data.list.map((item: any, key: number) => {
              return {
                key,
                ...item,
              };
            })
          );
      })
      .catch((res) => {
        setTableLoading(false);
      });
  };

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>{rankTextList[level]}级质控月度报告</PageTitle>
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
          <Option value="">全部</Option>
          {MonthList()}
        </Select>
        <div className="label">状态：</div>
        <Select
          style={{ width: 130 }}
          value={query.status}
          onChange={(status: any) => {
            setQuery({ ...query, status });
          }}
        >
          <Option value="">全部</Option>
          <Option value="0">{'whyx' === appStore.HOSPITAL_ID && level == 1 ? '待发布' : '待提交'}</Option>
          {statusList.map((item: any) => (
              <Option value={item.stateNo} key={item.stateNo}>
                {item.unHandledMessage}
              </Option>
          ))}
          {/*<Option value="1">发布</Option>*/}
        </Select>
        <div className="label">{level == 1 ? "科室：" : "片区："}</div>
        <Select
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          value={query.wardCode}
          onChange={(wardCode: any) => {
            setQuery({ ...query, wardCode });
          }}
          className="recode-type-select"
        >
          {wardList.map((item: any) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Button onClick={handleSearch}>查询</Button>
        <Button onClick={handleCreate} type="primary">
          创建
        </Button>
      </PageHeader>
      <div className="main-contain">
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={230}
          surplusWidth={30}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.reportName && handleReview(record),
            };
          }}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageIndex }),
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex,
          }}
        />
      </div>
      <CreateAnalysisModal
        allowClear={true}
        visible={createAnalysisVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        wardList={wardList.filter((item: any) => item.code)}
        loading={!!(createLoading == "start")}
        defDept={defDept}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .main-contain {
    margin: 0 15px 5px 15px;
    flex: 1;
  }
  
`;
const ModalCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
