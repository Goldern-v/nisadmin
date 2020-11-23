import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tag } from 'antd'
// import { empManageService } from "./../../../views/empDetail/api/EmpManageService";
import { observer } from 'mobx-react-lite'
// import { appStore } from 'src/stores'
import { educationList } from './../data/options'

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
    case '分组':
      name = 'Fz'
      break
    default:
  }
  if (name) callback && callback(name, value)
}

export interface Props {
  isOpenFilter: Boolean,
  onVisibleChange: any,
  filterAdapterChange: any,
  groupList?: any[],
  filter: {
    Xl: string,
    Fz: string
  }
}
export default observer(function FilterCon(props: Props) {
  const { isOpenFilter, onVisibleChange, filter, filterAdapterChange, groupList } = props;

  const filterMap = {
    学历: ['全部', ...educationList.map((item: any) => item.name).reverse()],
    分组: groupList ? ['全部', ...groupList.map((item) => item.groupName)] : ['全部']
  } as any

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
      case '分组': {
        return filter.Fz
      }
      default: {
        return ''
      }
    }
  }

  useEffect(() => {

  }, [])

  return (
    <Wrapper>
      <Head>
        <div className='left'>
          选择：
          {Object.keys(filterMap).map(
          (item: any) =>
            getFilterAdapter(item) &&
            getFilterAdapter(item) !== '全部' && (
              <Tag
                closable
                onClose={(e: any) => onClose(e, item)}
                key={item}>
                {getFilterAdapter(item)}
              </Tag>
            )
        )}
        </div>
        <div className='right'>
          <Button
            icon={isOpenFilter ? 'down' : 'left'}
            onClick={() => setOpen(!isOpenFilter)} size='small'>
            {isOpenFilter ? '隐藏' : '展开'}
          </Button>
        </div>
      </Head>
      <Inner isOpenFilter={isOpenFilter}>
        {Object.keys(filterMap)
          .map((item: string, index: number) => (
            <FilterItem
              handleSetFilterAdapter={filterAdapterChange}
              key={index} label={item}
              selected={getFilterAdapter(item)}
              options={filterMap[item] || []} />
          ))}
      </Inner>
    </Wrapper>
  )
})

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
  options: any,
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
      {options.map((item: any, index: number) => (
        <Option className='option' active={item === selected} key={index} onClick={() => setFilterAdapter(label, item, handleSetFilterAdapter)}>
          {item}
        </Option>
      ))}
    </ItemStyl>
  )
}
