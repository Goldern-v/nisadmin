import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
export interface Props {}

export default function TwoPage() {
  return (
    <Wrapper>
      <div className='title'>填表说明</div>
      <div className='text-con'>
        1、目前暂时填写电子格式，要求填写内容真实可靠。
        <br />
        2、护理人员基本情况登记表，不要改动格式；接受过特殊岗位培训人员应提
        <br />
        <div className='indent'>供相应培训证书（急诊、供应、透析等）复印件。</div>
        3、有关时间填写：填年度4位、月份、日2位，如：1980年7月5日填
        <br />
        <div className='indent'>“1980.07.05”，其中出生日期、聘用日期、毕业时间等均以证件或证书上的</div>
        <div className='indent'>时间为准。</div>
        4、医学学历教育：填写顺序按照由远到近的顺序填写，比如先填写中专，再
        <br />
        <div className='indent'>填写大专、本科阶段的教育经历；</div>
        5、职称及层级变动：职称变动以人事科下发的职称聘用证明为准，层级变动
        <div className='indent'>以通过护理部下发的厚街医院护理人员执业准入资格备案表登记为准。</div>
        6、继续教育：从进入本院工作之日起，学习时间超过7天的需进行登记填写，
        <div className='indent'>学习形式包括院外进修、短期培训、院内轮转、网上学习。学术会议、进修、</div>
        培训记录详细填写时间、培训单位、内容及学时。按时间顺序由近到远填写，
        <br />
        <div className='indent'>没有可不填。</div>
        7、论文、著作、科研登记表、创造发明、科研成果、科技进步、工作获奖情况
        <br />
        <div className='indent'>如实填写，没有可不填。</div>
        8、临床护理工作情况登记表需如实填写，填写后由科室护长核实签名，所登记项目佐
        <div className='indent'>证材料需妥善保管，以便查实。</div>
      </div>
      <div className='title-1'>附件</div>
      <div className='text-con'>
        <div className='indent-1'>1、身份证复印件</div>
        <div className='indent-1'>2、学历毕业证复印件（含第一学历至最高学历）</div>
        <div className='indent-1'>3、执业证复印件</div>
        <div className='indent-1'>4、资格证复印件</div>
        <div className='indent-1'>5、职称聘用证明</div>
        <div className='indent-1'>6、层级晋级表</div>
        <div className='indent-1'>7、护理会诊人员资质认定表</div>
        <div className='indent-1'>8、夜班护士准入评价表</div>
        <div className='indent-1'>9、厚街医院护理人员执业准入资格备案表</div>
        <div className='indent-1'>10、高风险诊疗技术操作人员资质申请表</div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .title-1 {
    font-size: 20px;
    font-weight: bold;
  }
  .text-con {
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 1px;
  }
  .indent {
    text-indent: 28px;
  }
  .indent-1 {
    text-indent: 20px;
  }
`
