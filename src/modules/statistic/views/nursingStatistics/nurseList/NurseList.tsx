import styled from 'styled-components'
import StatisticHeader from './StatisticHeader'
import CardItem from './CardItem'
import { statisticsApi } from 'src/modules/statistic/api/StatisticsApi'
import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import MidHeader from './MidHeader'
export default function BedSituation() {
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
          <SpinCon>
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
          </SpinCon>
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

const Container = styled.div`
  height: 100%;
  width: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: ${(p) => p.theme.$margin};
  padding: ${(p) => p.theme.$margin};
  box-shadow: ${(p) => p.theme.$shadow};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
const Wrapper = styled.div`
  /* width: auto; */
`

const ScrollCon = styled.div`
  /* width: auto; */
  height: calc(100vh - 73px);
  overflow: hidden;
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
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 400px;
`
const CardCon = styled.div`
  min-width: 360px;
  /* flex: 1; */
`
const Footer = styled.div`
  box-sizing: border-box;
  height: 30px;
  background: rgba(248, 248, 248, 1);
  margin: 15px 0 15px 0;
  padding: 0 25px;
  display: flex;
  align-items: center;
  font-size: 14px;
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
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  font-size: 15px;
  margin: 0 10px;
`
const InfoItem = styled.div`
  margin-right: 30px;
`
const SpinCon = styled.div`
  margin-top: -10px;
  flex: 1;
  height: 0;
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #f8f8f8;
  }
`
