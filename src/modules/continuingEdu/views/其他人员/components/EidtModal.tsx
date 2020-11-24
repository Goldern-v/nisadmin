import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'antd'
import moment from 'moment'
import { rules } from './../data/rules'
import { userTypeList, educationList, titleList } from './../data/options'
import { otherEmpService } from './../api/OtherEmpService'
import { message } from 'antd/es'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isAdd?: boolean
}

const Option = Select.Option
const { RangePicker } = DatePicker

export default function EidtModal(props: Props) {
  const { visible, isAdd, params, onOk, onCancel } = props
  const [editUserType, setEditUserType] = useState('1')
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [deptList, setDeptList] = useState([] as any[])

  //1实习生、2进修生、3试用期人员、4文员、99其它人员
  let userType = isAdd ? editUserType : editParams.userType

  const defaultAddData = () => {
    let newParams = {} as any
    const defaultParams = {
      name: '',
      idCardNo: '',
      sex: '1',
      phone: '',
      address: '',
      emergencyContactPerson: '',
      emergencyContactPhone: '',
      remark: '',
      education: '',
    }

    switch (userType) {
      case '1':
        newParams = {
          ...defaultParams,
          isResident: '0',
          isGroupLeader: '0',
          dormitoryNumber: '',
          major: '',
          internshipBegin: '',
          internshipEnd: '',
          studyDeptCode: '',
          studyDeptName: '',
          schoolName: '',
        }
      case '2':
        newParams = {
          ...defaultParams,
          age: '',
          title: '',
          originalWorkUnit: '',
          originalDepartment: '',
          refresherTimeBegin: '',
          refresherTimeEnd: '',
          refresherDeptCode01: '',
          refresherDeptName01: '',
          refresherDeptCode02: '',
          refresherDeptName02: '',
        }
      case '3':
      case '4':
      case '99':
        newParams = {
          ...defaultParams,
          isResident: '0',
          isGroupLeader: '0',
          dormitoryNumber: '',
          major: '',
          entryDate: '',
          deptCode: '',
          deptName: '',
          studyDeptCode: '',
          studyDeptName: '',
          schoolName: '',
        }
    }

    return JSON.parse(JSON.stringify(newParams))
  }

  const getDept = () => {
    otherEmpService
      .nursingUnitWithOutLogin()
      .then(res => {
        setDeptList(res.data || [])
      })
  }

  const handleOk = () => {
    let currentRules = rules(userType) as any
    let errMsgList = []
    // let ruleKeys = Object.keys(currentRules)
    for (let key in currentRules) {
      let item = currentRules[key]
      let val = editParams[key] || ''
      for (let i = 0; i < item.length; i++) {
        let rule = item[i]
        let result = rule(val)
        if (result !== true) errMsgList.push(result)
      }
    }

    if (errMsgList.length > 0) {
      Modal.error({
        title: '提示',
        content: <div>
          {errMsgList.map((text: string, idx: number) => <div key={idx}>{text}</div>)}
        </div>
      })
      return
    }

    let saveParams = { ...editParams }
    if (isAdd) saveParams.userType = editUserType

    setLoading(true)
    otherEmpService
      .addOrUpdatePerson(saveParams)
      .then(res => {
        setLoading(false)
        message.success('操作成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  const getEmpDetail = () => {
    setLoading(true)
    otherEmpService
      .getPersonInfoByIdentifier(params.identifier)
      .then(res => {
        setLoading(false)
        let newData = { ...res.data }
        if (newData.education) {
          let target = educationList.find((item: any) => item.code == newData.education)
          if (target) newData.education = target.name
        }
        setEidtParams(newData)
      }, () => setLoading(false))

  }

  useEffect(() => {
    getDept()
  }, [])

  useEffect(() => {
    setEidtParams(defaultAddData())
  }, [editUserType])

  useEffect(() => {
    if (visible) {
      if (isAdd) {
        setEidtParams(defaultAddData())
      } else {
        getEmpDetail()
      }

    } else {
      setEditUserType('1')
    }
  }, [visible])

  const editPannel = () => {
    switch (userType) {
      case '1':
        return <div>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              姓名：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.name}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  name: e.target.value
                })} />
            </Col>
            {isAdd && <Col span={4}>人员类型：</Col>}
            {isAdd && (
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  value={editUserType || ''}
                  onChange={(newType: any) =>
                    setEditUserType(newType)}>
                  {userTypeList.map((item: any) => (
                    <Option
                      value={item.type}
                      key={item.type}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              毕业院校：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.schoolName}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    schoolName: e.target.value
                  })} />
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              性别：
              </Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.sex}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  sex: e.target.value
                })}>
                <Radio.Button value="0">男</Radio.Button>
                <Radio.Button value="1">女</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              最高学历：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)}
              </Select>
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              专业：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.major}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  major: e.target.value
                })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>是否住宿：</Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.isResident}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  isResident: e.target.value
                })}>
                <Radio.Button value="1">是</Radio.Button>
                <Radio.Button value="0">否</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4}>
              <span className="star">*</span>联系方式：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.phone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    phone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              实习时间：
            </Col>
            <Col span={12}>
              <RangePicker
                value={[
                  editParams.internshipBegin ? moment(editParams.internshipBegin) : undefined,
                  editParams.internshipEnd ? moment(editParams.internshipEnd) : undefined,
                ] as [any, any]}
                onChange={(_moment: any[]) => {
                  setEidtParams({
                    ...editParams,
                    internshipBegin: _moment[0] ? _moment[0].format('YYYY-MM-DD') : '',
                    internshipEnd: _moment[1] ? _moment[1].format('YYYY-MM-DD') : ''
                  })
                }} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              实习科室：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.studyDeptCode}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(studyDeptCode: any) => {
                  let studyDeptName = ''
                  let target = deptList.find((item: any) => item.code == studyDeptCode)
                  if (target) studyDeptName = target.name
                  setEidtParams({
                    ...editParams,
                    studyDeptCode,
                    studyDeptName
                  })
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
            </Col>
            <Col span={4}>是否组长：</Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.isGroupLeader}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  isGroupLeader: e.target.value
                })}>
                <Radio.Button value="1">是</Radio.Button>
                <Radio.Button value="0">否</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>紧急联系人：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.emergencyContactPerson}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPerson: e.target.value
                  })} />
            </Col>
            <Col span={4}>宿舍编号：</Col>
            <Col span={8}>
              <Input
                value={editParams.dormitoryNumber}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    dormitoryNumber: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>身份证号：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.idCardNo}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    idCardNo: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>家庭住址：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.address}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    address: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span className="star">*</span>紧急联系人电话：
            </Col>
            <Col span={10}>
              <Input
                value={editParams.emergencyContactPhone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPhone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>备注：</Col>
            <Col span={12}>
              <Input.TextArea
                autosize={{ minRows: 3 }}
                value={editParams.remark}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    remark: e.target.value
                  })} />
            </Col>
          </Row>
        </div>
      case '2':
        return <div>
          <Row>
            <Col span={4}>
              <span className="star">*</span>姓名：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.name}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  name: e.target.value
                })} />
            </Col>
            {isAdd && <Col span={4}>人员类型：</Col>}
            {isAdd && (
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  value={editUserType || ''}
                  onChange={(newType: any) =>
                    setEditUserType(newType)}>
                  {userTypeList.map((item: any) => (
                    <Option
                      value={item.type}
                      key={item.type}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>性别：
            </Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.sex}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  sex: e.target.value
                })}>
                <Radio.Button value="0">男</Radio.Button>
                <Radio.Button value="1">女</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              年龄：
            </Col>
            <Col span={8}>
              <InputNumber
                style={{ width: '100%' }}
                value={editParams.age}
                step={1}
                precision={0}
                onChange={(age) =>
                  setEidtParams({
                    ...editParams,
                    age
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              职称：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.title}
                onChange={(title: any) => setEidtParams({
                  ...editParams,
                  title,
                })}>
                {titleList.map((item: any) => <Option value={item.value} key={item.value}>{item.value}</Option>)}
              </Select>
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              最高学历：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              原单位名称：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.originalWorkUnit}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  originalWorkUnit: e.target.value
                })} />
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              原科室：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.originalDepartment}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  originalDepartment: e.target.value
                })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              进修时间：
            </Col>
            <Col span={12}>
              <RangePicker
                value={[
                  editParams.refresherTimeBegin ? moment(editParams.refresherTimeBegin) : undefined,
                  editParams.refresherTimeEnd ? moment(editParams.refresherTimeEnd) : undefined,
                ] as [any, any]}
                onChange={(_moment: any[]) => {
                  setEidtParams({
                    ...editParams,
                    refresherTimeBegin: _moment[0] ? _moment[0].format('YYYY-MM-DD') : '',
                    refresherTimeEnd: _moment[1] ? _moment[1].format('YYYY-MM-DD') : ''
                  })
                }} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              进修科室一：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.refresherDeptCode01}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(refresherDeptCode01: any) => {
                  let refresherDeptName01 = ''
                  let target = deptList.find((item: any) => item.code == refresherDeptCode01)
                  if (target) refresherDeptName01 = target.name
                  setEidtParams({
                    ...editParams,
                    refresherDeptCode01,
                    refresherDeptName01
                  })
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
            </Col>
            <Col span={4}>进修科室二：</Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.refresherDeptCode02}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
                onChange={(refresherDeptCode02: any) => {
                  let refresherDeptName02 = ''
                  let target = deptList.find((item: any) => item.code == refresherDeptCode02)
                  if (target) refresherDeptName02 = target.name
                  setEidtParams({
                    ...editParams,
                    refresherDeptCode02: refresherDeptCode02 || '',
                    refresherDeptName02
                  })
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={4}>是否住宿：</Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.isResident}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  isResident: e.target.value
                })}>
                <Radio.Button value="1">是</Radio.Button>
                <Radio.Button value="0">否</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4}>宿舍编号：</Col>
            <Col span={8}>
              <Input
                value={editParams.dormitoryNumber}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    dormitoryNumber: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>联系方式：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.phone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    phone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>身份证号：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.idCardNo}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    idCardNo: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>家庭住址：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.address}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    address: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>紧急联系人：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.emergencyContactPerson}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPerson: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span className="star">*</span>紧急联系人电话：
            </Col>
            <Col span={10}>
              <Input
                value={editParams.emergencyContactPhone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPhone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>备注：</Col>
            <Col span={12}>
              <Input.TextArea
                autosize={{ minRows: 3 }}
                value={editParams.remark}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    remark: e.target.value
                  })} />
            </Col>
          </Row>
        </div>
      case '3':
      case '4':
      case '99':
        return <div>
          <Row>
            <Col span={4}>
              <span className="star">*</span>姓名：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.name}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  name: e.target.value
                })} />
            </Col>
            {isAdd && <Col span={4}>人员类型：</Col>}
            {isAdd && (
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  value={editUserType || ''}
                  onChange={(newType: any) =>
                    setEditUserType(newType)}>
                  {userTypeList.map((item: any) => (
                    <Option
                      value={item.type}
                      key={item.type}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            )}
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              毕业院校：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.schoolName}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    schoolName: e.target.value
                  })} />
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              性别：
            </Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.sex}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  sex: e.target.value
                })}>
                <Radio.Button value="0">男</Radio.Button>
                <Radio.Button value="1">女</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              最高学历：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.education}
                onChange={(education: any) => setEidtParams({
                  ...editParams,
                  education,
                })}>
                {educationList.map((item: any) => <Option value={item.name} key={item.name}>{item.name}</Option>)}
              </Select>
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              专业：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.major}
                onChange={(e) => setEidtParams({
                  ...editParams,
                  major: e.target.value
                })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>是否住宿：</Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.isResident}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  isResident: e.target.value
                })}>
                <Radio.Button value="1">是</Radio.Button>
                <Radio.Button value="0">否</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4}>
              <span className="star">*</span>联系方式：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.phone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    phone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>
              入职时间：
            </Col>
            <Col span={8}>
              <DatePicker
                value={editParams.entryDate ? moment(editParams.entryDate) : undefined}
                onChange={(_moment: any) => setEidtParams({ ...editParams, entryDate: _moment.format('YYYY-MM-DD') })} />
            </Col>
            <Col span={4}>
              <span className="star">*</span>
              所在科室：
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={editParams.deptCode}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(deptCode: any) => {
                  let deptName = ''
                  let target = deptList.find((item: any) => item.code == deptCode)
                  if (target) deptName = target.name
                  setEidtParams({
                    ...editParams,
                    deptCode,
                    deptName
                  })
                }}>
                {deptList.map((item: any) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={4}>宿舍编号：</Col>
            <Col span={8}>
              <Input
                value={editParams.dormitoryNumber}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    dormitoryNumber: e.target.value
                  })} />
            </Col>
            <Col span={4}>是否组长：</Col>
            <Col span={8}>
              <Radio.Group
                buttonStyle="solid"
                value={editParams.isGroupLeader}
                onChange={(e: any) => setEidtParams({
                  ...editParams,
                  isGroupLeader: e.target.value
                })}>
                <Radio.Button value="1">是</Radio.Button>
                <Radio.Button value="0">否</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>紧急联系人：
            </Col>
            <Col span={8}>
              <Input
                value={editParams.emergencyContactPerson}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPerson: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>身份证号：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.idCardNo}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    idCardNo: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <span className="star">*</span>家庭住址：
            </Col>
            <Col span={12}>
              <Input
                value={editParams.address}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    address: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <span className="star">*</span>紧急联系人电话：
            </Col>
            <Col span={10}>
              <Input
                value={editParams.emergencyContactPhone}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    emergencyContactPhone: e.target.value
                  })} />
            </Col>
          </Row>
          <Row>
            <Col span={4}>备注：</Col>
            <Col span={12}>
              <Input.TextArea
                autosize={{ minRows: 3 }}
                value={editParams.remark}
                onChange={(e) =>
                  setEidtParams({
                    ...editParams,
                    remark: e.target.value
                  })} />
            </Col>
          </Row>
        </div>
      default:
        return <div style={{ height: "500px", width: "100%" }}></div>
    }
  }

  return <Modal
    title={isAdd ? '新增人员' : '编辑人员'}
    width={600}
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Spin spinning={loading}>
        {editPannel()}
      </Spin>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .ant-row{
    line-height: 32px;
    margin-bottom: 10px;

    &:last-of-type{
      margin-bottom: 0;
    }

    .ant-col:nth-of-type(2n-1){
      text-align: right;
      padding-right: 5px;
    }
    .star{
      color: red;
    }
  }
  
`