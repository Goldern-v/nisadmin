import styled from "styled-components";
import React from "react";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
const RadioGroup = Radio.Group;
interface Props {}

export default function FormApply(props: Props) {
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width="18%" />
          <col width="9%" />
          <col width="14%" />
          <col width="29%" />
          <col width="10%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          <tr>
            <td>科室</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td>年度</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td>专业技术职称</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr>
            <td>获得职称年限</td>
            <td colSpan={2}>
              <Input />
            </td>
            <td>从事本专业工作年限</td>
            <td colSpan={2}>
              <Input />
            </td>
          </tr>
          <tr style={{ height: "130px" }}>
            <td colSpan={6} />
          </tr>
          <tr>
            <td colSpan={2}>申请高风险诊疗技术名称</td>
            <td colSpan={3}>独立完成该项技术操作病例数</td>
            <td>科室是否批准开展</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Input />
            </td>
            <td colSpan={3}>
              <Input />
            </td>
            <td>
              <RadioGroup name="radiogroup" defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>
            </td>
          </tr>
          <tr style={{ height: "130px" }}>
            <td colSpan={6} />
          </tr>
          <tr style={{ height: "140px" }}>
            <td colSpan={6} />
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
  /deep/ .ant-radio-wrapper {
    margin-right: 0 !important;
  }
`;
