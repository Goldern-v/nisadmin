import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'src/vendors/antd'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'

export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function qualityIndexModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  // cloneData.list.tableData&&cloneData.list.tableData.push(...[
  //   {index:"",lx:"",xm:"",zlhgf:"",hgl:"",hgsccs:"",pjf:"",hgl2:"",wdb:""},
  //   {index:"",lx:"",xm:"",zlhgf:"",hgl:"",hgsccs:"",pjf:"",hgl2:"",wdb:""},
  //   {index:"",lx:"",xm:"",zlhgf:"",hgl:"",hgsccs:"",pjf:"",hgl2:"",wdb:""}
  // ])

  useEffect(() => { }, [])
  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      align: 'center',
      width:60,
      render(text: any, record: any, index: number) {
        return index + 1
      },
    },
    {
      title: '项目',
      align: 'center',
      width:160,
      render(text:string, record:any, index:number) {
        return (
          <input
            type='text'
            className='cell-input'
            value={record.xm|| ''}
            onChange={(e) => {
              record.xm = e.target.value
              setData(cloneData)
            }}
          />
        )
      },
    },
    {
      title: '达标值',
      align: 'center',
      children: [
        {
          title: '质量合格分',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.zlhgf|| ''}
                onChange={(e) => {
                  record.zlhgf = e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        },
        {
          title: '合格率',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.hgl|| ''}
                onChange={(e) => {
                  record.hgl = e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        }
      ]
    },
    {
      title: '检查结果',
      align: 'center',
      children: [
        {
          title: '合格数/抽查数',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.hgsccs|| ''}
                onChange={(e) => {
                  record.hgsccs= e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        },
        {
          title: '平均分',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.pjf|| ''}
                onChange={(e) => {
                  record.pjf = e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        },
        {
          title: '合格率%',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.hgl2|| ''}
                onChange={(e) => {
                  record.hgl2 = e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        },
        {
          title: '未达标',
          align: 'center',
          width:100,
          render(text:string, record:any, index:number) {
            return (
              <input
                type='text'
                className='cell-input'
                value={record.wdb|| ''}
                onChange={(e) => {
                  record.wdb = e.target.value
                  setData(cloneData)
                }}
              />
            )
          },
        }
      ]
    },
  ]
  return (
    <Wrapper>
      <BaseTable columns={columns} dataSource={(cloneData.list && cloneData.list || [])}
      />


    </Wrapper>
  )
}
const Wrapper = styled.div`
  text {
    min-height: 200px !important;
    resize: none;
  }
  input {
    border: none;
    width: 90%;
  }
`
