import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message as Message, Modal, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import HealthProgandaService from './api/healthProgandaService'
import qs from 'qs'

const api = new HealthProgandaService()

export interface Props {}

export default withRouter(function HealthPropagandaView(props: any) {
  const { history, location } = props
  const [data, setData] = useState(new Object() as any)
  const [match, setMatch] = useState(new Object() as any)

  useEffect(() => {
    let query = qs.parse(location.search.replace('?', ''))
    if (query.id) {
      api.getContent(query.id).then((res) => {
        let resData = res.data
        if (resData instanceof Array && resData.length > 0) {
          let newData = resData[0]
          newData.content = newData.content.replace(/  /g, '&nbsp;')
          setData(newData)
        }
      })
      setMatch(query)
    } else {
      history.replace('/setting/健康宣教字典')
    }
  }, [])

  const handleDelete = () => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该健康宣教字典?',
      okText: '确定',
      centered: true,
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        api.delete(data.missionId).then((res) => {
          if (res.code == 200) {
            Message.success('宣教删除成功')
            setTimeout(() => history.replace('/setting/健康宣教字典'), 1000)
          }
        })
      }
    })
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='position-left'>
          <Button className='back' onClick={() => history.goBack()}>
            <Icon type='double-left' className='icon-back' />
            返回
          </Button>
          <span className='sub'>
            由 {data.creatorName || ' '} 编辑，最后修改于 {data.creatDate || ' '}
          </span>
        </div>
        <div className='base-info'>
          <span className='title'>{data.name}</span>
          <span className='sub'>
            <Button onClick={() => history.push(`/healthPropagandaEdit/${match.id}`)}>编辑</Button>
            <Button onClick={handleDelete}>删除</Button>
          </span>
        </div>
      </div>
      <div className='main-contain'>
        <div className='content' dangerouslySetInnerHTML={{ __html: data.content || '' }} />
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 52px;
  box-sizing: border-box;

  * {
    font-size: inherit;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.17em;
  }
  h5 {
    font-size: 0.83em;
  }
  h6 {
    font-size: 0.67em;
  }
  .float-right {
    margin-top: 12px;
    margin-right: 20px;
    float: right;
  }
  .topbar {
    margin-top: -52px;
    height: 52px;
    border-bottom: 1px solid #ddd;
    background: rgba(248, 248, 248, 1);
    /* // box-shadow:0px 3px 5px 0px rgba(0,0,0,0.1); */
    position: relative;
    z-index: 1;
    .position-left {
      position: absolute;
      left: 10px;
      top: 10px;
      .ant-btn {
        margin-right: 5px;
      }
      .back {
        position: relative;
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
    }
    .base-info {
      text-align: center;
      position: relative;
      .title {
        position: absolute;
        display: block;
        left: 425px;
        right: 425px;
        top: 0;
        height: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        line-height: 52px;
        font-weight: bold;
        font-size: 20px;
      }
      .sub {
        color: #666;
        position: absolute;
        font-size: 13px;
        right: 5px;
        top: 10px;
        .ant-btn {
          margin-right: 5px;
        }
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: #eee;
    padding: 10px 0;
    .content {
      width: 720px;
      margin: 0 auto;
      background: #fff;
      padding: 20px 15px;
      min-height: 100%;
      border: 1px solid #ddd;
    }
  }
`
