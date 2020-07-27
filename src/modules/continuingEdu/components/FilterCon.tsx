import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { observer } from 'mobx-react-lite'
import { Button, Tag } from 'antd'
import { theme } from 'src/styles/theme'

console.log()

const FILTER_MAP: any = {
  学历: ['全部', '中专', '大专', '本科', '研究生', '博士'],
  职称: ['全部', '见习期护士', '护士', '护师', '主管护师', '副主任护师', '主任护师'],
  层级: process.env.REACT_APP_HOSPITAL_ID == 'wh' ?
    ['全部', 'N0', 'N1', 'N2', 'N3', 'N4'] :
    ['全部', 'N0', 'N1', 'N2', 'N3', 'N4', 'N5', 'N6'],
  职务: process.env.REACT_APP_HOSPITAL_ID == 'wh' ?
    [
      '全部',
      '无',
      '护士',
      '护士长',
      '护理部干事',
      '护理部副主任',
      '护理部主任',
    ] :
    [
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

/** 设置筛选条件适配器 */
const setFilterAdapter = (label: string, value: string, callback: any) => {
  let name;
  switch (label) {
    case '学历':
      name = 'Xl'
      break
    case '职称':
      name = 'Zc'
      break
    case '层级':
      name = 'Cj'
      break
    case '职务':
      name = 'Zw'
      break
    default:
  }
  if (name) callback && callback(name, value)
}

export interface Props {
  isOpenFilter: Boolean,
  onVisibleChange: any,
  filterAdapterChange: any,
  filter: {
    Xl: string,
    Zc: string,
    Cj: string,
    Zw: string
  }
}
export default function FilterCon(props: Props) {
  const { isOpenFilter, onVisibleChange, filter, filterAdapterChange } = props;

  const setOpen = (value: boolean) => {
    onVisibleChange && onVisibleChange(value);
  }
  const onClose = (e: any, item: any) => {
    e.preventDefault()
    setFilterAdapter && setFilterAdapter(item, '全部', filterAdapterChange)
  }
  const getFilterAdapter = (label: string) => {
    switch (label) {
      case '学历': {
        return filter.Xl
      }
      case '职称': {
        return filter.Zc
      }
      case '层级': {
        return filter.Cj
      }
      case '职务': {
        return filter.Zw
      }
      default: {
        return ''
      }
    }
  }

  return (
    <Wrapper>
      <Head>
        <div className='left'>
          选择：
          {Object.keys(FILTER_MAP).map(
          (item: any) =>
            getFilterAdapter(item) &&
            getFilterAdapter(item) !== '全部' && (
              <Tag closable onClose={(e: any) => onClose(e, item)} key={item}>
                {getFilterAdapter(item)}
              </Tag>
            )
        )}
        </div>
        <div className='right'>
          <Button icon={isOpenFilter ? 'down' : 'left'} onClick={() => setOpen(!isOpenFilter)} size='small'>
            {isOpenFilter ? '隐藏' : '展开'}
          </Button>
        </div>
      </Head>
      <Inner isOpenFilter={isOpenFilter}>
        {Object.keys(FILTER_MAP).map((item, index) => {
          return <FilterItem handleSetFilterAdapter={filterAdapterChange} key={index} label={item} selected={getFilterAdapter(item)} options={FILTER_MAP[item]} />
        })}
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Inner = styled.div<{ isOpenFilter: Boolean }>`
  background: rgba(255, 255, 255, 1);
  box-shadow: ${(p) => p.theme.$shadow};
  > div:last-child {
    border: 0;
  }
  /* transition: height 1s; */
  ${(p) =>
    !p.isOpenFilter &&
    `
      height: 0;
      overflow: hidden;
    `}
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  * {
    font-size: 12px;
  }
`
interface FilterItemProps {
  label: string
  selected: string
  options: string[],
  handleSetFilterAdapter?: any
}

const FilterItem = (props: FilterItemProps) => {
  const { handleSetFilterAdapter } = props;

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
        <Option className='option' active={item === selected} key={index} onClick={() => setFilterAdapter(label, item, handleSetFilterAdapter)}>
          {item}
        </Option>
      ))}
    </ItemStyl>
  )
}
