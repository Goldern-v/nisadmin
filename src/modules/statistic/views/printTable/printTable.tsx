import React, { useState, useEffect,useRef } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

export interface Props { 
  columns:any,
  dataSource:any,
  title:string
}

export default observer(function printTable(props) {
  const { columns,dataSource,title } = props
  let _colums = JSON.parse(JSON.stringify(columns))
  let list:any[] = []
  let _dataSourceIndex:any[] = []

  const findDeepestChildren = (obj:any,ind:number)=> {
    list[ind] ? list[ind].push(obj) : (list[ind]=[obj])
    if (obj.hasOwnProperty('children')) {
      for (let i = 0; i < obj.children.length; i++) {
        findDeepestChildren(obj.children[i], ind + 1);
      }
    }
  }

  const colsChildAdd = (td:any,obj:any)=>{
    if (td.hasOwnProperty('children')) {
      td.children.forEach((child:any)=>{
        obj.colSpan =  (obj.colSpan || 0) +1
        colsChildAdd(child,obj)
      })
    }
  }

  const findDeepRowChildren = (obj: any, depth: number): number => {
    let maxDepth = depth;
  
    if (obj.children && obj.children.length > 0) {
      for (const child of obj.children) {
        const childDepth = findDeepRowChildren(child, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    }
  
    return maxDepth;
  };

  const rowsChildAdd = (td:any)=>{
    return td.hasOwnProperty('children')
  }
  
  const trList = (()=>{
    for (let i = 0; i < _colums.length; i++) {
      findDeepestChildren(_colums[i], 0);
    }
    list.forEach((li:any,liIn:number)=>{
      li.forEach((item:any)=>{
        item.colSpan = 0
        colsChildAdd(item,item)
        item.rowSpan =  rowsChildAdd(item)? 1 : (list.length-liIn)
        if(item.rowSpan + liIn == list.length) _dataSourceIndex.push(item)
      })
    })
    
    return list 
  })()

  const thList = (col:any)=>{
    return col.length>0 && col.map((th:any)=>{
      return <th rowSpan={th.rowSpan} colSpan={th.colSpan || 1}>{th.title}</th>
    })
  }

  const theader = ()=>{
    return trList.map((col:any)=>{
      return <tr>{thList(col)}</tr>
    })
  }

  const tbody = ()=>{
    return dataSource.map((source:any,sourceIn:number)=>{
      return <tr>
        { _dataSourceIndex.map((key:any)=>{
          return <td>{
            key.title==="序号" ? sourceIn+1 :source[key.dataIndex]
            }</td>
          })
        }
      </tr>
    })
  }
  
  return <Wrapper>
    <div className="main-title">{title}</div>
    <table>
      { theader() }
      { tbody() }
    </table>
  </Wrapper>
})
const Wrapper = styled.div`
.main-title{
  font-size: 21px;
  font-weight: bold;
  color: rgba(51,51,51,1);
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;

  tr {
    th,td{
      border: 1px solid #000;
    }
    td {
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
`