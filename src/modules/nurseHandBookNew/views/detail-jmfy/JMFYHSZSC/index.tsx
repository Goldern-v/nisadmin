import {observer} from 'mobx-react'
import React, { useRef, useState} from 'react'
import styled from 'styled-components'

import  JMFYHSZSC_1 from  './JMFYHSZSC-1'
import  JMFYHSZSC_2 from  './JMFYHSZSC-2'

export interface Props {
}
/** form29详情，by江门妇幼 */
const menuList = ['护理人员一览表', '质量监测指标', '年度护理工作计划', '月度工作计划', '季度工作计划', '半年工作总结', '年度工作总结']
export default observer(function (props: Props) {
    const ctxRef = useRef<any>(null)
    const [curIndex, setCurIndex] = useState(0)
    const getElement = () => {
        switch (curIndex) {
            case 0 :
                return <JMFYHSZSC_1/>
            case 1 :
                return <JMFYHSZSC_2/>
            case 2 :
                return <div>2222</div>
        }

    }
    return (
        <Wrapper>
                    <div className='main'>
                        <div className='main-left'>
                            {
                                menuList.map((item: string, index: number) => {
                                    return <div key={'a' + index} style={{
                                        height: "50px",
                                        width: '150px',
                                        textAlign: "center",
                                        color: index == curIndex ? 'green' : "#333",
                                        borderBottom: "1px solid #999",
                                        lineHeight:'50px'
                                    }} onClick={() => setCurIndex(index)}>{item}</div>
                                })
                            }
                        </div>
                            <div style={{flex:1}}>
                                {getElement()}
                            </div>
                    </div>
        </Wrapper>
    )
})

const Wrapper = styled.div`
  height: 100%;

  .main {
    display: flex;
    justify-content: space-between;
  }

  .ant-spin-container {
    height: inherit;
  }
`
