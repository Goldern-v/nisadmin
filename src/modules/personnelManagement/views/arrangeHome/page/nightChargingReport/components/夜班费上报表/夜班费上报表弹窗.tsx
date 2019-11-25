import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
  Input,
  Select,
  ColumnProps,
  AutoComplete,
  message
} from "src/vendors/antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { cloneJson } from "src/utils/json/clone";
import { LastImproveItem, Report, TypeCompare } from "../../types";
import { starRatingReportEditModel } from "../../model/StarRatingReportEditModel";
import { appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import service from "src/services/api";
import qs from "qs";
const commonApi = service.commonApiService;

const Option = Select.Option;

export interface Props {
  sectionId: string;
  data: any;
  setData: any;
}

export default observer(function 夜班费上报表弹窗(props: Props) {
  let { location, history } = appStore;
  let search = qs.parse(location.search.replace("?", ""));

  let { sectionId, setData, data } = props;

  let cloneData: any = cloneJson(data || { list: [] });
  let report: Report = starRatingReportEditModel.getDataInAllData("report");

  const [nurseList, setNurseList] = useState([] as any[]);

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      render(text: any, record: any, index: number) {
        return index + 1;
      },
      width: 50,
      align: "center"
    },

    {
      title: "工号",
      render(text: any, record: any, index: number) {
        return (
          <Input
            readOnly
            value={record.empNo}
            onChange={(e: any) => {
              record.empNo = e.target.value;
              setData(cloneData);
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "姓名",
      render(text: any, record: any, index: number) {
        return (
          <Input
            readOnly
            value={record.empName}
            onChange={(e: any) => {
              record.empName = e.target.value;
              setData(cloneData);
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "金额",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.total}
            onChange={(e: any) => {
              record.total = e.target.value;
              setData(cloneData);
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "数量",
      render(text: any, record: any, index: number) {
        return (
          <Input
            value={record.num}
            onChange={(e: any) => {
              record.num = e.target.value;
              setData(cloneData);
            }}
          />
        );
      },
      width: 90
    },
    {
      title: "标准",
      render(text: any, record: any, index: number) {
        return (
          <Input
            readOnly
            value={record.standard}
            onChange={(e: any) => {
              record.standard = e.target.value;
              setData(cloneData);
            }}
          />
        );
      },
      width: 90
    }

    // {
    //   title: "操作",
    //   key: "操作",
    //   width: 60,
    //   render(text: any, record: any, index: number) {
    //     return (
    //       <DoCon>
    //         <span
    //           onClick={e => {
    //             cloneData.list.splice(index, 1);
    //             setData(cloneData);
    //           }}
    //         >
    //           删除
    //         </span>
    //       </DoCon>
    //     );
    //   }
    // }
  ];

  const addItem = () => {
    cloneData.list.push({
      empNo: "",
      empName: "",
      total: "",
      num: "",
      standard: ""
    });
    setData(cloneData);
  };

  useEffect(() => {
    commonApi.userDictInfo(search.wardCode).then(res => {
      if (res.data && res.data instanceof Array) {
        setNurseList(
          res.data.map((item: any) => {
            return {
              empName: item.name,
              empNo: item.code
            };
          })
        );
      }
    });
  }, []);

  return (
    <Wrapper>
      {/* <div className="button-con">
        <Button icon="plus" size="small" onClick={addItem}>
          添加
        </Button>
      </div> */}

      <BaseTable
        surplusHeight={400}
        columns={columns}
        dataSource={cloneData.list || []}
        wrapperStyle={{
          padding: 0,
          paddingTop: 20
        }}
      />
    </Wrapper>
  );
});

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`;

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`;

const Wrapper = styled.div`
  position: relative;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  td {
    padding: 0 !important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    /* :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    } */
    :focus{
      outline: none;
      border: none;
      background: ${p => p.theme.$mlc};
      box-shadow: none;
    }
  }
  .ant-input{
      resize: none;
      ${defaultInputStyle}
      /* :hover{
        ${activeInputStyle}
          background: ${p => p.theme.$mlc};
      } */
      :focus{
        ${activeInputStyle}
          background: ${p => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${p => p.theme.$mlc};
        }
      }
    }

  input {
    text-align: center;
  }  
`;

const HeadCon = styled.div``;
