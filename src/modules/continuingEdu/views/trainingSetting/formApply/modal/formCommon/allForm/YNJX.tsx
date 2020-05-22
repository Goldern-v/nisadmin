import styled from "styled-components";
import React from "react";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper } from "../common";

interface Props {}

export default function YNJX(props: Props) {
  return (
    <Wrapper>
      {" "}
      <table>
        <colgroup>
          <col width="7%" />
          <col width="10%" />
          <col width="12%" />
          <col width="12%" />
          <col width="9%" />
          <col width="13%" />
          <col width="14%" />
          <col width="12%" />
          <col width="11%" />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={2}>姓名</td>
            <td>
              <Input />
            </td>
            <td>性别</td>
            <td>
              <Input />
            </td>
            <td>年龄</td>
            <td>
              <Input />
            </td>
            <td>工作年限</td>
            <td>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>参与工作时间</td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>技术职称</td>
            <td colSpan={3}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>目前所在科室</td>
            <td>
              <Input />
            </td>
            <td>入科时间</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td>拟进修时间</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>拟进修起止</td>
            <td colSpan={7}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>进修目的、要求</td>
            <td colSpan={7} style={{ height: "110px" }}>
              <Input />
            </td>
          </tr>
          <tr>
            <td rowSpan={4}>主要工作经历</td>
            <td colSpan={3}>起止年月</td>
            <td colSpan={3}>工作单位名称</td>
            <td colSpan={2}>曾工作科室</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>进修科室意见</td>
            <td colSpan={7} style={{ height: "100px" }}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={1}>进修鉴定评语</td>
            <td colSpan={8} style={{ height: "140px" }}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={1}>进修科室意见</td>
            <td colSpan={8} style={{ height: "140px" }}>
              <Input />
            </td>
          </tr>
          <tr>
            <td colSpan={1}>护理部室意见</td>
            <td colSpan={8} style={{ height: "140px" }}>
              <Input />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}
