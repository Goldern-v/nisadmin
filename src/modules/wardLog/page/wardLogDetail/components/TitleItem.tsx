import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import {appStore} from "src/stores";
export interface Props {
  title: string
  aside: string
  type?:string
  rowOne? :number | undefined
}

export default function TitleItem(props: Props) {
  const { title, aside ,type,rowOne } = props
    /**青海五院需要增加参与人员  转Json处理**/
    const [personContent,setPersonContent]=useState('')
    useEffect(()=>{
        if(appStore.HOSPITAL_ID ==='qhwy' && type == '8'){
            let list: any = aside && JSON.parse(aside).map((item: any) => item.empName).join(',')
            setPersonContent(list)
        }
    },[])

  return (
    <Wrapper className={rowOne ===1 ? "printFlex" : ""} >
      <div className='title'>{title}</div>
      <div className='aside' dangerouslySetInnerHTML={{ __html:personContent || aside }}></div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin-bottom: 20px;
  .title {
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    margin-bottom: 5px;
  }
  .aside {
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
`
