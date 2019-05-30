import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import { observer } from 'mobx-react-lite'

const FILTER_MAP: any = {
  学历: ['全部', '中专', '大专', '本科', '研究生', '博士'],
  职称: ['全部', '见习期护士', '护士', '护师', '主管护师', '副主任护师', '主任护师'],
  层级: ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6'],
  职务: [
    '全部',
    '无',
    '教学小组组长',
    '教学秘书',
    '护理组长',
    '副护士长',
    '护士长',
    '科护士长',
    '护理部副主任',
    '护理部主任'
  ]
}

type FilterMap = typeof FILTER_MAP

const getFilterAdapter = (label: string) => {
  switch (label) {
    case '学历': {
      return nurseFilesListViewModel.filterXl
    }
    case '职称': {
      return nurseFilesListViewModel.filterZc
    }
    case '层级': {
      return nurseFilesListViewModel.filterCj
    }
    case '职务': {
      return nurseFilesListViewModel.filterZw
    }
    default: {
      return ''
    }
  }
}

/** 设置筛选条件适配器 */
const setFilterAdapter = (label: string, value: string) => {
  switch (label) {
    case '学历':
      {
        nurseFilesListViewModel.filterXl = value
      }
      break
    case '职称':
      {
        nurseFilesListViewModel.filterZc = value
      }
      break
    case '层级':
      {
        nurseFilesListViewModel.filterCj = value
      }
      break
    case '职务':
      {
        nurseFilesListViewModel.filterZw = value
      }
      break
    default:
  }
}
export default observer(function FilterCon () {
  const [count, setCount] = useState(0)

  return (
    <Wrapper>
      {Object.keys(FILTER_MAP).map((item, index) => {
        return <FilterItem key={index} label={item} selected={getFilterAdapter(item)} options={FILTER_MAP[item]} />
      })}
    </Wrapper>
  )
})
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  /* border: 1px solid rgba(219, 224, 228, 1); */
  box-shadow: ${(p) => p.theme.$shadow};
  > div:last-child {
    border: 0;
  }
`
interface FilterItemProps {
  label: string
  selected: string
  options: string[]
}
const FilterItem = (props: FilterItemProps) => {
  const ItemStyl = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px dashed #dbe0e4;
    padding: 0 17px;
    .label {
      color: #999;
      margin-right: 20px;
    }
  `
  const Option = styled.div<{ active: boolean }>`
    margin-right: 30px;
    cursor: pointer;
    color: ${(p) => (p.active ? p.theme.$mtdc : 'inherit')};
    font-weight: ${(p) => (p.active ? 'bold' : 'normal')};
  `
  let { label, options, selected } = props
  return (
    <ItemStyl>
      <div className='label'>{label}：</div>
      {options.map((item, index) => (
        <Option className='option' active={item === selected} key={index} onClick={() => setFilterAdapter(label, item)}>
          {item}
        </Option>
      ))}
    </ItemStyl>
  )
}
