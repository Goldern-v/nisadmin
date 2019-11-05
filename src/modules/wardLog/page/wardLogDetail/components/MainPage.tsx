import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import TitleItem from './TitleItem'
import FileCon from './FileCon'
import MessageCon from './MessageCon'
export interface Props {}

export default function MainPage() {
  return (
    <Wrapper>
      <TitleItem
        title='标题'
        aside='办等认么段无代阶机共严受明千见派律存意市低团细面界民们间报通节正线题你得经报观务质样飞间积小强众真低重除而至很思价新。不群法或其最认历事部些自便于家第型己线原做率状入系家人。意眼计运列电支识引为相电因但龙程干该八等张见完都争展以种办地上平情四几使严亲半油图革前府量南除标取力片必太始只年没多对需用教专相决证列有争备应又回国京条外名机划目二存和装山或小什求领离利队。'
      />
      <TitleItem
        title='标题'
        aside='办等认么段无代阶机共严受明千见派律存意市低团细面界民们间报通节正线题你得经报观务质样飞间积小强众真低重除而至很思价新。不群法或其最认历事部些自便于家第型己线原做率状入系家人。意眼计运列电支识引为相电因但龙程干该八等张见完都争展以种办地上平情四几使严亲半油图革前府量南除标取力片必太始只年没多对需用教专相决证列有争备应又回国京条外名机划目二存和装山或小什求领离利队。'
      />
      <Line />
      <FileCon />
      <BlockLine />
      <MessageCon />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 760px;
  min-height: 740px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  margin: 20px auto;
  padding: 20px;
`

const Line = styled.div`
  border-top: 1px dashed #cccccc;
  margin-top: 10px;
  margin-bottom: 10px;
`
const BlockLine = styled.div`
  border-top: 10px solid #eeeeee;
  margin-top: 10px;
  margin-bottom: 10px;
`
