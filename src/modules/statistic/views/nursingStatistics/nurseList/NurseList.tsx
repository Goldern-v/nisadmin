import styled from 'styled-components'
import StatisticHeader from './StatisticHeader'
import CardItem from './CardItem'
import { statisticsApi } from 'src/modules/statistic/api/StatisticsApi'
import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import MidHeader from './MidHeader'
export default function BedSituation () {
  const [leftList, setLeftList] = useState([])
  const [infoList, setInfoList] = useState([])
  const [midList, setMidList] = useState([])
  const [rightList, setRightList] = useState([])
  const [spinning, setSpinning] = useState(false)
  useEffect(() => {
    setSpinning(true)
    statisticsApi.getTotalUser().then((res: any) => {
      let users = res.data[0]!.users
      // let res = data
      let l: any = []
      let m: any = []
      let r: any = []
      for (let i = 0; i < users.length; i += 3) {
        l.push(users[i])
        m.push(users[i + 1])
        r.push(users[i + 2])
      }
      setLeftList(l)
      setMidList(m)
      setRightList(r)
      setSpinning(false)
      let list: any = [
        {
          key: '总人数',
          value: res.data[0].allTotal
        },
        {
          key: '主任护师',
          value: res.data[0].nurseDirector
        },
        {
          key: '副主任护师',
          value: res.data[0].nurseDeputyDirector
        },
        {
          key: '主管护师',
          value: res.data[0].nurseInCharge
        },
        {
          key: '护师',
          value: res.data[0].nursePractitioner
        },
        {
          key: '护士',
          value: res.data[0].nurse
        },
        {
          key: '见习期护士',
          value: res.data[0].probationNurse
        }
        // {
        //   key: '培训护师',
        //   value: res.data[0].nurseInCharge
        // }
      ]
      setInfoList(list)
    })
  }, [])
  return (
    <Wrapper>
      <ScrollCon>
        <Container>
          {/* <HisName>东莞市厚街医院</HisName>
          <Title>东莞市厚街医院</Title> */}
          <MidHeader />
          <Info>
            {infoList.map((item: any) => (
              <InfoItem>
                {item.key}：{item.value}人
              </InfoItem>
            ))}
          </Info>
          <Spin spinning={spinning}>
            <MainPart>
              <CardCon>
                {leftList.map((item) => (
                  <CardItem data={item} />
                ))}
              </CardCon>
              <CardCon>
                {midList.map((item) => (
                  <CardItem data={item} />
                ))}
              </CardCon>
              <CardCon>
                {rightList.map((item) => (
                  <CardItem data={item} />
                ))}
              </CardCon>
            </MainPart>
          </Spin>
          <Footer>
            <span>图例：</span>
            <span>主任护师：</span>
            <div className='block color-1' />
            <span>副主任护师：</span>
            <div className='block color-2' />
            <span>主管护师：</span>
            <div className='block color-3' />
            <span>护 师：</span>
            <div className='block color-4' />
            <span>护 士：</span>
            <div className='block color-5' />
            {/* <span>培训护师：</span>
            <div className='block color-6' /> */}
            <span>见习期护士：</span>
            <div className='block color-6' />
          </Footer>
        </Container>
      </ScrollCon>
    </Wrapper>
  )
}

const Con = styled.div`
  /* width: 700px; */
  /* background-image: url(${require('src/modules/login/img/pageTable.png')}); */
  img{
    width:930px;
    height: 1000px;
  }
`

const Container = styled.div`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: ${(p) => p.theme.$margin};
  padding: ${(p) => p.theme.$margin};
  box-shadow: ${(p) => p.theme.$shadow};
`
const Wrapper = styled.div``

const ScrollCon = styled.div`
  height: calc(100vh - 100px);
  overflow: auto;
`

const HisName = styled.div`
  font-size: 21px;
  color: #333333ff;
  text-align: center;
`
const Title = styled.div`
  font-size: 16px;
  color: #333333ff;
  text-align: center;
`
const MainPart = styled.div`
  display: flex;
  min-height: 400px;
`
const CardCon = styled.div`
  width: 360px;
  /* flex: 1; */
`
const Footer = styled.div`
  height: 50px;
  background: rgba(248, 248, 248, 1);
  margin: 0 -15px -15px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000000;
  .block {
    width: 42px;
    height: 20px;
    border-radius: 1px;
    margin: 0 30px 0 10px;
    &.color-1 {
      background: #f5ad77;
    }
    &.color-2 {
      background: #fa5f4c;
    }
    &.color-3 {
      background: #ba95d5;
    }
    &.color-4 {
      background: #96b6ec;
    }
    &.color-5 {
      background: #77ce90;
    }
    &.color-6 {
      background: #cacaca;
    }
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 10px;
`

const InfoItem = styled.div`
  margin-right: 30px;
`
