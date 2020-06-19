import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { Input, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle, Span } from "../common";

const RadioGroup = Radio.Group;
interface Props {}

export default observer(function FormApply(props: Props) {
  const GFXZLContent = formApplyModal.GFXZLFormContent;

  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width="18%" />
          <col width="9%" />
          <col width="14%" />
          <col width="29%" />
          <col width="10%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          <tr>
            <td>科室</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00005}
                onChange={(e: any) => (GFXZLContent.f00005 = e.target.value)}
              />
            </td>
            <td>年度</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00079}
                onChange={(e: any) => (GFXZLContent.f00079 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00001}
                onChange={(e: any) => (GFXZLContent.f00001 = e.target.value)}
              />
            </td>
            <td>专业技术职称</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00007}
                onChange={(e: any) => (GFXZLContent.f00007 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>获得职称年限</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00080}
                onChange={(e: any) => (GFXZLContent.f00080 = e.target.value)}
              />
            </td>
            <td>从事本专业工作年限</td>
            <td colSpan={2}>
              <Input
                value={GFXZLContent.f00081}
                onChange={(e: any) => (GFXZLContent.f00081 = e.target.value)}
              />
            </td>
          </tr>
          <tr style={{ height: "130px" }}>
            <td colSpan={6} className="vailgnTop">
              <div>相关技术培训和进修经历：</div>
              <Input.TextArea
                rows={4}
                style={{ width: "100%" }}
                value={GFXZLContent.f00017}
                onChange={(e: any) => (GFXZLContent.f00017 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>申请高风险诊疗技术名称</td>
            <td colSpan={3}>独立完成该项技术操作病例数</td>
            <td>科室是否批准开展</td>
          </tr>
          {GFXZLContent.f00082 &&
            GFXZLContent.f00082.map((item: any, index: any) => (
              <tr key={index}>
                <td colSpan={2}>
                  <Input
                    value={item.f00083}
                    onChange={(e: any) => (item.f00083 = e.target.value)}
                  />
                </td>
                <td colSpan={3}>
                  <Input
                    value={item.f00084}
                    onChange={(e: any) => (item.f00084 = e.target.value)}
                  />
                </td>
                <td>
                  <RadioGroup
                    name="radiogroup"
                    value={item.f00085}
                    onChange={(e: any) => (item.f00085 = e.target.value)}
                  >
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </RadioGroup>
                </td>
              </tr>
            ))}
          <tr style={{ height: "130px" }}>
            <td className="padding" colSpan={6}>
              <div className="vailgnTop">
                <div>科室考核意见：</div>
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={GFXZLContent.f00025}
                />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  护士长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(GFXZLContent.f00022)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={GFXZLContent.f00026} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "140px" }}>
            <td className="padding" colSpan={6}>
              <div className="vailgnTop">
                <div>护理部审核意见：</div>
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  value={GFXZLContent.f00050}
                />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(GFXZLContent.f00047)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={GFXZLContent.f00051} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
});
