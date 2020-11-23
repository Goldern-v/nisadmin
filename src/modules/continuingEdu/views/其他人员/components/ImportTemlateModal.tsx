import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal } from 'antd'
import ImportEditModal from './ImportEditModal'
import { otherEmpService } from './../api/OtherEmpService'

export interface Props {
  visible?: boolean,
  onCancel?: Function,
  onOk?: Function,
}

export default function ImportTemlateModal(props: Props) {
  const { visible, onCancel, onOk } = props
  let fileRef = React.createRef<any>()
  let [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [importData, setImportData] = useState({} as any)
  const [editVisible, setEditVisible] = useState(false)

  const handleDownload = (type: string) =>
    otherEmpService.getTemplate(type)

  const handleUploadBtn = () => {
    if (loading) return

    if (fileRef.current)
      fileRef.current.click()
  }

  const handleFileChange = (e: any) => {
    let files = e.target.files
    if (files.length > 0) {
      let form = new FormData()
      form.set('file', files[0])

      setLoading(true)

      otherEmpService
        .importPersonsTemporarily(form)
        .then(res => {
          setModalVisible(false)
          setLoading(false)
          setImportData(res.data)
          setEditVisible(true)
        }, () => setLoading(false))
    }
  }

  useEffect(() => {
    setModalVisible(!!visible)
  }, [visible])

  const FileInput = () => {
    if (!loading)
      return <input
        type="file"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={handleFileChange}
        accept=".xls" />

    return <span style={{ display: 'none' }}></span>
  }

  return <React.Fragment>
    <Modal
      title="批量导入"
      width={800}
      visible={modalVisible}
      footer={null}
      centered
      onCancel={() => onCancel && onCancel()}>
      <Wrapper>
        <div className="content">
          <div className="upload-box">
            <div className="upload-btn" onClick={handleUploadBtn}>
              {loading && <Icon type="loading" style={{ marginRight: '10px' }} />}
              立刻上传
            </div>
            <div className="desc">
              <span>说明：</span>
              <span className="desc-content">
                <span>
                  1. 上传前请下载
                  <span
                    title="实习生"
                    onClick={() => handleDownload('1')}
                    style={{ cursor: 'pointer', color: '#00f' }}>
                    人员信息模板一
                  </span>、
                  <span
                    title="进修生"
                    onClick={() => handleDownload('2')}
                    style={{ cursor: 'pointer', color: '#00f' }}>
                    人员信息模板二
                  </span>、
                  <span
                    title="文员、试用人员等其他人员"
                    onClick={() => handleDownload('3')}
                    style={{ cursor: 'pointer', color: '#00f' }}>
                    人员信息模板三
                  </span>，
                  按照模版要求将内容填完后，再点击上方按钮进行导入。
                </span>
                <br />
                <span>2. 导入实习生信息请下载"人员信息模板一"；导入进修生信息请下载"人员信息模板二"；导入文员、试用人员等其他人员信息请下载"人员信息模板三"。</span>
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </Modal>
    <ImportEditModal
      visible={editVisible}
      params={importData}
      onCancel={() => {
        setEditVisible(false)
        onCancel && onCancel()
      }}
      onOk={() => {
        setEditVisible(false)
        setModalVisible(false)
        onOk && onOk()
      }} />
    {FileInput()}
  </React.Fragment>
}
const Wrapper = styled.div`
  position: relative;
  width: 752px;
  height: 300px;
  .upload-box{
    width: 700px;
    height: 250px;
    padding: 0 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    border: 2px dashed #ccc;
    background: #fff;

    .upload-btn{
      width: 200px;
      height: 60px;
      line-height: 60px;
      margin: 10px auto;
      background-color: rgba(0, 166, 128, 1);
      color: #fff;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 40px;
      transition: background-color .2s;
      :hover{
        background-color: rgba(0, 166, 128, 0.6);
      }
      :active{
        background-color: rgba(0, 166, 128, 1);
      }
    }

    .desc{
      cursor: default;
      margin-top: 40px;
      display: flex;
      &>span{
        display:block;
        &.desc-content{
          flex: 1;
        }
      }
    }
  }
`