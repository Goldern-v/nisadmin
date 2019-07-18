import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import qs from 'qs'

export interface Props extends RouteComponentProps { }

export default observer(function TableView() {
  const [pannelName, setPannelName] = useState('');
  const [data, setData] = useState([] as any);
  const [sourceChange, setSourceChange] = useState(null as null | string);
  const [loading, setLoading] = useState(false);

  const columns = (): ColumnProps<any>[] => {
    switch (pannelName) {
      case '学分记录':
      case '积分记录':
        return [
          {
            title: '编号',
            key: '编号',
            dataIndex: '编号',
            align: 'center',
            width: 80,
          },
          {
            title: '日期',
            key: '日期',
            dataIndex: '日期',
            align: 'center',
            width: 150,
          },
          {
            title: '分值',
            key: '分值',
            dataIndex: '分值',
            align: 'center',
            width: 50,
          },
          {
            title: '项目',
            key: '项目',
            dataIndex: '项目',
            className: 'align-left',
            align: 'left',
          },
          {
            title: '备注',
            key: '备注',
            dataIndex: '备注',
            className: 'align-left',
            align: 'left',
            width: 180,
          },
        ]
      case '培训记录':
        return [
          {
            title: '序号',
            key: '序号',
            align: 'center',
            width: 50,
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'left',
            render: (text: string, record: any) => {
              return <Fragment>
                <div className="name">
                  <span title={record.title1}>{record.title1}</span>
                </div>
                <div className="time">
                  <span title={record.title2}>{record.title2}</span>
                </div>
                <div className="place">
                  <span title={record.title3}>{record.title3}</span>
                </div>
              </Fragment>
            }
          },
          {
            title: '报名',
            key: '报名',
            dataIndex: '报名',
            align: 'center',
            width: 80,
          },
          {
            title: '签到',
            key: '签到',
            dataIndex: '签到',
            align: 'center',
            width: 80,
          },
          {
            title: '答题',
            key: '答题',
            dataIndex: '答题',
            align: 'center',
            width: 80,
          },
          {
            title: '成绩',
            key: '成绩',
            dataIndex: '成绩',
            align: 'center',
            width: 60,
          },
          {
            title: '学分',
            key: '学分',
            dataIndex: '学分',
            align: 'center',
            width: 80,
          },
          {
            title: '答题(次)',
            key: '答题(次)',
            dataIndex: '答题(次)',
            align: 'center',
            width: 70,
          },
        ]
      case '练习记录':
        return [
          {
            title: '序号',
            key: '序号',
            align: 'center',
            width: 50,
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'center',
            render: (text: string, record: any) => {
              return <Fragment>
                <div></div>
                <div></div>
              </Fragment>
            }
          },
          {
            title: '开始答题时间',
            key: '开始答题时间',
            dataIndex: '开始答题时间',
            align: 'center',
            width: 120,
          },
          {
            title: '正确率',
            key: '正确率',
            dataIndex: '正确率',
            align: 'center',
            width: 80,
          },
          {
            title: '积分',
            key: '积分',
            dataIndex: '积分',
            align: 'center',
            width: 80,
          },
          {
            title: '答题(次)',
            key: '答题(次)',
            dataIndex: '答题(次)',
            align: 'center',
            width: 70,
          },
        ]
      case '考试记录':
        return [
          {
            title: '序号',
            key: '序号',
            align: 'center',
            width: 50,
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'center',
            render: (text: string, record: any) => {
              return <Fragment>
                <div></div>
                <div></div>
                <div></div>
              </Fragment>
            }
          },
          {
            title: '报到',
            key: '报到',
            dataIndex: '报到',
            align: 'center',
            width: 80,
          },
          {
            title: '签到',
            key: '签到',
            dataIndex: '签到',
            align: 'center',
            width: 80,
          },
          {
            title: '答题时间',
            key: '答题时间',
            dataIndex: '答题时间',
            align: 'center',
            width: 150,
          },
          {
            title: '成绩/补考成绩',
            key: '成绩/补考成绩',
            dataIndex: '成绩/补考成绩',
            align: 'center',
            width: 100,
          },
          {
            title: '最终成绩',
            key: '最终成绩',
            dataIndex: '最终成绩',
            align: 'center',
            width: 80,
          },
          {
            title: '学分',
            key: '学分',
            dataIndex: '学分',
            align: 'center',
            width: 80,
          },
          {
            title: '答题/补考次数',
            key: '答题/补考次数',
            dataIndex: '答题/补考次数',
            align: 'center',
            width: 120,
          },
        ]
      case '视频学习':
        return [
          {
            title: '序号',
            key: '序号',
            align: 'center',
            width: 50,
          },
          {
            title: '名称',
            key: '名称',
            dataIndex: '名称',
            align: 'center',
            render: (text: string, record: any) => {
              return <Fragment>
                <div></div>
                <div></div>
              </Fragment>
            }
          },
          {
            title: '学习进度',
            key: '学习进度',
            dataIndex: '学习进度',
            align: 'center',
            width: 80,
          },
          {
            title: '学习时长(分钟)',
            key: '学习时长(分钟)',
            dataIndex: '学习时长(分钟)',
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

    if (newPannelName && pannelName !== newPannelName) {
      setPannelName(newPannelName);
      getTableData({
        name: newPannelName
      })
    }

    let search: any = appStore.location.search;
    if (search) {
      search = qs.parse(search.replace('?', ''));

      if (sourceChange && search.sourceChange && sourceChange !== search.sourceChange) getTableData()

      setSourceChange(search.sourceChange);
    }

  }, [appStore.match])

  const pointVisible = () => {
    if (pannelName == '学分记录' || pannelName == '积分记录')
      return ''
    else
      return 'hide'

  }

  const getTableData = (other?: any) => {
    other = other || {};
    let newQuey = Object.assign({}, other);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }


  return <Wrapper className={pointVisible()}>
    <div className="points">学分合计：5.0</div>
    <div>
      <BaseTable columns={columns()} dataSource={data} loading={loading} />
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