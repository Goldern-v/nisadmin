import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PageHeader, PageTitle, Place } from "src/components/common";
import {
  DatePicker,
  Select,
  ColumnProps,
  PaginationConfig,
  Input,
  message
} from "src/vendors/antd";
import DeptSelect from "src/components/DeptSelect";
import { appStore, authStore } from "src/stores";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { arrangeService } from "../../services/ArrangeService";
import { observer } from "mobx-react-lite";
import { DictItem } from "src/services/api/CommonApiService";
import { getCurrentMonthNow } from "src/utils/date/currentMonth";
import moment from "moment";
import AddSubClassModal from './modal/AddSubClassModal'
import createModal from "src/libs/createModal";
import { globalModal } from "src/global/globalModal";
export interface Props { }
export default observer(function AddSubClass() {
  const [searchWord, setSearchWord] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [addCount, setAddCount] = useState("0");
  const [subCount, setSubCount] = useState("0");
  const [totalCount, setTotalCount] = useState("0");
  const [pageLoading, setPageLoading] = useState(false);
  const [selectedStatusType, setSelectedStatusType] = useState("");
  const [publishType, setPublishType]: any = useState(1); // 状态
  const [date, setDate]: any = useState(getCurrentMonthNow());
  const addSubClassModal = createModal(AddSubClassModal)
  const columns: ColumnProps<any>[] = [
    {
      title: "科室",
      dataIndex: "deptName"
    },
    {
      title: "护士工号",
      width: 100,
      dataIndex: "empNo",
      align: "center"
    },
    {
      title: "护士姓名",
      width: 100,
      dataIndex: "empName",
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "statusType",
      align: "center",
      width: 100,
      render(text: string, record: any, index: number) {
        return text == "1" ? "加班" : "减班";
      }
    },
    {
      title: "加/减班日期",
      dataIndex: "workDate",
      align: "center",
      width: 120
    },

    {
      title: "开始时间",
      dataIndex: "startDate",
      align: "center",
      render(text: string, record: any, index: number) {
        return moment(text).isValid() ? moment(text).format("HH:mm") : text;
      }
    },
    {
      title: "结束时间",
      dataIndex: "endDate",
      align: "center",
      render(text: string, record: any, index: number) {
        return moment(text).isValid() ? moment(text).format("HH:mm") : text;
      }
    },
    {
      title: "夜小时数",
      dataIndex: "settingNightHour",
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "remark"
    },
    {
      title: "合计小时数",
      width: 100,
      dataIndex: "hour",
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "publishType",
      align: "center",
      render(text: string) {
        return text === "1" ? "已填入" : "未填入";
      }
    },
    ...appStore.hisMatch({
      map: {
        whyx: [
          {
            title: "状态",
            dataIndex: "publishType",
            align: "center",
            render(text: string, record: any) {
              return <DoCon>
                <span onClick={(e: any) => {
                  addSubClassModal.show({
                    editData: record,
                    onOkCallBack: () => {
                      getData();
                    }
                  });
                }}>编辑</span>
                <span onClick={() => {
                  deleteOrSub(record.id)
                }}>删除</span>
              </DoCon>
            }
          }
        ],
        other: []
      }
    }),
  ];
  const statusTypeList = [
    {
      code: "",
      name: "全部"
    },
    {
      code: "1",
      name: "加班"
    },
    {
      code: "2",
      name: "减班"
    }
  ];

  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });

  const getData = () => {
    setPageLoading(true);
    arrangeService
      .findBylist({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        statusType: selectedStatusType,
        empNo: searchWord,
        publishType,
        startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",
        endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""
      })
      .then(res => {
        if (['whyx'].includes(appStore.HOSPITAL_ID)) {
          setDataSource(res.data);
        } else {
          setDataSource(res.data.list);
        }
        setPageOptions({ ...pageOptions, total: res.data.totalCount || 0 });
        setPageLoading(false);
      });
    arrangeService
      .getCount({
        ...pageOptions,
        wardCode: authStore.selectedDeptCode,
        statusType: selectedStatusType,
        empNo: searchWord,
        publishType,
        startDate: date[0] ? moment(date[0]).format("YYYY-MM-DD") : "",
        endDate: date[1] ? moment(date[1]).format("YYYY-MM-DD") : ""
      })
      .then(res => {
        setAddCount(res.data.addCount)
        setSubCount(res.data.subCount)
        setTotalCount(res.data.totalCount)
      });
  };

  const onDetail = (record: any) => { };

  const deleteOrSub = (id: any) => {
    globalModal.confirm("确认删除", "是否删除此记录吗").then(res => {
      arrangeService.deleteOrSub(id).then(res => {
        message.success("删除成功");
        getData();
      })
    });
  }
  useEffect(() => {
    getData();
  }, [pageOptions.pageIndex, pageOptions.pageSize, authStore.selectedDeptCode, selectedStatusType, date, searchWord, publishType]);

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle maxWidth={1450}>加减班记录查询</PageTitle>
        <Place />
        <div className="sum">
          <span>加班总和：{addCount}</span>
          <span>减班总和：{subCount}</span>
          <span>全部总和：{totalCount}</span>
        </div>
        <span className="label">日期:</span>
        <DatePicker.RangePicker
          allowClear={true}
          style={{ width: 220 }}
          value={date}
          onChange={value => setDate(value)}
        />
        <span className="label">科室:</span>
        <DeptSelect onChange={() => { }} />
        <span className="label">工号姓名:</span>
        <Input
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          style={{ width: 120 }}
        />
        <span className="label">类型</span>
        <Select
          onChange={(value: string) => setSelectedStatusType(value)}
          value={selectedStatusType}
        >
          {statusTypeList.map((item: DictItem, index: number) => (
            <Select.Option value={item.code} key={index}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <span className="label">状态</span>
        {/* <Select
          style={{ width: 120 }}
          onChange={(value: number) => setPublishType(value)}
          value={publishType}
        >
          <Select.Option value={0}>全部</Select.Option>
          <Select.Option value={1}>暂存发布</Select.Option>
        </Select> */}
        {
          ['whyx'].includes(appStore.HOSPITAL_ID) &&
          <Button onClick={() => {
            addSubClassModal.show();
          }}>
            添加
          </Button>
        }
        <Button type="primary" onClick={() => getData()}>
          查询
        </Button>
        {/* <Button type='primary' onClick={() => {}}>
          添加
        </Button>
        <Button>导出</Button> */}
      </PageHeader>
      <BaseTable
        loading={pageLoading}
        dataSource={dataSource}
        columns={columns}
        wrapperStyle={{ margin: "0 15px" }}
        type={["index", "fixedIndex"]}
        surplusHeight={200}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: pageOptions.total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
          });
        }}
        onRow={(record: any) => {
          return { onDoubleClick: () => onDetail(record) };
        }}
      />
      <addSubClassModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div`
.sum{
  width: 300px;
  display: flex;
  margin-right: 50px;
  justify-content: space-evenly;
  font-weight: 700;
}
`;
