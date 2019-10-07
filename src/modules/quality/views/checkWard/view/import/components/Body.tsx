import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import { Button, message, Spin } from 'antd';
import { checkWardService } from '../../../services/CheckWardService';
const BG = require('../../../../../images/顶部背景.png')

export default function Body() {
  let fileRef = React.createRef<any>();
  let [loading, setLoading] = useState(false);


  const importPlan = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const handleFileChange = (e: any) => {
    let files = e.target.files;
    if (files.length > 0) {
      let form = new FormData()
      form.set('upfile', files[0])
      setLoading(true)
      checkWardService.importSearchRoom(form).then(res => {
        console.log(form,'form0000000000')

        message.success('查房计划上传成功')
        setLoading(false)
      }, err => {
        setLoading(false)
      })
    }
  }

  const FileInput = () => {
    if (!loading) return <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    return <span style={{ display: 'none' }}></span>
  }


  return (
    <Wapper>
      <Content>
        <MainBox>
          <img src={require('../../../images/pushPlan.png')} className='img1'/>
          <div className='button'>
            <Button type="primary" onClick={importPlan}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  上传查房计划  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
            <img src={require('../../../images/import.png')} className='img2'/>
          </div>
        </MainBox>
        <Warning>
          <div className='content'>
            <p>⚠️注意：</p>
            <p>1. 上传前请下载模版，按照模版要求将查房内容填完后，再点击【上传查房计划】按钮进行导入。</p>
            <p className='explain'>2. 请设置文件名为：年度+查房类型.xls，如2019年中夜班查房计划.xls或2019年特殊查房计划。</p>
          </div>
        </Warning>
          {FileInput()}
          {/* 载入遮罩层 */}
          <div className="loading-mask" style={{ display: loading ? 'block' : 'none' }}>
            <Spin />
          </div>
      </Content>
    </Wapper>
  )
}

const Wapper = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  position: relative;
`

const Content = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  position: relative;
`
const MainBox = styled.div` 
  position: absolute;
  top: 65px;
  left: 50%;
  margin-left: -167px;
  box-sizing:border-box;
  width: 334px;
  height: 315px;
  border: 1px dashed #ccc;
  background: #fff;
  .img1{
    margin: 55px 0 25px 107px;
  }
  .button{
    text-align: center;
    position: relative;
    .img2{
      position: absolute;
      top: 7px;
      left: 110px;

    }
  }
  .content{
    margin: 30px 0 0 100px;
  }
  .explain{
    margin-left: 39px;
  }
`
const Warning = styled.div` 
  width: 580px;
  height: 80px;
  position: absolute;
  top: 420px;
  left: 50%;
  margin-left: -280px;

`
