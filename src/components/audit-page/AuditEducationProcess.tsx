import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Obj } from 'src/libs/types'
import { Timeline } from 'antd'
import {authStore} from "src/stores";

export interface Props {
  process: Obj[]
}
const defaultHead = require('../../assets/images/护士默认头像.png')
const aduitSuccessIcon = require('../../global/images/审核通过.png')
/**临邑--专科准入审核 */
export default function AuditEducationProcess(props: Props) {
  const { process } = props
  return (
    <Wrapper>
      <div className='audit-title'>审核流程</div>
        {(process || []).map((item: any, index: any, arr: any) => (
            <TimeLineItem data={item} index={index} key={index} arr={arr} />
        ))}
        <div>
            <div>理论考核(分数):<span>90</span></div>
            <div>理论考核(分数):<span>90</span></div>
            <div>理论考核(分数):<span>90</span></div>
            <div>理论考核(分数):<span>90</span></div>
        </div>
        {/*<React.Fragment>*/}
        {/*    <div className='row'>*/}
        {/*        <div className='key'>审核结果：</div>*/}
        {/*        <div className='vale'>*/}
        {/*            <ResultBox className={agree == 'agree' ? 'agree' : ''} onClick={() => setAgree('agree')}>*/}
        {/*                通过*/}
        {/*                <AgreeIcon />*/}
        {/*            </ResultBox>*/}
        {/*            <ResultBox className={agree == 'disagree' ? 'disagree' : ''} onClick={() => setAgree('disagree')}>*/}
        {/*                退回*/}
        {/*                <AgreeIcon />*/}
        {/*            </ResultBox>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className='row'>*/}
        {/*        <div className='key'>审核意见：</div>*/}
        {/*        <div className='vale'>*/}
        {/*            <TextArea*/}
        {/*                rows={3}*/}
        {/*                style={{ width: 554 }}*/}
        {/*                value={opinion}*/}
        {/*                onChange={(e: any) => setOpinion(e.target.value)}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className='row' style={{ paddingTop: '2px' }}>*/}
        {/*        <div className='key'>审核人：</div>*/}
        {/*        <div className='vale'>*/}
        {/*            <div className='block'>{authStore.user && authStore.user.empName}</div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</React.Fragment>*/}
    </Wrapper>
  )
}
function TimeLineItem(props: any) {
    const { data, index, arr } = props
    const Con = styled.div<{ index: number }>`
    height: 72px;
    display: flex;
    ${(p) => p.index !== 0 && `margin-top: 20px;`}
    .left {
      width: 72px;
      height: 72px;
      position: relative;
      .head {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 50%;
        object-fit: cover;
      }
      .icon {
        position: absolute;
        top: 50px;
        left: 42px;
      }
      .line {
        position: absolute;
        width: 2px;
        height: 20px;
        background: #6cb45c;
        left: 35px;
        top: 72px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      margin-left: 10px;
      flex-direction: column;
      .title {
        font-size: 15px;
        color: #333333;
      }
      .aside {
        font-size: 13px;
        color: #999;
      }
      .bold {
        color: ${(p: any) => p.theme.$mtc};
      }
    }
  `
    return (
        <Con index={index}>
            <div className='left'>
                <img className='head' src={data.headUrl || defaultHead} alt='' />
                {(index === 0 || data.auditedStatus.indexOf('Success') > -1) && (
                    <React.Fragment>
                        <img className='icon' src={aduitSuccessIcon} alt='' />
                        {index != arr.length - 1 && <div className='line' />}
                    </React.Fragment>
                )}
                {<React.Fragment>{index != arr.length - 1 && <div className='line' />}</React.Fragment>}
            </div>
            <div className='right'>
                <div className='title'>{data.auditedStatusName}</div>
                <div className='aside'>
                    {data.auditedName}&nbsp; {data.auditedTime}
                </div>
                <div className='aside'>{data.detail}</div>
            </div>
        </Con>
    )
}
const Wrapper = styled.div`
  //position: absolute;
  height: 100%;
  //width: 250px;
  background: #fff;
  //top: 0;
  //right: 0;
  padding: 20px 20px;
  overflow: auto;
  
  .audit-title{
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .timeline-item{
    line-height: 22px;
  }
`
