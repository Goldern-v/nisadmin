import React, { useEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import { getOneMmsPx } from 'src/utils/css/css'
import styled from 'styled-components'
interface IProps {
  info?: Obj
}

const titleList = [
  {
    name: '姓名',
    code: 'name',
  },
  {
    name: '工号',
    code: '',
  },
  {
    name: '性别',
    code: 'sex',
  },
  {
    name: '学历',
    code: 'education',
  },
  {
    name: '出生日期',
    code: 'birthday',
  },
  {
    name: '学位',
    code: 'degree',
  },
  {
    name: '籍贯',
    code: '',
  },
  {
    name: '入职时间',
    code: '',
  },
  {
    name: '在职情况',
    code: '',
  },
  {
    name: '分配日期',
    code: 'distributionDate',
  },
  {
    name: '转正日期',
    code: 'formalDate',
  },
]
/**固定表-基本信息 */
export default function FixedBaseInfo(props: IProps) {
  const { info } = props
  const [px, setPx] = useState(1)
  // useEffect(() => {
  //   const val = getOneMmsPx()
  //   setPx(val || 1)
  // }, [])
  return <Wrapper>
    <div className='title'>基本信息</div>
    <table>
      <colgroup>
        <col width='15%' />
        <col width='35%' />
        <col width='15%' />
        <col width='35%' />
      </colgroup>
      <tbody>
        {Array.from(Array(Math.ceil(titleList.length / 2))).map((v: any, i: number) =>
          <tr key={i}>
            <td>{titleList[2 * i]?.name}</td>
            <td>{titleList[2 * i]?.code && info ? info[titleList[2 * i]?.code] : ''}</td>
            <td>{titleList[2 * i + 1]?.name}</td>
            <td>{titleList[2 * i + 1]?.code && info ? info[titleList[2 * i + 1]?.code] : ''}</td>
          </tr>)}
      </tbody>
    </table>
  </Wrapper>
}
const Wrapper: any = styled.div`
width: 210mm;
/* height: 960mm; */
.title {
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
table {
  width: calc(100% - 40px);
  margin: 20px 30px;
}
table, tr, td {
  border: 1px solid #000;
}
tbody {
  line-height: 21px;
  td:nth-child(2n - 1) {
    background-color: #f8f8f8;
  }
  td {
    padding: 8px;
  }
}
`