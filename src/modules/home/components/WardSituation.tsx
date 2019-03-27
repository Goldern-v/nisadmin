import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <div>
      <Head>
        <div className='headLeft'>病区流转情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <table>
          <tr>
            <th>类型</th>
            <th>人数</th>
          </tr>
          <tr>
            <td>原有病人</td>
            <td>200</td>
          </tr>
        </table>
      </Mid>
    </div>
  )
}

const Head = styled.div`
  height: 32px;
  line-height: 32px;
  width: 100%;
  background-color: #3493dd;
  .headLeft {
    padding-left: 14px;
    float: left;
    font-size: 16px;
    color: #ffffff;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 14px;
    color: #ffffff;
  }
`
const Mid = styled.div`
  padding: 18px 18px 0 18px;
  table {
    width: 100%;
    border: 1px solid #a1a1a1;
    text-align: center;
  }
  th {
    height: 26px;
    border: 1px solid #a1a1a1;
    background-color: #a5d5fb;
  }
  td {
    height: 26px;
    border: 1px solid #a1a1a1;
  }
`
