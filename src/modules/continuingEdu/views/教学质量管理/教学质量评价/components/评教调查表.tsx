import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { appStore, authStore } from 'src/stores'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params: any
}

export default function 评教调查表(props: Props) {
  const { visible, onOk, onCancel, params } = props

  const rowInfo = [
    {
      title: '初到科室时带教老师或护士长是否介绍科室环境、人员等基本情况',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '带教老师或护士长是否对你介绍本科室的教学计划',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '带教老师是否根据本科室教学计划设计带教程序和安排教学内容',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '实习过程中是否安排上小课',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '实习过程是否有组织教学查房',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '带教老师护理技术操作是否规范',
      selections: [
        { content: '规范', checked: false },
        { content: '有时', checked: false },
        { content: '不规范', checked: false, rowSpan: 2 },
      ]
    },
    {
      title: '带教老师是否熟悉“三基”知识及专科护理常规',
      selections: [
        { content: '熟悉', checked: false },
        { content: '一般', checked: false },
        { content: '差', checked: false },
      ]
    },
    {
      title: '带教老师是否以示、教、放、查有机结合',
      selections: [
        { content: '有', checked: false },
        { content: '大部分', checked: false },
        { content: '偶尔', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '带教老师是否有指导学生观察病情、书写护理文件及进行大交班',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '带教老师或护士长是否关心实习生的生活、思想情况',
      selections: [
        { content: '有', checked: false },
        { content: '一般', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '轮科前是否有进行理论考试',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '轮科前是否有进行操作考核',
      selections: [
        { content: '有', checked: false },
        { content: '没有', checked: false },
      ]
    },
    {
      title: '本科室的教学计划完成情况',
      selections: [
        { content: '好', checked: false },
        { content: '一般', checked: false },
        { content: '差', checked: false },
      ]
    },
    {
      title: '你对带教老师的带教工作',
      selections: [
        { content: '满意', checked: false },
        { content: '一般', checked: false },
        { content: '不满意', checked: false },
      ]
    },
    {
      title: '你对本科室的教学工作',
      selections: [
        { content: '满意', checked: false },
        { content: '一般', checked: false },
        { content: '不满意', checked: false },
      ]
    },
  ]

  return <Modal
    title="评教调查表">
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <td rowSpan={6}>{appStore.HOSPITAL_Name}</td>
          </tr>
          <tr>
            <td rowSpan={6}>实习生评教调查表</td>
          </tr>
          <tr>
            <td rowSpan={6}>
              <span>评教科室：{authStore.selectedDeptName}</span>
              <span className="flex-1"></span>
              <span>2020年12月01日</span>
            </td>
          </tr>
          <tr>
            <td>序号</td>
            <td>内容</td>
            <td rowSpan={4}>评价</td>
          </tr>
          {rowInfo.map((item: any, index: number) => <tr>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            {((selections: any[]) => {
              let maxRow = 4
              let currentRow = 1
              let currentIdx = 1
              let tds = []
              while (currentRow < maxRow) {
                let target = selections[currentIdx]
                if (target)
                  tds.push(<td rowSpan={target.rowSpan || 1}>{currentIdx}{target.content}</td>)
                else
                  tds.push(<td></td>)

                currentRow += target ? (target.rowSpan || 1) : 1
                currentIdx++
              }
              return tds
            })(item.selections)}
          </tr>)}
        </tbody>
      </table>
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div``