import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Form1 from './form1'
import Form2 from './form2'
import Form3 from './form3'
import Form4 from './form3' // 表4和表3的内容字段都一样
import Form5 from './form3' // 表5和表3的内容字段都一样
import Form6 from './form3' // 表6和表3的内容字段都一样
import Form7 from './form3' // 表7和表3的内容字段都一样
import Form8 from './form8'
import Form9 from './form9'
import Form10 from './form10'
import Form11 from './form11'
import PatientDialog from "src/modules/indicator/selfDeclaration/components/patientDialog";
import formModel from "src/modules/indicator/selfDeclaration/components/editPage/model";

interface Props {
  formCode: string,
}

export default observer((props: Props) => {
  const [patientVisible, setPatientVisible] = useState(false)

  const handlePatientSelect = (item: any) => {
    setPatientVisible(false)
    formModel.setMaster(item)
  }

  const handlePatientClick = () => {
    setPatientVisible(true)
  }

  const getForm = () => {
    switch (props.formCode) {
      case 'R0001':
        return <Form1 handlePatientClick={handlePatientClick}/>
      case 'R0002':
        return <Form2 handlePatientClick={handlePatientClick}/>
      case 'R0003':
        return <Form3 handlePatientClick={handlePatientClick}/>
      case 'R0004':
        return <Form4 handlePatientClick={handlePatientClick}/>
      case 'R0005':
        return <Form5 handlePatientClick={handlePatientClick}/>
      case 'R0006':
        return <Form6 handlePatientClick={handlePatientClick}/>
      case 'R0007':
        return <Form7 handlePatientClick={handlePatientClick}/>
      case 'R0008':
        return <Form8 handlePatientClick={handlePatientClick}/>
      case 'R0009':
        return <Form9 handlePatientClick={handlePatientClick}/>
      case 'R0010':
        return <Form10 handlePatientClick={handlePatientClick}/>
      case 'R0011':
        return <Form11 handlePatientClick={handlePatientClick}/>
    }
  }

  useEffect(() => {
  })

  return (
    <Wrapper>
      {getForm()}
      {/* 患者弹窗 */}
      <PatientDialog
        visible={patientVisible}
        onOk={handlePatientSelect}
        onCancel={() => setPatientVisible(false)}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  
`