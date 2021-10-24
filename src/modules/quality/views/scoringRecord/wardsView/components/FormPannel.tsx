import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Input, Checkbox, message } from 'antd'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'


// export interface Props { }

export default observer(function FormPannel() {
  const [form, setForm]: any = useState({})
  const setFormItem = (item: object) => {
    const keys = ['SR0004001', 'SR0001011', 'SR0001013', 'SR0001015', 'SR0001017']
    const sum = keys.reduce((acc: number, cur: string) => {
      const val = form[cur]
      const valNum = isNaN(+val) ? 0 : +val
      return acc + valNum
    }, 0)
    setForm({ ...form, ...item, 'SR0001019': sum })
  }

  // useEffect(() => {
  // }, [])
  return <MainWrapper>
    <div style={{ overflow: 'auto', height: '100%' }}>
      <div className='table-wrapper'>
        <div className='table-title'>
          护士长班查房评分表
        </div>
        <table>
          {/* <colgroup>
            <col/>
            <col/>
            <col/>
            <col/>
            <col/>
            <col/>
          </colgroup> */}
          <tbody>
            <tr>
              <td>查房护士长：</td>
              <td>
                <Input.TextArea
                  value={form.SR0004001}
                  onChange={(e) =>
                    setFormItem({ 'SR0004001': e.target.value })
                  }
                />
                {/* <Input
                  value={form.SR0001001}
                  onChange={(e) =>
                    setFormItem({ 'SR0001001': e.target.value })
                  }
                  /> */}
              </td>
              <td>查房班次:</td>
              <td>
                <Input.TextArea
                  value={form.SR0004002}
                  onChange={(e) =>
                    setFormItem({ 'SR0004002': e.target.value })
                  }
                />
              </td>
              <td>查房时间:</td>
              <td>
                <Input.TextArea
                  value={form.SR0004003}
                  onChange={(e) =>
                    setFormItem({ 'SR0004003': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>病区:</td>
              <td>
                <Input.TextArea
                  value={form.SR0004004}
                  onChange={(e) =>
                    setFormItem({ 'SR0004004': e.target.value })
                  }
                />
              </td>
              <td>一级护理:</td>
              <td>
                <Input.TextArea
                  value={form.SR0004005}
                  onChange={(e) =>
                    setFormItem({ 'SR0004005': e.target.value })
                  }
                />
              </td>
              <td>病人数：</td>
              <td>
                <Input.TextArea
                  value={form.SR0004006}
                  onChange={(e) =>
                    setFormItem({ 'SR0004006': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>值班护士：</td>
              <td>
                <Input.TextArea
                  value={form.SR0004007}
                  onChange={(e) =>
                    setFormItem({ 'SR0004007': e.target.value })
                  }
                />
              </td>
              <td>特级护理:</td>
              <td>
                <Input.TextArea
                  value={form.SR0004008}
                  onChange={(e) =>
                    setFormItem({ 'SR0004008': e.target.value })
                  }
                />
              </td>
              <td>陪护数：</td>
              <td>
                <Input
                  value={form.SR0004009}
                  onChange={(e) =>
                    setFormItem({ 'SR0004009': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td colSpan={6}>查房标准</td>
            </tr>
            <tr>
              <td>查房类型</td>
              <td colSpan={3}>查房内容</td>
              <td>存在问题</td>
              <td>得分</td>
            </tr>
            <tr>
              <td>护理单元(15分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、护士坚守岗位，无自行换班情况。</p>
                <p>2、护士着装整洁、佩戴胸牌、头花、服务热情。</p>	
                <p>3、病房地面、盥洗间及卫生间清洁，无垃圾。</p>
                <p>4、治疗室、办公室、处置室整洁，物品放置规范。</p>
                <p>5、饮水机、微波炉等清洁、无污垢。 </p>
                <p>6、规范使用氧气瓶，标识完整</p>
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004010}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004010': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004011}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004011': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>危重、一及术后患者护理(9分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、床单位整洁。</p>
                <p>2、患者三短六洁	。</p>	
                <p>3、导管护理符合规范	。</p>
                <p>4、跌倒、压疮、VTE预防及护理符合规范，翻身卡按要求填写。</p>
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004012}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004012': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004013}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004013': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>护士操作(24分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、随机查看护士是否按规范操作。</p>
                <p>2、操作过程中严格执行手卫生。</p>	
                <p>3、有无实习护生单独操作	。</p>
                <p>4、按要求使用PDA。</p>
                <p>5、查看病人输液有无渗漏。 </p>
                <p>6、询问病人护士有无及时巡视。</p>
              </td>	
              <td>
                <Input.TextArea
                  value={form.SR0004014}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004014': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004015}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004015': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>医院感染(24分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、医疗垃圾、生活垃圾分类放置，记录正确有签名，大垃圾桶上锁。</p>
                <p>2、液体标明开启日期、时间及用途	。</p>	
                <p>3、一次性物品开启后注明日期、时间及开启人姓名。</p>
                <p>4、治疗车清洁，清洁物品和污染物品分开放置。</p>
                <p>5、多重耐药菌管理规范。 </p>
                <p>6、消毒隔离工作落实到位（如：瓶装碘伏开启后密闭保存，有效期≤30天；溶媒有效期≤24h，静脉用药有效期≤2h；湿化瓶定期更换）。</p>
              </td>	
              <td>
                <Input.TextArea
                  value={form.SR0004016}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004016': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004017}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004017': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>急救药品、物品(8分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、抢救车、抢救仪器完好，处于备用状态。</p>
                <p>2、抢救药品、物品登记本填写规范。</p>	
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004018}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004018': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004019}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004019': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>药品管理(20分)</td>
              <td colSpan={3} className='text-left'>
                <p>1、高危药品单独放置。</p>
                <p>2、药品标签清楚、无过期、变质、裸放、混放等。</p>	
                <p>3、内服、外用药分开放置。</p>
                <p>4、冰箱内无药物混放。</p>
                <p>5、药物使用符合规范（避光、冷藏等）。</p>
                <p>6、规范使用氧气瓶，标识完整</p>
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004020}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004020': e.target.value })
                  }
                />
              </td>
              <td>
                <Input.TextArea
                  value={form.SR0004021}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004021': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>总分</td>
              <td colSpan={5}>
                <Input
                  value={form.SR0004022}
                  onChange={(e) =>
                    setFormItem({ 'SR0004022': e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>片区护士长意见</td>
              <td colSpan={5}>
                <Input.TextArea
                  value={form.SR0004023}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004023': e.target.value })
                  }
                  />
              </td>
            </tr>
            <tr>
              <td>病区整改</td>
              <td colSpan={5}>
                <Input.TextArea
                  value={form.SR0004024}
                  rows={6}
                  onChange={(e) =>
                    setFormItem({ 'SR0004024': e.target.value })
                  }
                  />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </MainWrapper>
  })
// const Wrapper = styled.div`
//   .master-area{
//     margin-top: 10px;
//     min-height: 138px;
//     line-height: 24px;
//     padding: 10px 20px;
//     background-color: #f2f2f2;
//     font-size: 14px;
//     .item{
//       width: 50%;
//       margin: 5px 0;
//       display: inline-block;
//       &>div{
//         display: inline-block;
//       }
//       .label{
//         width: 90px;

//       }
//       .content{
//         width: 200px;
//         &>*{
//           width:100%;
//         }
//         &.error{
//           input,.ant-select-selection{
//             border-color: red;
//           }
//           .ant-input:focus,.ant-select-open .ant-select-selection{
//             border-right-width: 1px !important;
//             outline: 0;
//             box-shadow: 0 0 0 2px rgba(255, 166, 128, 0.2);
//           }

//         }
//       }
//     }
//   }
// `
const MainWrapper = styled.div`
   height: calc(100% - 50px);
   position: relative;
   
   .table-wrapper{
      /* background: #fff;
      min-height: 100%;
      width: 50%;
      margin: 0 auto;
      padding: 30px 50px 80px; */
      
      
      .table-title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      table{
        border-collapse: collapse;
        border-color: #000;
        width: 100%;
        table-layout: fixed;
        tr {
          width: 100%;
        }
        td{
          border: 1px #000 solid;
          line-height: 24px;
          min-height: 24px;
          text-align: center;
          input{
            border: none;
          }
          p{
            line-height: 24px;
            margin: 0;
          }
        }
        .text-left{
          text-align:left;
        }
      }
   }
   
   
   /* .audit-wrapper{
      position: absolute;
      height: 100%;
      width: 250px;
      background: #fff;
      top: 0;
      right: 0;
      padding: 20px 20px;
      overflow: auto;
      
      .audit-title{
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .timeline-item{
        line-height:22px;
      }
   } */
`