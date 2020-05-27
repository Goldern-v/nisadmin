import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Input, Button, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle } from "../common";

interface Props {}

export default observer(function RYZZ(props: Props) {
  const RYZZLContent = formApplyModal.RYZZFormContent;

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
              <Input
                value={RYZZLContent.f00005}
                onChange={(e: any) => (RYZZLContent.f00005 = e.target.value)}
              />
            </td>
            <td>年度</td>
            <td>
              <Input
                value={RYZZLContent.f00079}
                onChange={(e: any) =>
                  (RYZZLContent.f00079 = Number(e.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <Input
                value={RYZZLContent.f00001}
                onChange={(e: any) => (RYZZLContent.f00001 = e.target.value)}
              />
            </td>
            <td>专业技术职称</td>
            <td>
              <Input
                value={RYZZLContent.f00007}
                onChange={(e: any) => (RYZZLContent.f00007 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>获取职称年限</td>
            <td>
              <Input
                value={RYZZLContent.f00080}
                onChange={(e: any) =>
                  (RYZZLContent.f00080 = Number(e.target.value))
                }
              />
            </td>
            <td>从事本专业工作年限</td>
            <td>
              <Input
                value={RYZZLContent.f00081}
                onChange={(e: any) =>
                  (RYZZLContent.f00081 = Number(e.target.value))
                }
              />
            </td>
          </tr>
          <tr style={{ height: "180px" }}>
            <td colSpan={4} className="vailgnTop">
              <div>专科工作经历：</div>
              <Input.TextArea
                rows={6}
                style={{ width: "100%" }}
                value={RYZZLContent.f00086}
                onChange={(e: any) => (RYZZLContent.f00086 = e.target.value)}
              />
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
          {RYZZLContent.f00087 &&
            RYZZLContent.f00087.map((item: any, index: any) => (
              <tr key={index}>
                <td>
                  <Input
                    value={item.f00088}
                    onChange={(e: any) => (item.f00088 = e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={item.f00089}
                    onChange={(e: any) => (item.f00089 = e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={item.f00090}
                    onChange={(e: any) => (item.f00090 = e.target.value)}
                  />
                </td>
                <td>
                  <Input
                    value={item.f00091}
                    onChange={(e: any) => (item.f00091 = e.target.value)}
                  />
                </td>
              </tr>
            ))}
          <tr style={{ height: "200px" }}>
            <td className="padding" colSpan={4}>
              <div className="vailgnTop">
                <div>科室意见：</div>
                <Input.TextArea rows={6} style={{ width: "100%" }} disabled />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  护士长签名：
                  <Input disabled />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "250px" }}>
            <td className="padding" colSpan={4}>
              <div className="vailgnTop">
                <div>护理部审核意见：</div>
                <Input.TextArea rows={8} style={{ width: "100%" }} disabled />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  签名：
                  <Input disabled />
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
    </Wrapper>
  );
});
