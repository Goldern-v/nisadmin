import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Spin, Modal } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { appStore } from 'src/stores'
// import { qualityControlRecordEditModel as qcModel } from './model/QualityControlRecordEditModel'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
// import { qualityControlRecordApi } from './../api/QualityControlRecordApi'
import { ScrollBox } from 'src/components/common'
// import FormPannel from './components/FormPannel'
import PreviewPannel from './components/PreviewPannel'
import { navTitle } from 'src/modules/quality/data/qcTitle'

export interface Props { }

export default observer(function QualityControlRecordEdit() {
  //固定参数
  const { history, location, match } = appStore
  const search = qs.parse(location.search.replace('?', ''))
  //流程状态相关参数
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  //数据相关参数
  // const {
  //   loading,
  //   baseInfo,
  //   master,
  //   masterErrObj,
  //   itemGroupList,
  //   itemListErrObj
  // } = qcModel
  // const handleSubmit = async () => {
  //   const res = await api.saveItem({
  //     master: master,
  //     itemDataMap: form,
  //     commit: false
  //   })
  //   // await getData()
  // }

  useEffect(() => {
    // qcModel.inited(search, () => {
    //   message.error('未知表单', 2, () => history.goBack())
    // })
  }, [])

  

  return <Wrapper>
    <TopPannel>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            // {
            //   name: navTitle(baseInfo.qcLevel),
            //   link: baseInfo.qcLevel == '3' ? '/qcThree' : baseInfo.qcLevel == '2' ? '/qcTwo' : '3'
            // },
            { name: '护理查房' },
            { name: false ? "修改表单" : "新建表单" }
          ]}
        />
        <div className='topHeaderTitle'>
          <div className='title'>护士长班查房评分表</div>
          <div className="sub-title">
          </div>
          <div className='topHeaderButton'>
            <Button>暂存</Button>
            <Button type="primary">确认提交</Button>
            <Button onClick={() => history.goBack()}>返回</Button>
            {/* {step === 1 && !loading && <React.Fragment>
              <Button onClick={() => qcModel.setAllQcItemValue('是')} type="primary">全是</Button>
              {appStore.HOSPITAL_ID !== 'nys' && (
                <Button onClick={() => qcModel.setAllQcItemValue('否')} type="danger">全否</Button>
              )}
              <Button onClick={handleCache}>暂存</Button>
              <Button onClick={handleNext}>下一步</Button>
            </React.Fragment>}
            {step === 2 && !loading && <React.Fragment>
              <Button onClick={() => setStep(1)}>上一步</Button>
              <Button type="primary" onClick={handleSubmit}>确认提交</Button>
            </React.Fragment>}
            <Button onClick={() => history.goBack()}>返回</Button> */}
          </div>
        </div>
      </TopHeader>
    </TopPannel>
    <MainPannel>
      <div className="main-contain">
        <Spin spinning={loading}>
          <div className="main-content">
            {/* {step === 1 && <FormPannel />} */}
            {/* {step === 1 && <PreviewPannel setpChange={(step) => setStep(step)} />} */}
          </div>
        </Spin>
      </div>
    </MainPannel>
  </Wrapper>
})

const Wrapper = styled.div`
  .main-contain{
    margin: 0 auto;
    width: 960px;
    padding: 10px 20px;
    color: #000000;
    background: #fff;
    border: 1px solid #ddd;
    min-height: 100%;
  }
  .main-content{
    min-height: 400px;
  }
`

// @ts-ignore
const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 145px);
  padding: 20px 0;
`

const TopPannel = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
`

const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      top: 45px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
    .sub-title{
      color: #999;
      min-height: 29px;
      min-width: 10px;
      font-size: 12px;
      padding-bottom: 10px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`