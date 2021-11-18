import styled from "styled-components";
import React, { useState, useEffect } from "react";
import User from "src/models/User";
export interface Props {
  baseInfo: User | any;
}
export default function ManualInstructions(props: Props) {
  const { baseInfo } = props;
  return (
    <Wrapper>
      <div className="title">基本信息</div>
      <table>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>{baseInfo.empName}</td>
            <td>性别</td>
            <td>{baseInfo.sex}</td>
            <td>出生年月</td>
            <td>{baseInfo.birthday}</td>
            <td>政治面貌</td>
            <td />
          </tr>
          <tr>
            <td>第一学历</td>
            <td />
            <td>毕业时间</td>
            <td />
            <td>最高学历</td>
            <td />
            <td>毕业时间</td>
            <td />
          </tr>
          <tr>
            <td>职称</td>
            <td>{baseInfo.title}</td>
            <td>职务</td>
            <td>{baseInfo.job}</td>
            <td>参加工作时间</td>
            <td colSpan={3} />
          </tr>
          <tr>
            <td colSpan={8}>
              <span className="bold">晋升情况</span>（职称与层级为非对应状态）
            </td>
          </tr>
          <tr>
            <td>职称</td>
            <td colSpan={2}>晋升时间</td>
            <td>层级</td>
            <td colSpan={4}>晋升时间</td>
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N0级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N1级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N2级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N3级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N4级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N5级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td />
            <td colSpan={2} />
            <td>N6级</td>
            <td colSpan={4} />
          </tr>
          <tr>
            <td colSpan={8}>
              <span className="bold">专科进修或培训经历：</span>
              指参加市级以上专科护士或外出进修一个月以上培训
            </td>
          </tr>
          <tr className="train">
            <td colSpan={3}>1、时间</td>
            <td colSpan={5}>培训内容/地点</td>
          </tr>
          <tr className="train">
            <td colSpan={3}>2、时间： </td>
            <td colSpan={5}>培训内容/地点</td>
          </tr>
          <tr className="train">
            <td colSpan={3}>3、时间：</td>
            <td colSpan={5}>培训内容/地点</td>
          </tr>
          <tr>
            <td colSpan={8} className="bold">
              核心能力晋级考核情况
            </td>
          </tr>
          <tr>
            <td>考核时间</td>
            <td colSpan={3}>考核项目</td>
            <td colSpan={2}>考核部门/考核人</td>
            <td colSpan={2}>考核结论</td>
          </tr>
          <tr>
            <td />
            <td colSpan={3} />
            <td colSpan={2} />
            <td colSpan={2} />
          </tr>
          <tr>
            <td />
            <td colSpan={3} />
            <td colSpan={2} />
            <td colSpan={2} />
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .title {
    font-size: 30px;
    text-align: center;
    font-weight: 600;
    font-family: "黑体" !important;
    margin-bottom: 15px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 32px;
      text-align: center;
    }
    tr {
      td:nth-child(2n-1) {
        font-family: "黑体" !important;
        font-weight: bold;
      }
    }
    .train {
      td {
        text-align: left;
        &:nth-child(2n-1) {
          border-right: none;
        }
        &:nth-child(2n) {
          border-left: none;
        }
      }
    }
  }
  .bold {
    font-family: "黑体" !important;
    font-weight: bold;
  }
`;
