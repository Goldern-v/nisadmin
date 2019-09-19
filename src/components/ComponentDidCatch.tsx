import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {
  hasError: any
}

export default class ComponentDidCatch extends React.Component<Props, State> {
  public constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  public componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Wrapper>
          <div className='img-con'>
            <img src={require('./images/刷新.png')} alt='' className='main-img' />
            <div className='text-con'>
              <img src={require('./images/错误.png')} alt='' className='text-img' />
              <div className='btn' onClick={() => window.location.reload()}>
                点击刷新
              </div>
            </div>
          </div>
        </Wrapper>
      )
    }
    return this.props.children
  }
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  .img-con {
    width: 478px;
    padding-bottom: 150px;
    .main-img {
      width: 100%;
    }
    .text-con {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 35px;
    }
    .btn {
      width: 126px;
      height: 50px;
      background: #28b476;
      border-radius: 3px;
      font-size: 21px;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 25px;
      &:hover {
        background: #00a680;
      }
    }
  }
`
