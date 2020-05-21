import styled from "styled-components";
import React from "react";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Select, Input, Button, Radio } from "antd";
import { CJJSWrapper, Span } from "./common";

interface Props {}

export default function RYZY(props: Props) {
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
          <tr style={{ height: "110px" }}>
            <td>优质服务</td>
            <td className="vailgnTop">
              <span>以”病人为中心“，人文精神为病人提供的服务</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                  <Radio value="不合格">不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>自我形象</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                  <Radio value="不合格">不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>身体语言的应用</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                  <Radio value="不合格">不合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>沟通协调能力（含投诉、纠纷的应对等）</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                  <Radio value="不合格">不合格</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "135px" }}>
            <td>核心制度与安全目标的落实（以日常观察提问的形式进行评价）</td>
            <td className="vailgnTop">
              <span>查对制度</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="熟练">熟练</Radio>
                  <Radio value="一般">一般</Radio>
                  <Radio value="不熟练">不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>危重患者抢救制度</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="熟练">熟练</Radio>
                  <Radio value="一般">一般</Radio>
                  <Radio value="不熟练">不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>护理交接班制度</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="熟练">熟练</Radio>
                  <Radio value="一般">一般</Radio>
                  <Radio value="不熟练">不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>不良事件报告处理制度</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="熟练">熟练</Radio>
                  <Radio value="一般">一般</Radio>
                  <Radio value="不熟练">不熟练</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>医嘱、护嘱执行制度</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="熟练">熟练</Radio>
                  <Radio value="一般">一般</Radio>
                  <Radio value="不熟练">不熟练</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "160px" }}>
            <td>岗位职责完成情况</td>
            <td className="vailgnTop">
              <span>掌握护理岗位职责、护理常规、操作规程及工作标准</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>正确实施各项治疗护理措施，提供康复和健康指导</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>
                护理危重患者数量
                <Input style={{ width: "80px" }} />
                例；一级护理患者数量
                <Input style={{ width: "80px" }} />
                例；二级护理患者数量
                <Input style={{ width: "80px" }} />例
                <span style={{ fontSize: "8px" }}>（以8小时计算）</span>
              </span>
              <br />
              <span>危重患者护理质量</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>体现在本岗位解决实际问题的能力情况</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀">优秀</Radio>
                  <Radio value="良好">良好</Radio>
                  <Radio value="合格">合格</Radio>
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
                <Radio.Group size="small">
                  <Radio value="优秀90分以上">优秀90分以上</Radio>
                  <Radio value="良好80分以上">良好80分以上</Radio>
                  <Radio value="合格60分以上">合格60分以上</Radio>
                  <Radio value="不合格60分以下">不合格60分以下</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span style={{ display: "inline-block", marginTop: "5px" }}>
                科室技能操作考核：要求基础护理技术及专科操作技术各抽考一项（附考核资料）
              </span>
              <br />
              <span>
                护理技术操作考核名称：基础护理技术
                <Input style={{ width: "100px" }} />
              </span>
              <Span>
                专科操作技术：
                <Input style={{ width: "100px" }} />
              </Span>
              <br />
              <span>考核成绩</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀90分以上">优秀90分以上</Radio>
                  <Radio value="良好80分以上">良好80分以上</Radio>
                  <Radio value="合格60分以上">合格60分以上</Radio>
                  <Radio value="不合格60分以下">不合格60分以下</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
          <tr style={{ height: "85px" }}>
            <td>夜班准入情况及拟申请层级</td>
            <td className="vailgnTop">
              <span>夜班准入考核情况（附考评表）：</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="通过">通过</Radio>
                  <Radio value="不适用">不适用</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>考核成绩：</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="优秀90分以上">优秀90分以上</Radio>
                  <Radio value="良好80分以上">良好80分以上</Radio>
                  <Radio value="合格60分以上">合格60分以上</Radio>
                </Radio.Group>
              </Span>
              <br />
              <span>具备以下层级的能力：</span>
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
          <tr style={{ height: "90px" }}>
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
          <tr style={{ height: "90px" }}>
            <td>护理部意见意见</td>
            <td className="vailgnTop">
              <span>经护理部讨论：</span>
              <Span>
                <Radio.Group size="small">
                  <Radio value="通过">延期准入，仍需继续努力</Radio>
                  <Radio value="不适用">同意准入，在科室独立上岗</Radio>
                </Radio.Group>
              </Span>
            </td>
          </tr>
        </tbody>
      </table>
    </CJJSWrapper>
  );
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: red;
`;
