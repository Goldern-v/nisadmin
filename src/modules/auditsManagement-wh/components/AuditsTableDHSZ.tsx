import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import BaseTable, { DoCon } from "src/components/BaseTable";
import windowHeight from "src/hooks/windowHeight";

import store, { appStore, authStore } from "src/stores";

import emitter from "src/libs/ev";
import { Button } from "antd";
import { globalModal } from "src/global/globalModal";
import { aMServices } from "../services/AMServices";

import service from "src/services/api";
import qs from "qs";
import { observer } from "src/vendors/mobx-react-lite";
import createModal from "src/libs/createModal";
import GroupsEmpNoAduitModal from "../modal/GroupsEmpNoAduitModal";
import { type } from "os";
import GroupsHlbModal from "../modal/GroupsHlbModal";
import { message } from "src/vendors/antd";
import { statisticsViewModal } from "src/modules/nurseFiles/view/statistics/StatisticsViewModal";
import GroupsSrAduitModal from "../modal/GroupsSrAduitModal";
export interface Props {
  showType: string;
  keyword: string;
  needAudit: boolean;
  active: boolean;
  selectedDate: any;
}

export default observer(function AuditsTableDHSZ(props: Props) {
  let { showType, needAudit, active, keyword } = props;
  let {
    empName,
    post,
    deptName,
    nurseHierarchy,
    nearImageUrl
  } = store.appStore.queryObj;
  const [tableData, setTableData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(false);

  const groupsEmpNoAduitModal = createModal(GroupsEmpNoAduitModal);
  const groupsHlbModal = createModal(GroupsHlbModal);
  const goupsSrAduitModal = createModal(GroupsSrAduitModal);

  const toDetails = (row: any) => {
    console.log('ok')
    if (showType == "qc" || showType == "qcTwoLevel") {
      window.open(
        `/crNursing/manage/#/qualityControlRecordDetail/${row.othersMessage.id}`
      );
    } else if (showType == "nurseFile") {
      service.commonApiService.getNurseInformation(row.commiterNo).then(res => {
        // appStore.history.push(`/nurseAudit?${qs.stringify(res.data)}`)
        if (needAudit) {
          window.open(`/crNursing/manage/#/nurseAudit?empNo=${res.data.empNo}`);
        } else {
          window.open(
            `/crNursing/manage/#/nurseAudit?empNo=${res.data.empNo
            }&needAudit=false`
          );
        }
      });
    } else if (showType == "sr") {
      window.open(
        `/crNursing/manage/#/qualityScheduleRecordDetails/${row.othersMessage.id
        }`
      );
    }
  };

  const columns: any = [
    {
      title: "序号",
      dataIndex: "",
      key: "",
      render: (text: any, record: any, index: number) =>
        (current - 1) * pageSize + index + 1,
      align: "center",
      width: 40
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 90,
      render(text: string, record: any) {
        return text == "nurseFile"
          ? "护士档案"
          : text == "qc"
            ? "三级质控"
            : text == "qcTwoLevel"
              ? "二级质控"
              : text == "sr"
                ? "特殊时段查房"
                : "";
      }
    },
    {
      title: "内容",
      dataIndex: "message",
      key: "message",
      align: "left",
      width: 250
    },
    {
      title: "科室",
      dataIndex: "wardName",
      key: "wardName",
      align: "left",
      width: 150
    },
    {
      title: "状态",
      dataIndex: "statusDesc",
      key: "statusDesc",
      align: "center",
      width: 100
    },

    {
      title: "提交人",
      dataIndex: "commiterName",
      key: "commiterName",
      width: 100,
      align: "center"
    },
    {
      title: "提交时间",
      dataIndex: "commitTime",
      key: "commitTime",
      width: 130,
      align: "center"
    },
    {
      title: "操作",
      dataIndex: "cz",
      key: "8",
      width: 100,
      align: "center",
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => toDetails(row)}>
              {props.needAudit ? "审核" : "查看"}
            </span>
            {/* <AuditText
              needAudit={props.needAudit}
              row={row}
              getTableData={() => emitter.emit('refreshNurseAuditTable')}
            /> */}
          </DoCon>
        );
      }
    }
  ];

  const onChange = (pagination: any) => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
    pagination.current &&
      onload(
        pagination.current,
        searchText,
        props.selectedDate,
        pagination.pageSize
      );
  };

  const onload = (
    current: any,
    searchText: any,
    selectedDate: any,
    pageSize = 20
  ) => {
    setCurrent(current);
    setLoading(true);
    let getDataFun = props.needAudit
      ? aMServices.pendingPage(current, pageSize, showType, keyword)
      : aMServices.solvedPage(
        current,
        pageSize,
        showType,
        keyword,
        selectedDate
      );
    getDataFun.then(res => {
      setLoading(false);
      setTableData(res.data.list);
      setTotal(res.data.totalCount);
      setCurrent(res.data.pageIndex);
      setPageSize(res.data.pageSize);
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onSelect: (record: any, selected: boolean, selectedRowsNext: any) =>
      handleRowsSelectChange(selectedRowsNext),
    onSelectAll: (selected: boolean, selectedRowsNext: any, changeRows: any) =>
      handleRowsSelectChange(selectedRowsNext, true)
  };

  const handleRowsSelectChange = (
    /**要更新的选中列表 */
    selectedRowsNext: any,
    /**是否全选 */
    toogleAll?: boolean
  ) => {
    let newRows = [] as any
    let newRowKeys = [] as any
    let availableRows = selectedRowsNext.filter((item: any) => {
      return item.othersMessage.nextNodePendingName != "待病区处理";
    })

    if ((selectedRows.length < availableRows.length) || !toogleAll) {
      newRows = availableRows
      newRowKeys = newRows.map((item: any) => item.key)
    }

    setSelectedRows(newRows)
    setSelectedRowKeys(newRowKeys)

    !toogleAll &&
      (newRows.length < selectedRowsNext.length) &&
      message.warning("待病区处理的记录不能批量审核")
  }

  const openGroupModal = () => {
    if (selectedRows.length == 0) {
      return message.warning("请至少勾选一条记录");
    }

    if (showType == "nurseFile") {
      groupsEmpNoAduitModal.show({
        selectedRows,
        getTableData: () => {
          setSelectedRows([]);
          setSelectedRowKeys([]);
          emitter.emit("refreshNurseAuditTable");
        }
      });
    } else if (showType == "qc" || showType == 'qcTwoLevel') {

      groupsHlbModal.show({
        selectedRows,
        getTableData: () => {
          setSelectedRows([]);
          setSelectedRowKeys([]);
          emitter.emit("refreshNurseAuditTable");
        }
      });
    } else if (showType == "sr") {
      goupsSrAduitModal.show({
        selectedRows,
        getTableData: () => {
          setSelectedRows([]);
          setSelectedRowKeys([]);
          emitter.emit("refreshNurseAuditTable");
        }
      });
    }
  };

  emitter.removeAllListeners("refreshNurseAuditTable");
  emitter.addListener("refreshNurseAuditTable", () => {
    onload(current, searchText, props.selectedDate);
  });

  //table数据变化后清除勾选
  useEffect(() => {
    setSelectedRows([])
    setSelectedRowKeys([])
  }, [tableData])

  useEffect(() => {
    showType && onload(current, searchText, props.selectedDate, pageSize);
  }, [active, authStore.selectedDeptCode, showType, statisticsViewModal.selectedDeptCode]);

  return (
    <Wrapper>
      <GroupPostBtn onClick={() => onload(current, searchText, pageSize)}>
        刷新
      </GroupPostBtn>
      {props.needAudit && (
        <GroupPostBtn style={{ right: 110 }} onClick={openGroupModal}>
          批量审核
        </GroupPostBtn>
      )}
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={280}
        // spaceRowNumber={10}
        // type={['spaceRow']}
        pagination={{
          total: total,
          current: current,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: pageSize
        }}
        onChange={onChange}
        rowSelection={rowSelection}
        loading={loading}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => toDetails(record)
          };
        }}
      />
      <groupsEmpNoAduitModal.Component />
      <groupsHlbModal.Component />
      <goupsSrAduitModal.Component />
    </Wrapper>
  );
});
const Wrapper = styled.div``;
const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 121px;
  right: 33px;
`;
