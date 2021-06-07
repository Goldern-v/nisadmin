import React from "react"

const table1 = (tableData?: any[]) => {
  return (
    <table>
      <colgroup>
        <col width="50"/>
        <col width="70"/>
        <col width="300"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
        <col width="300"/>
        <col width="70"/>
        <col width="70"/>
        <col width="70"/>
        <col width="90"/>
      </colgroup>
      <tbody>
      <tr>
        <td>序号</td>
        <td>姓名</td>
        <td>起止</td>
        <td>天数</td>
        <td>标准</td>
        <td>金额</td>
        <td>起止</td>
        <td>天数</td>
        <td>标准</td>
        <td>金额</td>
        <td>总金额</td>
      </tr>
      {tableData?.map((item: any, index) =>
        <tr key={index}>
          <td>{index}</td>
        </tr>
      )}
      <tr>
        <td/>
        <td colSpan={2} style={{ textAlign: 'left' }}>合计（小写）</td>
        <td/>
        <td/>
        <td/>
        <td style={{ textAlign: 'left' }}>合计（小写）</td>
        <td/>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr style={{ textAlign: 'left' }}>
        <td colSpan={6}>合计（大写）:</td>
        <td colSpan={5}>合计（大写）:</td>
      </tr>
      <tr style={{ textAlign: 'left' }}>
        <td colSpan={6}>制表日期：</td>
        <td colSpan={5}>填表人：</td>
      </tr>
      </tbody>
    </table>
  )
}


const table2 = (tableData?: any[]) => {
  return (
    <table>
      <colgroup>
        <col width="50"/>
        <col width="70"/>
        <col width="300"/>
        <col width="50"/>
        <col width="50"/>
        <col width="50"/>
      </colgroup>
      <tbody>
      <tr>
        <td>序号</td>
        <td>姓名</td>
        <td>起止</td>
        <td>天数</td>
        <td>标准</td>
        <td>金额</td>
      </tr>
      {tableData?.map((item: any, index) =>
        <tr key={index}>
          <td>{index}</td>
        </tr>
      )}
      <tr>
        <td colSpan={3} style={{ textAlign: 'left' }}>合计（小写）</td>
        <td/>
        <td/>
        <td/>
      </tr>
      <tr style={{ textAlign: 'left' }}>
        <td colSpan={6}>合计（大写）:</td>
      </tr>
      </tbody>
    </table>
  )
}

export default {
  table1,
  table2
}