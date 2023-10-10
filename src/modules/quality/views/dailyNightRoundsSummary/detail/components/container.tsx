import React, { forwardRef } from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'
import { Input } from 'antd'
export interface Props extends Obj {
  detail: Obj
  editList: Obj[]
  setDetail: Function,
  setEditList: Function,
  canEidit: Function
}
/**
 * 每日夜查房汇总表格
 */
export default forwardRef(function (props: Props, ref: any) {
  const { detail, editList, setEditList, canEidit,setDetail } = props
  const { birthingRoomRecord, emergencyClinicRecord, feverClinicRecord, summary, title } = detail
  const changeIpt = (e: any, index: number) => {
    const data = editList.map((v: Obj, i: number) => {
      if (i === index) {
        return { ...v, workContentAndSuggestions: e.target.value }
      }
      return v
    })
    setEditList(data)
  }
  return (
    <Wrapper className='ctx' ref={ref}>
      <div className='table-wrapper' style={{ pointerEvents: canEidit ? 'auto' : 'none' }}>
        <div className='table-title'>
          {title}
        </div>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="10%" />
            <col width="12%" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
            <col width="38%" />
          </colgroup>
          <tbody>
            <tr>
              <td colSpan={6}>入院服务中心</td>
              <td>表现优秀人员（自动获取夜查房评分表）</td>
            </tr>

            {/* <tr>
              <td colSpan={6}>发热门诊</td>
            </tr> */}
            <tr>
              {/* <td rowSpan={2}>咽拭子采集例数</td>
              <td rowSpan={2}>{feverClinicRecord?.throatSwabsCollectedNumber}</td>
              <td>P班分诊人数</td>
              <td>{feverClinicRecord?.pTriageNumber}</td>
              <td>P班出诊医生人数</td>
              <td>{feverClinicRecord?.pVisitDoctorNumber}</td> */}
              <td colSpan={6}>8时到22时30分办理入院总人数：{feverClinicRecord?.processedPatient}</td>
              <td rowSpan={9}>{[feverClinicRecord?.excellentNurseName, emergencyClinicRecord?.excellentNurseName, birthingRoomRecord?.excellentNurseName].filter(v => v).join('、')}</td>
            </tr>
            {/* <tr>
              <td>N班分诊人数</td>
              <td>{feverClinicRecord?.nTriageNumber}</td>
              <td>N班出诊医生人数</td>
              <td>{feverClinicRecord?.nVisitDoctorNumber}</td>
            </tr>
            <tr>
              <td>移动核酸工作站</td>
              <td>{feverClinicRecord?.nucleicAcidWorkstation}</td>
              <td>出车次数</td>
              <td>{feverClinicRecord?.outCarNumber}</td>
              <td>抢救次数</td>
              <td>{feverClinicRecord?.timesOfRescue}</td>
            </tr> */}
            <tr>
              <td colSpan={6}>急诊</td>
            </tr>
            <tr>
              {/* <td rowSpan={2}>咽拭子采集例数</td>
              <td rowSpan={2}>{emergencyClinicRecord?.throatSwabsCollectedNumber}</td> */}
              <td colSpan={2}>P班分诊人数</td>
              <td>{emergencyClinicRecord?.pTriageNumber}</td>
              <td colSpan={2}>N班分诊人数</td>
              <td>{emergencyClinicRecord?.nTriageNumber}</td>
            </tr>
            <tr>
              <td colSpan={2}>P班出诊医生人数</td>
              <td>{emergencyClinicRecord?.pVisitDoctorNumber}</td>
              <td colSpan={2}>N班出诊医生人数</td>
              <td>{emergencyClinicRecord?.nVisitDoctorNumber}</td>
            </tr>
            <tr>
              {/* <td>移动核酸工作站</td>
              <td>{emergencyClinicRecord?.nucleicAcidWorkstation}</td> */}
              <td colSpan={2}>出车次数</td>
              <td>{emergencyClinicRecord?.outCarNumber}</td>
              <td colSpan={2}>出车次数</td>
              <td>{emergencyClinicRecord?.outCarNumberN}</td>
            </tr>
            <tr>
              <td colSpan={2}>抢救次数</td>
              <td>{emergencyClinicRecord?.timesOfRescue}</td>
              <td colSpan={2}>抢救次数</td>
              <td>{emergencyClinicRecord?.timesOfRescueN}</td>
            </tr>
            <tr>
              <td colSpan={6}>妇产科急诊</td>
            </tr>
            <tr>
              <td>P班接诊人数</td>
              <td>{birthingRoomRecord?.pTriageNumber}</td>
              <td>N班接诊人数</td>
              <td>{birthingRoomRecord?.nTriageNumber}</td>
              <td>胎监人数</td>
              <td>{birthingRoomRecord?.fetalSupervisorsNumber}</td>
            </tr>
            <tr>
              <td>入院人数：</td>
              <td>{birthingRoomRecord?.admittedPatientsNumber}</td>
              <td>转运入院人数：</td>
              <td>{birthingRoomRecord?.transferPatientsNumber}</td>
              <td>留观人数：</td>
              <td>
                <Input value={birthingRoomRecord?.visitors} 
                  onChange={(e)=>{
                    let _detail = JSON.parse(JSON.stringify(detail))
                    if (_detail.birthingRoomRecord) {
                      _detail.birthingRoomRecord.visitors = e.target.value;
                    }
                    // _detail.birthingRoomRecord.visitors = e.target.value
                    setDetail(_detail)
                  }}/>
              </td>
            </tr>
            <tr>
              <td colSpan={7}>住院科室信息统计</td>
            </tr>
            <tr>
              <td rowSpan={2}>科室</td>
              <td rowSpan={2}>在院人数</td>
              {/* <td rowSpan={2}>陪护人数</td> */}
              <td colSpan={2}>特殊病情人数</td>
              {/* <td rowSpan={2}>咽拭子采集例数</td> */}
              <td rowSpan={2} colSpan={3}>特殊情况（获取查房表数据）</td>
            </tr>
            <tr>
              <td>危重</td>
              <td>Ⅰ级护理</td>
            </tr>
            {
              editList.map(((v: Obj, i: number) => (
                <tr key={i}>
                  <td>{v.deptName}</td>
                  <td>{v.patientNum}</td>
                  {/* <td>{v.carersNum}</td> */}
                  <td>{v.criticalPatients}</td>
                  {/* <td>{v.levelOneCaregiver}</td> */}
                  <td>{v.throatSwabsCollectedNumber}</td>
                  <td colSpan={3}>{v.specialCaseRecord}</td>
                </tr>
              )))
            }
            <tr>
              <td colSpan={7}>
                <div>工作内容及建议</div>
                {
                  editList.map((v: Obj, i: number) => {
                   return v.workContentAndSuggestions && ( 
                    <div className='d-flex' key={i}>
                      <div>{v.deptName}:</div>
                      <div>{v.workContentAndSuggestions}</div>
                      {/* <Input.TextArea
                        value={v.workContentAndSuggestions}
                        onChange={(e) => changeIpt(e, i)} /> */}
                    </div>)
                  })
                }
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