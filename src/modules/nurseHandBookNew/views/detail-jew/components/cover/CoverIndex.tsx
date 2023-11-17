import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Input} from 'antd'
import {observer} from 'mobx-react'
import {nurseHandbookRecordModel as model} from "src/modules/nurseHandBookNew/views/detail-jew/model";
import {appStore} from "src/stores";
import cloneDeep from "lodash/cloneDeep";


/**护士长手册封面 */
export default observer(function () {
    const [coverType, setCoverType] = useState(1)
    const onChange = (e: any, key: string) => {
        const newData = cloneDeep(model.editorData)
        newData[key] = e.target.value
        model.handleEditorChange(newData)
    }
    useEffect(() => {
        const {type} = appStore.queryObj
        setCoverType(Number(type))
    }, [appStore.location.pathname])
    const getElement = () => {
        switch (coverType) {
            case 1:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面1.jpg')} alt=''/>
                    <Input className='coverYear1' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept1' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName1' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 2:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面2.jpg')} alt=''/>
                    <Input className='coverYear2' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept2' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName2' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 3:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面3.jpg')} alt=''/>
                    <Input className='coverYear3' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept3' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName3' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 4:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面4.jpg')} alt=''/>
                    <Input className='coverYear4' onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept4' onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName4' onChange={e => onChange(e, 'v3')}/>
                </div>
            case 5:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面5.jpg')} alt=''/>
                    <Input className='coverYear5' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept5' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName5' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 6:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面6.jpg')} alt=''/>
                    <Input className='coverYear6' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept6' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName6' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 7:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面7.jpg')} alt=''/>
                    <Input className='coverYear7' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept7' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName7' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 8:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/护士长手册封面8.jpg')} alt=''/>
                    <Input className='coverYear' value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    <Input className='coverDept' value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    <Input className='coverEmpName' value={model.editorData.v3} onChange={e => onChange(e, 'v3')}/>
                </div>
            case 9:
                return <div className='coverContainer'>
                    <img className='imgBg' src={require('./assets/zjhj-1.png')} alt=''/>
                    <div className='zjhjCoverYear'>
                       <div>科室:</div><Input value={model.editorData.v1} onChange={e => onChange(e, 'v1')}/>
                    </div>
                    <div className='zjhjCoverDept'>
                        <div>年份:</div><Input value={model.editorData.v2} onChange={e => onChange(e, 'v2')}/>
                    </div>

                </div>
            default :
                return <div></div>
        }
    }
    return (
        <Wrapper ref={model.ctxRef} style={{pointerEvents: model.allowEdit ? 'auto' : 'none'}}>
            {getElement()}
        </Wrapper>
    )
})

const Wrapper = styled.div`
  width: 675px;
  margin: 0 auto;

  .coverContainer {
    position: relative;
  }

  .imgBg {
    width: 100%;
    height: 95vh;
  }

  .zjhjCoverDept {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 21%;
    left: 29%;
    //width: 320px;
    font-size: 30px;
    font-weight: bold;
    div{
      width: 110px;
      font-weight: 600;
    }
    .ant-input {
      font-size:30px;
      font-weight: 600;
      height: 45px;
      border: none;
      background: transparent;
      outline: none;
      box-shadow: none;
    }
  }

  .zjhjCoverYear {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 30%;
    left: 29%;
    //width: 320px;
    font-size: 30px;
    font-weight: bold;
    div{
      width: 110px;
      font-weight: 600;
    }
    .ant-input {
      font-size:30px;
      font-weight: 600;
      border: none;
      background: transparent;
      outline: none;
      box-shadow: none;
      height: 45px;
    }
  }

  .coverYear {
    position: absolute;
    bottom: 37%;
    left: 40%;
    width: 246px;
    font-size: 30px;
    font-weight: bold;
  }

  .coverYear1 {
    position: absolute;
    bottom: 27%;
    left: 63%;
    width: 246px;
  }

  .coverYear2 {
    position: absolute;
    bottom: 30%;
    left: 48%;
    width: 246px;
  }

  .coverYear3 {
    position: absolute;
    bottom: 29%;
    left: 48%;
    width: 246px;
  }

  .coverYear4 {
    position: absolute;
    bottom: 60%;
    left: 41%;
    width: 246px;
  }

  .coverYear5 {
    position: absolute;
    bottom: 15%;
    left: 41%;
    width: 246px;
  }

  .coverYear6 {
    position: absolute;
    bottom: 12.5%;
    left: 41%;
    width: 246px;
  }

  .coverYear7 {
    position: absolute;
    bottom: 27%;
    left: 42.5%;
    width: 246px;
  }

  .coverDept {
    position: absolute;
    bottom: 31%;
    left: 40%;
    width: 246px;
  }

  .coverDept1 {
    position: absolute;
    bottom: 23%;
    left: 63%;
    width: 246px;
  }

  .coverDept2 {
    position: absolute;
    bottom: 25%;
    left: 48%;
    width: 246px;
  }

  .coverDept3 {
    position: absolute;
    bottom: 24%;
    left: 48%;
    width: 246px;
  }

  .coverDept4 {
    position: absolute;
    bottom: 55%;
    left: 41%;
    width: 246px;
  }

  .coverDept5 {
    position: absolute;
    bottom: 11.5%;
    left: 41%;
    width: 246px;
  }

  .coverDept6 {
    position: absolute;
    bottom: 9%;
    left: 41%;
    width: 246px;
  }

  .coverDept7 {
    position: absolute;
    bottom: 19.5%;
    left: 42.5%;
    width: 246px;
  }

  .coverEmpName {
    position: absolute;
    bottom: 26%;
    left: 40%;
    width: 246px;

  }

  .coverEmpName1 {
    position: absolute;
    bottom: 19%;
    left: 63%;
    width: 246px;
  }

  .coverEmpName2 {
    position: absolute;
    bottom: 20%;
    left: 48%;
    width: 246px;
  }

  .coverEmpName3 {
    position: absolute;
    bottom: 19%;
    left: 48%;
    width: 246px;
  }

  .coverEmpName4 {
    position: absolute;
    bottom: 50%;
    left: 41%;
    width: 246px;
  }

  .coverEmpName5 {
    position: absolute;
    bottom: 8%;
    left: 41%;
    width: 246px;
  }

  .coverEmpName6 {
    position: absolute;
    bottom: 5.5%;
    left: 41%;
    width: 246px;
  }

  .coverEmpName7 {
    position: absolute;
    bottom: 11.5%;
    left: 42.5%;
    width: 246px;
  }

  .ant-input {
    font-size: 20px;
    font-weight: 600;
    border: none;
    background: transparent;
    outline: none;
    box-shadow: none;
  }
`