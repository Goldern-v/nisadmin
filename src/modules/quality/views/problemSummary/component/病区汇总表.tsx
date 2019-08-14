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
      align: 'left'
    },
    {
      title: '医疗质量（60分）',
      children: [
        {
          title: <div className='full-title'>结构质量</div>,

          children: [
            {
              title: '',
              children: [
                {
                  title: '7分',
                  dataIndex: ''
                }
              ]
            }
          ]
        },
        {
          title: '结果质量',
          dataIndex: '',

          children: [
            {
              title: '归档病历质量',

              children: [
                {
                  title: '5分',
                  dataIndex: '1'
                }
              ]
            },
            {
              title: '结果核心制度考核',

              children: [
                {
                  title: '10分',
                  dataIndex: '2'
                }
              ]
            }
          ]
        },
        {
          title: '医疗专项管理',

          children: [
            {
              title: '院感公卫',

              children: [
                {
                  title: '8分',
                  dataIndex: '3'
                }
              ]
            },
            {
              title: '输血',

              children: [
                {
                  title: '5分',
                  dataIndex: '4'
                }
              ]
            },

            {
              title: '药学',

              children: [
                {
                  title: '15分',
                  dataIndex: '5'
                }
              ]
            }
          ]
        },
        {
          title: <div className='full-title'>环节核心制度考核</div>,

          children: [
            {
              rowSpan: 1,
              title: '',

              children: [
                {
                  rowSpan: 1,
                  title: '10分',
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
      dataIndex: '7',
      width: 100
    },
    {
      title: '标准化 20分',
      dataIndex: '8'
    },
    {
      title: '其他',
      dataIndex: '9'
    },
    {
      title: '总分',
      dataIndex: '10'
    },
    {
      title: '排名',
      dataIndex: '11'
    }
  ]

  return (
    <Wrapper>
      <BaseTable surplusHeight={260} loading={loadingTable} dataSource={dataSource} columns={columns} />
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
