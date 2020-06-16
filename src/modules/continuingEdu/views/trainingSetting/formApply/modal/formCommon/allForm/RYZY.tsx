import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Input, Radio } from "antd";
import { CJJSWrapper, Span, SpanMiddle } from "../common";

interface Props {}

export default observer(function RYZY(props: Props) {
  const rYZYContent = formApplyModal.RYZYFormContent;

  return (
    <CJJSWrapper>
      <table>
        <colgroup>
          <col width="13%" />
          <col width="87%" />
        </colgroup>
        <tbody>
          <tr style={{ height: "90px" }}>
            <td>护士基本信息</td>
            <td className="vailgnTop">
              <span>
                姓名：
                <Input
                  value={rYZYContent.f00001}
                  onChange={(e: any) => (rYZYContent.f00001 = e.target.value)}
                />
              </span>
              <Span>
                性别：
                <Input
                  style={{ width: "45px" }}
                  value={rYZYContent.f00003_1}
                  onChange={(e: any) => (rYZYContent.f00003_1 = e.target.value)}
                />
              </Span>
              <Span>
                技术职称：
                <Input
                  value={rYZYContent.f00007}
                  onChange={(e: any) => (rYZYContent.f00007 = e.target.value)}
                />
              </Span>
              <Span>
                所在科室：
                <Input
                  style={{ width: "80px" }}
                  value={rYZYContent.f00005}
                  onChange={(e: any) => (rYZYContent.f00005 = e.target.value)}
                />
              </Span>
              <span>
                参加护理工作时间：
                <Input
                  style={{ width: "120px" }}
                  value={rYZYContent.f00006}
                  onChange={(e: any) => (rYZYContent.f00006 = e.target.value)}
                />
              </span>
              <Span>
                专业技术资格及取得时间：
                <Input
                  style={{ width: "120px" }}
                  value={rYZYContent.f00054}
                  onChange={(e: any) => (rYZYContent.f00054 = e.target.value)}
                />
              </Span>
              <br />
              <span>
                最高学历及取得时间：
                <Input
                  style={{ width: "110px" }}
                  value={rYZYContent.f00055}
                  onChange={(e: any) => (rYZYContent.f00055 = e.target.value)}
                />
              </span>
              <Span>
                本院变更注册/首次注册时间：
                <Input
                  style={{ width: "110px" }}
                  value={rYZYContent.f00013}
                  onChange={(e: any) => (rYZYContent.f00013 = e.target.value)}
                />
              </Span>
            </td>
          </tr>
          <tr style={{ height: "110px" }}>
            <td>优质服务</td>
            <td className="vailgnTop">
              <span>以”病人为中心“，人文精神为病人提供的服务</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00056}
                  onChange={(e: any) => (rYZYContent.f00056 = e.target.value)}
                >
                  <Radio value={4}>优秀</Radio>
                  <Radio value={3}>良好</Radio>
                  <Radio value={2}>合格</Radio>
                  <Radio value={1}>不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>自我形象</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00057}
                  onChange={(e: any) => (rYZYContent.f00057 = e.target.value)}
                >
                  <Radio value={4}>优秀</Radio>
                  <Radio value={3}>良好</Radio>
                  <Radio value={2}>合格</Radio>
                  <Radio value={1}>不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>身体语言的应用</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00058}
                  onChange={(e: any) => (rYZYContent.f00058 = e.target.value)}
                >
                  <Radio value={4}>优秀</Radio>
                  <Radio value={3}>良好</Radio>
                  <Radio value={2}>合格</Radio>
                  <Radio value={1}>不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>沟通协调能力（含投诉、纠纷的应对等）</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00059}
                  onChange={(e: any) => (rYZYContent.f00059 = e.target.value)}
                >
                  <Radio value={4}>优秀</Radio>
                  <Radio value={3}>良好</Radio>
                  <Radio value={2}>合格</Radio>
                  <Radio value={1}>不合格</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "135px" }}>
            <td>核心制度与安全目标的落实（以日常观察提问的形式进行评价）</td>
            <td className="vailgnTop">
              <span>查对制度</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00060}
                  onChange={(e: any) => (rYZYContent.f00060 = e.target.value)}
                >
                  <Radio value={3}>熟练</Radio>
                  <Radio value={2}>一般</Radio>
                  <Radio value={1}>不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>危重患者抢救制度</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00061}
                  onChange={(e: any) => (rYZYContent.f00061 = e.target.value)}
                >
                  <Radio value={3}>熟练</Radio>
                  <Radio value={2}>一般</Radio>
                  <Radio value={1}>不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>护理交接班制度</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00062}
                  onChange={(e: any) => (rYZYContent.f00062 = e.target.value)}
                >
                  <Radio value={3}>熟练</Radio>
                  <Radio value={2}>一般</Radio>
                  <Radio value={1}>不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>不良事件报告处理制度</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00063}
                  onChange={(e: any) => (rYZYContent.f00063 = e.target.value)}
                >
                  <Radio value={3}>熟练</Radio>
                  <Radio value={2}>一般</Radio>
                  <Radio value={1}>不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>医嘱、护嘱执行制度</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00064}
                  onChange={(e: any) => (rYZYContent.f00064 = e.target.value)}
                >
                  <Radio value={3}>熟练</Radio>
                  <Radio value={2}>一般</Radio>
                  <Radio value={1}>不熟练</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "155px" }}>
            <td>岗位职责完成情况</td>
            <td className="vailgnTop">
              <span>掌握护理岗位职责、护理常规、操作规程及工作标准</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00065}
                  onChange={(e: any) => (rYZYContent.f00065 = e.target.value)}
                >
                  <Radio value={3}>优秀</Radio>
                  <Radio value={2}>良好</Radio>
                  <Radio value={1}>合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>正确实施各项治疗护理措施，提供康复和健康指导</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00066}
                  onChange={(e: any) => (rYZYContent.f00066 = e.target.value)}
                >
                  <Radio value={3}>优秀</Radio>
                  <Radio value={2}>良好</Radio>
                  <Radio value={1}>合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>
                护理危重患者数量
                <Input
                  style={{ width: "80px" }}
                  value={rYZYContent.f00067}
                  onChange={(e: any) =>
                    (rYZYContent.f00067 = Number(e.target.value))
                  }
                />
                例；一级护理患者数量
                <Input
                  style={{ width: "80px" }}
                  value={rYZYContent.f00068}
                  onChange={(e: any) =>
                    (rYZYContent.f00068 = Number(e.target.value))
                  }
                />
                例；二级护理患者数量
                <Input
                  style={{ width: "80px" }}
                  value={rYZYContent.f00069}
                  onChange={(e: any) =>
                    (rYZYContent.f00069 = Number(e.target.value))
                  }
                />
                例<span style={{ fontSize: "8px" }}>（以8小时计算）</span>
              </span>
              <br />
              <span>危重患者护理质量</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00070}
                  onChange={(e: any) => (rYZYContent.f00070 = e.target.value)}
                >
                  <Radio value={3}>优秀</Radio>
                  <Radio value={2}>良好</Radio>
                  <Radio value={1}>合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>体现在本岗位解决实际问题的能力情况</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00071}
                  onChange={(e: any) => (rYZYContent.f00071 = e.target.value)}
                >
                  <Radio value={3}>优秀</Radio>
                  <Radio value={2}>良好</Radio>
                  <Radio value={1}>合格</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "130px" }}>
            <td>业务水平能力考核情况</td>
            <td className="vailgnTop">
              <span>
                科室理论考试内容：符合科室层级培训岗位职责评价要求（附考核试卷）
              </span>
              <br />
              <span>考核成绩</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00072}
                  onChange={(e: any) => (rYZYContent.f00072 = e.target.value)}
                >
                  <Radio value={4}>优秀90分以上</Radio>
                  <Radio value={3}>良好80分以上</Radio>
                  <Radio value={2}>合格60分以上</Radio>
                  <Radio value={1}>不合格60分以下</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span style={{ display: "inline-block", marginTop: "5px" }}>
                科室技能操作考核：要求基础护理技术及专科操作技术各抽考一项（附考核资料）
              </span>
              <br />
              <span>
                护理技术操作考核名称：基础护理技术
                <Input
                  style={{ width: "100px" }}
                  value={rYZYContent.f00073}
                  onChange={(e: any) => (rYZYContent.f00073 = e.target.value)}
                />
              </span>
              <Span>
                专科操作技术：
                <Input
                  style={{ width: "100px" }}
                  value={rYZYContent.f00074}
                  onChange={(e: any) => (rYZYContent.f00074 = e.target.value)}
                />
              </Span>
              <br />
              <span>考核成绩</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00075}
                  onChange={(e: any) => (rYZYContent.f00075 = e.target.value)}
                >
                  <Radio value={4}>优秀90分以上</Radio>
                  <Radio value={3}>良好80分以上</Radio>
                  <Radio value={2}>合格60分以上</Radio>
                  <Radio value={1}>不合格60分以下</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "85px" }}>
            <td>夜班准入情况及拟申请层级</td>
            <td className="vailgnTop">
              <span>夜班准入考核情况（附考评表）：</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00076}
                  onChange={(e: any) => (rYZYContent.f00076 = e.target.value)}
                >
                  <Radio value={1}>通过</Radio>
                  <Radio value={-1}>不适用</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>考核成绩：</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00077}
                  onChange={(e: any) => (rYZYContent.f00077 = e.target.value)}
                >
                  <Radio value={3}>优秀90分以上</Radio>
                  <Radio value={2}>良好80分以上</Radio>
                  <Radio value={1}>合格60分以上</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>具备以下层级的能力：</span>
              <Span>
                <Radio.Group
                  value={rYZYContent.f00078}
                  onChange={(e: any) => (rYZYContent.f00078 = e.target.value)}
                >
                  <Radio value="n0">N0</Radio>
                  <Radio value="n1">N1</Radio>
                  <Radio value="n2">N2</Radio>
                  <Radio value="n3">N3</Radio>
                  <Radio value="n4">N4</Radio>
                  <Radio value="n5">N5</Radio>
                  <Radio value="n6">N6</Radio>
                </Radio.Group>
              </Span>

              <br />
            </td>
          </tr>
          <tr style={{ height: "90px" }}>
            <td>科室意见</td>
            <td className="noPadding">
              <div className="vailgnTop">
                <span>经科室讨论：</span>
                <Span>
                  <Radio.Group
                    disabled
                    value={rYZYContent.f00024}
                    onChange={(e: any) => (rYZYContent.f00024 = e.target.value)}
                  >
                    <Radio value={1}>延期准入，仍需继续努力</Radio>
                    <Radio value={-1}>同意准入，在科室独立上岗</Radio>
                  </Radio.Group>
                </Span>
              </div>
              <div className="vailgnBottom marginTop">
                <SpanMiddle className="specialInput">
                  护长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(rYZYContent.f00022)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "90px" }}>
            <td>护理部意见意见</td>
            <td className="noPadding">
              <div className="vailgnTop">
                <span>经护理部讨论：</span>
                <Span>
                  <Radio.Group
                    disabled
                    value={rYZYContent.f00049}
                    onChange={(e: any) => (rYZYContent.f00049 = e.target.value)}
                  >
                    <Radio value={1}>延期准入，仍需继续努力</Radio>
                    <Radio value={-1}>同意准入，在科室独立上岗</Radio>
                  </Radio.Group>
                </Span>
              </div>
              <div className="vailgnBottom marginTop">
                <SpanMiddle className="specialInput">
                  护理部：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(rYZYContent.f00047)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled />
                </SpanMiddle>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CJJSWrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: red;
`;
