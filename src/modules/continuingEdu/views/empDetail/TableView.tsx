import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { DatePicker, Select, Button } from 'antd'
import { ColumnProps } from 'antd/lib/table'
// import qs from 'qs'
import moment from 'moment'
import { empDetailModel } from './models/EmpDetailModel'
import StudyInfoModal from './components/StudyInfoModal'
import createModal from "src/libs/createModal";
import { empManageService } from './api/EmpManageService'

const Option = Select.Option

export interface Props extends RouteComponentProps { }

export default observer(function TableView(props: any) {
  const { shouldSorceAppendOpen } = props
  const { query, loading, dataTotal, tableData, classHoursDesc, creditsDesc } = empDetailModel
  const [menuTree, setMenuTree] = useState([] as any[])
  const [creditTypeList, setCreditTypeList] = useState([] as any[])
  const [typeList, setTypeList] = useState([] as any[])

  const studyInfoModal = createModal(StudyInfoModal)

  const pannelName = appStore.match.params?.pannelName || ''

  const indexColumn = {
    title: '序号',
    key: 'index',
    align: 'center',
    width: 50,
    render: (text: any, record: any, index: any) => {
      if (Object.keys(record).length <= 1) return <span></span>

      return (query.pageIndex - 1) * query.pageSize + index + 1
    }
  } as ColumnProps<any>

  const titleColumn = {
    title: '项目',
    dataIndex: 'title',
    align: 'left',
    // width: 180,
    render: (text: any, record: any, index: any) => {
      return <TitleCon
        onClick={() => handleDetail(record)}>
        {text}
      </TitleCon>
    }
  } as ColumnProps<any>

  const handleDetail = (record: any) => {
    if (record.cetpId) {
      studyInfoModal.show({
        cetpId: record.cetpId,
        title: record.title
      })
    }
  }

  const columns = (): ColumnProps<any>[] => {
    switch (pannelName) {
      case '学分记录':
        return [
          indexColumn,
          titleColumn,
          {
            title: '培训类型',
            dataIndex: 'teachingMethodName',
            width: 80,
            align: 'center',
          },
          {
            title: '日期',
            dataIndex: 'startTime',
            width: 180,
            align: 'center',
          },
          {
            title: '分值',
            dataIndex: 'creditDesc',
            width: 140,
            align: 'center',
            render: (text: string, record: any) => {
              if (record.remark) {
                return <span style={{ color: 'red' }}>{text}</span>
              } else {
                return <span>{text}</span>
              }
            }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            width: 180,
            align: 'center',
            render: (text: string, record: any) => {
              if (record.remark) {
                return <span style={{ color: 'red' }}>{text}</span>
              } else {
                return <span>{text}</span>
              }
            }
          },
        ]
      case '学时记录':
        return [
          indexColumn,
          titleColumn,
          {
            title: '培训类型',
            dataIndex: 'teachingMethodName',
            width: 80,
            align: 'center',
          },
          {
            title: '日期',
            dataIndex: 'startTime',
            width: 180,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 60,
            align: 'center',
          },
          {
            title: '备注',
            dataIndex: 'remark',
            width: 180,
            align: 'center',
          },
        ]
      case '学习记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '学分',
            dataIndex: 'creditDesc',
            width: 110,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '完成情况',
            width: 70,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          }
        ]
      case '培训记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'left',
          },
          {
            title: '组织方式',
            dataIndex: 'oranizationWayName',
            width: 70,
            align: 'center',
          },
          {
            title: '培训地址',
            dataIndex: 'address',
            width: 120,
            align: 'left',
          },
          {
            title: '签到',
            dataIndex: 'isSignedInDesc',
            width: 60,
            align: 'center',
            render: (text: string) => {
              if (text == '未签到')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          }, {
            title: '成绩有效',
            dataIndex: 'isValidResultDesc',
            width: 60,
            align: 'center',
            // render: (text: string) => {
            //   if (text == '无效')
            //     return <span style={{ color: 'red' }}>{text}</span>
            //   else
            //     return <span style={{ color: 'blue' }}>{text}</span>
            // }
          },
          {
            title: '学分',
            dataIndex: 'creditDesc',
            width: 110,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 60,
            align: 'center',
          },
          {
            title: '培训情况',
            width: 60,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
        ]
      case '考试记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '成绩',
            dataIndex: 'gainScores',
            width: 80,
            align: 'center',
          },
          {
            title: '是否及格',
            dataIndex: 'passedDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '成绩有效',
            dataIndex: 'isValidResultDesc',
            width: 60,
            align: 'center',
            // render: (text: string) => {
            //   if (text == '无效')
            //     return <span style={{ color: 'red' }}>{text}</span>
            //   else
            //     return <span style={{ color: 'blue' }}>{text}</span>
            // }
          },
          {
            title: '学分',
            dataIndex: 'creditDesc',
            width: 110,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '考试情况',
            width: 70,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
        ]
      case '练习记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '练习进度',
            width: 80,
            dataIndex: 'progressRateDesc',
            align: 'center',
          },
          {
            title: '正确率',
            width: 80,
            dataIndex: 'correctRateDesc',
            align: 'center',
          },
          {
            title: '成绩有效',
            dataIndex: 'isValidResultDesc',
            width: 60,
            align: 'center',
            // render: (text: string) => {
            //   if (text == '无效')
            //     return <span style={{ color: 'red' }}>{text}</span>
            //   else
            //     return <span style={{ color: 'blue' }}>{text}</span>
            // }
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '练习情况',
            width: 70,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
        ]
      case '实操记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '成绩',
            dataIndex: 'gainScores',
            width: 80,
            align: 'center',
          },
          {
            title: '是否及格',
            dataIndex: 'passedDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '成绩有效',
            dataIndex: 'isValidResultDesc',
            width: 60,
            align: 'center',
            // render: (text: string) => {
            //   if (text == '无效')
            //     return <span style={{ color: 'red' }}>{text}</span>
            //   else
            //     return <span style={{ color: 'blue' }}>{text}</span>
            // }
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '签到',
            dataIndex: 'isSignedInDesc',
            width: 60,
            align: 'center',
            render: (text: string) => {
              if (text == '未签到')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
          // {
          //   title: '实操情况',
          //   width: 70,
          //   dataIndex: 'taskStatusDesc',
          //   align: 'center',
          //   render: (text: string) => {
          //     if (text == '未完成')
          //       return <span style={{ color: 'red' }}>{text}</span>
          //     else
          //       return <span>{text}</span>
          //   }
          // },
        ]
      case '演练记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '演练情况',
            width: 70,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
        ]
      case '实践记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '学分',
            dataIndex: 'creditDesc',
            width: 120,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
          {
            title: '成绩有效',
            dataIndex: 'isValidResultDesc',
            width: 60,
            align: 'center',
          },
          {
            title: '实践情况',
            width: 70,
            dataIndex: 'taskStatusDesc',
            align: 'center',
            render: (text: string) => {
              if (text == '未完成')
                return <span style={{ color: 'red' }}>{text}</span>
              else
                return <span>{text}</span>
            }
          },
        ]
      case '讲课记录':
        return [
          indexColumn,
          {
            title: '类型',
            dataIndex: 'firstLevelMenuName',
            width: 120,
            align: 'center',
          },
          titleColumn,
          {
            title: '时间',
            dataIndex: 'startTime',
            width: 140,
            align: 'center',
          },
          {
            title: '开放时间',
            dataIndex: 'openTimeDesc',
            width: 80,
            align: 'center',
          },
          {
            title: '组织方式',
            dataIndex: 'oranizationWayName',
            width: 70,
            align: 'center',
          },
          {
            title: '地址',
            dataIndex: 'address',
            width: 120,
            align: 'left',
          },
          {
            title: '学分',
            dataIndex: 'creditDesc',
            width: 120,
            align: 'center',
          },
          {
            title: '学时',
            dataIndex: 'classHoursDesc',
            width: 70,
            align: 'center',
          },
        ]
      default:
        return []
    }
  }

  const resetTypeList = () => {
    switch (pannelName) {
      case '学习记录':
      case '培训记录':
      case '考试记录':
      case '练习记录':
      case '实操记录':
      case '演练记录':
      case '实践记录':
        if (menuTree.length <= 0)
          getTypeList()
        else
          setTypeList(menuTree)
        break
      case '学分记录':
        // setTypeList([
        //   { id: "1", name: "院级学分" },
        //   { id: "2", name: "片区学分" },
        //   { id: "3", name: "病区学分" },
        // ])
        if (creditTypeList.length <= 0) {
          getCreditTypeList()
        } else {
          setTypeList(creditTypeList)
        }
        break
      case '学时记录':
        setTypeList([
          { id: "1", name: "学习" },
          { id: "2", name: "培训" },
          { id: "3", name: "考试" },
          { id: "4", name: "练习" },
          { id: "5", name: "实操" },
          { id: "6", name: "演练" },
          { id: "7", name: "实践" },
        ])
        break
      default:
        setTypeList([])
    }
  }

  const handleQueryChange = (newQuery: any, req?: boolean) => {
    empDetailModel
      .setQuery(
        { ...newQuery },
        req || false,
        () => { }
      )
  }

  useEffect(() => {
    handleQueryChange({ ...query, type: '', pageIndex: 1 })
  }, [])

  useEffect(() => {
    handleQueryChange({ ...query, type: '', pageIndex: 1 }, true)
    resetTypeList()
  }, [appStore.match.params.pannelName])

  /**获取一级标题 */
  const getTypeList = () => {
    empManageService
      .getMenuTree()
      .then(res => {
        if (res.data) {
          let newArr = res.data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name
          }))
          setTypeList(newArr)
          setMenuTree(newArr)
        }
      })
  }

  /**获取学分类型 */
  const getCreditTypeList = () => {
    empManageService
      .getAllCreditTypes()
      .then(res => {
        if (res.data) {
          let newArr = res.data.map((item: any) => ({
            id: item.code,
            name: item.name
          }))
          setTypeList(newArr)
          setCreditTypeList(newArr)
        }
      })
  }

  const handlePageChange = (pageIndex: number) => {
    handleQueryChange({ ...query, pageIndex }, true)
  }

  const handleSizeChange = (pageIndex: number, pageSize: number) => {
    handleQueryChange({ ...query, pageSize, pageIndex: 1 }, true)
  }

  const typeLabel = () => {
    if (pannelName == '学分记录') return '学分类型'
    if (pannelName == '学时记录') return '培训类型'
    return '类型'
  }

  //需要在底部额外显示
  let footer = <span style={{ display: 'none' }}></span>
  if (pannelName == '学分记录')
    footer = <span>{creditsDesc}</span>
  if (pannelName == '学时记录')
    footer = <span>{classHoursDesc}</span>

  //起止时间控件配置
  let dateRange =
    [undefined, undefined] as [moment.Moment, moment.Moment] | [undefined, undefined]

  if (query.startDate && query.endDate)
    dateRange = [moment(query.startDate), moment(query.endDate)]

  return <Wrapper>
    <div className="bar">
      <span className="title">{pannelName}</span>
      <div className="fr">
        <span className="label">起止时间: </span>
        <span className="content">
          <DatePicker.RangePicker
            style={{ width: 220 }}
            allowClear={true}
            value={dateRange}
            onChange={(newRange: any) => {
              handleQueryChange({
                ...query,
                startDate: newRange[0]?.format('YYYY-MM-DD') || '',
                endDate: newRange[1]?.format('YYYY-MM-DD') || '',
                pageIndex: 1
              }, true)
            }} />
        </span>
        <span className="label">{typeLabel()}: </span>
        <span className="content">
          <Select
            value={query.type}
            style={{ width: 150 }}
            onChange={(val: string) => {
              handleQueryChange({
                ...query,
                pageIndex: 1,
                type: val,
              }, true)
            }}>
            <Option value="">全部</Option>
            {typeList
              .map((item: any, idx: number) =>
                <Option
                  key={idx}
                  value={item.id}>
                  {item.name}
                </Option>)}
          </Select>
        </span>
        <span className="label">
          <Button
            type="primary"
            onClick={() =>
              handleQueryChange({ ...query, pageIndex: 1 }, true)}>
            搜索
          </Button>
        </span>
        {pannelName == '学分记录' && (
          <span className="label">
            <Button
              onClick={() =>
                shouldSorceAppendOpen &&
                shouldSorceAppendOpen()
              }>
              添加学分
            </Button>
          </span>
        )}
      </div>
    </div>
    <div style={{ position: 'relative' }}>
      <BaseTable
        columns={columns()}
        dataSource={tableData}
        loading={loading}
        surplusHeight={355}
        // footer={() => footer}
        // surplusWidth={200}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleDetail(record)
          }
        }}
        pagination={{
          pageSizeOptions: ['10', '15', '20', '30', '50'],
          current: query.pageIndex,
          pageSize: query.pageSize,
          onChange: handlePageChange,
          showSizeChanger: true,
          total: dataTotal,
          onShowSizeChange: handleSizeChange
        }}
      />
      <div className="footer">{footer}</div>
    </div>
    <studyInfoModal.Component />
  </Wrapper>
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  /* overflow-y: auto; */
  .bar{
    line-height: 30px;
    margin-bottom: 8px;
    .title{
      font-size: 22px;
      font-weight: bold;
      color: #000;
    }
    .label{
      margin-left: 15px;
    }
    .fr{
      float: right;
    }
  }
  .sum-row{
    td{
      background-color: rgba(242, 242, 242, 1);
      color: #000;
    }
  }
  td{
    >div.row{
      width: 100%;
      /* height: 22px; */
      position: relative;
      span{
        display: inline-block;
        position: absolute;
        height: 22px;
        overflow: hidden;
        left: 0;
        right: 0;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      &.time,&.place{
        color: #888;
      }
      
    }
  }
  .footer{
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: bold;
    color: #444;
    font-size: 12px;
  }
`

const TitleCon = styled.div`
  cursor: pointer;
  &:hover{
    color: #00F;
  }
`