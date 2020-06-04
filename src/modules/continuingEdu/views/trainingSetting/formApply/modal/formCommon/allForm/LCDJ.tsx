import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Input, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle, Span } from "../common";

interface Props {}

export default observer(function LCDJ(props: Props) {
  const lCDJContent = formApplyModal.LCDJFormContent;

  return (
    <Wrapper>
      <Header>
        <span className="specialInput">
          所在科室：
          <Input
            value={lCDJContent.f00005}
            onChange={(e: any) => (lCDJContent.f00005 = e.target.value)}
          />
        </span>
        <span style={{ marginLeft: "160px" }} className="specialInput">
          申请日期：
          <Input
            value={lCDJContent.f00137}
            onChange={(e: any) => (lCDJContent.f00137 = e.target.value)}
          />
        </span>
      </Header>
      <table>
        <colgroup>
          <col width="8%" />
          <col width="4%" />
          <col width="10%" />
          <col width="18%" />
          <col width="24%" />
          <col width="6%" />
          <col width="6%" />
          <col width="24%" />
        </colgroup>
        <tbody>
          <tr>
            <td className="smallLabel">姓名</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00001}
                onChange={(e: any) => (lCDJContent.f00001 = e.target.value)}
              />
            </td>
            <td>出生年月</td>
            <td>
              <Input
                value={lCDJContent.f00002}
                onChange={(e: any) => (lCDJContent.f00002 = e.target.value)}
              />
            </td>
            <td colSpan={2}>技术职称</td>
            <td>
              <Input
                value={lCDJContent.f00007}
                onChange={(e: any) => (lCDJContent.f00007 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>来院时间</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00009}
                onChange={(e: any) => (lCDJContent.f00009 = e.target.value)}
              />
            </td>
            <td colSpan={2}>参加临床时间</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00010}
                onChange={(e: any) => (lCDJContent.f00010 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>最高学历</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00011}
                onChange={(e: any) => (lCDJContent.f00011 = e.target.value)}
              />
            </td>
            <td colSpan={2}>层级</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00014}
                onChange={(e: any) => (lCDJContent.f00014 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>联系方式</td>
            <td colSpan={6}>
              <Input
                value={lCDJContent.f00015}
                onChange={(e: any) => (lCDJContent.f00015 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={2}>
              申报类别
            </td>
            <td colSpan={2}>一级</td>
            <td colSpan={2}>二级</td>
            <td colSpan={2}>三级</td>
          </tr>
          <tr style={{ height: "60px" }}>
            <td colSpan={2}>
              <Radio.Group
                value={lCDJContent.f00016}
                onChange={(e: any) => (lCDJContent.f00016 = e.target.value)}
              >
                <Radio value={1}>基地学员带教老师</Radio>
              </Radio.Group>
            </td>
            <td className="special-radio" colSpan={2}>
              <Radio.Group
                value={lCDJContent.f00016}
                onChange={(e: any) => (lCDJContent.f00016 = e.target.value)}
              >
                <Radio value={2}>
                  <div>科生实习生/规培生/</div>
                  <div>进修生带教老师</div>
                </Radio>
              </Radio.Group>
            </td>
            <td className="special-radio" colSpan={2}>
              <Radio.Group
                value={lCDJContent.f00016}
                onChange={(e: any) => (lCDJContent.f00016 = e.target.value)}
              >
                <Radio value={3}>
                  <div>专科以下实习生/</div>
                  <div>见习生带教老师</div>
                </Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr style={{ height: "110px" }}>
            <td colSpan={2}>教学培训经历</td>
            <td colSpan={6}>
              <Input.TextArea
                rows={4}
                value={lCDJContent.f00017}
                onChange={(e: any) => (lCDJContent.f00017 = e.target.value)}
              />
            </td>
          </tr>
          <tr style={{ height: "110px" }}>
            <td colSpan={2}>院内外授课/授课竞赛/技能竞赛情况</td>
            <td colSpan={6}>
              <Input.TextArea
                rows={4}
                value={lCDJContent.f00018}
                onChange={(e: any) => (lCDJContent.f00018 = e.target.value)}
              />
            </td>
          </tr>
          <tr style={{ height: "70px" }}>
            <td colSpan={2}>个人申请</td>
            <td colSpan={6} className="vailgnBottom">
              <SpanMiddle className="specialInput">
                申请人签名：
                <img
                  className="img"
                  src={formApplyModal.signUrl("admin")}
                  alt=""
                />
              </SpanMiddle>
              <SpanMiddle className="specialInput">
                日期：
                <Input disabled value={lCDJContent.f00021} />
              </SpanMiddle>
            </td>
          </tr>
          <tr style={{ height: "90px" }}>
            <td colSpan={2}>科室意见</td>
            <td colSpan={6}>
              <div className="vailgnTop godie">
                <Input.TextArea />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  科室护长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl("admin")}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={lCDJContent.f00025} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>准入考评小组意见</td>
            <td colSpan={6}>
              <Input.TextArea rows={3} disabled />
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>护理部意见</td>
            <td colSpan={6}>
              <Input.TextArea rows={3} disabled />
            </td>
          </tr>
        </tbody>
      </table>
      <Footer>
        <div>备注：</div>
        <div>1、填写近三年时间内的培训、授课、竞赛等情况。</div>
        <div>
          2、表格中的申报类别需要认真阅读护理临床带教老师准入条件和资质要求后填写。
        </div>
      </Footer>
    </Wrapper>
  );
});
const Header = styled.div`
  height: 4opx;
  margin: 5px 10px;
`;
const Footer = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
`;
