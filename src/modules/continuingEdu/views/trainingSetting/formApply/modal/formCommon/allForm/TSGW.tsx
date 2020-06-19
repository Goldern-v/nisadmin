import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react-lite";
import { Select, Input, Radio } from "antd";
import { formApplyModal } from "../../../FormApplyModal"; // 仓库数据
import { Wrapper, SpanMiddle } from "../common";
const Option = Select.Option;

interface Props {}

export default observer(function TSGW(props: Props) {
  const TSGWContent = formApplyModal.TSGWFormContent;
  return (
    <Wrapper>
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
              <Input
                value={TSGWContent.f00005}
                onChange={(e: any) => (TSGWContent.f00005 = e.target.value)}
              />
            </td>
            <td colSpan={2}>年度</td>
            <td colSpan={2}>
              <Input
                value={TSGWContent.f00079}
                onChange={(e: any) => (TSGWContent.f00079 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>
              <Input
                value={TSGWContent.f00001}
                onChange={(e: any) => (TSGWContent.f00001 = e.target.value)}
              />
            </td>
            <td colSpan={2}>专业技术职称</td>
            <td colSpan={2}>
              <Input
                value={TSGWContent.f00007}
                onChange={(e: any) => (TSGWContent.f00007 = e.target.value)}
              />
            </td>
          </tr>
          <tr style={{ height: "40px" }}>
            <td colSpan={2}>拟申请准入专科名称</td>
            <td colSpan={4}>
              <Select
                style={{ width: "100%" }}
                showArrow={false}
                value={TSGWContent.f00116}
                onChange={(val: any) => (TSGWContent.f00116 = val)}
              >
                <Option value="重症监护">重症监护</Option>
                <Option value="新生儿重症监护">新生儿重症监护</Option>
                <Option value="手术室">手术室</Option>
                <Option value="血液透析">血液透析</Option>
                <Option value="消毒供应中心">消毒供应中心</Option>
                <Option value="急诊科">急诊科</Option>
                <Option value="产房">产房</Option>
                <Option value="内镜中心">内镜中心</Option>
                <Option value="静脉配置中心">静脉配置中心</Option>
                <Option value="移植中心">移植中心</Option>
                <Option value="中医护理">中医护理</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>专科准入培训起止时间</td>
            <td colSpan={4}>
              <Input
                value={TSGWContent.f00117}
                onChange={(e: any) => (TSGWContent.f00117 = e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={6} className="textAlign">
              接受专科培训或专科进修经历：
            </td>
          </tr>
          <tr>
            <td>时间</td>
            <td>培训地点</td>
            <td colSpan={2}>培训机构</td>
            <td colSpan={2}>获得证书名称</td>
          </tr>
          {TSGWContent.f00087 &&
            TSGWContent.f00087.map((item: any, index: any) => (
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
                <td colSpan={2}>
                  <Input
                    value={item.f00090}
                    onChange={(e: any) => (item.f00090 = e.target.value)}
                  />
                </td>
                <td colSpan={2}>
                  <Input
                    value={item.f00091}
                    onChange={(e: any) => (item.f00091 = e.target.value)}
                  />
                </td>
              </tr>
            ))}
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
              <Radio.Group
                value={TSGWContent.f00119}
                onChange={(e: any) => (TSGWContent.f00119 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00119}
                onChange={(e: any) => (TSGWContent.f00119 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00119}
                onChange={(e: any) => (TSGWContent.f00119 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00119}
                onChange={(e: any) => (TSGWContent.f00119 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>常见药物及专科药物使用</td>
            <td>
              <Radio.Group
                value={TSGWContent.f00120}
                onChange={(e: any) => (TSGWContent.f00120 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00120}
                onChange={(e: any) => (TSGWContent.f00120 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00120}
                onChange={(e: any) => (TSGWContent.f00120 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00120}
                onChange={(e: any) => (TSGWContent.f00120 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>基础及专科常用护理技术</td>
            <td>
              <Radio.Group
                value={TSGWContent.f00121}
                onChange={(e: any) => (TSGWContent.f00121 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00121}
                onChange={(e: any) => (TSGWContent.f00121 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00121}
                onChange={(e: any) => (TSGWContent.f00121 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00121}
                onChange={(e: any) => (TSGWContent.f00121 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>基础及专科护理评估</td>
            <td>
              <Radio.Group
                value={TSGWContent.f00122}
                onChange={(e: any) => (TSGWContent.f00122 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00122}
                onChange={(e: any) => (TSGWContent.f00122 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00122}
                onChange={(e: any) => (TSGWContent.f00122 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00122}
                onChange={(e: any) => (TSGWContent.f00122 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>护理核心工作制度</td>
            <td>
              <Radio.Group
                value={TSGWContent.f00123}
                onChange={(e: any) => (TSGWContent.f00123 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00123}
                onChange={(e: any) => (TSGWContent.f00123 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00123}
                onChange={(e: any) => (TSGWContent.f00123 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00123}
                onChange={(e: any) => (TSGWContent.f00123 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>一般护理问题的分析与处理能力</td>
            <td>
              <Radio.Group
                value={TSGWContent.f00124}
                onChange={(e: any) => (TSGWContent.f00124 = e.target.value)}
              >
                <Radio value={4} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00124}
                onChange={(e: any) => (TSGWContent.f00124 = e.target.value)}
              >
                <Radio value={3} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00124}
                onChange={(e: any) => (TSGWContent.f00124 = e.target.value)}
              >
                <Radio value={2} />
              </Radio.Group>
            </td>
            <td>
              <Radio.Group
                value={TSGWContent.f00124}
                onChange={(e: any) => (TSGWContent.f00124 = e.target.value)}
              >
                <Radio value={1} />
              </Radio.Group>
            </td>
          </tr>
          <tr style={{ height: "160px" }}>
            <td className="padding" colSpan={6}>
              <div className="vailgnTop">
                <div>科室意见：</div>
                <Input.TextArea
                  rows={4}
                  style={{ width: "100%" }}
                  disabled
                  value={TSGWContent.f00025}
                />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  护士长签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(TSGWContent.f00022)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={TSGWContent.f00026} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
          <tr style={{ height: "160px" }}>
            <td className="padding" colSpan={6}>
              <div className="vailgnTop">
                <div>护理部审核意见：</div>
                <Input.TextArea
                  rows={4}
                  style={{ width: "100%" }}
                  disabled
                  value={TSGWContent.f00050}
                />
              </div>
              <div className="vailgnBottom" style={{ marginTop: "10px" }}>
                <SpanMiddle className="specialInput">
                  签名：
                  <img
                    className="img"
                    src={formApplyModal.signUrl(TSGWContent.f00047)}
                    alt=""
                  />
                </SpanMiddle>
                <SpanMiddle className="specialInput">
                  日期：
                  <Input disabled value={TSGWContent.f00051} />
                </SpanMiddle>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
});
