import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import { singleSignOnGzsrmServices } from './services/SingleSignOnGzsrmServices'
export interface Props { }

export default withRouter(function SingleSignOnGzsrm(props: any) {
  const { location: { search } } = props
  const searchObj = qs.parse(search.replace('?', ''))

  const authorizeAndSignIn = () => {
    let params = {}
    console.log('searchObj',searchObj);
    if (searchObj.service) {
      params = {
        token: searchObj.token || searchObj.ticket || '',
        v_url: searchObj.service || '',
      }
    } else {
      params = {
        token: "",
        appCode: "HLTLXT",
        appName: "护理管理系统",
        v_token: searchObj.token,
        tradeCode: "nursing_ssoLogin_2"
      }
    }
    singleSignOnGzsrmServices.autoLogin(params)
    // singleSignOnGzsrmServices.autoLogin({
    //   token: searchObj.token || searchObj.ticket || '',
    //   v_url: searchObj.service || '',
    //   appCode: "HLTLXT",
    //   appName: "护理管理系统",
    // })
  }

  useEffect(() => {
    authorizeAndSignIn()
  }, [])

  return <Wrapper>
    <div id="pre-loader">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div``