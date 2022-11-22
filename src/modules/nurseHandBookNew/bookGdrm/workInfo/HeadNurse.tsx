import styled from 'styled-components'
import React, { Component, useState, useEffect } from 'react'
import { Icon, Empty } from 'antd';
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select, PaginationConfig, Modal, message, Input, Spin, Cascader } from 'src/vendors/antd'
import { workInfoData } from './WorkInfoData';
import { nursingHandlerApi } from '../api/NursingHandlerApi';
import { authStore, appStore } from 'src/stores'


export interface Props {
	payload: any;
	getTitle: any;
}

export default function HeadNurse(props: Props) {
	const [forceUpdate, setfForceUpdate] = useState(true);


	const [deptListAll, setDeptListAll] = useState([] as any[])
	const [currContent, setCurrContent] = useState({ id: null, content: '' });//点击的当前item

	const [dataList, setDataList] = useState([] as any);//工作职责列表

	const { history, location } = appStore;
	const [showValCode, setShowValCode] = useState([] as any);
	// console.log(history, location)

	/**获取两级 科室 */
	const getDepts = () => {
		nursingHandlerApi.getDeptList().then(res => {

			workInfoData.treeDeptData = res.data || {}
			setDeptListAll(res.data.treeDept || [])

			// workInfoData.showDeptCode =
				// workInfoData.deptCode = [res.data.userBigDeptCode, res.data.userDeptCode]
				initPostObj()
				getInfoList()
			
		}).catch(err => {

		})
	}
	/**工作职责列表 */
	const getInfoList = () => {
		let paramter = {
			deptCode: workInfoData.deptCode[0],
			job: workInfoData.job,
		}

		nursingHandlerApi.getWorkInfoList(paramter).then(res => {
			setDataList(res.data || [])
			setCurrContent(res.data[0] || { id: null, content: '' })
		}).catch(err => {

		})
	}

	const initPostObj = () => {
		if (location.pathname.indexOf('headnurseke') > -1) {

			// 科护长工作职责
			workInfoData.job = '科护士长'
			workInfoData.deptCode = [workInfoData.treeDeptData.userBigDeptCode]
			setShowValCode([workInfoData.treeDeptData.userBigDeptCode])
		} else if (location.pathname.indexOf('headnursedept') > -1) {
			// 护理部工作职责
			workInfoData.job = '护理部'
			workInfoData.deptCode=['']
		} else {
			setShowValCode([workInfoData.treeDeptData.userBigDeptCode, workInfoData.treeDeptData.userDeptCode])
			workInfoData.deptCode = [workInfoData.treeDeptData.userDeptCode]
			workInfoData.job = '护士长'
		}
	}
	const init = () => {

		if (workInfoData.treeDeptData.userBigDeptCode) {
			// 有科室数据
			initPostObj()
			setDeptListAll(workInfoData.treeDeptData.treeDept)
			getInfoList()
		} else {
			getDepts()
		}

	}
	useEffect(() => {
		init()
		setDataList([])
		setCurrContent({ id: null, content: '' })
		setfForceUpdate(false);
		setTimeout(() => {
			setfForceUpdate(true);
		}, 0);
	}, [props.getTitle])
	return forceUpdate ? (
		<Wrapper>
			<PageHeader>
				<PageTitle>{props.getTitle}</PageTitle>
				<Place />
				{location.pathname.indexOf('headnursedept') < 0 && <>
					<span className='label'>{location.pathname.indexOf('headnurseke') > -1 ? '片区:' : '科室:'}</span>
					<Cascader options={deptListAll} expandTrigger='hover'
						value={showValCode}
						fieldNames={location.pathname.indexOf('headnurseke') > -1 ? { label: 'name', value: 'code' } : { label: 'name', value: 'code', children: 'childDepts' }}
						onChange={(val: any) => {
							setShowValCode(val)
							workInfoData.deptCode = [val[val.length - 1]]
							getInfoList()

						}}
						displayRender={(label: any) => {
							return label[label.length - 1]
						}}
						placeholder="请选择" style={{ width: 150 }} />
				</>}
			</PageHeader>
			<div className="main-contain">
				<div className="left">
					<div className="content">
						{dataList.length < 1 && <Empty style={{ marginTop: '200px', width: "100%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无工作职责'} />}
						{dataList.map((it: any) => {
							return (
								<div key="id" onClick={() => { setCurrContent(it) }} className={`dept-item ${currContent.id == it.id ? "selected" : ''}`}>
									<Icon type="caret-right" />{it.title}
								</div>)
						})}

						
					</div>
				</div>
				<div className="right">
					{!currContent.content && <Empty style={{ marginTop: '200px', width: "100%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无工作职责'} />}
					<div className='content' dangerouslySetInnerHTML={{ __html: currContent.content || '' }} />
				</div>
			</div>
		</Wrapper>
	) : null

	// return forceUpdate?<innerComp {...props}/>:null;// 条件?<comp/>:null这样写是会重新渲染页面的
}
const Wrapper = styled.div`
width: 100%;
height: 100%;
position: relative;

.float-right{
  float: right;
}
.main-contain{
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  padding: 15px;
  height: calc(100vh - 95px);
  &>div{
    background: #fff;
  }
  .left{
    height: 100%;
    float: left;
    width: 250px;
    overflow: hidden;
    border: 1px solid #ddd;
    margin-right: 8px;
    padding-top: 5px;
    .title{
      text-indent: 16px;
      margin-top: -40px;
      border-bottom: 1px solid #ddd;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: bold;
      background-color: #ECEFF1;
    }
    .content{
      height: 100%;
      width: 100%;
      overflow: auto;
      .dept-item{
        line-height: 24px;
        cursor: pointer;
        position: relative;
        text-indent: 5px;
		/* 超出一行省略... */
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
        &:hover{
          background: #00A680;
          color: #fff;
          &.selected{
            color: #fff;
          }
        }
        &.selected{
          background: #00A680;
          color: #fff;
          font-weight: bold;
        }
        .before{
          position: absolute;
          display: block;
          height: 100%;
          width: 0;
          border-left: 1px dashed #aaa;
          left: 10px;
          top: 0;
        }
        .after{
          position: absolute;
          display: block;
          height: 0;
          width: 10px;
          border-top: 1px dashed #aaa;
          left: 11px;
          top: 50%;
        }
        &:first-of-type{
          .before{
            height: 50%;
            bottom: 0;
            top: auto;
          }
        }
        &:last-of-type{
          .before{
            height: 50%;
            bottom: auto;
            top: 0;
          }
        }
      }
    }
  }
  .right{
    border: 1px solid #ddd;
    height: 100%;
    overflow: hidden;
	overflow-y: auto;
    .content {
      /* width: 720px; */
      /* margin: 0 auto; */
      /* background: #fff; */
      padding: 20px 15px;
      min-height: 100%;
      white-space: pre-wrap;
      /* border: 1px solid #ddd; */
    }

    .operation-span{
      color: rgb(0, 166, 128);
      cursor: pointer;
      &:hover{
        font-weight: bold;
      }
      &.delete-span{
        margin-left: 10px;
      }
    }
  }
}
.left .content,.right{
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.1);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // box-shadow: inset 0 0 5px #ffffff;
    // border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
    
`