import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { Input, Radio } from "antd";
import { observer } from "mobx-react-lite";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle, Span } from "../common";

interface Props {}

export default observer(function LCDJ(props: Props) {
  const [lCDJContent, setLCDJContent] = useState({
    f00001: "", //姓名
    f00002: "", //出生日期
    f00007: "", //专业技术职称
    f00009: "", //来院时间
    f00010: "", //参加临床带教时间
    f00011: "", //最高学历
    f00014: "", //护士层级
    f00015: "", //联系方式
    f00016: 1, //申报类别
    f00017: "", //教学培训经历
    f00018: "", //院内外授课/授课竞赛/技能竞赛情况
    f00019: "", //申请人工号
    f00020: "", //申请人姓名
    f00021: "", //申请时间
    f00022: "", //科室审批人工号
    f00023: "", //科室审批人姓名
    f00024: "", //科室审批结果（1通过；-1退回）
    f00025: "", //科室审批时间
    f00026: "", //准入考评小组审批人工号
    f00027: "", //准入考评小组审批人姓名
    f00028: "", //准入考评小组审批结果（1通过；-1退回）
    f00029: "", //准入考评小组审批时间
    f00030: "", //护理部审批人工号
    f00031: "", //护理部审批人姓名
    f00032: "" //护理部审批时间
  });

  useLayoutEffect(() => {
    formApplyModal.LCDJformContent = lCDJContent;
  }, [lCDJContent]);

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
              <Input
                value={lCDJContent.f00001}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00001: e.target.value })
                }
              />
            </td>
            <td>出生年月</td>
            <td>
              <Input
                value={lCDJContent.f00002}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00002: e.target.value })
                }
              />
            </td>
            <td colSpan={2}>技术职称</td>
            <td>
              <Input
                value={lCDJContent.f00007}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00007: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>来院时间</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00009}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00009: e.target.value })
                }
              />
            </td>
            <td colSpan={2}>参加临床时间</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00010}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00010: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>最高学历</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00011}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00011: e.target.value })
                }
              />
            </td>
            <td colSpan={2}>层级</td>
            <td colSpan={2}>
              <Input
                value={lCDJContent.f00014}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00014: e.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>联系方式</td>
            <td colSpan={6}>
              <Input
                value={lCDJContent.f00015}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00015: e.target.value })
                }
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
              <Radio value={1}>基地学员带教老师</Radio>
            </td>
            <td colSpan={2}>
              {/* <Radio value={2}>科生实习生/规培生/进修生带教老师</Radio> */}
            </td>
            <td colSpan={2}>
              {/* <Radio>本科生实习生/规培生/进修生带教老师</Radio> */}
              {/* <Radio value={3}>专科以下实习生/见习生带教老师</Radio> */}
            </td>

            {/* <Radio>专科以下实习生/见习生带教老师</Radio> */}
          </tr>
          <tr style={{ height: "120px" }}>
            <td colSpan={2}>教学培训经历</td>
            <td colSpan={6}>
              <Input
                value={lCDJContent.f00017}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00017: e.target.value })
                }
              />
            </td>
          </tr>
          <tr style={{ height: "120px" }}>
            <td colSpan={2}>院内外授课/授课竞赛/技能竞赛情况</td>
            <td colSpan={6}>
              <Input
                value={lCDJContent.f00018}
                onChange={(e: any) =>
                  setLCDJContent({ ...lCDJContent, f00018: e.target.value })
                }
              />
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
});
const Header = styled.div`
  height: 4opx;
  margin: 5px 10px;
`;
const Footer = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
`;
