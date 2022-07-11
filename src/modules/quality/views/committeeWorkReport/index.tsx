import qs from 'qs'
import service from 'src/services/api'
import styled from 'styled-components'
import moment, { duration } from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { Button, DatePicker, Icon, Input, message, Modal, Select } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { currentMonth } from 'src/utils/date/rangeMethod'

import AnalysisService from '../analysisWhyx/api'
import useLevel from '../analysisWhyx/utils/useLevel'
import CreateAnalysisModal from './components/CreateAnalysisModal'
import { getSearchTempName, getTempName } from '../analysisWhyx/utils'

const api = new AnalysisService();
const Option = Select.Option;

export default observer(function Analysis() {
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [createClear, setCreateClear] = useState(true);
  const { history } = appStore;
  // 科室列表、2级质控是片区列表
  const [wardList, setWardList] = useState([]);
  // 默认科室
  const [defDept, setDefDept] = useState('');
  const [createLoading, setCreateLoading] = useState("");
  const defQuery = useCallback(() => {
    const [m1,m2] = currentMonth()
    return {
      pageIndex: 1,
      pageSize: 20,
      startDate: m1.format('YYYY-MM-DD'),
      endDate: m2.format('YYYY-MM-DD'),
      reportName: '',
    }
  }, [])
  const [query, setQuery] = useState<Record<string,any>>(defQuery());
  // 质控等级
  const level = 3.1;

  useEffect(() => {
    service.commonApiService.getNursingUnitSelf().then((res) => {
      if (res.data.deptList instanceof Array) setWardList(res.data.deptList);
      setDefDept(res.data.defaultDept)
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
      key: "status",
      dataIndex: "status",
      width: 80,
      align: "center",
      render: (status: any) => {
        switch (status) {
          case 0:
            return <span style={{ color: "red" }}>保存</span>;
          case 1:
            return "发布";
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
  /**推送 */
  const handleAlert = () => {
    let month = '6';
    let year = 2022;
    if (month.length == 1) month = "0" + month;
    let dateStr = `${year}-${month}-01`;
    let beginDate = moment(dateStr);
    let endDate = moment(dateStr)
      .add(1, "M")
      .subtract(1, "d");
    let wardCode = "";

    const content = (
      <ModalCon>
        <div>
          <span>开始时间: </span>
          <DatePicker
            allowClear={false}
            value={beginDate}
            onChange={(_moment) => (beginDate = _moment)}
          />
        </div>
        <div>
          <span>结束时间: </span>
          <DatePicker
            value={endDate}
            allowClear={false}
            onChange={(_moment) => (endDate = _moment)}
          />
        </div>
        <div>
          <span>科 室: </span>
          <Select
            style={{ width: "171px" }}
            onChange={(code: any) => (wardCode = code)}

          >
            {wardList.map((item: any, idx: number) => (
              <Option value={item.code} key={idx}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      </ModalCon>
    );

    Modal.confirm({
      title: "推送科室未审核记录",
      content: content,
      onOk: () => {
        if (wardCode == "") {
          message.warning("未选择科室");
          return;
        }
        setTableLoading(true);
        api
          .push({
            beginDate: beginDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            wardCode,
          })
          .then(
            (res) => {
              setTableLoading(false);
              message.success("推送成功");
            },
            () => setTableLoading(false)
          );
      },
    });
  };

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>委员会小组工作报告</PageTitle>
        <Place />
        
        <div className="label">日期：</div>
        <DatePicker.RangePicker value={[moment(query.startDate), moment(query.endDate)]} />
        <div className="label">状态：</div>
        <Select
          style={{ width: 100 }}
          value={query.status}
          onChange={(status: any) => {
            setQuery({ ...query, status });
          }}
        >
          <Option value="">全部</Option>
          <Option value="0">保存</Option>
          <Option value="1">发布</Option>
        </Select>
        <Input placeholder='请输入关键字' value={query.reportName}/>
        
        <Button onClick={handleSearch}>查询</Button>
        <Button onClick={handleCreate} type="primary">
          创建
        </Button>
        <Button
          disabled={wardList.length <= 0}
          onClick={handleAlert}
          title="推送科室未审核记录"
          type="primary"
        >
          <Icon type="bell" style={{ fontSize: "16px" }} />
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
