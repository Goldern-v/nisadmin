import styled from "styled-components";
import React, { useEffect } from "react";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { appStore } from "src/stores";
import { PageTitle } from "src/components/common";
import { DatePicker, Select, Button, message } from "src/vendors/antd";
import { nursingDataModal } from "../NursingDataModal";
import { fileDownload } from "src/utils/file/file";
import { nursingDataApi } from "../api/NursingDataApi";
interface Props {
  getTitle: any;
}
export default observer(function Header(props: Props) {
  const Title = props.getTitle || "";

  useEffect(() => {
    nursingDataModal.isBigScreenOk = appStore.queryObj.isBigScreenOk || "";
    nursingDataModal.init();
  }, []);

  /**
   * 导出
   */
  const exportExcel = () => {
    if (["nys"].includes(appStore.HOSPITAL_ID)) {
      nursingDataApi.exportData(nursingDataModal.dataList).then(
        (res) => {
          console.log(res)
          fileDownload(res);
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle maxWidth={1000}>{Title}</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span>开始时间：</span>
        <DatePicker.RangePicker
          allowClear={false}
          style={{ width: 220 }}
          value={nursingDataModal.selectedDate}
          onChange={date => {
            nursingDataModal.selectedDate = date;
            nursingDataModal.onload();
          }}
          ranges={{
            第一季度: [moment("2020-01-01"), moment("2020-03-31")],
            第二季度: [moment("2020-04-01"), moment("2020-06-30")],
            第三季度: [moment("2020-07-01"), moment("2020-09-30")],
            第四季度: [moment("2020-10-01"), moment("2020-12-31")]
          }}
        />
        <span>科室：</span>
        <Select
          style={{ width: 200 }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={nursingDataModal.selectedDeptType}
          onChange={(val: string) => {
            nursingDataModal.selectedDeptType = val;
            nursingDataModal.onload();
          }}
        >
          <Select.Option value="">全部</Select.Option>
          {nursingDataModal.deptList.map((item: any, index: number) => (
            <Select.Option value={item.code} key={item.code}>
              {item.name}
            </Select.Option>
          ))}
          <Select.Option value="-1">其他</Select.Option>
        </Select>

        <Button type="primary" className="checkButton" onClick={() => { }}>
          查询
        </Button>
        <Button onClick={() => { exportExcel() }}>导出</Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 0 0 0;
  .ant-select {
    width: 150px;
    margin-right: 15px;
  }
  .ant-calendar-picker {
    margin-right: 15px;
  }
  button {
    margin-left: 10px;
  }
  .checkButton {
    margin-left: 0px;
  }
  .ant-select-selection-selected-value span {
    color: #000 !important;
  }
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;

const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
`;
