import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import QualityControlRecordHeader from "./components/QualityControlRecordHeader";
import QualityControlRecordTable from "./components/QualityControlRecordTable";
import PaginationCon from "./components/PaginationCon";
import { Pagination, Spin, message } from "antd";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { qualityControlRecordApi } from "src/modules/quality/views/qualityControlRecord/api/QualityControlRecordApi";
import { qualityControlRecordVM } from "src/modules/quality/views/qualityControlRecord/QualityControlRecordVM";
import { useKeepAliveEffect } from "react-keep-alive";
import { Modal } from "antd/es";
import { fileDownload } from "src/utils/file/file";

export interface Props extends RouteComponentProps {}

export default observer(function QualityControlRecord() {
  let [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);

  useEffect(() => {
    /** 根据路由路径判断质控等级 */
    let level = ((pathname: string) => {
      if (pathname.indexOf("qcThree") >= 0) return 3;

      if (pathname.indexOf("qcTwo") >= 0) return 2;

      if (pathname.indexOf("qcOne") >= 0) return 1;

      if (pathname.indexOf("qcFun") >= 0) return 4;
      return 3;
    })(appStore.history.location.pathname);

    setLoading(true);
    qualityControlRecordVM.init(level).then(
      (res) => {
        getTableData();
      },
      (err) => setLoading(false)
    );
  }, []);

  useKeepAliveEffect(() => {
    if ((appStore.history && appStore.history.action) === "POP") {
      getTableData();
    }
    return () => {};
  });

  const getTableData = (obj?: any) => {
    setSelectedRowKeys([]);
    setLoading(true);

    //贵州且类型为"我创建的","待我处理","我已处理"
    if (
      ["gzsrm"].includes(appStore.HOSPITAL_ID) &&
      [-3, -4, -5].includes(qualityControlRecordVM.readWay)
    ) {
      let parms = {
        pageIndex: obj
          ? obj.current
          : qualityControlRecordVM.allData.pageIndex || 1,
        pageSize: obj
          ? obj.pageSize
          : qualityControlRecordVM.allData.pageSize || 20,
        level: qualityControlRecordVM.level
          ? qualityControlRecordVM.level
          : "3",
        beginDate: qualityControlRecordVM.filterDate[0].format("YYYY-MM-DD"),
        endDate: qualityControlRecordVM.filterDate[1].format("YYYY-MM-DD"),
        nodeCode: qualityControlRecordVM.filterState,
      };
      qualityControlRecordApi
        .getPageByNewNoType(qualityControlRecordVM.readWay, parms)
        .then((res: any) => {
          qualityControlRecordVM.allData = res.data;
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
    } else {
      let level = qualityControlRecordVM.level;
      if (["whyx"].includes(appStore.HOSPITAL_ID)) {
        const obj = {
          4: "护理部职能督导",
        };
        obj[level] && (level = obj[level]);
      }

      let sendData = {
        pageIndex: obj
          ? obj.current
          : qualityControlRecordVM.allData.pageIndex || 1,
        pageSize: obj
          ? obj.pageSize
          : qualityControlRecordVM.allData.pageSize || 20,
        wardCode: qualityControlRecordVM.filterDeptCode,
        qcGroupRole: qualityControlRecordVM.filterForm,
        type: qualityControlRecordVM.readWay,
        nodeCode: qualityControlRecordVM.filterState,
        level,
        beginDate: qualityControlRecordVM.filterDate[0].format("YYYY-MM-DD"),
        endDate: qualityControlRecordVM.filterDate[1].format("YYYY-MM-DD"),
        qcCode: qualityControlRecordVM.qcCode || "",
      };
      qualityControlRecordApi
        .instanceGetPageByCondition(sendData)
        .then((res: any) => {
          qualityControlRecordVM.allData = res.data;
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
    }
  };

  const exportSelected = () => {
    // 未勾选则全局导出
    if (selectedRowKeys.length <= 0) {
      //贵州且类型为"我创建的","待我处理","我已处理"
      if (
        [
          "gzsrm".includes(appStore.HOSPITAL_ID) &&
            [-3, -4, -5].includes(qualityControlRecordVM.readWay),
        ]
      ) {
        let selectedRecordIds = (qualityControlRecordVM.allData.list || []).map(
          (item: any) => item.id
        );
        Modal.confirm({
          title: "导出",
          content: "是否导出全部？",
          onOk: () => {
            setLoading(true);
            qualityControlRecordApi.exportList(selectedRecordIds).then(
              (res) => {
                setLoading(false);
                fileDownload(res);
                setSelectedRowKeys([]);
              },
              () => setLoading(false)
            );
          },
        });
      } else {
        const exportParams = {
          wardCode: qualityControlRecordVM.filterDeptCode,
          qcGroupRole: qualityControlRecordVM.filterForm,
          type: qualityControlRecordVM.readWay,
          nodeCode: qualityControlRecordVM.filterState,
          level: qualityControlRecordVM.level,
          beginDate: qualityControlRecordVM.filterDate[0].format("YYYY-MM-DD"),
          endDate: qualityControlRecordVM.filterDate[1].format("YYYY-MM-DD"),
        };

        Modal.confirm({
          title: "导出",
          content: "是否导出全部？",
          onOk: () => {
            setLoading(true);
            qualityControlRecordApi.exportAll(exportParams).then(
              (res) => {
                setLoading(false);
                fileDownload(res);
                setSelectedRowKeys([]);
              },
              () => setLoading(false)
            );
          },
        });
      }
    } else {
      let selectedRecordIds = (qualityControlRecordVM.allData.list || [])
        .filter((item: any) => selectedRowKeys.indexOf(item.key) >= 0)
        .map((item: any) => item.id);

      Modal.confirm({
        title: "导出",
        content: "是否导出选中条目？",
        onOk: () => {
          setLoading(true);
          qualityControlRecordApi.exportList(selectedRecordIds).then(
            (res) => {
              setLoading(false);
              fileDownload(res);
              setSelectedRowKeys([]);
            },
            () => setLoading(false)
          );
        },
      });
    }
  };

  return (
    <Wrapper>
      <HeaderCon>
        <QualityControlRecordHeader
          refreshData={getTableData}
          refExport={exportSelected}
        />
      </HeaderCon>
      <MidCon>
        <QualityControlRecordTable
          tableData={qualityControlRecordVM.allData.list || []}
          allData={qualityControlRecordVM.allData}
          loadingGet={loading}
          // showSelection={appStore.HOSPITAL_ID == 'hj'}
          showSelection={["hj", "gzsrm", "gxjb"].includes(appStore.HOSPITAL_ID)}
          selectionChange={(payload: any) => setSelectedRowKeys(payload)}
          selectedRowKeys={selectedRowKeys}
          getTableData={getTableData}
        />
      </MidCon>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`;
const HeaderCon = styled.div`
  /* height: 66px; */
`;

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  /* padding: 20px; */
  /* padding-top: 10px; */
`;
