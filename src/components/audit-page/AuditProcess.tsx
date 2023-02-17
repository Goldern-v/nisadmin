import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Obj } from 'src/libs/types'
import { Timeline } from 'antd'

export interface Props {
  process: Obj[]
}

/**审核页面的审核流 新版本 资质准入版 */
export default function AuditProcess(props: Props) {
  useEffect(() => { })
  const { process } = props

  return (
    <Wrapper>
      <div className='audit-title'>审核流程</div>
      <Timeline>
        {
          process.map((item: any, index: number) => {
            return <Timeline.Item key={index} color={item.state === '1' ? 'green' : 'rgba(0,0,0,.25)'}>
              <div className='timeline-item'>{item.nodeName}</div>
              {item.state === '1' && <>
                <div className='timeline-item'>{item.empName}</div>
                <div className='timeline-item'>{item.handleTime}</div>
                <div className='timeline-item'
                  style={{
                    background: 'rgb(238,238,238)',
                    borderRadius: '5px',
                    padding: '0 5px'
                  }}>
                  <span>{item.content}</span>
                </div>
              </>}
            </Timeline.Item>
          })
        }
      </Timeline>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
    line-height: 22px;
  }
`
