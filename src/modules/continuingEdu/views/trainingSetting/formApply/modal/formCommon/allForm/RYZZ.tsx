import styled from "styled-components";
import React from "react";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper } from "../common";

interface Props {}

export default function RYZZ(props: Props) {
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width="22%" />
          <col width="26%" />
          <col width="26%" />
          <col width="26%" />
        </colgroup>
        <tbody>
          <tr>
            <td>科室</td>
            <td>
              <Input />
            </td>
            <td>年度</td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <Input />
            </td>
            <td>专业技术职称</td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td>获取职称年限</td>
            <td>
              <Input />
            </td>
            <td>从事本专业工作年限</td>
            <td>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "180px" }}>
            <td colSpan={4}>
              <div style={{ textAlign: "left" }}>专科工作经历：</div>
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{ textAlign: "left" }}>
              接受的相关技术培训和进修经历：
            </td>
          </tr>
          <tr>
            <td>时间</td>
            <td>培训地点</td>
            <td>培训机构</td>
            <td>获得资质</td>
          </tr>
          <tr>
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
          <tr style={{ height: "200px" }}>
            <td colSpan={4}>
              <div style={{ textAlign: "left" }}>科室意见</div>
            </td>
          </tr>
          <tr style={{ height: "250px" }}>
            <td colSpan={4}>
              <div style={{ textAlign: "left" }}>护理部审核意见</div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}
