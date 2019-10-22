import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import HeadCon from '../../components/HeadCon/HeadCon'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
export interface Props {}

export default function HandoverRegister() {
  const dataSource: any[] = []
  const columns: ColumnProps<any>[] = [
    {
      title() {
        return (
          <LineCon>
            <TextCon>
              <Text x='20%' y='80%' deg='0'>
                日期
              </Text>
              <Text x='65%' y='75%' deg='18'>
                班次
              </Text>
              <Text x='80%' y='60%' deg='21'>
                质量
              </Text>
              <Text x='83%' y='35%' deg='12'>
                基数
              </Text>
              <Text x='85%' y='8%' deg='0'>
                物品
              </Text>
            </TextCon>
            <SvgCon xmlns='http://www.w3.org/2000/svg' version='1.1'>
              <line x1='0' y1='0' x2='60%' y2='100%' />
              <line x1='0' y1='0' x2='100%' y2='100%' />
              <line x1='0' y1='0' x2='100%' y2='33%' />
              <line x1='0' y1='0' x2='100%' y2='66%' />
              <line x1='0' y1='0' x2='100%' y2='100%' />
            </SvgCon>
          </LineCon>
        )
      },
      colSpan: 2,
      render(text: string, record: any, index: number) {
        return ''
      }
    },
    {
      title: '头部',
      colSpan: 0,
      render(text: string, record: any, index: number) {
        return ''
      }
    },
    {
      title: '选项1',
      render(text: string, record: any, index: number) {
        return (
          <ThBox>
            <div className='title'>1111</div>
          </ThBox>
        )
      }
    },
    {
      title(text: string, record: any, index: number) {
        return (
          <ThBox>
            <div className='title'>111</div>
            <div className='aside'>1</div>
          </ThBox>
        )
      }
    },
    {
      title: '备注',
      render(text: string, record: any, index: number) {
        return ''
      }
    },
    {
      title: '交班者签名',
      render(text: string, record: any, index: number) {
        return ''
      }
    },
    {
      title: '接班者签名',
      render(text: string, record: any, index: number) {
        return ''
      }
    }
  ]
  return (
    <Wrapper>
      <HeadCon
        pageTitle='物品交接登记本'
        setPageTitle='物品交接登记本设置'
        setPageUrl={'/wardRegister/handoverRegisterSet'}
      />
      <TableCon>
        <BaseTable dataSource={dataSource} columns={columns} />
      </TableCon>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const TableCon = styled.div``

const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`

const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
`

const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: rgb(99, 99, 99);
    stroke-width: 1;
  }
`
const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`
const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${(p) => p.x};
  top: ${(p) => p.y};
  transform: rotate(${(p) => p.deg}deg);
`
