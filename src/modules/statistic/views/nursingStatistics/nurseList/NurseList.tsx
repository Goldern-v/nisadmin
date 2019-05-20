import styled from 'styled-components'
import StatisticHeader from './StatisticHeader'
import CardItem from './CardItem'
import { statisticsApi } from 'src/modules/statistic/api/StatisticsApi'
import React, { useState, useEffect } from 'react'
import { data } from './data'
export default function BedSituation () {
  const [leftList, setLeftList] = useState([])
  const [midList, setMidList] = useState([])
  const [rightList, setRightList] = useState([])
  useEffect(() => {
    statisticsApi.getTotalUser().then((res: any) => {
      // let res = data
      let l: any = []
      let m: any = []
      let r: any = []
      for (let i = 0; i < res.data.length; i += 3) {
        l.push(res.data[i])
        m.push(res.data[i + 1])
        r.push(res.data[i + 2])
      }
      console.log(l, m, r, 9999999)
      setLeftList(l)
      setMidList(m)
      setRightList(r)
    })
  }, [])
  return (
    <Wrapper>
      <ScrollCon>
        <Container>
          <HisName>东莞市厚街医院</HisName>
          <Title>东莞市厚街医院</Title>
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
            <span>培训护师：</span>
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
  border: 1px solid rgba(219, 224, 228, 1);
  margin: 15px;
  padding: 15px;
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
    margin: 0 50px 0 10px;
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
