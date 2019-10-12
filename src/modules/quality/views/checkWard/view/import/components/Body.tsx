import styled from 'styled-components'
import React, { useState } from 'react'
import { appStore } from 'src/stores'
import { Button, message, Spin, Icon, Modal } from 'antd';
import { checkWardService } from '../../../services/CheckWardService';
import { scheduleViewModal } from '../../schedule/ScheduleViewModal';
const imoprtSuccess = require('../../../images/imoprtSuccess.png')
const importError = require('../../../images/importError.png')

export default function Body() {
  let fileRef = React.createRef<any>();
  let [loading, setLoading] = useState(false);
  let [searchRoomType, setSearchRoomType] = useState('');
  let [time, setTime] = useState('');
  let [total, setTotal] = useState(0); // 导入的总条数
  let [type, setType] = useState(1); // 1-导入前 2 -导入中 3-导入成功 4-导入失败

  //上传查房计划
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
      scheduleViewModal.onload()
      setType(3)
      setTotal(res.data.num || 0)
      setSearchRoomType(res.data.searchRoomType)
      setTime(res.data.time)
      setLoading(false)
    }, err => {
      setType(4)
      setLoading(false)
    })
  }

  // 查询查房计划上传资料记录
  const handleFileChange = (e: any) => {
    let files = e.target.files;
    if (files.length > 0) {
      let name = files[0].name
      checkWardService.listSearchRoomImport().then(res => {
        let isTips = false
        if (res.data && res.data.length > 0) {
          for(let i = 0; i < res.data.length; i++) {
            console.log(res.data[i].name, name)
            if (res.data[i].name == name) {
              isTips = true
              break
            }
          }
          console.log(isTips, res.data, name)
          if (isTips) {
            Modal.confirm({
              title: '提示',
              content: '已存在该文件的上传记录，将会覆盖之前计划内容，是否继续？',
              okText: '确认',
              cancelText: '取消',
              centered: true,
              maskClosable: true,
              onOk: () => toImport(files),
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

  //推送查房计划表
  const pushPlan = () => {
    Modal.confirm({
      title: '提示',
      content: '确定需要推送查房计划表信息吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        scheduleViewModal.statusAll && scheduleViewModal.statusAll.map(((item: any) => {
          item.status = 1
        }))
        let params = {
          time: time,
          type: searchRoomType
        }
        checkWardService.pushPlan(params).then((res) => {
          message.success('推送成功！')
        })
      }
    })
  }


  const FileInput = () => {
    if (!loading) return <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={handleFileChange} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    return <span style={{ display: 'none' }}></span>
  }


  return (
    <Wrapper>
      <Content>
        <MainBox>
          {
            type === 1 ? <div>
              <img src={require('../../../images/pushPlan.png')} className='img1'/>
              <div className='button'>
                <Button type="primary" onClick={importPlan}><span className='leftMargin'></span>上传查房计划<span className='rightMargin'></span></Button>
                <img src={require('../../../images/import.png')} className='img2'/>
              </div>
            </div> : (
              type ===  2 ? <div>
                <Icon type="loading" style={{ fontSize: 100, margin: '75px 117px 30px 117px', color: '#00A680' }}></Icon>
                <div className='worldContent'>正在上传中，请稍后……</div>
              </div> : (
                type === 3 ? <div>
                  <img src={imoprtSuccess} className='img3'/>
                  <div className='worldContent'>导入成功，共导入{total}条查房计划。</div>
                  <div className='button button1'>
                    <Button type="primary" onClick={pushPlan}>
                      <span className='leftMargin'></span>推送查房计划<span className='rightMargin'></span>
                    </Button>
                    <img src={require('../../../images/goto.png')} className='img2 img0'/>
                  </div>
                  <div className='button'>
                    <Button onClick={() => {appStore.history.push(`/quality/checkWard/schedule`)}}>
                      <span className='leftMargin1'></span>返回<span className='rightMargin1'></span>
                    </Button>
                  </div>
                </div> : <div>
                  <img src={importError} className='img4'/>
                  <div className='worldContent'>导入失败，请重新上传文件</div>
                  <div className='button button1'>
                    <Button type="primary" onClick={importPlan}>
                      <span className='leftMargin'></span>上传查房计划<span className='rightMargin'></span>
                    </Button>
                    <img src={require('../../../images/import.png')} className='img2'/>
                  </div>
                  <div className='button'>
                    <Button onClick={() => {appStore.history.push(`/quality/checkWard/schedule`)}}>
                      <span className='leftMargin1'></span>返回<span className='rightMargin1'></span>
                    </Button>
                  </div>
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
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div` 
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
  min-width: 700px;
  overflow: auto;
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
  .img1,.img3,.img4{
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
    .img0{
      top: 8px !important;
    }
  }
  .content{
    margin: 30px 0 0 100px;
  }
  .explain{
    margin-left: 39px;
  }
  .worldContent{
    text-align: center;
  }
  .button1{
    margin: 30px 0 10px 0;
  }
  .img4,.img3{
    margin-top: 30px !important;
    margin-bottom: 5px !important;
  }
  .leftMargin{
    width: 45px;
  }
  .rightMargin{
    width: 20px;
  }
  .leftMargin1{
    width: 59px;
  }
  .rightMargin1{
    width: 59px;
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
