import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import { appStore, authStore } from "src/stores";
import { Button, Input, Select } from "src/vendors/antd";
import { getPageI, getPageO, qualityControlKeyApi, saveI } from "../api";
import service from "src/services/api";
import moment from "moment";
import { DatePicker, message } from "antd";
import { format } from "date-fns";

export interface DeptType {
  code: string;
  name: string;
}

export default observer(function(props) {
  const { history, location, match } = appStore;
  const defaultForm = (): getPageO => ({
    deptCode: "",
    deptName: "",
    keyPoint: "",
    problem: "",
    reason: "",
    measure: "",
    effects: "",
    reportDate: "",
  });
  const [form, setForm] = useState<getPageO>(defaultForm);

  const getDetail = async () => {
    let { id } = appStore.queryObj;
    try {
      if (id) {
        const res = await qualityControlKeyApi.getDetail(id);
        setForm(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCurBigDept = async () => {
    const res = await qualityControlKeyApi.getCurBigDept();
    if (res.code == "200" && res.data) {
      let cur: any = deptList.filter((v: any) => v.code === res.data);
      if (cur && cur[0]) {
        setFormItem({ deptCode: cur[0].code, deptName: cur[0].name });
      }
    }
  };
  const [deptList, setDeptList] = useState([]);
  const getBigDeptList = async () => {
    const res = await service.commonApiService.getBigDeptList();
    setDeptList(res.data || []);
    if (!appStore.queryObj.id) {
      await getCurBigDept();
    }
  };

  const handleSave = async () => {
    let {
      reportDate,
      deptCode,
      deptName,
      keyPoint,
      problem,
      reason,
      measure,
      effects,
      id,
    } = form;
    let params: saveI = {
      deptCode,
      deptName,
      keyPoint,
      problem,
      reason,
      measure,
      effects,
      reportDate,
    };
    id && (params.id = id);
    let res = await qualityControlKeyApi.saveOrUpdate(params);
    if (res.code == "200") {
      message.success("保存成功");
      setTimeout(() => {
        history.goBack();
      }, 1000);
    }
  };
  const setFormItem = (item: Object) => {
    setForm({ ...form, ...item });
  };
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    if (appStore.queryObj.isWatch) {
      setIsWatch(true);
    }
    Promise.all([getDetail(), getBigDeptList()]);
  }, []);

  return (
    <Wrapper>
      <BreadcrumbBox
        style={{ padding: "5px 10px 0", height: "26px" }}
        data={
          appStore.queryObj.id
            ? [
                {
                  name: "片区质控重点",
                  link: "/qcTwo/qualityControlKey?qcLevel=2",
                },
                { name: "表单详情" },
              ]
            : [
                {
                  name: "片区质控重点",
                  link: "/qcTwo/qualityControlKey?qcLevel=2",
                },
                { name: "新建表单" },
              ]
        }
      />
      <HeadWrapper>
        <div className="right-bottom">
          {isWatch ? (
            ""
          ) : (
            <Button
              type="primary"
              className="con-item"
              onClick={() => handleSave()}
            >
              保存
            </Button>
          )}
          <Button className="con-item" onClick={() => history.goBack()}>
            返回
          </Button>
        </div>
      </HeadWrapper>
      <ContentWrapper>
        <div className="content">
          <p className="content__title">贵州省人民医院</p>
          <p className="content__title">护理质控重点督查工作报告</p>
          <div className={`content__header ${isWatch ? "disable" : ""}`}>
            <DatePicker.MonthPicker
              value={form.reportDate ? moment(form.reportDate) : undefined}
              format="YYYY年MM月"
              onChange={(e) => {
                let v = e ? e.format("YYYY-MM-DD HH:mm") : "";
                setFormItem({ reportDate: v });
              }}
            />
            {/* {appStore.queryObj.id && (
              <span>{moment(form.createTime).format("YYYY年MM月")}</span>
            )} */}
            {/* <Input />
            <span>年</span>
            <Input />
            <span>月</span> */}
            <span className="block" />
            <span>片区：</span>
            <Select
              className={`select inpatientAreaSel ${isWatch ? "disable" : ""}`}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              value={form.deptCode}
              onChange={(val: string) => {
                let curArr: any = deptList.filter((item: DeptType) => {
                  return item.code === val;
                });
                let obj = {
                  deptCode: curArr[0].code,
                  deptName: curArr[0].name,
                };
                setFormItem(obj);
              }}
            >
              {deptList.map((item: DeptType) => (
                <Select.Option key={item.name} value={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="content-table">
            <span className="content-table__text">质控重点：</span>
            <Input.TextArea
              rows={5}
              className={`content-table__inset-ipt ${isWatch ? "disable" : ""}`}
              value={form.keyPoint as any}
              onChange={(e) => setFormItem({ keyPoint: e.target.value })}
            />
            <p>一、存在问题</p>
            <Input.TextArea
              className={isWatch ? "disable" : ""}
              rows={5}
              value={form.problem as any}
              onChange={(e) => setFormItem({ problem: e.target.value })}
            />
            <p>二、原因分析</p>
            <Input.TextArea
              className={isWatch ? "disable" : ""}
              rows={5}
              value={form.reason as any}
              onChange={(e) => setFormItem({ reason: e.target.value })}
            />
            <p>三、改进措施</p>
            <Input.TextArea
              className={isWatch ? "disable" : ""}
              rows={5}
              value={form.measure as any}
              onChange={(e) => setFormItem({ measure: e.target.value })}
            />
            <p>四、成效分析</p>
            <Input.TextArea
              className={isWatch ? "disable" : ""}
              rows={5}
              value={form.effects as any}
              onChange={(e) => setFormItem({ effects: e.target.value })}
            />
          </div>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;
const HeadWrapper = styled.div`
  height: 50px;
  background: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  .right-bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .con-item {
      margin-left: 10px;
      font-size: 12px;
    }
  }
`;
const ContentWrapper = styled.div`
  height: calc(100% - 50px);
  .disable {
    pointer-events: none;
  }
  .content {
    box-sizing: border-box;
    padding: 15px;
    height: calc(100% - 30px);
    background: #fff;
    width: 65%;
    margin: 0 auto;
    overflow-y: auto;
  }
  .content__title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    &:first-child {
      margin-bottom: 5px;
    }
  }
  .content__header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .block {
      flex: 1;
    }
    .ant-input {
      /* width: 60px; */
      border-radius: 0px;
      border-width: 0px 0px 1px 0px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
    .ant-select {
      width: 130px;
    }
  }
  .content-table {
    border: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    p,
    .ant-input {
      margin: 0px;
      border: none;
      border-bottom: 1px solid #000;
      width: 100%;
    }

    .content-table__text {
      border-bottom: 1px solid #000;
      padding-top: 4px;
    }
    .content-table__inset-ipt {
      flex: 1;
    }
    .ant-input {
      resize: none;
      border-radius: 0px;
      &:last-child {
        border: none;
      }
    }
    p {
      font-weight: bold;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .ant-input:focus,
  .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active {
    box-shadow: none;
    border-right-width: 0px !important;
  }
`;
