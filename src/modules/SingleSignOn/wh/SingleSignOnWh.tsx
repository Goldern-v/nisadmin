import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { singleSignOnWhServices } from './services/SingleSignOnWhServices'
import service from "src/services/api"
import qs from 'qs'
import { withRouter } from 'react-router'
import { message } from 'src/vendors/antd'

export interface Props { }

export default withRouter(function SingleSignOnWh(props: any) {
  const { location: { search } } = props
  const searchObj = qs.parse(search.replace('?', ''))

  const authorizeAndSignIn = async () => {
    try {
      let res0 = await singleSignOnWhServices.accessToken(searchObj.code)

      const data0 = res0.data

      if (!data0.access_token) throw new Error(JSON.stringify(data0))

      let res1 = await singleSignOnWhServices.profile(data0.access_token)

      const data1 = res1.data

      if (!data1.userCode) throw new Error(JSON.stringify(data1))

      await singleSignOnWhServices.loginWithEmpNo('amdin')

    } catch (e) {
      message.error(e.toString())
    }
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