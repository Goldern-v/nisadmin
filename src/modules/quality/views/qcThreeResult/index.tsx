import { Button, DatePicker, Icon, Input, Radio, Select } from "antd";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { PageHeader, PageTitle, Place } from "src/components/common";
import styled from "styled-components";
import moment from "moment";
import { MonthList } from "../../utils/toolCon";
import YearPicker from "src/components/YearPicker";
import TextareaSection from "../../components/editor/textarea"
import TableSection from "../../components/editor/table"
import { cloneJson } from 'src/utils/json/clone'
import TableInput from "../../components/editor/common/TableInput";
import CreateAnalysisModal from "../../components/CreateAnalysisModal";
/**
 * 三级质控结果汇总表 by亚心
 */
export default observer(function QcThreeResult(props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    type: "month",
    indexInType: moment().month() + 1 + "",
    status: "",
    // groupRoleCode: "",
  } as any);

  const [tableLoading, setTableLoading] = useState(false);
  const [createAnalysisVisible, setCreateAnalysisVisible] = useState(false);
  const [groupRoleListSelf, setGroupRoleListSelf] = useState([]);
  const handleYearClear = (e: any) => {
    console.log("test-e", e);
    setQuery({ ...query, year: e });
  };

  const handleSearch = () => {
    getTableData();
  };
  const getTableData = () => {
    setTableLoading(true);
    let year = "";
    if (query.year !== null) year = query.year.format("YYYY");

    let reqQuery = {
      ...query,
      year,
    };
  };
  const handleCreate = () => {
    setCreateAnalysisVisible(true);
  };
  const handleExport = () => {};

  const [activeTab, setActiveTab] = useState(0)

  const [val, setVal] = useState('')
  const [tab, setTab] = useState<any[]>([])
  const getColumns1 = (isEdit: boolean, setVal: any) => {
    return [
      {
        title: '序号',
        render(text: any, record: any, index: number) {
          return index + 1
        },
        width: 60,
      },
      {
        title: '科室',
        key: 'deptName',
        width: 120,
      },
      {
        title: '抽查数',
        key: 'index1',
        width: 90,
      },
      {
        title: '问题汇总',
        key: 'index2',
        width: 300,
        render(text: any, row: any, index: number) {
          return !isEdit
            ? row.index2
            : <TableInput row={row} str="index2" index={index} setVal={setVal} type="TextArea" />
        }
      },
      {
        title: '分子',
        key: 'index3',
        width: 70,
        render(text: any, row: any, index: number) {
          return !isEdit
            ? row.index3
            : <TableInput row={row} str="index3" index={index} setVal={setVal} />
        }
      },
      {
        title: '分母',
        key: 'index4',
        width: 70,
        render(text: any, row: any, index: number) {
          return !isEdit
            ? row.index4
            : <TableInput row={row} str="index4" index={index} setVal={setVal} /> 
        }
      },
      {
        title: '合格率',
        key: 'index5',
        width: 90,
        render(text: any, row: any, index: number) {
          return !isEdit
            ? row.index5
            : <TableInput row={row} str="index5" index={index} setVal={setVal} />
        }
      },
      {
        title: '得分',
        key: 'index6',
        width: 90,
        render(text: any, row: any, index: number) {
          return !isEdit
            ? row.index6
            : <TableInput row={row} str="index6" index={index} setVal={setVal} />
        }
      },
      {
        title: '是否达标',
        key: 'index7',
        width: 100,
      },
    ]
  }
  const [tab1, setTab1] = useState<any[]>([])
  const getColumns2 = (isEdit: boolean, setVal: any) => {
    return [
      {
        title: '序号',
        render(text: any, record: any, index: number) {
          return index + 1
        },
        width: 60,
      },
      {
        title: '监测指标',
        key: 'deptName',
        width: 120,
      },
      {
        title: '目标值',
        children: [
          {
            title: '目标合格率',
            key: 'index1',
            width: 90,
          },
          {
            title: '目标合格分',
            key: 'index2',
            width: 90,
          },
        ]
      },
      {
        title: '公式',
        children: [
          {
            title: '抽查人（项）数',
            key: 'index3',
            width: 100,
          },
          {
            title: '合格人（项）数',
            key: 'index4',
            width: 100,
          },
        ]
      },
      {
        tile: '监测结果',
        children: [
          {
            title: '本月合格率',
            key: 'index5',
            width: 90,
          },
          {
            title: '本月平均分',
            key: 'index6',
            width: 90,
          },
          {
            title: '是否达标',
            key: 'index7',
            width: 100,
          },
        ]
      }
    ]
  }


  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>三级质控结果汇总表</PageTitle>
        <Place />
        <div className="label">报告年度：</div>
        <YearPicker style={{ width: 100 }} value={query.year} onChange={handleYearClear} />
        
        <div className="label">报告月份：</div>
        <Select
          style={{ width: 100 }}
          className="month-select"
          value={query.indexInType}
          onChange={(month: any) => {
            setQuery({ ...query, indexInType: month });
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
      <Main className="contain">
          <div className="contain-top">
            <div className="contain-top__tabs">
              <Radio.Group value={activeTab} buttonStyle="solid" onChange={(e) =>setActiveTab(e.target.value)}>
                <Radio.Button value={0}>科室问题汇总表</Radio.Button>
                <Radio.Button value={1}>指标监测结果表</Radio.Button>
              </Radio.Group>
            </div>
            <div className="contain-top__title">1234</div>
          </div>
          <div>
            <TextareaSection text={val} onSave={(text: any) => setVal(text)} sectionTitle="上月问题"/>
            {activeTab == 0 && <TableSection list={tab} getColumns={getColumns1} onSave={(val:any) => setTab(val)} modalTitle="编辑" />}
            {activeTab == 1 && <TableSection list={tab1} getColumns={getColumns2} onSave={(val:any) => setTab1(val)} modalTitle="编辑" />}
            <CreateAnalysisModal visible={createAnalysisVisible} onOk={() => {}} onCancel={() => setCreateAnalysisVisible(false)} allowClear={true} reportFn={({year, month}: {year: string, month:string}) => `${month}月份护理部三级质控结果汇总表(${year}年)`} />
          </div>
      </Main>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
`;
const Main = styled.div`
  &.contain {
    height: calc(100% - 65px);
    margin: 0px 15px 15px;
    padding: 10px;
    background: #fff;

    .contain-top {
      position: relative;

      &__tabs {
        position: absolute;
      }
      &__title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
`;
