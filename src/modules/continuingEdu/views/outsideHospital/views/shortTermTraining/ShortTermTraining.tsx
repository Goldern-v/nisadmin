import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BaseTable, { DoCon, TabledCon } from "src/components/BaseTable";
import MergeTh from "../../../../components/mergeTh/MergeTh";
import Header from "../../components/Header";

interface Props {
  getTitle: any;
}
export default observer(function ShortTermTraining(props: Props) {
  const { getTitle } = props; //获取当前页面标题
  const [loading, setLoading] = useState(false); // loading
  const [tableList, setTableList] = useState([] as any); //表格数据
  const [totalCount, setTotalCount] = useState(Number); // 总页码
  const [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  } as any);

  // const tableList: any = [
  //   {
  //     startTime: "2020-01-01",
  //     endTime: "2020-01-03"
  //   }
  // ];

  const columns: any = [
    {
      title: "序号",
      width: 50,
      render(text: string, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: 130,
      align: "center"
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      width: 130,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: "标题",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: "教学方式",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: () => {
        return (
          <MergeTh
            mainTitle="培训对象（必修√/选修△）"
            children={["N0", "N1", "N2", "N3", "N4", "其他"]}
          />
        );
      },
      colSpan: 7,
      width: 280
    },
    {
      title: "N0",
      colSpan: 0
    },
    {
      title: "N1",
      colSpan: 0
    },
    {
      title: "N2",
      colSpan: 0
    },
    {
      title: "N3",
      colSpan: 0
    },
    {
      title: "N4",
      colSpan: 0
    },
    {
      title: "其他",
      colSpan: 0
    },
    {
      title: "管理人员",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: () => {
        return <MergeTh mainTitle="组织方式" children={["线上", "线下"]} />;
      },
      colSpan: 3,
      width: 100
    },
    {
      title: "线上",
      colSpan: 0
    },
    {
      title: "线下",
      colSpan: 0
    },
    {
      title: () => {
        return (
          <MergeTh
            mainTitle="学习资料"
            children={["课件", "视频", "题库(题)"]}
          />
        );
      },
      colSpan: 4,
      width: 180
    },
    {
      title: "课件",
      colSpan: 0
    },
    {
      title: "视频",
      colSpan: 0
    },
    {
      title: "题库(题)",
      colSpan: 0
    },
    {
      title: "学分",
      dataIndex: "",
      width: 130,
      align: "center"
    },
    {
      title: "学时",
      dataIndex: "",
      width: 50,
      align: "center"
    },
    {
      title: "状态",
      dataIndex: "",
      width: 80,
      align: "center"
    },
    {
      title: "备注",
      dataIndex: "",
      width: 150,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "",
      width: 80,
      align: "center",
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => {}}>操作</span>
          </DoCon>
        );
      }
    }
  ];

  // 初始化
  useEffect(() => {
    getTableData();
  }, [query]);

  // 查询
  const getTableData = () => {};

  return (
    <Wrapper>
      <Header getTitle={getTitle} />
      <Content>
        <BaseTable
          loading={loading}
          columns={columns}
          dataSource={tableList}
          type={["index", "fixedIndex"]}
          surplusWidth={300}
          surplusHeight={240}
          pagination={{
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            onShowSizeChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageSize }),
            onChange: (pageIndex, pageSize) =>
              setQuery({ ...query, pageIndex }),
            total: totalCount,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
        />
      </Content>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const Content = styled(TabledCon)`
  padding: 0 15px;
  box-sizing: border-box;
`;
