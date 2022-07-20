import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import moment from "moment";
import SelectBox from "./SelectBox";
import { DatePicker } from 'antd';

export default observer(function ApplicationN1() {

  const [year,setyear] = useState(moment())
  const [yearPickerIsOpen,setyearPickerIsOpen] = useState(false)
  const handleChange = (value:any) =>{
    setyear(value)
    setyearPickerIsOpen(false)
  }
  return (
    <Wrapper>
      <div className="wrapper-pages-form">
        <div className="form-title">
          临床护理人员晋升申请表（N0→N1）（{moment().format("YYYY")}版）
        </div>
        <table>
          <colgroup>
            <col width={160} />
            <col width={160} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
            <tr>
              <td className="title-item" colSpan={4}>
                一、基本信息
              </td>
            </tr>
            <tr>
              <td>
                <div className="base-item">
                  <span>科室：</span>
                  <input type="text" />
                </div>
              </td>
              <td>
                <span>姓名：</span>
                <input type="text" />
              </td>
              <td>
                <span>SAP号码 </span>
                <input type="text" />
              </td>
              <td>
                <span>来院时间：</span>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="base-item">
                  <span>学历：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="dddd"
                    option={["大专", "本科（标准、大专及以上）"]}
                  />
                </div>
              </td>
              <td colSpan={2}>
                <div className="base-item">
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    readonly={false}
                    value="dddd"
                    option={["护士执业证书编号："]}
                  />
                  <input type="text" />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span>职称：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["初级（士）", "初级（师）"]}
                  />
                  <span style={{ marginLeft: 15 }}>
                    （标准：初级（士）及以上）
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} style={{ textAlign: "center" }}>
                二、分层培训
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、N0分层培训手册填写：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["均填写完成", "未填写完整"]}
                  />
                </div>
                <div>（标准：完成相关培训并填写完整）</div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>2、资质认证：</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["CPR资质证", "静脉治疗资质证", "文件书写资质证"]}
                  />
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["夜班资质证（病区）"]}
                  />
                  （标准：获得以上资质证）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>3、三基理论考核： <DatePicker
                          value={year}
                          open={yearPickerIsOpen}
                          mode='year'
                          className='year-picker'
                          placeholder='全部'
                          format='YYYY'
                          onOpenChange={()=>{setyearPickerIsOpen(true)}}
                          onPanelChange={handleChange}
                        />年度</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["合格", "补考合格", "未考核"]}
                  />
                  （标准80分，含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>4、专科理论考核：<DatePicker
                          value={year}
                          open={yearPickerIsOpen}
                          mode='year'
                          className='year-picker'
                          placeholder='全部'
                          format='YYYY'
                          onOpenChange={()=>{setyearPickerIsOpen(true)}}
                          onPanelChange={handleChange}
                        />年度</span>
                  <SelectBox
                    type="checkbox"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["合格", "补考合格", "未考核"]}
                  />
                  （标准60分，含补考合格）
                </div>
              </td>
            </tr>
            <tr>
              <td rowSpan={5} style={{ textAlign: "center" }}>
                三、工作能力
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <span>1、能独立从事一般患者护理工作</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["能", "暂不能"]}
                  />
                （标准：能）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>2、转正后持续工作时间：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["工作时间≥12月", "工作时间≤12月"]}
                  />{" "}
                  （标准：≥12月）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>3、参与临床倒班时间：</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["≥4个月", "＜4个月"]}
                  />{" "}
                  （标准≥4个月）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>4、各类长休假情况： </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["无各长休假假", "4.有各类假等"]}
                  />
                  （原由及累计时间：
                  <input type="text" />）
                  （因孕产连续休假时间≥8个月，或申报晋级前12个月，其他缺勤≥3个月者，不能参加2021年分层晋级）
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="base-item">
                  <span>5、曾获得何种荣誉： </span>
                  <textarea style={{ width: 405 }} />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span className="title-item">四、自我总结</span>
                  （优点及需要改进的地方）
                </div>
                <div style={{ height: 400 }}>
                  <textarea style={{ width: 700, height: 350 }} />
                  <div style={{ marginLeft: 300 }}>
                    <span>申请人签名：</span>
                    <input type="text" />
                    <span>申请日期：</span>
                    <input type="text" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="wrapper-pages-form">
        <table style={{marginTop:20}}>
          <colgroup>
            <col width={160} />
            <col width={160} />
            <col width={180} />
            <col width={700 - 500} />
          </colgroup>
          <tbody>
            <tr>
              <td className="title-item" colSpan={4}>
              五、资质审核
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span style={{marginRight:53}}>1.护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="dddd"
                    option={["合格", "不合格"]}
                  />
                  <span style={{marginLeft:40}}>护士签名：</span>
                  <input type="text" />
                  <span style={{marginLeft:13}}>日期：</span>
                  <input type="text" />
                </div>
                <div className="base-item">
                  <span style={{marginRight:40}}>2.科护长审核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="dddd"
                    option={["合格", "不合格"]}
                  />
                  <span style={{marginLeft:40}}>科护士签名：</span>
                  <input type="text" />
                  <span>日期：</span>
                  <input type="text" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
              六、晋级考核 
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span>1.理论考核：</span>
                  <input type="text" className="border"/> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span>2.床边综合能力考核：</span>
                  <input type="text"  className="border"/> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span>3.读书报告：</span>
                  <input type="text"  className="border"/> 分
                  <span style={{ marginLeft: 40 }}>
                  （标准分60分）  
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
              七、综合评价 
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <div className="base-item">
                  <span style={{ marginRight: 126 }}>1.2021年度无护理服务投诉</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["无", "有"]}
                  />
                  <span >
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 178 }}>2.2021年绩效考核</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["A", "B" , "C或D"]}
                  />
                  <span >
                  （标准分60分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 40 }}>3.2021年无个人原因的III级护理不良事件</span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["无", "有"]}
                  />
                  <span >
                  （标准分3分）  
                  </span>
                </div>
                <div className="base-item">
                  <span style={{ marginRight: 165 }}>4.2021年度学分达标 </span>
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["达标", "不达标"]}
                  />
                  <span >
                  （标准分3分）  
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="title-item" colSpan={4}>
              七、综合评价 
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                科晋级小组
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["同意晋升", "不予晋升"]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input type="text" />
                  <span>审核日期：</span>
                  <input type="text" />
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                护理部
              </td>
              <td colSpan={3}>
                <div className="base-item">
                  <SelectBox
                    type="radio"
                    disabled={false}
                    readonly={false}
                    value="ddsdd"
                    option={["同意晋升", "不予晋升"]}
                  />
                </div>
                <div className="base-item">
                  <span style={{ marginLeft: 165 }}>科护士签名：</span>
                  <input type="text" />
                  <span>审核日期：</span>
                  <input type="text" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="remark">备注：晋级审核请同时提交职称/学历复印件、读书报告（附护士长评语）、床边综合能力考核资料!</div>
        <div className="main-acc">
          <div className="accessory">附件</div>
          <div className="add-accessory">添加附件</div><span>（文件大小不超过5M，支持pdf、word、execl最多上传5份文件）</span>
        </div>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 680px;
  padding: 8px 10px;
  overflow-y: auto;
  .wrapper-pages-form {
    background-color: #fff;
    width: 780px;
    height: 1080px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 0 40px;
    .form-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      height: 60px;
    }
    table {
      tr {
        td {
          border: 1px solid #000;
          line-height: 26px;
          input,
          textarea {
            border: none;
            outline: none;
            resize: none;
            width: 100px;
            overflow: hidden;
            .border{
              border-bottom: 1px solid #000;
            }
          }
        }
      }
    }
    .base-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    .title-item {
      font-weight: bold;
    }
    .remark{
      color: #b3b3b3;
      line-height: 26px;
    }
    .main-acc{
      display: flex;
      align-items: center;
    }
    .accessory{
      color: #000;
      margin-right: 20px;
      display: flex;
      align-items: center;
      ::before{
        content: "";
        display: block;
        height: 20px;
        margin-right: 10px;
        width: 10px;
        background-color: #27ba8b;
      }
    }
    .add-accessory{
      color: #27ba8b;
    }
  }
  .ant-calendar-picker-icon , .ant-calendar-picker-clear{
    display: none;
  }
  .ant-input{
    padding: 0;
    width: 40px !important;
    height: 15px;
    text-align: center;
  }
`;
