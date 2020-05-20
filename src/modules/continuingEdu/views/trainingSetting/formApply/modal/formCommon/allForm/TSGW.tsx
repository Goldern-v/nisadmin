import styled from "styled-components";
import React from "react";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据

interface Props {}

export default function TSGW(props: Props) {
  return (
    <Wrapper>
      {" "}
      <table>
        <colgroup>
          <col width="18%" />
          <col width="22%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <tbody>
          <tr>
            <td>科室</td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>年度</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>专业技术职称</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "80px" }}>
            <td colSpan={2}>拟申请准入专科名称</td>
            <td colSpan={4}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>专科准入培训起止时间</td>
            <td colSpan={4}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>接受专科培训或专科进修经历</td>
            <td colSpan={4}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>时间</td>
            <td>培训地点</td>
            <td colSpan={2}>培训机构</td>
            <td colSpan={2}>获得证书名称</td>
          </tr>
          <tr>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={6} style={{ textAlign: "left" }}>
              准入考核情况
              <span style={{ color: "red" }}>
                （以下由科室及护理部进行填写）
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>专科项目</td>
            <td>熟练掌握</td>
            <td>掌握</td>
            <td>一般</td>
            <td>不熟练</td>
          </tr>
          <tr>
            <td colSpan={2}>专科常见疾病护理常规</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>常见药物及专科药物使用</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>基础及专科常用护理技术</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>基础及专科护理评估</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>护理核心工作制度</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>一般护理问题的分析与处理能力</td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={6} style={{ height: "140px" }}>
              科室意见
            </td>
          </tr>
          <tr>
            <td colSpan={6} style={{ height: "140px" }}>
              护理部意见
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid #000;
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
  /deep/.ant-input {
    border: none;
    height: 100%;
    word-break: break-all;
    word-wrap: break-word;
  }
  /deep/.ant-input:focus {
    border: none;
    box-shadow: none;
  }
`;
