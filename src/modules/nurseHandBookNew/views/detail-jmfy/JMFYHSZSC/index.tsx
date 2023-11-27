import {observer} from 'mobx-react'
import React, {useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import  JMFYHSZSC_1 from  './JMFYHSZSC-1'
import  JMFYHSZSC_2 from  './JMFYHSZSC-2'
import EditPage from "src/modules/nurseHandBookNew/views/detail-jmfy/components/editPage";
import JMFYHSZGZJH_1 from '../components/JMFYHSZGZJH_1'
import JMFYHSZGZZJ_1 from '../components/JMFYHSZGZZJ_1'
import JMFYHSZGZJH_2 from '../components/JMFYHSZGZJH_2'
import  {jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";

export interface Props {
}
/** form29详情，by江门妇幼 */
const menuList = ['护理人员一览表', '质量监测指标', '年度护理工作计划', '月度工作计划', '季度工作计划', '半年工作总结', '年度工作总结']
const menuTitle={
    0:'护理人员一览表',
    1:'质量监测指标',
    2:'年度工作总结及下年度工作计划',
    3:'上半年的工作总结及下半年的工作计划',
    4:'年工作总结',
    5:"月重点及周工作安排",
    6:'年度工作计划表',
    7:'上半年的工作总结及下半年的工作计划'
//     上半年的工作总结及下半年的工作计划
}
export default observer(function (props: Props) {
    const getElement = () => {
        switch (model.curIndex) {
            case 0 :
                return <JMFYHSZSC_1 title={title}/>
            case 1 :
                return <JMFYHSZSC_2 title={title}/>
            case 2 :
            case 3:
            case 7:
                return <EditPage title={title}/>
            case 5:
                return  <JMFYHSZGZJH_1 title={title}/>
            case 4:
                return  <JMFYHSZGZZJ_1 title={title}/>
            case 6:
                return  <JMFYHSZGZJH_2 title={title}/>

        }

    }
    const title =useMemo(()=>{
        return menuTitle[model.curIndex]
    },[model.curIndex])
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
                                        color: index == model.curIndex ? 'green' : "#333",
                                        borderBottom: "1px solid #999",
                                        lineHeight:'50px'
                                    }} onClick={() =>model.curIndex =index}>{item}</div>
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
