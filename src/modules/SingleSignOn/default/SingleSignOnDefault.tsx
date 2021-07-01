import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import { singleSignOnDefaultServices } from './services/SingleSignOnDefaultServices'
export interface Props { }

export default withRouter(function SingleSignOnDefault(props: any) {
  const { location: { search } } = props
  const searchObj = qs.parse(search.replace('?', ''))

  const authorizeAndSignIn = () => {
    singleSignOnDefaultServices.autoLogin(searchObj.token)
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