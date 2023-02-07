import { Input, Radio } from 'antd'
import React, { forwardRef, useMemo } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
const { TextArea } = Input
export interface Props extends Obj {
  master: Obj
  form1: Obj
  setForm1: Function
  hasSubmit: Function
}
/**
 * 表格
 */
export default forwardRef(function (props: Props, ref: any) {
  const { master, hasSubmit, form1, setForm1, key = '' } = props
  /**
   * 修改form1
   * @param e 事件对象
   * @param i subItem的序号 不填则是Problem, string 就是外层字段
   */
  const changeForm1 = (e: any, i?: number | string) => {
    const data = cloneDeep(form1)
    if (i == undefined) {
      return setForm1({ ...data, problems: e.target.value })
    }
    if (typeof i === 'string') {
      return setForm1({ ...data, [i]: e.target.value })
    }
    data.subFormItems.forEach((v: Obj, index: number) => {
      if (index === i) {
        v.value = e.target.value
        v.realScore = e.target.value ? v.totalScore : 0
      }
    })
    setForm1(data)
  }
  /**不同类型的表格显示 */
  const specialTrs = useMemo(() => {
    switch (master.deptType) {
      /* 病区 */
      case '1':
        return (
          <>
            <tr>
              <td>科室：</td>
              <td>{master.deptName}</td>
              <td>在院人数：</td>
              <td>{master.patientNum}</td>
              <td>陪护人数：</td>
              <td>{master.carersNum}</td>
            </tr>
            <tr>
              <td>特殊病情人数：</td>
              <td>{master.specialPatientNumber}</td>
              <td>危重病人：</td>
              <td>{master.criticalPatients}</td>
              <td>I级护理：</td>
              <td>{master.levelOneCaregiver}</td>
            </tr>
            <tr>
              <td>咽拭子采集例数</td>
              <td colSpan={5}>{master.throatSwabsCollectedNumber}</td>
            </tr>
          </>
        )
      /**产房 */
      case '2':
        return (
          <>
            <tr>
              <td>科室：</td>
              <td>{master.deptName}</td>
              <td>P班接诊人数：</td>
              <td>{master.pTriageNumber}</td>
              <td>N班接诊人数：</td>
              <td>{master.nTriageNumber}</td>
            </tr>
            <tr>
              <td>胎监人数：</td>
              <td>{master.fetalSupervisorsNumber}</td>
              <td>入院人数：</td>
              <td>{master.admittedPatientsNumber}</td>
              <td>转运入院人数：</td>
              <td>{master.transferPatientsNumber}</td>
            </tr>
          </>
        )
      /**急诊 */
      default:
        return (
          <>
            <tr>
              <td rowSpan={2}>科室：</td>
              <td rowSpan={2}>{master.deptName}</td>
              <td>P班分诊人数：</td>
              <td>{master.pTriageNumber}</td>
              <td>P班出诊医生：</td>
              <td>{master.pVisitDoctorNumber}</td>
            </tr>
            <tr>
              <td>N班分诊人数：</td>
              <td>{master.nTriageNumber}</td>
              <td>N班出诊医生：</td>
              <td>{master.nVisitDoctorNumber}</td>
            </tr>
            <tr>
              <td>出车次数：</td>
              <td colSpan={3}>{master.outCarNumber}</td>
              <td>抢救次数：</td>
              <td>{master.timesOfRescue}</td>
            </tr>
            <tr>
              <td rowSpan={2}>咽拭子采集例数</td>
              <td>急诊科：</td>
              <td colSpan={2}>{master.throatSwabsCollectedNumber}</td>
              <td>发热门诊：</td>
              <td>{master.throatSwabsCollectedNumber}</td>
            </tr>
            <tr>
              <td>移动核酸工作站：</td>
              <td colSpan={2}>{master.nucleicAcidWorkstation}</td>
              <td>其他：</td>
              <td>{master.otherInfo}</td>
            </tr>
          </>
        )
    }
  }, [master])
  /**总分 */
  const totalScore: number = useMemo(() => {
    if (!master?.formItems?.length || !form1?.subFormItems?.length) return 0
    const formScore = master?.formItems.reduce((prev: any, cur: any) => prev + cur.realScore, 0)
    const subScore = form1.subFormItems.reduce((prev: any, cur: any) => prev + cur.realScore, 0)
    return formScore + subScore
  }, [master, form1])
  return (
    <Wrapper className='ctx' ref={ref}>
      <div className='table-wrapper' style={{ pointerEvents: hasSubmit() ? 'auto' : 'none' }}>
        <div className='table-title'>
          {moment(master.createTime).format("MM月DD日")}{master.wardName}护士长班查房评分表
        </div>
        <table>
          <colgroup>
            <col width="25%" />
            <col width="20%" />
            <col width="15%" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <td>值班护长：</td>
              <td>{master.S1}</td>
              <td>值班护士：</td>
              <td colSpan={3}>{master.onDutyNurseName}</td>
            </tr>
            {specialTrs}
            <tr>
              <td colSpan={2}>查房内容</td>
              <td colSpan={3}>存在问题</td>
              <td>得分</td>
            </tr>
            {
              (master?.formItems || []).map((v: Obj, i: number) => (
                <tr key={i}>
                  <td colSpan={2}>{`${v.title}(${v.totalScore}分)`}</td>
                  {i === 0 && <td colSpan={3} rowSpan={5}>
                    <TextArea
                      rows={5}
                      value={form1.roundsRecordProblem}
                      onChange={(e) =>
                        changeForm1(e, 'roundsRecordProblem')
                      }
                    />
                  </td>}
                  <td>{v.realScore}</td>
                </tr>
              ))
            }
            {
              (form1.subFormItems || []).map((v: Obj, i: number) => (
                <tr key={i}>
                  {i == 0 && <td rowSpan={3}>{`${form1.title}(${form1.totalScore}分)`}</td>}
                  <td>{v.title}</td>
                  <td colSpan={3}>
                    <Radio.Group value={v.value} onChange={(e: any) => changeForm1(e, i)}>
                      <Radio value={1}>有</Radio>
                      <Radio value={0}>无</Radio>
                    </Radio.Group>
                  </td>
                  <td>{v.value == 1 && `${v.totalScore}`}</td>
                </tr>
              ))
            }
            <tr>
              <td>存在问题</td>
              <td colSpan={4}>
                <TextArea
                  value={form1.problems}
                  onChange={(e: any) => changeForm1(e)} />
              </td>
            </tr>

            <tr>
              <td>临床工作亮点（表现优秀的科室护士）:</td>
              <td colSpan={4}>{master.excellentNurseName}</td>
              <td>总分：{totalScore}</td>
            </tr>
            <tr>
              <td colSpan={6}>
                <div style={{ display: "flex" }}>
                  <span>特殊情况记录:</span>
                  <div>{master.specialCaseRecord}</div>
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
    width: 70% ;
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
    textarea.ant-input {
      resize: none;
    }
  }  
`