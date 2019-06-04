import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import BaseTable from 'src/components/BaseTable'
import { appStore } from 'src/stores'

export interface Props extends RouteComponentProps {}

const columns: any = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '物流单号',
    dataIndex: '物流单号',
    key: '物流单号',
    align: 'center',
    width: 180
  },
  {
    title: '物品名称',
    dataIndex: '物品名称',
    key: '物品名称',
    width: 120,
    align: 'center'
  },
  {
    title: '物流创建科室',
    dataIndex: '物流创建科室',
    key: '物流创建科室',
    width: 150,
    align: 'center'
  },
  {
    title: '物流分类',
    dataIndex: '物流分类',
    key: '物流分类',
    align: 'center',
    width: 120
  },
  {
    title: '提交人',
    dataIndex: '提交人',
    key: '提交人',
    align: 'center',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: '创建时间',
    key: '创建时间',
    width: 170,
    align: 'center'
  },
  {
    title: '创建人',
    dataIndex: '创建人',
    key: '创建人',
    width: 100,
    align: 'center'
  },
  {
    title: '当前流程',
    dataIndex: '当前流程',
    key: '当前流程',
    width: 100,
    align: 'center'
  },
  {
    title: '最后处理人',
    dataIndex: '最后处理人',
    key: '最后处理人',
    width: 120,
    align: 'center'
  },
  {
    title: '最后处理时间',
    dataIndex: '最后处理时间',
    key: '最后处理时间',
    width: 170,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'cz',
    key: '8',
    width: 80,
    align: 'center',
    render: (a: any, b: any, c: any) => {
      const DoCon = styled.div`
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        color: ${(p) => p.theme.$mtc};
        cursor: pointer;
      `
      return (
        <DoCon>
          <span onClick={() => appStore.history.push('/lmsDetails')}>查看</span>
        </DoCon>
      )
    }
  }
]
const dataSource: any = [
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-003',
    物品名称: '手术刀',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-04-24 11:00',
    创建人: '李诗歌',
    当前流程: '公司已回收',
    最后处理人: '林小凡',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },

  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },
  {
    物流单号: '20190129-SJNK-003',
    物品名称: '手术刀',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-04-24 11:00',
    创建人: '李诗歌',
    当前流程: '公司已回收',
    最后处理人: '林小凡',
    最后处理时间: '2019-03-11 10:00'
  },
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },
  {
    物流单号: '20190129-SJNK-001',
    物品名称: '一次性针头',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-02-22 14:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-10 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '一次性手套',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 17:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 16:00'
  },
  {
    物流单号: '20190129-SJNK-003',
    物品名称: '手术刀',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-04-24 11:00',
    创建人: '李诗歌',
    当前流程: '公司已回收',
    最后处理人: '林小凡',
    最后处理时间: '2019-01-10 18:00'
  },
  {
    物流单号: '20190329-SJNK-011',
    物品名称: '针筒',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 10:00',
    创建人: '王大海',
    当前流程: '公司已回收',
    最后处理人: '王小丽',
    最后处理时间: '2019-01-15 10:00'
  },
  {
    物流单号: '20190129-SJNK-002',
    物品名称: '吊瓶',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-01-10 14:00',
    创建人: '王大锤',
    当前流程: '公司已回收',
    最后处理人: '陈伊月',
    最后处理时间: '2019-03-22 13:00'
  },
  {
    物流单号: '20190129-SJNK-003',
    物品名称: '手术刀',
    物流创建科室: '神经内科',
    物流分类: '医疗废弃物',
    创建时间: '2019-04-24 12:00',
    创建人: '李诗歌',
    当前流程: '公司已回收',
    最后处理人: '林小凡',
    最后处理时间: '2019-01-10 09:00'
  }
]

export default function LmsView () {
  return (
    <Wrapper>
      <SelectCon />
      <ScrollCon>
        <BaseTable columns={columns} dataSource={[] || dataSource} style={{ padding: 0 }} pagination={{}} surplusHeight={240}/>
      </ScrollCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ScrollCon = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0 -15px;
  padding: ${(p) => p.theme.$mcp};
`
