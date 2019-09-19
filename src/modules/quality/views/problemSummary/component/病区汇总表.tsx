import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
export interface Props {
  dataSource: any[]
  loadingTable: boolean
}

export default function 病区汇总表(props: Props) {
  const { dataSource, loadingTable } = props
  const columns: any[] = [
    {
      title: '',
      dataIndex: 'wardName',
      width: 150,
      key: '11',
      align: 'left'
    },
    {
      title: '医疗质量（60分）',
      key: '22',
      children: [
        {
          title: <div className='full-title'>结构质量</div>,
          key: '33',
          children: [
            {
              title: '',
              key: '44',
              children: [
                {
                  title: '7分',
                  key: '66',
                  dataIndex: ''
                }
              ]
            }
          ]
        },
        {
          title: '结果质量',
          key: '55',
          dataIndex: '',

          children: [
            {
              title: '归档病历质量',
              key: '77',
              children: [
                {
                  title: '5分',
                  dataIndex: '1'
                }
              ]
            },
            {
              title: '结果核心制度考核',
              key: '88',
              children: [
                {
                  title: '10分',
                  key: '99',
                  dataIndex: '2'
                }
              ]
            }
          ]
        },
        {
          title: '医疗专项管理',
          key: '1010',
          children: [
            {
              title: '院感公卫',
              key: '1111',
              children: [
                {
                  title: '8分',
                  key: '1212',
                  dataIndex: '3'
                }
              ]
            },
            {
              title: '输血',
              key: '1313',
              children: [
                {
                  title: '5分',
                  key: '1414',
                  dataIndex: '4'
                }
              ]
            },

            {
              title: '药学',
              key: '1515',
              children: [
                {
                  title: '15分',
                  key: '1616',
                  dataIndex: '5'
                }
              ]
            }
          ]
        },
        {
          title: <div className='full-title'>环节核心制度考核</div>,
          key: '1717',
          children: [
            {
              rowSpan: 1,
              title: '',
              key: '1818',
              children: [
                {
                  rowSpan: 1,
                  title: '10分',
                  key: '1919',
                  dataIndex: '6'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: '护理质量 20分',
      key: '2020',
      dataIndex: 'score',
      align: 'center',
      width: 100,
      render(text: any, record: any) {
        return Number(text).toFixed(2)
      }
    },
    {
      title: '标准化 20分',
      key: '2121',
      dataIndex: '8'
    },
    {
      title: '其他',
      key: '2222',
      dataIndex: '9'
    },
    {
      title: '总分',
      key: '2323',
      dataIndex: '10'
    },
    {
      title: '排名',
      key: '2424',
      dataIndex: '11'
    }
  ]

  return (
    <Wrapper>
      <BaseTable surplusHeight={360} loading={loadingTable} dataSource={dataSource} columns={columns} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .full-title {
    position: relative;
    top: 25px;
    background: rgb(242, 244, 245);
  }
`
