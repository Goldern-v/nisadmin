import qs from 'qs'
import styled from 'styled-components'
import moment from 'moment'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import BaseTable, {DoCon} from 'src/components/BaseTable'
import {Button, Select} from 'antd'
import {ColumnProps} from 'antd/lib/table'
import {appStore, authStore} from 'src/stores'
import {observer} from 'mobx-react-lite'
import {PageHeader, PageTitle, Place} from 'src/components/common'

import AnalysisService, {getPageIn} from '../analysisWhyx/api'
import CreateAnalysisModal from './components/CreateAnalysisModal'
import {EXTRA_QUARTER, TYPE_LIST} from './enums'
import {Obj} from 'src/libs/types'
import YearPicker from 'src/components/YearPicker'
import {useInstance} from '../committeeWorkReportDetail/hook/useModel'
import { CONFIG_TITLE } from '../../utils/enums'

const api = new AnalysisService();
const Option = Select.Option;

// 质控等级
const level = 3.4;
export default observer(function QcThreeMQSummary() {
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const { history } = appStore;
  const { instance } = useInstance()

  const [createLoading, setCreateLoading] = useState("");
  const statusList = useMemo(() => {
    return [
      {label: '全部', value: ''},
      {label: '保存', value: '0'},
      {label: '发布', value: '1'},
    ]
  }, [authStore.level3Check])
  const defQuery = useCallback(() => {
    return {
      pageIndex: 1,
      pageSize: 20,
      reportName: '',
      reportYear: moment().format('YYYY'),
      templateName: TYPE_LIST[0].value,
      status: statusList[0].value,
    }
  }, [])
  const [query, setQuery] = useState<Pick<getPageIn, 'templateName'> & Obj>(defQuery());

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
      width: 160,
      render: (name: string) => <div title={name}>{name}</div>,
    },

    {
      title: "汇总类型",
      key: "type",
      width: 70,
      align: "center",
      render: () => {
        return TYPE_LIST.find(v => v.value === query.templateName)?.label
      }
    },
    {
      title: "报告年度",
      key: "reportYear",
      dataIndex: "reportYear",
      width: 70,
      align: "center",
    },
    {
      title: "汇总" + TYPE_LIST.find(v => v.value === query.templateName)?.columnName,
      key: "date",
      dataIndex: TYPE_LIST.find(v => v.value === query.templateName)?.columnKey,
      width: 70,
      align: "center",
    },
    {
      title: "创建人",
      key: "creatorName",
      dataIndex: "creatorName",
      width: 70,
      align: "center",
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
      width: 70,
      align: "center",
    },
    {
      title: '发布人',
      key: 'publisherName',
      dataIndex: 'publisherName',
      align: "center",
      width: 70,
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      width: 70,
      align: "center",
      render: (status: any) => {
        switch (status) {
          case 0:
            return <span style={{ color: "red" }}>保存</span>;
          case 1:
            return <span style={{ color: "rgb(74,164,234)" }}>发布</span>;
          default:
            return "-";
        }
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

  const handleReview = async (record: any) => {
    const cur = TYPE_LIST.find(v => v.value === query.templateName)
    const obj = {
      id: record.id,
      level: cur?.level || level,
    };
    history.push(`/qcThreeMQSummaryDetail?${qs.stringify(obj)}`);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const openDetailPage = async (data: any) => {
    const cur = TYPE_LIST.find(v => data.templateName.includes(v.value))

    const params: Record<string, any> = {
      id: data.id || '',
      level: cur?.level || level,
    }
    appStore.history.push(
      `/qcThreeMQSummaryDetail?${qs.stringify(params)}`
    );
  }
  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;

    setCreateLoading("start");

    let failedCallback = (msg?: string) => {
      setCreateLoading("");
    };

    api
      .createReport({
        ...params,
        reportLevel: level,
      })
      .then(async (res) => {
        if (res.code == '200') {
          handleCreateCancel();
          setCreateLoading("");
          /**初始化 */
          const { renderTableDataMap: renderData = {} } = res.data
          await instance.initRender(res.data.id, { renderData })
          openDetailPage({ ...res.data, templateName: params.templateName })
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

    let reqQuery: any = {
      ...query,
      reportLevel: level,
    };
    if (reqQuery.templateName === TYPE_LIST[1].value) {
      reqQuery.templateName += ',' + EXTRA_QUARTER
    }
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
        <PageTitle>{CONFIG_TITLE[3]}月季度汇总报告</PageTitle>
        <Place />

        <div className="label">汇报年度：</div>
        <YearPicker value={moment(`${query.reportYear}-01-01`)} onChange={(e: any) => setQuery({ ...query, reportYear: e.format('YYYY') })} />
        <div className="label">汇总类型：</div>
        <Select
          style={{ width: 100 }}
          value={query.templateName}
          onChange={(templateName: any) => {
            setQuery({ ...query, templateName });
          }}
        >
          {TYPE_LIST.map(v => <Option value={v.value} key={v.label}>{v.label}</Option>)}
        </Select>
        <div className="label">状态：</div>
        <Select
          style={{ width: 100 }}
          value={query.status}
          onChange={(status: any) => {
            setQuery({ ...query, status });
          }}
        >
          {statusList.map(v => <Option value={v.value} key={v.label}>{v.label}</Option>)}
        </Select>

        <Button onClick={handleSearch}>查询</Button>
        <Button onClick={handleCreate} type="primary">创建</Button>
      </PageHeader>
      <div className="main-contain">
        <BaseTable
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          surplusHeight={230}
          onRow={(record: any) => {
            return {
              onDoubleClick: () => record.reportName && handleReview(record),
            };
          }}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize, pageIndex: 1 }),
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
        loading={!!(createLoading == "start")}
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
  input.ant-input {
    width: 130px;
    margin-left: 5px;
  }
`;
