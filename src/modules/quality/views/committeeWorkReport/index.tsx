import qs from 'qs'
import styled from 'styled-components'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, Icon, Input, message, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { currentMonth } from 'src/utils/date/rangeMethod'

import AnalysisService from '../analysisWhyx/api'
import useLevel from '../analysisWhyx/utils/useLevel'
import CreateAnalysisModal from './components/CreateAnalysisModal'
import { getSearchTempName, getTempName } from '../analysisWhyx/utils'

const api = new AnalysisService();
const Option = Select.Option;

// 质控等级
const level = 3.1;
const dateFormat = 'YYYY-MM-DD'
export default observer(function Analysis() {
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [createClear, setCreateClear] = useState(true);
  const { history } = appStore;

  const [createLoading, setCreateLoading] = useState("");
  const statusList = useMemo(() => {
    const arr = [
      {label: '全部', value: ''},
      {label: '保存', value: '0'},
      {label: '发布', value: '1'},
    ]
    return authStore.level3Check
      ? arr : arr.filter(v => v.value == '1')
  }, [authStore.level3Check])
  const defQuery = useCallback(() => {
    const [m1,m2] = currentMonth()
    return {
      pageIndex: 1,
      pageSize: 20,
      startDate: m1.format(dateFormat),
      endDate: m2.format(dateFormat),
      reportName: '',
      status: statusList[0].value,
    }
  }, [])
  const [query, setQuery] = useState<Record<string,any>>(defQuery());

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
      title: "上报小组",
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
      align: "center",
      width: 120,
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      width: 80,
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
    const obj = {
      deptName: getTempName(level),
      level,
      id: record.id
    };
    history.push(`/committeeWorkReportDetail?${qs.stringify(obj)}`);
  };

  const handleSearch = () => {
    getTableData();
  };

  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const openDetailPage = async (data: any) => {
    const params: Record<string, any> = {
      id: data.id || '',
      level,
      deptName: getTempName(3.1)
    }
    appStore.history.push(
      `/committeeWorkReportDetail?${qs.stringify(params)}`
    );
  }
  const handleCreateOk = (params: any) => {
    if (!params.reportName) return;

    setCreateClear(false);
    setCreateLoading("start");

    let failedCallback = (msg?: string) => {
      setCreateClear(true);
      setCreateLoading("");
    };

    api
      .createReport({
        ...params,
        reportLevel: level,
        templateName: getTempName(level),
      })
      .then((res) => {
        if (res.code == '200') {
          handleCreateCancel();
          setCreateClear(true);
          setCreateLoading("");
          openDetailPage(res.data)
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

    let reqQuery = {
      ...query,
      reportLevel: level,
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
  const handleChangeDate = (e: any[]) => {
    let [startDate = '', endDate = ''] = e
    startDate && (startDate = startDate.format(dateFormat))
    endDate && (endDate = endDate.format(dateFormat))
    setQuery({ ...query, endDate, startDate }) 
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>委员会小组工作报告</PageTitle>
        <Place />
        
        <div className="label">日期：</div>
        <DatePicker.RangePicker value={query.endDate ? [moment(query.startDate), moment(query.endDate)] : []} onChange={(e: any[]) => {
          handleChangeDate(e)
        }} />
        <div className="label">状态：</div>
        <Select
          style={{ width: 100 }}
          value={query.status}
          onChange={(status: any) => {
            setQuery({ ...query, status });
          }}
        >
          {statusList.map( v=> <Option value={v.value} key={v.label}>{v.label}</Option>)}
        </Select>
        <Input placeholder='请输入关键字' value={query.reportName} onChange={(e: any) =>
          setQuery({ ...query, reportName: e.target.value})
        } />
        
        <Button onClick={handleSearch}>查询</Button>
        {authStore.level3Check && <Button onClick={handleCreate} type="primary">
          创建
        </Button>}
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
const ModalCon = styled.div`
  & > div {
    margin-top: 15px;
  }
`;
