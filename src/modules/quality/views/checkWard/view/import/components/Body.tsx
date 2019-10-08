import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { appStore } from 'src/stores'
import { Button, message, Spin, Icon, Modal } from 'antd';
import { checkWardService } from '../../../services/CheckWardService';
const BG = require('../../../../../images/顶部背景.png')
const imoprtSuccess = require('../../../images/imoprtSuccess.png')
const importError = require('../../../images/importError.png')
const goto = require('../../../images/goto.png')

export default function Body() {
  let fileRef = React.createRef<any>();
  let [loading, setLoading] = useState(false);
  let [total, setTotal] = useState(0); // 导入的总条数
  let [type, setType] = useState(1); // 1-导入前 2 -导入中 3-导入成功 4-导入失败


  const importPlan = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  // 导入查房统计模块
  const toImport = (files: any) => {
    setType(2)
    let form = new FormData()
    form.set('upfile', files[0])
    setLoading(true)
    console.log(form, 'form', files)
    checkWardService.importSearchRoom(form).then(res => {
      message.success('查房计划上传成功')
      setType(3)
      setTotal(res.data || 0)
      setLoading(false)
    }, err => {
      setType(4)
      setLoading(false)
    })
  }

  // 查询查房计划上传资料记录
  const handleFileChange = (e: any) => {
    let files = e.target.files;
    console.log(files, 'filesfilesfiles')
    if (files.length > 0) {
      let name = files[0].name
      checkWardService.listSearchRoomImport().then(res => {
        let isTips = false
        if (res.data && res.data.length > 0) {
          for(let i = 0; i < res.data.length; i++) {
            if (res.data[i].name === name) {
              isTips = true
            }
            break
          }
          if (isTips) {
            Modal.confirm({
              title: '提示',
              content: '已存在该文件的上传记录，将会覆盖之前计划内容，是否继续？',
              okText: '确认',
              cancelText: '取消',
              centered: true,
              maskClosable: true,
              onOk: () => toImport(files),
              onCancel: () => {
                e.target.files = ''
              }
            })
          } else {
            toImport(files)
          }
        } else {
          toImport(files)
        }
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
          {
            type === 1 ? <div>
              <img src={require('../../../images/pushPlan.png')} className='img1'/>
              <div className='button'>
                <Button type="primary" onClick={importPlan}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  上传查房计划  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                <img src={require('../../../images/import.png')} className='img2'/>
              </div>
            </div> : (
              type ===  2 ? <div>
                <Icon type="loading"></Icon>
                <div>正在上传中，请稍后……</div>
              </div> : (
                type === 3 ? <div>
                  <img src={imoprtSuccess} className='img3'/>
                  <div>导入成功，共导入{total}条查房计划。</div>
                </div> : <div>
                  <img src={importError} className='img4'/>
                  <div>导入失败，请重新上传文件</div>
                  <Button type="primary" onClick={importPlan}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  上传查房计划  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                  <Button type="primary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  返回  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </div>
              )
            )
          }
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
