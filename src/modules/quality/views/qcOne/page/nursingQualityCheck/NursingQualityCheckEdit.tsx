import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, message, Select, Popover, Checkbox, Spin, Modal } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'

import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { ScrollBox } from 'src/components/common'

import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'

import service from 'src/services/api'
import { nursingQualityCheckService } from './api/NursingQualityCheckService'
import { qcCheckContentSettingService } from './api/QcCheckContentSettingService'
import moment from 'moment'
const commonApi = service.commonApiService

const Option = Select.Option

export interface Props { }

export default observer(function NursingQualityCheckEdit() {
  let { location, history } = appStore
  let wardCode = authStore.selectedDeptCode
  let wardName = authStore.selectedDeptName

  let search = qs.parse(location.search.replace('?', ''))

  const [nurseList, setNurseList] = useState([] as any[])

  const [starRatting, setStarRatting] = useState({
    N0: [] as any[],
    N1: [] as any[],
    N2: [] as any[],
    N3: [] as any[],
    N4: [] as any[]
  } as any)

  const [loading, setLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)

  const [typeList, setTypeList] = useState([] as any[])
  const [contentList, setContentList] = useState([] as any[])
  const [resultList, setResultList] = useState([] as any[])
  const [editData, setEditData] = useState([] as any[])

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 60,
      align: 'center',
      className: 'base-info',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      dataIndex: 'range',
      title: '班次',
      align: "center",
      className: 'base-info',
      width: 60,
    },
    {
      dataIndex: 'empName',
      title: '姓名',
      align: "center",
      className: 'base-info',
      width: 80,
    },
    {
      dataIndex: 'currentLevel',
      key: 'currentLevel',
      title: '层级',
      align: "center",
      className: 'base-info',
      width: 60,
    },
    {
      dataIndex: 'content',
      key: 'content',
      title: '质控内容',
      width: 150,
      render: (text: string, record: any, idx: number) => {
        return <EditCon>
          <Select
            value={record.content}
            onChange={(content: any) => handleRecordChange({ ...record, content }, idx)}>
            {contentList.map((item: any, contentIdx: number) =>
              <Option key={contentIdx} value={item.name}>{item.name}</Option>
            )}
          </Select>
        </EditCon>
      }
    },
    {
      dataIndex: 'result',
      key: 'result',
      title: '质控结果',
      width: 120,
      render: (text: string, record: any, idx: number) => {
        return <EditCon>
          <Select
            value={record.result}
            onChange={(result: any) => {
              let checkItemList = record.checkItemList.map((item: any) => {
                return {
                  ...item,
                  checked: false,
                  deductScore: '0'
                }
              })

              handleRecordChange({ ...record, result, checkItemList, type: '', description: '' }, idx)
              let descriptionIpt =
                document.querySelector(`.description-${idx}`) as HTMLInputElement

              if (descriptionIpt) descriptionIpt.value = ''
            }}>
            {resultList.map((item: any, resultIdx: number) =>
              <Option key={resultIdx} value={item.code}>{item.name}</Option>
            )}
          </Select>
        </EditCon>
      }
    },
    {
      dataIndex: 'description',
      key: 'description',
      title: '质控详情',
      render: (text: string, record: any, idx: number) => {
        return <EditCon>
          <Input.TextArea
            autosize
            className={`description-${idx}`}
            style={{ width: '100%', resize: 'none' }}
            defaultValue={text}
            disabled={record.result == '无问题'}
            onBlur={(e: any) =>
              handleRecordChange({ ...record, description: e.target.value }, idx)} />
        </EditCon>
      }
    },
    {
      key: 'checkItemList',
      title: '星级考核',
      align: 'center',
      width: 80,
      render: (text: string, record: any, idx: number) => {
        let checkedList = record.checkItemList.filter((item: any) => item.checked)
        let sorce = 0
        for (let i = 0; i < checkedList.length; i++) {
          let checkedItem = checkedList[i]
          if (checkedItem.deductScore) {
            sorce += parseFloat(checkedItem.deductScore)
          }
        }

        let propInside = <span className="pop-inside nope">请选择</span>
        if (checkedList.length > 0) propInside = <span className="pop-inside" style={{ cursor: 'pointer' }}>{sorce == 0 ? '0' : `-${sorce}`}</span>

        let title = <div>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{record.empName}的星级考核</span>
          {/* <span style={{ marginLeft: '15px', color: '#999' }}>选中一个扣1分</span> */}
        </div>

        let content = <div
          style={{
            height: '100px',
            color: '#999',
            textAlign: 'center',
            lineHeight: '100px'
          }}>
          无考核项目
        </div>

        if (record.checkItemList && record.checkItemList.length > 0) {
          content = record.checkItemList
            .map((item: any, itemIdx: number) =>
              <PopItemCon key={`pop-${idx}-${itemIdx}`}>
                <Checkbox checked={item.checked} onChange={(e: any) => {
                  let newRecord = { ...record }
                  newRecord.checkItemList[itemIdx].checked = e.target.checked
                  handleRecordChange(newRecord, idx)
                }}>
                  <span className="pop-item-content">{`${itemIdx + 1}.${item.itemName}`}</span>
                  <span onClick={(e) => { e.stopPropagation() }} style={{
                    marginLeft: '5px',
                    marginRight: '-5px',
                    color: '#999',
                    fontSize: '12px',
                    position: 'relative',
                    top: '-2px',
                  }}>
                    <span>分值:</span>
                    <span><Input
                      size="small"
                      disabled={!item.checked}
                      style={{ width: '60px' }}
                      className={`check-item-source-${idx}-${itemIdx}`}
                      value={item.deductScore}
                      onChange={(e) => handleCheckItemSource(e.target.value, item.deductScore, record, idx, itemIdx)} /></span>
                  </span>
                </Checkbox>
              </PopItemCon>
            )
        }

        if (record.result === '无问题')
          return <span
            className="pop-inside nope"
            style={{
              cursor: 'not-allowed',
              color: 'rgba(0, 0, 0, 0.25)'
            }}>
            请选择
          </span>
        else
          return <Popover
            placement='right'
            trigger='click'
            title={title}
            content={content}>
            {propInside}
          </Popover>



      }
    },
    {
      dataIndex: 'type',
      key: 'type',
      title: '质控类别',
      width: 150,
      render: (text: string, record: any, idx: number) => {
        return <EditCon>
          <Select
            value={record.type}
            disabled={record.result === '无问题'}
            onChange={(type: any) => handleRecordChange({ ...record, type }, idx)}>
            <Option value="">无</Option>
            {typeList.map((item: any, typeIdx: number) =>
              <Option key={typeIdx} value={item.code}>{item.name}</Option>
            )}
          </Select>
        </EditCon>
      }
    },
  ]

  if (!search.type) columns.push(
    {
      title: '操作',
      width: 60,
      align: 'center',
      render: (text: string, record: any, idx: number) => {
        return <span
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            let newList = [...editData]
            newList.splice(idx, 1)
            setEditData(newList)
          }}>
          删除
        </span>
      }
    })

  useEffect(() => {
    if (search.type == 'edit') {
      getEditData()
    } else {
      createEditData()
    }

    getStarRatting()
    getNurseList()
    getTypeList()
    getContentList()
    getResultist()
  }, [])

  const handleCheckItemSource = (newVal: string, oldVal: string, record: any, idx1: number, idx2: number) => {
    if (/^\d*\.{0,1}\d*$/.test(newVal)) {
      newVal = newVal.replace('-', '')
      let valArr = newVal.split('.')
      if (valArr.length > 1) {
        valArr[1] = valArr[1].slice(0, 1)
        // if (valArr[1].length <= 0) valArr[1] = '0'
      }
      newVal = valArr.join('.')
    } else if (newVal !== '' && newVal !== '0') {
      newVal = oldVal
    }

    let newCheckItemList = [...record.checkItemList]

    newCheckItemList[idx2].deductScore = newVal

    handleRecordChange({ ...record, checkItemList: newCheckItemList }, idx1)
  }

  const getStarRatting = () => {
    let reqArr = [] as any[];

    for (let x in starRatting) {
      reqArr.push(nursingQualityCheckService.getDict2({
        groupCode: 'qc',
        dictCode: 'qc_ward_check_item',
        templateCode: x
      }))
    }

    Promise
      .all(reqArr)
      .then(res => {
        let newStarRatting = { ...starRatting }
        for (let i = 0; i < res.length; i++) {
          if (newStarRatting[`N${i}`])
            newStarRatting[`N${i}`] = res[i].data.map((item: any) => {
              return {
                itemName: item.name,
                itemCode: item.code,
                checked: false
              }
            })
        }

        setStarRatting(newStarRatting)
      })
  }

  const getEditData = () => {
    setLoading(true)
    // nursingQualityCheckService
    //   .getListByDate(search.date, wardCode)
    //   .then(res => {
    //     if (res.data) {
    //       setLoading(false)
    //       setEditData(res.data.map((item: any) => {
    //         return {
    //           ...item,
    //           checkItemList: item.checkItemList || []
    //         }
    //       }))
    //     }
    //   })
    nursingQualityCheckService
      .getDetail(search.id)
      .then(res => {
        if (res.data) {
          setLoading(false)
          setEditData([
            { ...res.data, checkItemList: res.data.checkItemList || [] }
          ])
        }
      })

  }

  const getNurseList = () => {
    setAddLoading(true)
    nursingQualityCheckService.getNurse({
      reportDate: search.date,
      wardCode
    }).then(res => {
      setAddLoading(false)
      if (res.data) setNurseList(res.data.filter((item: any) => item.empNo))
    }, () => setAddLoading(false))
  }

  const createEditData = () => {
    setLoading(true)
    nursingQualityCheckService
      .createByDate(search.date, wardCode)
      .then(res => {
        if (res.data) {
          setLoading(false)
          setEditData(res.data.filter((item: any) => item.empNo).map((item: any) => {

            let checkItemList = item.checkItemList || []
            checkItemList = checkItemList.map((checkItem: any) => {
              return {
                ...checkItem,
                deductScore: checkItem.deductScore || '0'
              }
            })

            let result = item.result || '无问题'

            let type = item.type || ''
            if (result === '无问题') type = ''

            return {
              ...item,
              result,
              type,
              checkItemList
            }
          }))
        }
      })
  }

  const getTypeList = () => {
    //一级质控病区质控类别
    nursingQualityCheckService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_ward_check_type'
    })
      .then(res => {
        if (res.data) setTypeList(res.data)
      })
  }

  const getContentList = () => {
    //一级质控病区质控内容
    qcCheckContentSettingService
      .getList(wardCode)
      .then(res => {
        if (res.data) setContentList((res.data?.list || []).map((item: any) => {
          return {
            code: item.itemCode,
            name: item.itemName
          }
        }))
      })
    // nursingQualityCheckService.getDict({
    //   groupCode: 'qc',
    //   dictCode: 'qc_ward_check_content'
    // })

  }

  const getResultist = () => {
    //一级质控病区质控内容
    nursingQualityCheckService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_ward_check_result'
    })
      .then(res => {
        if (res.data) setResultList(res.data)
      })
  }

  const handleRecordChange = (record: any, idx: number) => {
    let newData = [...editData]
    newData[idx] = record
    setEditData(newData)
  }

  const handleSave = () => {

    let saveParams = {
      wardCode,
      wardCheckList: editData,
      recordDate: moment(search.date).format('YYYY-MM-DD HH:mm')
    }

    let callback = (res?: any) => {
      if (res)
        message.success('保存成功', 1, () => {
          setLoading(false)
          history.goBack()
        })
      else
        setLoading(false)
    }

    setLoading(true)
    if (!search.type) {
      nursingQualityCheckService.saveOrUpdateByDate(saveParams)
        .then(res => callback(res), () => callback())
    } else if (search.type == 'edit') {
      nursingQualityCheckService.saveOrUpdate(editData[0]).then(res => callback(res), () => callback())
    }

  }

  const handleAdd = () => {
    let target = null as any;

    Modal.confirm({
      title: '添加护士',
      centered: true,
      content: <Select
        style={{ width: '270px', marginTop: '15px' }}
        onChange={(idx: any) => {
          target = nurseList[idx]
        }}
        showSearch
        filterOption={(input: string, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {nurseList.map(
          (item: any, idx: number) =>
            <Option
              key={item.empNo}
              value={idx}>
              {`${item.empName} ${item.rangeName}`}
            </Option>
        )}
      </Select>,
      onOk: () => {
        if (target) {
          let newList = [...editData]
          let checkItemList = starRatting[target.nurseHierarchy] || []

          checkItemList = checkItemList.map((item: any) => {
            return {
              ...item,
              deductScore: '0'
            }
          })

          newList.push({
            empName: target.empName,
            empNo: target.empNo,
            range: target.rangeName,
            wardCode: target.deptCode,
            wardName: target.deptName,
            currentLevel: target.nurseHierarchy,
            recordDate: search.date,
            type: '',
            content: '',
            result: '无问题',
            checkItemList,
          })

          setEditData(newList)
        }
      }
    })

  }

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
            {
              name: '一级质控报告',
              link: '/qcOne'
            },
            {
              name: '病区质量检查',
              link: '/qcOne/nursingQualityCheck'
            },
            {
              name: search.type == 'edit' ? '修改记录' : '新建记录'
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">
            {search.type == 'edit' ? '修改' : '新建'}病区质量检查记录
          </div>
          <div className='topHeaderButton'>
            <Button onClick={handleSave} disabled={loading} type="primary">保存</Button>
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
      </TopHeader>
    </TopPannel>
    <MainPannel>
      <div className="main-contain">
        <MainContent className="main-content">
          <div className="date">
            <span className="label">检查日期:</span>
            <Input disabled style={{ width: '120px' }} value={search.date || ''} />
          </div>
          <BaseTable
            dataSource={editData}
            columns={columns}
            surplusHeight={330}
            loading={loading} />
          {!search.type && <Button disabled={addLoading} onClick={handleAdd}>新增</Button>}
        </MainContent>
      </div>
    </MainPannel>
  </Wrapper>
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const PopItemCon = styled.div`
  margin-bottom: 5px;
  label>span{
    vertical-align: top;
  }
  .ant-checkbox{
    position: relative;
    top: 3px;
  }
  .pop-item-content{
    display:inline-block;
    width: 350px;
    word-break: break-all;
    vertical-align: top;
  }
`

const EditCon = styled.div`
  margin: 0;
`

const Wrapper = styled.div`
  .main-contain{
    margin: 0 auto;
    margin-left: 15px;
    width: 1200px;
    padding: 10px 20px;
    color: #000000;
    background: #fff;
    border: 1px solid #ddd;
    min-height: 100%;
  }
  .main-content{
    /* min-height: 400px; */
  }
  td{
    margin: 0;
    padding: 0!important;
    .ant-select{
    width: 100%;
  }
  .ant-input{
      resize: none;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
  }
`
const MainContent = styled.div`
.date{
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  .label{
    margin-right: 10px;
  }
}
#baseTable{
  padding: 15px 0;
  .pop-inside{
    cursor: pointer;
    display: inline-block;
    min-width:60px;
    &.nope{
      color: #888;
    }
  }
}
.ant-table-row{
  .base-info{
    background: rgba(0,0,0,0.01);
  }
}
`

const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 122px);
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
    margin-bottom: 5px;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      bottom: 10px;
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