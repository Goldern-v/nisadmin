import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { trainingSettingApi } from "../../../../api/TrainingSettingApi";
import { Wrapper, SpanMiddle } from "../common";

interface Props {}

export default observer(function YNJX(props: Props) {
  const YNJXContent = formApplyModal.YNJXFormContent;
  const [deptList, setDeptList] = useState([]); //所有科室
  useLayoutEffect(() => {
    trainingSettingApi.getAllDeptList().then((res: any) => {
      setDeptList(res.data.deptList);
    });
    trainingSettingApi.getAllEmpName("").then((res: any) => {});
  }, []);

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width="6%" />
          <col width="10%" />
          <col width="12%" />
          <col width="10%" />
          <col width="10%" />
          <col width="12%" />
          <col width="11%" />
          <col width="14%" />
          <col width="15%" />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={2}>姓名</td>
            <td>
              <Input
                value={YNJXContent.f00001}
                onChange={(e: any) => (YNJXContent.f00001 = e.target.value)}
              />
            </td>
            <td>性别</td>
            <td>
              <Input
                value={YNJXContent.f00003_1}
                onChange={(e: any) => (YNJXContent.f00003_1 = e.target.value)}
              />
            </td>
            <td>年龄</td>
            <td>
              <Input
                value={YNJXContent.f00125}
                onChange={(e: any) => (YNJXContent.f00125 = e.target.value)}
              />
            </td>
            <td>工作年限</td>
            <td>
              <Input
                value={YNJXContent.f00126}
                onChange={(e: any) => (YNJXContent.f00126 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>参与工作时间</td>
            <td colSpan={2}>
              <Input
                value={YNJXContent.f00006}
                onChange={(e: any) => (YNJXContent.f00006 = e.target.value)}
              />
            </td>
            <td colSpan={2}>技术职称</td>
            <td colSpan={3}>
              <Input
                value={YNJXContent.f00007}
                onChange={(e: any) => (YNJXContent.f00007 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>指导老师</td>
            <td colSpan={2}>
              <Select
                value={YNJXContent.f00138}
                onChange={(val: any) => {
                  YNJXContent.f00138 = val;
                }}
                showArrow={false}
                style={{ width: "100%" }}
                showSearch
                filterOption={false}
                onSearch={(value: any) => {
                  formApplyModal.teacherName = value;
                  formApplyModal.initData();
                }}
                loading={formApplyModal.selectLoading}
              >
                {formApplyModal.teacherNameList.map(
                  (item: any, index: number) => (
                    <Select.Option value={item.empNo} key={index}>
                      {item.empName}
                    </Select.Option>
                  )
                )}
              </Select>
            </td>
            <td colSpan={2}>目前所在科室</td>
            <td colSpan={3}>
              <Input
                value={YNJXContent.f00005}
                onChange={(e: any) => (YNJXContent.f00005 = e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>入科时间</td>
            <td colSpan={2}>
              <Input
                value={YNJXContent.f00127}
                onChange={(e: any) => (YNJXContent.f00127 = e.target.value)}
              />
            </td>
            <td colSpan={2}>拟进修科室</td>
            <td colSpan={3}>
              <Select
                showArrow={false}
                style={{ width: "100%" }}
                value={YNJXContent.f00128}
                onChange={(val: string) => {
                  YNJXContent.f00128 = val;
                }}
              >
                {deptList.map((item: any, index: number) => (
                  <Select.Option value={item.code} key={index}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>拟进修起止</td>
            <td colSpan={7}>
              <span className="specialInput">
                <Input
                  value={YNJXContent.f00130}
                  onChange={(e: any) => (YNJXContent.f00130 = e.target.value)}
                />
                <span style={{ marginLeft: "50px" }} />至
                <span style={{ marginRight: "50px" }} />
                <Input
                  value={YNJXContent.f00131}
                  onChange={(e: any) => (YNJXContent.f00131 = e.target.value)}
                />
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>进修目的、要求</td>
            <td colSpan={7} style={{ height: "110px" }}>
              <Input.TextArea
                rows={3}
                value={YNJXContent.f00132}
                onChange={(e: any) => (YNJXContent.f00132 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td rowSpan={4}>主要工作经历</td>
            <td colSpan={3}>起止年月</td>
            <td colSpan={3}>工作单位名称</td>
            <td colSpan={2}>曾工作科室</td>
          </tr>
          {YNJXContent.f00133 &&
            YNJXContent.f00133.map((item: any, index: any) => (
              <tr key={index}>
                <td colSpan={3}>
                  <Input
                    value={item.f00134}
                    onChange={(e: any) => (item.f00134 = e.target.value)}
                  />
                </td>
                <td colSpan={3}>
                  <Input
                    value={item.f00135}
                    onChange={(e: any) => (item.f00135 = e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <Input
                    value={item.f00136}
                    onChange={(e: any) => (item.f00136 = e.target.value)}
                  />
                </td>
              </tr>
            ))}
          <tr style={{ height: "100px" }}>
            <td colSpan={2}>科室意见</td>
            <td colSpan={7} className="noPadding">
              <div className="vailgnTop godie">
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={YNJXContent.f00025}
                />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  护长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(YNJXContent.f00022)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input
                    disabled
                    value={YNJXContent.f00026}
                    onChange={(e: any) => (YNJXContent.f00026 = e.target.value)}
                  />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "140px" }}>
            <td colSpan={1}>进修鉴定评语</td>
            <td colSpan={8} className="noPadding">
              <div className="vailgnTop godie">
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={YNJXContent.f00040}
                />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  指导老师签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(YNJXContent.f00037)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={YNJXContent.f00041} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "140px" }}>
            <td colSpan={1}>进修科室意见</td>
            <td colSpan={8} className="noPadding">
              <div className="vailgnTop godie">
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={YNJXContent.f00045}
                />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  护士长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(YNJXContent.f00042)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input
                    disabled
                    value={YNJXContent.f00025}
                    onChange={(e: any) => (YNJXContent.f00025 = e.target.value)}
                  />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "140px" }}>
            <td colSpan={1}>护理部室意见</td>
            <td colSpan={8} className="noPadding">
              <div className="vailgnTop godie">
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={YNJXContent.f00050}
                />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  护理部签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(YNJXContent.f00047)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={YNJXContent.f00051} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
});
