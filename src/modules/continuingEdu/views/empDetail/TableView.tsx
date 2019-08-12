import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import qs from 'qs'
import Moment from 'moment'

import { empManageService } from './api/EmpManageService'

export interface Props extends RouteComponentProps { }

export default observer(function TableView() {
  const [pannelName, setPannelName] = useState('');
  const [data, setData] = useState([] as any);
  const [sourceChange, setSourceChange] = useState(null as null | string);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState(0 as any);
  const [query, setQuery] = useState({
    pageIndex: 1,
    pageSize: 15
  });

  const columns = (): ColumnProps<any>[] => {
    switch (pannelName) {
      case '学分记录':
      case '积分记录':
        return [
          {
            title: '编号',
            key: 'itemCode',
            dataIndex: 'itemCode',
            align: 'center',
            width: 80,
          },
          {
            title: '日期',
            key: 'beginTime',
            dataIndex: 'beginTime',
            align: 'center',
            width: 150,
          },
          {
            title: '分值',
            key: 'credit',
            dataIndex: 'credit',
            align: 'center',
            width: 50,
          },
          {
            title: '项目',
            key: 'itemName',
            dataIndex: 'itemName',
            className: 'align-left',
            align: 'left',
          },
          // {
          //   title: '备注',
          //   key: '备注',
          //   dataIndex: '备注',
          //   className: 'align-left',
          //   align: 'left',
          //   width: 180,
          // },
        ]
      case '培训记录':
        return [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 50,
            render: (text: any, record: any, index: any) => index + 1
          },
          {
            title: '名称',
            key: 'name',
            align: 'left',
            render: (text: string, record: any) => {
              let dateStr = Moment(record.realBeginTime).format('YYYY/MM/DD HH:mm');

              dateStr += `(${Moment(record.realEndTime).diff(Moment(record.realBeginTime), 'hours')}小时)`
              return <Fragment>
                <div className="name">
                  <span title={record.name}>{record.name}</span>
                </div>
                <div className="time">
                  <span title={dateStr}>时间:{dateStr}</span>
                </div>
                <div className="place">
                  <span title={record.place}>地点:{record.place}</span>
                </div>
              </Fragment>
            }
          },
          {
            title: '报名',
            key: 'registration',
            dataIndex: 'registration',
            align: 'center',
            width: 80,
          },
          {
            title: '签到',
            key: 'signIn',
            dataIndex: 'signIn',
            align: 'center',
            width: 80,
          },
          // {
          //   title: '答题',
          //   key: '答题',
          //   dataIndex: '答题',
          //   align: 'center',
          //   width: 80,
          // },
          {
            title: '成绩',
            key: 'grade',
            dataIndex: 'grade',
            align: 'center',
            width: 60,
          },
          {
            title: '学分',
            key: 'credit',
            dataIndex: 'credit',
            align: 'center',
            width: 80,
          },
          {
            title: '答题(次)',
            key: 'answerTime',
            dataIndex: 'answerTime',
            align: 'center',
            width: 70,
          },
        ]
      case '练习记录':
        return [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 50,
            render: (text: any, record: any, index: any) => index + 1
          },
          {
            title: '名称',
            key: 'name',
            align: 'left',
            render: (text: string, record: any) => {
              return <Fragment>
                <div className="name">
                  <span title={record.name}>{record.name}</span>
                </div>
                <div>
                  <span title={record.realBeginTime}>{record.realBeginTime}</span>
                </div>
              </Fragment>
            }
          },
          {
            title: '开始答题时间',
            key: 'realBeginTime',
            dataIndex: 'realBeginTime',
            align: 'center',
            width: 120,
          },
          {
            title: '正确率',
            key: 'scoreRate',
            dataIndex: 'scoreRate',
            align: 'center',
            width: 80,
          },
          {
            title: '积分',
            key: 'rewardPoints',
            dataIndex: 'rewardPoints',
            align: 'center',
            width: 80,
          },
          {
            title: '答题(次)',
            key: 'answerTime',
            dataIndex: 'answerTime',
            align: 'center',
            width: 70,
          },
        ]
      case '考试记录':
        return [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 50,
            render: (text: any, record: any, index: any) => index + 1
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'left',
            render: (text: string, record: any) => {
              return <Fragment>
                <div className="name">
                  <span title={record.name}>{record.name}</span>
                </div>
                <div className="time">
                  <span title={record.beginTime}>时间:{record.beginTime}</span>
                </div>
                <div className="place">
                  <span title={record.place}>地点:{record.place}</span>
                </div>
              </Fragment>
            }
          },
          {
            title: '报到',
            key: 'registration',
            dataIndex: 'registration',
            align: 'center',
            width: 80,
          },
          {
            title: '签到',
            key: 'signIn',
            dataIndex: 'signIn',
            align: 'center',
            width: 80,
          },
          {
            title: '答题时间',
            key: 'realBeginTime',
            dataIndex: 'realBeginTime',
            align: 'center',
            width: 150,
          },
          {
            title: '成绩/补考成绩',
            key: 'grade',
            dataIndex: 'grade',
            align: 'center',
            width: 100,
            render: (text: any, record: any) => `${record.grade || '-'}/${record.supplementaryGrade || '-'}`
          },
          {
            title: '最终成绩',
            key: 'finallGrade',
            align: 'center',
            width: 80,
            render: (text: any, record: any) => {
              return Number(record.grade) > Number(record.supplementaryGrade) ? record.grade : record.supplementaryGrade
            }
          },
          {
            title: '学分',
            key: 'credit',
            dataIndex: 'credit',
            align: 'center',
            width: 80,
          },
          {
            title: '答题/补考次数',
            key: '答题/补考次数',
            dataIndex: '答题/补考次数',
            align: 'center',
            width: 120,
            render: (text: any, record: any) => `${record.answerTime || '-'}/${record.supplementaryTime || '-'}`
          },
        ]
      case '视频学习':
        return [
          {
            title: '序号',
            key: '序号',
            align: 'center',
            width: 50,
            render: (text: any, record: any, index: any) => index + 1
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'left',
            render: (text: string, record: any) => {
              return <Fragment>
                <div className="name">
                  <span title={record.name}>{record.name}</span>
                </div>
                <div className="time">
                  <span title={record.beginTime}>时间:{record.beginTime}</span>
                </div>
              </Fragment>
            }
          },
          {
            title: '学习进度',
            key: 'learningProgress',
            dataIndex: 'learningProgress',
            align: 'center',
            width: 80,
            render: (text: string, record: any) => {
              let progress = 0;
              if (!isNaN(record.learningProgress)) progress = Number(record.learningProgress) * 100;
              return `${progress}%`
            }
          },
          {
            title: '学习时长(分钟)',
            key: 'learningMinute',
            dataIndex: 'learningMinute',
            align: 'center',
            width: 120,
          },
        ]
      default:
        return []
    }
  }

  useEffect(() => {
    let newPannelName = appStore.match.params.pannelName;
    let search: any = qs.parse(appStore.location.search.replace('?', ''));

    if (newPannelName && pannelName !== newPannelName) {
      setPannelName(newPannelName);
      getTableData({
        id: search.id,
        pageIndex: 1,
        pageSize: 15
      }, newPannelName)
    }


    if (sourceChange && search.sourceChange && sourceChange !== search.sourceChange) getTableData()

    setSourceChange(search.sourceChange);

  }, [appStore.match])

  const pointVisible = () => {
    if (pannelName == '学分记录' || pannelName == '积分记录')
      return ''
    else
      return 'hide'

  }

  const getTableData = (other?: any, pName?: string) => {
    other = other || {};
    pName = pName || pannelName
    let newQuey = Object.assign({}, query, other);
    setQuery(newQuey);

    setLoading(true);

    let successCallback = function (list: any, sorce: any, total: any) {
      setData(list);
      setSource(sorce || 0);
      setTotal(total || 0);
      setLoading(false);
    }

    let errorCallback = function () {
      setLoading(false);
    }

    switch (pName) {
      case '积分记录':
        empManageService.getRewardPointsRecord(newQuey).then(res => {
          successCallback(res.data.educonItems[0].list, res.data.rewardPoints, res.data.educonItems[0].totalCount)
        }, err => errorCallback); break;
      case '学分记录':
        empManageService.getCreditRecord(newQuey).then(res => {
          successCallback(res.data.educonItems[0].list, res.data.credits, res.data.educonItems[0].totalCount)
        }, err => errorCallback); break;
      case '培训记录':
        empManageService.getTrainData(newQuey).then(res => {
          let list = res.data.EduconTrainDatas.list;

          successCallback(list.map(((item: any, idx: number) => {
            return {
              ...item,
              name: res.data.itemNames[idx] || '',
              place: res.data.places[idx] || '',
              registration: item.registrationTime ? '已报名' : '未报名',
              signIn: item.signInTime ? '已签到' : '未签到'
            }
          })), '', res.data.EduconTrainDatas.totalCount)
        }, err => errorCallback); break;
      case '练习记录':
        empManageService.getExercisesData(newQuey).then(res => {
          let list = res.data.educonExercisesDatas.list;

          successCallback(list.map(((item: any, idx: number) => {
            return {
              ...item,
              name: res.data.itemNames[idx] || ''
            }
          })), '', res.data.educonExercisesDatas.totalCount)
        }, err => errorCallback); break;
      case '考试记录':
        empManageService.getExamData(newQuey).then(res => {
          let list = res.data.educonExamDatas.list;

          successCallback(list.map(((item: any, idx: number) => {
            return {
              ...item,
              name: res.data.itemNames[idx] || '',
              registration: res.data.educonTrainDatas.list[idx].registrationTime ? '已报名' : '未报名',
              signIn: res.data.educonTrainDatas.list[idx].signInTime ? '已签到' : '未签到',
              beginTime: res.data.beginTimes[idx] || '',
              // place: res.data.places[idx] || ''
            }
          })), '', res.data.educonExamDatas.totalCount)
        }); break;
      case '视频学习':
        empManageService.getVideoLearnData(newQuey).then(res => {
          let list = res.data.educonVideoLearnDatas.list;

          successCallback(list.map(((item: any, idx: number) => {
            return {
              ...item,
              name: res.data.itemNames[idx] || '',
              beginTime: res.data.beginTimes[idx] || ''
            }
          })), '', res.data.educonVideoLearnDatas.totalCount)
        }, err => errorCallback); break;
    }
  }

  const handlePageChange = (page: number) => {
    getTableData({ pageIndex: page })
  }

  const handleSizeChange = (page: number, size: number) => {
    getTableData({
      pageIndex: 1,
      pageSize: size
    })
  }

  return <Wrapper className={pointVisible()}>
    <div className="points">学分合计：{source}</div>
    <div>
      <BaseTable
        columns={columns()}
        dataSource={data}
        loading={loading}
        surplusHeight={325}
        pagination={{
          current: query.pageIndex,
          pageSize: query.pageSize,
          onChange: handlePageChange,
          showSizeChanger: true,
          total: total,
          onShowSizeChange: handleSizeChange
        }}
      />
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
width: 100%;
height: 100%;
padding: 10px;
overflow-y: auto;
.points{
  line-height: 30px;
  margin-bottom: 5px;
}

td{
  >div{
    width: 100%;
    height: 22px;
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

&.hide{
  .points{
    display:none;
  }
}
`