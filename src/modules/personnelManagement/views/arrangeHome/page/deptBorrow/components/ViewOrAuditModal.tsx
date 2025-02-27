import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Icon, Button, Row, Col, Modal, Input, Checkbox, message as Message } from 'antd'
import { ReactComponent as YJS } from '../assets/yijiesu.svg'
import { ReactComponent as YSQ } from '../assets/yishenqing.svg'
import { ReactComponent as YJJ } from '../assets/yijujue.svg'
import { ReactComponent as YTG } from '../assets/yitongguo.svg'

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

import DeptBorrowService from './../api/DeptBorrowService'

const api = new DeptBorrowService()

const { TextArea } = Input

export interface Props {
  visible?: boolean
  data: any
  onCancel: any
}

export default observer(function ViewOrAuditModal(props: Props) {
  const { visible, onCancel, data } = props
  //拒绝申请相关
  const [refuseModalVisible, setRefuseModalVisible] = useState(false)
  const [refuseLoading, setRefuseLoading] = useState(false)
  const [refuseReason, setRefuseReason] = useState('' as string)
  //同意申请相关
  const [allowModalVisible, setAllowModalVisible] = useState(false)
  const [allowList, setAllowList] = useState([] as any)
  const [allowLoading, setAllowLoading] = useState(false)
  const [deptEmpList, setDeptEmpList] = useState([] as any)

  const [detailInfo, setDetailInfo] = useState({
    createTime: { name: '申请日期', value: '' },
    deptNameTransferTo: { name: '借出科室', value: '' },
    deptCodeTransferTo: { name: '借出科室code', value: '', hide: true },
    deptNameTransferFrom: { name: '借用科室', value: '' },
    deptCodeTransferFrom: { name: '借用科室code', value: '', hide: true },
    numTransferFrom: { name: '借用人数', value: '' },
    startDate: { name: '开始日期', value: '' },
    endDate: { name: '结束日期', value: '' },
    daysTransferFrom: { name: '借用天数', value: '' },
    detailTransferFrom: { name: '借用说明', value: '' },
    statusTransferFrom: { name: '审核状态', value: '', hide: true },
    id: { name: '借用id', value: '', hide: true },
    auditedEmpName: { name: '审核人姓名', value: '', hide: true },
    auditedTime: { name: '审核时间', value: '', hide: true },
    detailTransferTo: { name: '拒绝原因', value: '', hide: true },
    schDeptTransferUser: { name: '借出人员列表', value: [] as any, hide: true },
    empNameTransferFrom: { name: '借用人姓名', value: '', hide: true },
    nearImageUrlTransferFrom: { name: '借用人照片', value: '', hide: true }
  } as any)

  const modalClassName = () => {
    let classList = [] as any
    if (!visible) classList.push('hide')
    let user = authStore.user

    // if (user && (user.post == '护长' || '护理部') && detailInfo.statusTransferFrom.value == '0') classList.push('auth');
    // if (user && user.post == '护长' && detailInfo.statusTransferFrom.value == '0') classList.push('auth')
    // classList.push('auth');

    if (authStore.isDepartment) { // 护士长
      classList.push('auth')
    } else if (authStore.isRoleManage && ['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
      // 东莞横沥的 护理部也可以审批
      classList.push('auth')
    }

    return classList.join(' ')
  }

  const statusTransferFromIcon = (): any => {
    switch (detailInfo.statusTransferFrom.value) {
      case '0':
        return <YSQ />
      case '1':
        return <YTG />
      case '2':
        return <YJS />
      case '3':
        return <YJJ />
      default:
        return ''
    }
  }

  useEffect(() => {
    if (visible) {
      let newInfo: any = {}
      Object.keys(detailInfo).map((key: any) => {
        let item = detailInfo[key]
        let val: any = ''
        if (item.value instanceof Array) val = []
        let hide = item.hide
        newInfo[key] = {
          name: item.name,
          value: val,
          hide
        }
      })

      for (let x in data) {
        if (newInfo[x]) newInfo[x].value = data[x]
      }

      setDetailInfo(newInfo)
    }
  }, [visible])

  useEffect(() => {
    if (allowModalVisible) {
      api.getDeptEmpList(detailInfo.deptCodeTransferTo.value).then((res) => {
        if (res.data instanceof Array) setDeptEmpList(res.data)
      })
    }
  }, [allowModalVisible])

  //拒绝申请相关
  const openRefuse = () => {
    setRefuseModalVisible(true)
    setRefuseReason('')
    //
  }

  //同意申请相关
  const openAllow = () => {
    if (['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID) && detailInfo.statusTransferFrom.value === '4') {
      // 东莞横沥 护理部 审批
      handleAllow()
      return
    }
    setAllowModalVisible(true)
    setAllowList([])
    //getNurseList
  }
  const handleRefuse = () => {
    if (!refuseReason) return Message.warning('请输入拒绝原因')
    let auditedEmpName = ''
    let auditedEmpNo = ''

    if (authStore.user) {
      auditedEmpName = authStore.user.empName
      auditedEmpNo = authStore.user.empNo
    }

    let params: any = {
      id: detailInfo.id.value,
      statusTransferFrom: '3',
      auditedEmpNo,
      auditedEmpName,
      detailTransferTo: refuseReason
    }

    setRefuseLoading(true)

    // return console.log(params)

    api.refuseBorrow(params).then(
      (res) => {
        setRefuseLoading(false)
        if (res.code == 200) {
          Message.success('审核操作成功')
          setRefuseModalVisible(false)
          onCancel && onCancel(true)
        }
      },
      (err) => {
        setRefuseLoading(false)
      }
    )
  }

  const handleRefuseCancel = () => {
    if (!refuseLoading) setRefuseModalVisible(false)
  }

  const handleEmpSelectedChange = (newList: any) => {
    let limit = Number(detailInfo.numTransferFrom.value)

    if (newList.length > limit) Message.warning(`最多选择${limit}人`)
    else setAllowList(newList)
  }

  const handleAllow = () => {
    let auditedEmpName = ''
    let auditedEmpNo = ''
    if (authStore.user) {
      auditedEmpName = authStore.user.empName
      auditedEmpNo = authStore.user.empNo
    }

    const statusTransferFrom = (() => {
      if (['dghl', 'fqfybjy'].includes(appStore.HOSPITAL_ID)) {
        if (authStore.isRoleManage) return '4' // 护士长
        if (authStore.isDepartment) return '1' // 护理部
      } else {
        return '1'
      }
    })()

    const params: any = {
      schDeptTransfer: {
        id: detailInfo.id.value,
        statusTransferFrom,
        auditedEmpNo,
        auditedEmpName
      },
      schDeptTransferUser: allowList.map((_empNo: string) => {
        let target: any = deptEmpList.filter((item: any) => {
          return item.empNo == _empNo
        })
        if (target[0]) {
          const { empNo, empName, id, deptCode, nearImageUrl } = target[0]
          return {
            empNo,
            empName,
            deptCode,
            nearImageUrl: nearImageUrl || '',
            userId: id
          }
        } else {
          return {} as any
        }
      })
    }

    if (params.schDeptTransferUser.length <= 0
      && detailInfo.statusTransferFrom.value !== '4') {
      // 护理部审批的时候不需要传借出人员
      return Message.warn('至少选择一名借出人员')
    }
    setAllowLoading(true)

    api.allowBorrow(params).then(
      (res) => {
        setRefuseLoading(false)
        if (res.code == 200) {
          Message.success('审核操作成功')
          setAllowModalVisible(false)
          onCancel && onCancel(true)
        }
      },
      (err) => {
        setRefuseLoading(false)
      }
    )
  }

  const handleAllowCancel = () => {
    if (!allowLoading) setAllowModalVisible(false)
  }

  const StatusPannel = () => {
    let status = detailInfo.statusTransferFrom.value
    if (status == '0' || detailInfo.auditedEmpName.value == '') return ''

    let statusText = status === '4' ? '待护理部审核' : '通过'
    let detailNode: any
    if (status !== '3') {
      detailNode = (
        <Row className='row-item borrow-out-people'>
          <Col span={5} className='label'>
            借出护士：
          </Col>
          <Col span={19}>
            {detailInfo.schDeptTransferUser.value.map((item: any) => {
              return (
                <span className='borrow-out-item' key={item.empNo}>
                  <span className='item-img'>
                    <img src={item.nearImageUrl} alt='' />
                  </span>
                  <br />
                  <span className='item-name'>{item.empName}</span>
                </span>
              )
            })}
          </Col>
        </Row>
      )
    } else {
      statusText = '不通过'
      detailNode = (
        <Row className='row-item'>
          <Col span={5} className='label'>
            拒绝说明：
          </Col>
          <Col span={19}>{detailInfo.detailTransferTo.value}</Col>
        </Row>
      )
    }

    return (
      <div className='statusTransferFrom-info'>
        <Row className='row-item'>
          <Col span={5} className='label'>
            审核状态：
          </Col>
          <Col span={19}>{statusText}</Col>
        </Row>
        {detailNode}
        <Row className='row-item'>
          <Col span={5} className='label'>
            审核人：
          </Col>
          <Col span={19}>
            {detailInfo.auditedEmpName.value} {detailInfo.auditedTime.value}
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <Wrapper className={modalClassName()}>
      <div className='mask' onClick={onCancel} />
      <div className='modal'>
        <div className='header'>
          <span className='title'>借用详情</span>
          <div className='float-right' onClick={onCancel}>
            <Icon type='close' />
          </div>
        </div>
        <div className='body'>
          <div className='base-info'>
            <span className='applicant'>
              <img src={detailInfo.nearImageUrlTransferFrom.value} alt='' />
            </span>
            <span>
              <span className='title'>{detailInfo.empNameTransferFrom.value}提出的借用申请</span>
              <br />
              <span className='statusTransferFrom'>申请</span>
            </span>
            <span className='statusTransferFrom-icon'>{statusTransferFromIcon()}</span>
          </div>
          <div className='detail-info'>
            {Object.keys(detailInfo).map((key: string) => {
              if (detailInfo[key].hide) return ''
              let val = detailInfo[key].value
              if (key == 'daysTransferFrom') val += '天'
              return (
                <Row key={key} className='row-item'>
                  <Col span={5} className='label'>
                    {detailInfo[key].name}：
                  </Col>
                  <Col span={19}>{val}</Col>
                </Row>
              )
            })}
          </div>
          {StatusPannel()}
        </div>
        <div className='footer'>
          <Button className='refuse' onClick={openRefuse}>
            拒绝
          </Button>
          <Button type='primary' onClick={openAllow}>
            同意
          </Button>
        </div>
      </div>
      <Modal
        title='拒绝申请'
        visible={refuseModalVisible}
        onOk={handleRefuse}
        centered
        onCancel={handleRefuseCancel}
        confirmLoading={refuseLoading}
      >
        <RefuseWrapper>
          <div className='refuse-title'>请输入拒绝原因</div>
          <TextArea
            autosize={{ minRows: 6 }}
            value={refuseReason}
            onChange={(e: any) => setRefuseReason(e.target.value)}
          />
        </RefuseWrapper>
      </Modal>
      <Modal
        title='同意申请'
        visible={allowModalVisible}
        onCancel={handleAllowCancel}
        onOk={handleAllow}
        centered
        confirmLoading={allowLoading}
      >
        <AllowWrapper>
          <div className='allow-title'>请选择{detailInfo.numTransferFrom.value}名借出人员：</div>
          <div className='borrow-out-select'>
            <Checkbox.Group value={allowList} onChange={handleEmpSelectedChange}>
              {deptEmpList.map((item: any) => {
                return (
                  <Checkbox value={item.empNo} key={item.empNo}>
                    <span className='empName'>{item.empName}</span>
                  </Checkbox>
                )
              })}
            </Checkbox.Group>
          </div>
        </AllowWrapper>
      </Modal>
    </Wrapper>
  )
})

const defaultNurseImg = require('./../assets/护士默认头像.png')

const Wrapper = styled.div`
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .modal {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 380px;
    z-index: 3;
    background: #fff;
    transition: right 0.2s 0.1s;
    border-left: 1px solid #ddd;
    padding-top: 40px;
    .header {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      margin-top: -40px;
      .title {
        font-size: 18px;
        color: #000;
        margin-left: 15px;
      }
      .float-right {
        float: right;
        width: 40px;
        text-align: center;
        cursor: pointer;
        :hover {
          color: #00a680;
        }
      }
    }
    .body {
      height: 100%;
      overflow-y: auto;
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

      .row-item {
        margin-bottom: 10px;
        :last-of-type {
          margin-bottom: 0px;
        }
        .label {
          color: #888;
          text-align: right;
        }
      }

      .base-info {
        padding: 10px 15px;
        position: relative;
        > span {
          display: inline-block;
          &.applicant {
            width: 50px;
            height: 50px;
            vertical-align: top;
            margin-right: 15px;
            background-color: #ccc;
            background-image: url(${defaultNurseImg});
            background-position: -10px -9px;
            background-size: 140%;
            overflow: hidden;
            img {
              width: 52px;
              height: 52px;
              position: relative;
              left: -1px;
              top: -1px;
            }
          }
          .title {
            font-size: 20px;
            color: #000;
            font-weight: bold;
          }
        }
        .statusTransferFrom-icon {
          position: absolute;
          right: 6px;
          top: 0px;
          text tspan {
            font-size: 28px !important;
          }
        }
      }
      .detail-info {
        padding: 10px 15px;
        border-top: 1px solid #eee;
        color: #000;
      }
      .statusTransferFrom-info {
        padding: 10px 15px;
        border-top: 1px solid #eee;
        .borrow-out-people {
          .label {
            position: relative;
            top: 5px;
          }
        }
        .borrow-out-item {
          display: inline-block;
          text-align: center;
          margin-right: 10px;
          .item-img {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ccc;
            background-image: url(${defaultNurseImg});
            background-size: 100%;
            overflow: hidden;
            img {
              width: 42px;
              height: 42px;
              position: relative;
              left: -1px;
              top: -1px;
            }
          }
        }
      }
    }

    .footer {
      display: none;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid #ddd;
      margin-bottom: -40px;
      text-align: center;
      .refuse {
        margin-right: 20px;
      }
    }
  }

  &.auth {
    .modal {
      padding-bottom: 40px;
      .footer {
        display: block;
      }
    }
  }
  &.hide {
    .mask {
      display: none;
    }
    .modal {
      right: -380px;
    }
  }
`

const RefuseWrapper = styled.div`
  .refuse-title {
    margin-bottom: 10px;
  }
`

const AllowWrapper = styled.div`
  .allow-title {
    margin-bottom: 10px;
  }
  .borrow-out-select .ant-checkbox-group .ant-checkbox-wrapper {
    margin-right: 4px;
    margin-left: 4px;
    span.empName {
      width: 50px;
      display: inline-block;
    }
  }
`
