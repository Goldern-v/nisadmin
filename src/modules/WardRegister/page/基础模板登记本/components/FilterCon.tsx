import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Select, Popover, Row, Col } from 'antd'

const Option = Select.Option

export interface Props {
  filter: { [p: string]: string },
  itemConfigList: any[],
  rangeConfigList: any[],
  filterChange: Function,
}

/**筛选条件面板 */
export default function FilterCon(props: Props) {
  //有多个筛选条件在弹出层显示
  const {
    filter,
    itemConfigList,
    rangeConfigList,
    filterChange
  } = props

  const optionArr = (key: string) => {
    if (key == '班次') return rangeConfigList.map((range: any) => range.itemCode)

    for (let i = 0; i < itemConfigList.length; i++) {
      let item0 = itemConfigList[i]
      if (item0.itemCode == key)
        return item0.options.split(';')

      if (item0.children)
        for (let j = 0; j < item0.length; j++) {
          let item1 = item0[j]
          if (item1.itemCode == key)
            return item0.options.split(';')
        }
    }

    return []
  }

  const filterArr = Object.keys(filter)

  const content = filterArr
    .map((key: any) =>
      <Row key={key} style={{ width: 250, margin: '5px 0' }}>
        <Col span={10} style={{ textAlign: 'right', paddingRight: '15px' }}>
          <span style={{ lineHeight: '30px', }}>{key}</span>
        </Col>
        <Col span={14}>
          <Select
            style={{ width: '100%' }}
            value={filter[key]}
            onChange={(val: any) => handleChange(val, key)}>
            <Option value="">全部</Option>
            {optionArr(key).map((opt: any, optIdx: number) =>
              <Option value={opt} key={optIdx}>{opt}</Option>)}
          </Select>
        </Col>
      </Row>)

  const handleChange = (val: any, key: any) => {
    filterChange && filterChange({
      ...filter,
      [key]: val
    })
  }

  return <Wrapper>
    {filterArr.length > 1 && <Popover
      content={content}
      title="筛选条件">
      <Button>筛选</Button>
    </Popover>}
    {filterArr.length == 1 && (() => {
      let key = filterArr[0]
      return <React.Fragment>
        <span className="label">{key}</span>
        <Select
          style={{ width: '120px' }}
          value={filter[key]}
          onChange={(val: any) => handleChange(val, key)}>
          <Option value="">全部</Option>
          {optionArr(key).map((opt: any, optIdx: number) =>
            <Option value={opt} key={optIdx}>{opt}</Option>)}
        </Select>
      </React.Fragment>
    })()}
  </Wrapper>
}
const Wrapper = styled.span`

`