import styled from "styled-components";
import React from "react";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Select, Input, Button, Radio } from "antd";
import { CJJSWrapper, Span, SpanMiddle, SpanMax, SpanLength } from "../common";

interface Props {}

export default function CJJS(props: Props) {
  return (
    <CJJSWrapper>
      <table>
        <colgroup>
          <col width="13%" />
          <col width="87%" />
        </colgroup>
        <tbody>
          <tr style={{ height: "105px" }}>
            <td>护士基本信息</td>
            <td className="vailgnTop">
              <span>
                姓名：
                <Input />
              </span>
              <Span>
                性别：
                <Input style={{ width: "45px" }} />
              </Span>
              <Span>
                技术职称：
                <Input />
              </Span>
              <Span>
                所在科室：
                <Input style={{ width: "80px" }} />
              </Span>
              <span>
                参加护理工作时间：
                <Input style={{ width: "120px" }} />
              </span>
              <Span>
                专业技术资格及取消时间：
                <Input style={{ width: "120px" }} />
              </Span>
              <br />
              <span>
                最高学历及取得时间：
                <Input style={{ width: "110px" }} />
              </span>
              <Span>
                本院变更注册/首次注册时间：
                <Input style={{ width: "110px" }} />
              </Span>
            </td>
          </tr>
          <tr>
            <td>目前岗位层级资格</td>
            <td className="textAlign">
              <Radio.Group style={{ margin: "0 !important" }}>
                <Radio value="N0">N0</Radio>
                <Radio value="N1">N1</Radio>
                <Radio value="N2">N2</Radio>
                <Radio value="N3">N3</Radio>
                <Radio value="N4">N4</Radio>
                <Radio value="N5">N5</Radio>
                <Radio value="N6">N6</Radio>
              </Radio.Group>
            </td>
          </tr>

          <tr style={{ height: "160px" }}>
            <td>专业能力进阶情况</td>
            <td className="vailgnTop">
              <SpanLength>临床教学指导能力</SpanLength>
              <span>带教实习生</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <SpanMiddle>带教轮科生</SpanMiddle>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>
                科室授课
                <Input style={{ width: "40px" }} />次
              </SpanMax>
              <Span>
                院内授课
                <Input style={{ width: "40px" }} />次
              </Span>
              <Span>
                室内或省内授课
                <Input style={{ width: "40px" }} />次
              </Span>
              <br />
              <SpanLength>临床评判思维能力</SpanLength>
              <span>
                书写完整个案
                <Input style={{ width: "30px" }} />例
              </span>
              <Span>
                组织病例讨论
                <Input style={{ width: "30px" }} />例
              </Span>
              <Span>
                组织三级查房
                <Input style={{ width: "30px" }} />例
              </Span>
              <br />
              <SpanLength>护理质量管理能力</SpanLength>
              <span>
                参与科室质控小组：
                <Input style={{ width: "200px" }} />
              </span>
              <SpanMax>
                参与质量改善项目：
                <Input style={{ width: "200px" }} />
              </SpanMax>
              <br />
              <SpanMax>任护理组长</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <SpanMax>承担科室二级质控工作</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanLength>护理科研能力</SpanLength>
              <span>
                新技术新项目
                <Input style={{ width: "35px" }} />例
              </span>
              <Span>
                发表论文
                <Input style={{ width: "35px" }} />篇
              </Span>
              <Span>
                主持参与课题项目
                <Input style={{ width: "35px" }} />项
              </Span>
              <SpanMax>
                主持或参与循证项目
                <Input style={{ width: "35px" }} />项
              </SpanMax>
              <br />
              <SpanLength>专科护理能力</SpanLength>
              <span style={{ marginTop: "3px" }}>参与护理会诊</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>参与专科护理门诊</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>指导基地专科学员</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>专科护士课程培训</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>指导专科小组开展工作</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
              <br />
              <SpanMax>修订本专科护理常规及技术规范，省市创新</SpanMax>
              <Span>
                <Radio.Group size="small">
                  <Radio value="是">是</Radio>
                  <Radio value="否">否</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr>
            <td>拟申请晋级层级</td>
            <td className="textAlign">
              <span>具备能力：</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="N0">N0</Radio>
                  <Radio value="N1">N1</Radio>
                  <Radio value="N2">N2</Radio>
                  <Radio value="N3">N3</Radio>
                  <Radio value="N4">N4</Radio>
                  <Radio value="N5">N5</Radio>
                  <Radio value="N6">N6</Radio>
                </Radio.Group>
              </Span>
              <br />
            </td>
          </tr>
          <tr style={{ height: "140px" }}>
            <td>科室意见</td>
            <td className="vailgnTop">
              <span>经科室讨论：</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="通过">延期准入，仍需继续努力</Radio>
                  <Radio value="不适用">同意准入，在科室独立上岗</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "160px" }}>
            <td>护理部意见意见</td>
            <td className="vailgnTop" />
          </tr>
        </tbody>
      </table>
    </CJJSWrapper>
  );
}
