import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Button, Spin, message as Message,  Icon, Input } from 'antd'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import FullPageLoading from 'src/components/loading/FullPageLoading'

import CKEditor from 'ckeditor4-react'
import { nursingHandlerApi } from '../../api/NursingHandlerApi';
import { planDatas } from './planData';
import { Prompt } from 'react-router-dom'

CKEditor.editorUrl = `ckeditor/ckeditor.js`

// const Option = Select.Option
export default observer(function CKEditorFn(props) {
	let editorData = planDatas.contentDetail.content || ''
	const [isSave, setIsSave] = useState(false);//数据是否被保存了
	// const [editorLoading, setEditorLaoding] = useState(false)
	const [videoUploadVisible, setVideoUploadVisible] = useState(false)

	const filebrowserUploadUrl =
		`/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`
	const filebrowserHtml5videoUploadUrl =
		`/crNursing/api/briefMission/uploadPicture?App-Token-Nursing=${appStore.appToken}&Auth-Token-Nursing=${authStore.authToken}`

	const videoUploadId = 'customVideoUpload'

	const editorRef = useRef()

	const [params, setParams] = useState({
		// missionId: '', //宣教id (修改用)
		// deptCode: '', //科室代码
		// deptName: '', //科室名称
		// publicUse: '0', //是否公用 公用：1，非公用：0
		// type: '', //宣教类型
		// content: '', //内容
		name: '', //宣教名称
		// creator: '', //创建人工号
		// creatorName: '', //创建人名字
		// creatDate: '', //创建时间
		// templateCode: '', //推送类型
		// templateName: '' //推送类型名称
	})
	const [title, setTitle] = useState(planDatas.contentDetail.title);

	// const [content, setContent] = useState(planDatas.contentDetail.content);
	const handleEditorChange = (evt) => {
		// setEditorData(evt.editor.getData())
		editorData = evt.editor.getData()
	}


	useEffect(() => {
		// initAuth()
		// initData()
		// debugger
		// console.log(planDatas.contentItem)
		// console.log(planDatas.contentDetail)
		// updateContent()
		setTitle(planDatas.contentDetail.title)
	}, [planDatas.contentDetail])

	// const updateContent = ()=>{

	//   setEditorData(planDatas.contentDetail.content)
	//   console.log(editorData)
	// }



	// let requestFlag = false


	// useEffect(() => {
	// 	return () => {
	// 		requestFlag = false
	// 	}
	// }, [])

	const customVideoUpload = () => {
		setVideoUploadVisible(false)

		new Promise((resolve) => {
			setVideoUploadVisible(true)
			resolve()
		}).then(() => {
			let el = document.getElementById(videoUploadId)
			if (el) el.click()
		})
	}

	const handleVideoUpload = (e) => {
		// let file = e.target.files[0]

		appStore.openFullLoadingBar({
			aside: '正在上传，请稍候',
			progress: '0%',
			isFullpage: true
		})
	}
	/**
	 * 0保存 1提交，必传
	 * @param {string} status 
	 */
	const saveContent = (status) => {
		// console.log(planDatas.contentItem)
		let paramter = {
			id: planDatas.contentDetail.id,
			// status: planDatas.contentDetail.status,
			title: title,
			content: editorData,
			status: status,
		}
		// 有附件
		if(planDatas.attchList.length>0){
			paramter.attachmentIds = ''
			planDatas.attchList.forEach((it,idx)=> {
				paramter.attachmentIds+=it.id
				if(idx<planDatas.attchList.length-1){
					paramter.attachmentIds+=','
				}
			})
		}
		nursingHandlerApi.recordSave(paramter).then(res => {
			if (res.code === '200') {
				if(status>0){
					// 就是提交
					
					planDatas.contentDetail = {}
					planDatas.contentItem = {id:null,content:'',status:null}
					planDatas.attchList = []
					planDatas.getList(planDatas.contentDetail.id)
				}else{
					// 暂存，啥都不管
					setIsSave(true)
				}
				
				Message.success('保存成功')
				
				// planDatas.modalVisible = false
			} else {
				Message.error(res.desc)
			}
		}).catch(err => {

		})
	}



	useLayoutEffect(() => {
		setTimeout(() => {
			let videoBtnEl = document.getElementsByClassName('cke_button__html5video')[0]

			if (videoBtnEl)
				videoBtnEl.onclick = () => customVideoUpload()
		}, 1000)
		return () => {
			let videoBtnEl = document.getElementsByClassName('cke_button__html5video')[0]
			if (videoBtnEl) videoBtnEl.onclick = null
		};
	}, [])

	// 上传附件
	const handleUploading = () => {
		let importElId = 'sxslrb_import_file_el'
		let lastEl = document.getElementById('importElId')
		if (lastEl) document.body.removeChild(lastEl)

		let importEl = document.createElement('input')
		importEl.id = importElId
		importEl.style.display = 'none'
		importEl.type = 'file'
		importEl.onchange = (e) => {
			let file = e.target.files[0]
			nursingHandlerApi.nurseHandBookAttachment(file)
				.then(res => {
					// this.contentDetail.content = res.data
					if (res.code === '200') {
						if (res.data.id) {
							// 附件列表
							planDatas.attchList.push(res.data)
						}

					}
				}).catch(err => {
				})
			document.body.removeChild(importEl)
		}
		document.body.appendChild(importEl)
		importEl.click()

	}

	return <Wrapper>
		{/* <Button className='back' onClick={() => history.goBack()}>
      <Icon type='double-left' className='icon-back' />
      返回
    </Button> */}
		<Prompt when={!isSave} message={() => '数据还未保存，是否要离开？'} />
		<div className='btn-list'>
			<div className="btn-list-left">
				<Button className='mr-15' onClick={() => planDatas.importEditor()}>导入</Button>
				<Button onClick={() => planDatas.exportEditor()}>导出</Button>
			</div>
			<div className="btn-list-right">
				{planDatas.contentDetail.status === 0 && <Button className='mr-15' type="primary" onClick={() => saveContent('0')}>暂存</Button>}
				<Button className='mr-15' type="primary" onClick={() => saveContent('1')}>提交</Button>
				{/* <Button className='mr-15' onClick={() => history.goBack()}>打印</Button> */}
				<Button onClick={() => { planDatas.delItem() }} type="danger">删除</Button>
			</div>
		</div>
		{/* <TemplatesPannel onSelect={handleHtmlInsert} /> */}
		<div className="editor-warpper">
			<div className="editor-contain">
				<Spin spinning={planDatas.detailLoading}>
					<Input.TextArea className="title-input" autosize placeholder='请输入标题'
						value={title}
						onChange={(e) => { setParams({ ...params, name: e.target.value }); setTitle(e.target.value) }}
					/>
					<div className="hr"></div>
					<CKEditor 
						ref={editorRef}
						data={editorData}
						onChange={handleEditorChange}
						config={{
							extraPlugins: 'stylesheetparser,colorbutton,colordialog,html5video',
							removePlugins: 'easyimage,cloudservices',
							filebrowserUploadUrl,
							filebrowserHtml5videoUploadUrl,
							height: 600,
							title: ''
						}}
					/>
					<FileBox>
						{planDatas.attchList.length<3 && <div className='attch-title'>
							<Button type="primary" icon="upload" onClick={handleUploading}>上传附件</Button>
							<span className='upload-subtext'>支持格式："图片；".pdf;"".doc;"".docx;"".ppt;"".pptx;"".xls;"".xlsx;"".mp4"</span>
						</div>}
						{planDatas.attchList.length>0 && <div className='attch-title' >附件<Icon type="link" /></div>}
						<div className='attch-file-list'>
							{planDatas.attchList.map(it=>{
								return (<a href={it.path} key={it.id} download={it.name}>{it.name}</a>)
							})}
						</div>
						{/* ) : (
              <div className="file-box__item">
                {getFileType(teachingPost.uploadingPath) == "img" ? (
                  <Zimage
                    src={teachingPost.uploadingPath}
                    className="type-img"
                    alt=""
                  />
                ) : (
                  <img
                    src={getFilePrevImg(teachingPost.uploadingPath)}
                    className="type-img"
                    alt=""
                  />
                )}
                <div className="name">{teachingPost.uploadingName}</div>
                <div className="butName">
                  <Button style={{width:'80px' ,margin:'20px'}} onClick={()=>{setEditVisible(false)
                  teachingPost.uploadingStatus = false }}>取消</Button>
                  <Button style={{width:'80px' ,margin:'20px'}} onClick={handleOk} type="primary">提交</Button>
                </div>
              </div>
            )} */}
					</FileBox>
				</Spin>
			</div>
		</div>
		{/* <div className="bottom">
      <span className='title'>科室权限:</span>
      <span>
        <Select
          className='dept-select'
          value={params.deptCode}
          onChange={handleDeptSelect}
          defaultValue={params.deptCode}
        >
          <Option value='000000'>公共</Option>
          {authStore.deptList.map((item) => (
            <Option value={item.code} key={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </span>
      <span className='title'>类别:</span>
      <span>
        <Select className='type-select' onChange={handleTypeChange} value={params.type}>
          {typeList.map((item) => (
            <Option value={item.type} key={item.id}>
              {item.type}
            </Option>
          ))}
        </Select>
      </span>
      <span className='float-right'>
        <Button onClick={saveEdit} type='primary'>
          保存
        </Button>
        <Button onClick={handleCancel}>取消</Button>
      </span>
    </div> */}
		{videoUploadVisible && <input id={videoUploadId} type="file" accept="video/*" onChange={(e) => handleVideoUpload(e)} />}
		{appStore.fullLoadingBarObj && <FullPageLoading />}
	</Wrapper>
})

const scrollBarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-track {
    background-color: #ddd;
  }
`

const Wrapper = styled.div`
  width:100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  .cke_contents{
    height: calc(100vh - 450px) !important;
  }
  .btn-list{
	display: flex;
	justify-content: space-between;
	.mr-15{
		margin-right: 15px;
	}
  }
  /* position:fixed; */
  /* top: 0; */
  .editor-warpper{
    /* padding: 20px 0; */
    /* background: #eee; */
    overflow: auto;
    /* position: absolute; */
    /* top: 0; */
    /* left: 0; */
    /* bottom: 45px; */
    width: 100%;
    ${scrollBarStyle}
    .editor-contain{
      /* padding: 20px; */
      background: #fff;
      /* border: 1px solid #ddd; */
      /* width: 760px; */
      min-height: 500px;
      margin: 0 auto;
      .title-input{
        line-height: 30px !important;
        font-size: 22px !important;
        font-weight: bold !important;
        text-align: center;
        border: 0 !important;
        outline: none !important;
        box-shadow: none !important;
        font-family: 'braft-icons' !important;
        resize: none;

      }
      .hr{
        margin: 10px 0;
        /* margin-bottom: 20px; */
        border-bottom: 1px dashed #aaa;
      }
    }
  }
  .back {
      /* position: absolute; */
      /* left: 10px; */
      /* top: 6px; */
      z-index:1;
      .icon-back {
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        color: #c0cbce;
        position: absolute;
        left: 6px;
        top: 7px;
      }
      &:hover {
        .icon-back {
          color: #1db38b;
        }
      }
    }
  .bottom {
    background: rgba(0, 0, 0, 0.015);
    border-top: 1px solid #ddd;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 45px;
    & > span {
      margin-left: 8px;
      display: inline-block;
      vertical-align: middle;
      line-height: 45px;
      height: 45px;
      &.title {
        margin-left: 15px;
      }
      & > .ant-btn {
        margin-left: 8px;
      }
      .dept-select {
        min-width: 150px;
      }
      .type-select {
        min-width: 100px;
      }
    }
    .float-right {
      margin-right: 15px;
      float: right;
    }
  }
`

const FileBox = styled.div`
/* 附件 */
.attch-title{
	margin-top: 10px;
	.upload-subtext{
		font-size: 12px;
		margin-left:10px;
		color: #999;
	}
}
.attch-file-list{
	margin-top: 5px;
        a{
            font-size: 12px;
            display: block;
            line-height: 1.1;
        }
    }
  .file-box__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top:30px;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 40px;
    }
    .butName{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;