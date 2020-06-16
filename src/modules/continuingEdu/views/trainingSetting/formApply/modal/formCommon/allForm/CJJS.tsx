import styled from "styled-components";
import React, { useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Select, Input, Radio } from "antd";
import { CJJSWrapper, Span, SpanMiddle, SpanMax, SpanLength } from "../common";

interface Props {}

export default observer(function CJJS(props: Props) {
  const cJJSContent = formApplyModal.CJJSFormContent;

  return (
    <CJJSWrapper>
      <table>
        <colgroup>
          <col width="13%" />
          <col width="87%" />
        </colgroup>
        <tbody>
          <tr style={{ height: "95px" }}>
            <td>护士基本信息</td>
            <td className="vailgnTop">
              <span>
                姓名：
                <Input
                  value={cJJSContent.f00001}
                  onChange={(e: any) => (cJJSContent.f00001 = e.target.value)}
                />
              </span>
              <Span>
                性别：
                <Input
                  style={{ width: "45px" }}
                  value={cJJSContent.f00003_1}
                  onChange={(e: any) => (cJJSContent.f00003_1 = e.target.value)}
                />
              </Span>
              <Span>
                技术职称：
                <Input
                  value={cJJSContent.f00007}
                  onChange={(e: any) => (cJJSContent.f00007 = e.target.value)}
                />
              </Span>
              <Span>
                所在科室：
                <Input
                  style={{ width: "80px" }}
                  value={cJJSContent.f00005}
                  onChange={(e: any) => (cJJSContent.f00005 = e.target.value)}
                />
              </Span>
              <span>
                参加护理工作时间：
                <Input
                  style={{ width: "120px" }}
                  value={cJJSContent.f00006}
                  onChange={(e: any) => (cJJSContent.f00006 = e.target.value)}
                />
              </span>
              <Span>
                专业技术资格及取得时间：
                <Input
                  style={{ width: "120px" }}
                  value={cJJSContent.f00054}
                  onChange={(e: any) => (cJJSContent.f00054 = e.target.value)}
                />
              </Span>
              <br />
              <span>
                最高学历及取得时间：
                <Input
                  style={{ width: "110px" }}
                  value={cJJSContent.f00055}
                  onChange={(e: any) => (cJJSContent.f00055 = e.target.value)}
                />
              </span>
              <Span>
                本院变更注册/首次注册时间：
                <Input
                  style={{ width: "110px" }}
                  value={cJJSContent.f00013}
                  onChange={(e: any) => (cJJSContent.f00013 = e.target.value)}
                />
              </Span>
            </td>
          </tr>
          <tr>
            <td>目前岗位层级资格</td>
            <td className="textAlign">
              <Radio.Group
                style={{ margin: "0 !important" }}
                value={cJJSContent.f00014}
                onChange={(e: any) => (cJJSContent.f00014 = e.target.value)}
              >
                <Radio value="n0">N0</Radio>
                <Radio value="n1">N1</Radio>
                <Radio value="n2">N2</Radio>
                <Radio value="n3">N3</Radio>
                <Radio value="n4">N4</Radio>
                <Radio value="n5">N5</Radio>
                <Radio value="n6">N6</Radio>
              </Radio.Group>
            </td>
          </tr>
          <tr style={{ height: "150px" }}>
            <td>岗位职责完成情况</td>
            <td className="vailgnTop">
              <span>掌握护理岗位职责、护理常规、操作规程及工作标准</span>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00065}
                  onChange={(e: any) => (cJJSContent.f00065 = e.target.value)}
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
                  value={cJJSContent.f00066}
                  onChange={(e: any) => (cJJSContent.f00066 = e.target.value)}
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
                  value={cJJSContent.f00067}
                  onChange={(e: any) =>
                    (cJJSContent.f00067 = Number(e.target.value))
                  }
                />
                例；一级护理患者数量
                <Input
                  style={{ width: "80px" }}
                  value={cJJSContent.f00068}
                  onChange={(e: any) =>
                    (cJJSContent.f00068 = Number(e.target.value))
                  }
                />
                例；二级护理患者数量
                <Input
                  style={{ width: "80px" }}
                  value={cJJSContent.f00069}
                  onChange={(e: any) =>
                    (cJJSContent.f00069 = Number(e.target.value))
                  }
                />
                例<span style={{ fontSize: "8px" }}>（以8小时计算）</span>
              </span>
              <br />
              <span>危重患者护理质量</span>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00070}
                  onChange={(e: any) => (cJJSContent.f00070 = e.target.value)}
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
                  value={cJJSContent.f00071}
                  onChange={(e: any) => (cJJSContent.f00071 = e.target.value)}
                >
                  <Radio value={3}>优秀</Radio>
                  <Radio value={2}>良好</Radio>
                  <Radio value={1}>合格</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "150px" }}>
            <td>专业能力进阶情况</td>
            <td className="vailgnTop">
              <SpanLength>临床教学指导能力</SpanLength>
              <span>带教实习生</span>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00092}
                  onChange={(e: any) => (cJJSContent.f00092 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <SpanMiddle>带教轮科生</SpanMiddle>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00093}
                  onChange={(e: any) => (cJJSContent.f00093 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>
                科室授课
                <Input
                  style={{ width: "40px" }}
                  value={cJJSContent.f00094}
                  onChange={(e: any) =>
                    (cJJSContent.f00094 = Number(e.target.value))
                  }
                />
                次
              </SpanMax>
              <Span>
                院内授课
                <Input
                  style={{ width: "40px" }}
                  value={cJJSContent.f00095}
                  onChange={(e: any) =>
                    (cJJSContent.f00095 = Number(e.target.value))
                  }
                />
                次
              </Span>
              <Span>
                室内或省内授课
                <Input
                  style={{ width: "40px" }}
                  value={cJJSContent.f00096}
                  onChange={(e: any) =>
                    (cJJSContent.f00096 = Number(e.target.value))
                  }
                />
                次
              </Span>
              <br />
              <SpanLength>临床评判思维能力</SpanLength>
              <span>
                书写完整个案
                <Input
                  style={{ width: "30px" }}
                  value={cJJSContent.f00097}
                  onChange={(e: any) =>
                    (cJJSContent.f00097 = Number(e.target.value))
                  }
                />
                例
              </span>
              <Span>
                组织病例讨论
                <Input
                  style={{ width: "30px" }}
                  value={cJJSContent.f00098}
                  onChange={(e: any) =>
                    (cJJSContent.f00098 = Number(e.target.value))
                  }
                />
                例
              </Span>
              <Span>
                组织三级查房
                <Input
                  style={{ width: "30px" }}
                  value={cJJSContent.f00099}
                  onChange={(e: any) =>
                    (cJJSContent.f00099 = Number(e.target.value))
                  }
                />
                例
              </Span>
              <br />
              <SpanLength>护理质量管理能力</SpanLength>
              <span>
                参与科室质控小组：
                <Input
                  style={{ width: "200px" }}
                  value={cJJSContent.f00100}
                  onChange={(e: any) => (cJJSContent.f00100 = e.target.value)}
                />
              </span>
              <SpanMax>
                参与质量改善项目：
                <Input
                  style={{ width: "200px" }}
                  value={cJJSContent.f00101}
                  onChange={(e: any) => (cJJSContent.f00101 = e.target.value)}
                />
              </SpanMax>
              <br />
              <SpanMax>任护理组长</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00102}
                  onChange={(e: any) => (cJJSContent.f00102 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <SpanMax>承担科室二级质控工作</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00103}
                  onChange={(e: any) => (cJJSContent.f00103 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanLength>护理科研能力</SpanLength>
              <span>
                新技术新项目
                <Input
                  style={{ width: "35px" }}
                  value={cJJSContent.f00104}
                  onChange={(e: any) =>
                    (cJJSContent.f00104 = Number(e.target.value))
                  }
                />
                例
              </span>
              <Span>
                发表论文
                <Input
                  style={{ width: "35px" }}
                  value={cJJSContent.f00105}
                  onChange={(e: any) =>
                    (cJJSContent.f00105 = Number(e.target.value))
                  }
                />
                篇
              </Span>
              <Span>
                主持参与课题项目
                <Input
                  style={{ width: "35px" }}
                  value={cJJSContent.f00106}
                  onChange={(e: any) =>
                    (cJJSContent.f00106 = Number(e.target.value))
                  }
                />
                项
              </Span>
              <SpanMax>
                主持或参与循证项目
                <Input
                  style={{ width: "35px" }}
                  value={cJJSContent.f00107}
                  onChange={(e: any) =>
                    (cJJSContent.f00107 = Number(e.target.value))
                  }
                />
                项
              </SpanMax>
              <br />
              <SpanLength>专科护理能力</SpanLength>
              <span>参与护理会诊</span>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00108}
                  onChange={(e: any) => (cJJSContent.f00108 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>参与专科护理门诊</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00109}
                  onChange={(e: any) => (cJJSContent.f00109 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>指导基地专科学员</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00110}
                  onChange={(e: any) => (cJJSContent.f00110 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>专科护士课程培训</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00111}
                  onChange={(e: any) => (cJJSContent.f00111 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>指导专科小组开展工作</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00112}
                  onChange={(e: any) => (cJJSContent.f00112 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>修订本专科护理常规及技术规范，省市创新</SpanMax>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00113}
                  onChange={(e: any) => (cJJSContent.f00113 = e.target.value)}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr>
            <td>拟申请晋级层级</td>
            <td className="textAlign">
              <span>具备能力：</span>
              <Span>
                <Radio.Group
                  value={cJJSContent.f00114}
                  onChange={(e: any) => (cJJSContent.f00114 = e.target.value)}
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
          <tr style={{ height: "70px" }}>
            <td>科室意见</td>
            <td className="noPadding">
              <div className="vailgnTop">
                <span>经科室讨论：</span>
                <Span>
                  <Radio.Group
                    disabled
                    value={cJJSContent.f00024}
                    onChange={(e: any) => (cJJSContent.f00024 = e.target.value)}
                  >
                    <Radio value={1}>延期准入，仍需继续努力</Radio>
                    <Radio value={-1}>同意准入，在科室独立上岗</Radio>
                  </Radio.Group>
                </Span>
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  护长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(cJJSContent.f00022)}
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
          <tr style={{ height: "80px" }}>
            <td>护理部意见</td>
            <td className="noPadding">
              <div className="vailgnTop godie">
                <Input.TextArea style={{ width: "100%" }} disabled />
              </div>
              <div className="vailgnBottom">
                <SpanMiddle className="specialInput">
                  护理部：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(cJJSContent.f00050)}
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
