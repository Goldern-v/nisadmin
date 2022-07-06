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
    if (searchObj.appCode && searchObj.appName) {
      params = {
        token: "",
        appCode: searchObj.appCode,
        appName: searchObj.appName,
        v_token: searchObj.v_token,
        tradeCode: "nursing_ssoLogin_2"
      }
    } else {
      params = {
        token: searchObj.token || searchObj.ticket || '',
        v_url: searchObj.service || '',
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