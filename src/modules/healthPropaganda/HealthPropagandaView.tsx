import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message as Message, Modal } from 'antd'
import { withRouter, Link } from 'react-router-dom'
import HealthProgandaService from './api/healthProgandaService'

const api = new HealthProgandaService();

export interface Props { }

export default withRouter(function HealthPropagandaView(props: any) {
  const { match, history } = props;
  const [data, setData] = useState(new Object() as any);

  useEffect(() => {

    if (match.params.id) {
      api.getContent(match.params.id)
        .then(res => {
          let resData = res.data;
          if (resData instanceof Array && resData.length > 0) setData(resData[0])
        });
    } else {
      history.replace('/setting/健康宣教字典');
    }
  }, [])

  const handleDelete = () => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该健康宣教字典?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        api.delete(data.missionId).then(res => {
          if (res.code == 200) {
            Message.success('宣教删除成功');
            setTimeout(() => history.replace('/setting/健康宣教字典'), 1000);
          }
        })
      }
    })

  }

  return <Wrapper>
    <div className="topbar">
      <div className="nav">
        <Link to="/setting/健康宣教字典">健康宣教字典</Link> > {data.type}
      </div>
      <div className="float-right">
        <Button onClick={() => history.push(`/healthPropagandaEdit/${match.params.id}`)} style={{ marginRight: '5px' }}>编辑</Button>
        <Button onClick={handleDelete}>删除</Button>
      </div>
      <div className="base-info">
        <div className="title">{data.name}</div>
        <div className="sub">由 {data.creatorName || ' '} 创建，最后修改于 {data.creatDate || ' '}</div>
      </div>
    </div>
    <div className="main-contain" dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
  </Wrapper>
})
const Wrapper = styled.div`
width: 100%;
height: 100%;
padding-top: 100px;
.float-right{
  margin-top: 30px;
  margin-right: 20px;
  float: right;
}
.topbar{
  margin-top: -100px;
  height: 100px;
  border-bottom: 1px solid #ddd;
  .nav{
    display:inline-block;
    text-indent: 20px;
    line-height: 40px;
    
  }
  .base-info{
    text-indent: 20px;
    width: 100%;
    .title{
      color #000;
      font-size: 20px;
      line-height: 32px;
    }
  }
}

.main-contain{
  height: 100%;
  width: 100%;
  padding: 20px 15px;
  overflow: auto;
  background: #fff;
}
`