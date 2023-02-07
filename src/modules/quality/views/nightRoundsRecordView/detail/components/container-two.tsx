import React, { forwardRef } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import moment from 'moment'
export interface Props extends Obj {
  master: Obj
  hasSubmit: Function
}
/**
 * 二值护士表格
 */
export default forwardRef(function (props: Props, ref: any) {
  const { master, hasSubmit } = props

  return (
    <Wrapper className='ctx' ref={ref}>
      <div className='table-wrapper' style={{ pointerEvents: hasSubmit() ? 'auto' : 'none' }}>
        <div className='table-title'>
          {master.title}
        </div>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="59%" />
            <col width="5%" />
            <col width="5%" />
            <col width="6%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <td>科室：{master.deptName}</td>
              <td>二值护士：{master.submitName}</td>
              <td colSpan={4}>值班日期：{moment(master.submitTime).format('YYYY年MM月DD日')}</td>
            </tr>
            <tr>
              <td></td>
              <td>项目</td>
              <td>是</td>
              <td>否</td>
              <td>不适合</td>
              <td>备注</td>
            </tr>

            {
              (master.formItems || []).map((v: Obj, i: number) => (
                <tr key={i}>
                  <td>{v.title}</td>
                  {
                    (v.formSubItems || []).map((v1: Obj, i1: number) => (
                    <>
                      <td key={`${i}-${i1}`}>{v1.title}</td>
                      <td key={`${i}-${i1}`}>{v1.value == 1 && '√'}</td>
                      <td key={`${i}-${i1}`}>{v1.value == 0 && '√'}</td>
                      <td key={`${i}-${i1}`}>{v1.value == -1 && '√'}</td>
                      <td key={`${i}-${i1}`}>{v1.description}</td>
                    </>))
                  }
                </tr>
              ))
            }
            <tr>
              <td colSpan={6}>
                <div className='d-flex'>
                  <span>存在问题:</span>
                  <pre className='flex-1'>{master.problems}</pre>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  max-height: 100%;
  width: calc(100% - 250px);
  overflow: auto;
  .table-wrapper{
    background: #fff;
    min-height: 100%;
    width: 70%;
    margin: 10px auto 0px;
    padding: 30px 50px 80px;
    
    .table-title{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    table{
      border-collapse: collapse;
      border-color: #000;
      width: 100%;
      table-layout: fixed;
      tr {
        width: 100%;
      }
      td{
        border: 1px #000 solid;
        line-height: 24px;
        min-height: 24px;
        text-align: center;
        input{
          border: none;
        }
      }
    }
    .d-flex {
      text-align: left;
      width: 100%;
      display: flex;
      .flex-1 {
        flex: 1
      }
    }
  }  
`