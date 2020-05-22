import styled from "styled-components";
import React from "react";
import { Input, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle, Span } from "../common";

interface Props {}

export default function LCDJ(props: Props) {
  return (
    <Wrapper>
      <Header>
        <span className="specialInput">
          所在科室：
          <Input />
        </span>
        <span style={{ marginLeft: "150px" }} className="specialInput">
          申请日期：
          <Input />
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
              <Input />
            </td>
            <td>出生年月</td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>技术职称</td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>来院时间</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={2}>参加临床时间</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>最高学历</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={2}>层级</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>联系方式</td>
            <td colSpan={6}>
              <Input />
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
              <Radio>基地学员带教老师</Radio>
            </td>
            <td colSpan={2}>
              <Radio>基地学员带教老师</Radio>

              {/* <Radio>本科生实习生/规培生/进修生带教老师</Radio> */}
            </td>
            <td colSpan={2}>
              <Radio>基地学员带教老师</Radio>

              {/* <Radio>专科以下实习生/见习生带教老师</Radio> */}
            </td>
          </tr>
          <tr style={{ height: "120px" }}>
            <td colSpan={2}>教学培训经历</td>
            <td colSpan={6}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "120px" }}>
            <td colSpan={2}>院内外授课/授课竞赛/技能竞赛情况</td>
            <td colSpan={6}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>个人申请</td>
            <td colSpan={6} className="vailgnBottom">
              <SpanMiddle className="specialInput">
                申请人签名：
                <Input />
              </SpanMiddle>
              <SpanMiddle className="specialInput">
                日期：
                <Input />
              </SpanMiddle>
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>科室意见</td>
            <td colSpan={6}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>准入考评小组意见</td>
            <td colSpan={6}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>护理部意见</td>
            <td colSpan={6}>
              <Input />
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
}
const Header = styled.div`
  height: 4opx;
  margin: 5px 10px;
`;
const Footer = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
`;
