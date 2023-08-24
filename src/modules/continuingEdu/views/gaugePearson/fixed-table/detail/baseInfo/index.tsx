import React, { useEffect, useState } from 'react'
import { Obj } from 'src/libs/types'
import { getOneMmsPx } from 'src/utils/css/css'
import styled from 'styled-components'
import { handbookModel } from '../../../handbook/model'
interface IProps {
  isPreview?: boolean
}

const titleList = [
  {
    name: '姓名',
    code: 'name',
  },
  {
    name: '工号',
    code: 'sapCode',
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
    name: '区域',
    code: 'region',
  },
  {
    name: '科室',
    code: 'studyDeptName',
  },
  {
    name: '在职情况',
    code: 'incumbency',
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
  const { isPreview = false } = props
  const { info } = handbookModel
  // const [px, setPx] = useState(1)
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
            <td style={{padding:isPreview?'8px':'20px'}}>{titleList[2 * i]?.name}</td>
            <td style={{padding:isPreview?'8px':'20px'}}>{titleList[2 * i]?.code && !isPreview ? info[titleList[2 * i]?.code] : ''}</td>
            <td style={{padding:isPreview?'8px':'20px'}}>{titleList[2 * i + 1]?.name}</td>
            <td style={{padding:isPreview?'8px':'20px'}}>{titleList[2 * i + 1]?.code && !isPreview ? info[titleList[2 * i + 1]?.code] : ''}</td>
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
    padding:8px;
  }
}
`