import styled from 'styled-components'
import React from 'react'
export interface Props {
  process: any
}
const defaultHead = require('../../assets/images/护士默认头像.png')
const aduitSuccessIcon = require('../../global/images/审核通过.png')
/**临邑--专科准入审核 */
export default function AuditEducationProcess(props: Props) {
  const { process } = props
    console.log(process?.auditeListDtos);
    return (
    <Wrapper>
      <div className='audit-title'>审核流程</div>
        {(process?.auditeListDtos || []).map((item: any, index: any, arr: any) => (
            <TimeLineItem data={item} index={index} key={index} arr={arr} />
        ))}
        <div className='box'>
            <div className='box-left'>理论考核(分数):<span>{process?.theoreticalScore}</span></div>
            <div className='box-left'>操作考核(考核项目及分数):<span>{process?.operational}</span></div>
            <div className='box-left'>科室评议:<span>{process?.deptEvaluation}</span></div>
            <div className='box-left'>有无护理差错事故:<span>{process?.errorAccident}</span></div>
            <div className='box-left'>审核意见:<span>{process?.reviewOpinions}</span></div>
        </div>
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

  .audit-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .box {
    background: rgba(242, 242, 242, 1);
    padding: 15px;
    margin-top: 20px;
  }

  .box-left {
    color: #AAA4A4;
    margin-top: 10px;

    > span {
      color: #333333;
      margin-left: 10px;
    }
  }

  .timeline-item {
    line-height: 22px;
  }
`
