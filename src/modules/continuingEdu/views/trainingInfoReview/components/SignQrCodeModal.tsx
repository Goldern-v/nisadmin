import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Spin } from 'antd'
import printing from 'printing'
import { trainingInfoReviewService } from './../api/TrainingInfoReviewService'
import Qrcode from 'qrcode.react'
import moment from 'src/vendors/moment'

export interface Props {
  visible: boolean,
  onCancel: Function,
  ceptId: string | number,
  title: string,
  subTitle: string,
}

export default function SignQrCodeModal(props: Props) {
  const { visible, onCancel, ceptId, title, subTitle } = props

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [qrCodeData, setQrCodeData] = useState('')

  const getQrCodeInfo = () => {
    setLoading(true)
    setMsg('')

    trainingInfoReviewService
      .genSignInCode(ceptId)
      .then((res) => {
        console.log()
        if (res.data) setQrCodeData(res.data)

        setLoading(false)
      }, (err) => {
        if (err) {
          let errMsg = ''
          if (Object.prototype.toString.call(err) === '[object String]')
            errMsg = err
          else
            errMsg = err.message

          setMsg(errMsg)
          setQrCodeData(errMsg)
        }

        setLoading(false)
      })
  }

  const handlePrint = () => {
    const d = document.getElementById("signQrCode") as any;
    var imgdata = d.toDataURL()

    let printEl = document.createElement('div')
    printEl.innerHTML = `
      <div class="title" style="margin-top: 48px;">${title}</div>
      <div class="title">签到二维码</div>
      <div class="title" style="font-size:20;">${subTitle}</div>
      <div style="margin-bottom: 200px;"></div>
      <img class="qr-code" src="${imgdata}">
    `
    document.body.appendChild(printEl)

    printing(printEl, {
      scanStyles: false,
      css: `
        @media print {
          @page {
            size: auto;
            margin: 0mm;
          }
        }

        html,body{
          margin: 0 auto;
          width: 100%;
          height: 1100px;
          background-image: linear-gradient(#00A680, #fff, #00A680);
          background-repeat: no-repeat;
          overflow: hidden;
        }

        *{
          margin: 0;
          padding: 0;
        }

        .title{
          text-align: center;
          font-size: 36px;
          font-weight: bold;
          margin-top: 24px;
        }

        .qr-code{
          border: 8px solid #fff;
          width: 300px;
          margin: 0 auto;
          display: block;
          border-radius: 5px;
        }
      `
    })
  }

  const handleSave = () => {
    var type = 'png';
    var d = document.getElementById("signQrCode") as any;
    var imgdata = d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type: any) {
      type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    };
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
    //3.0 将图片保存到本地
    var filename = '签到二维码_' + moment().format('YYYY_MM_DD_HH:mm:ss') + '.' + type;
    savaImage(imgdata, filename);
  };

  const savaImage = (data: any, filename: any) => {
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as any;
    save_link.href = data;
    save_link.download = filename;
    save_link.click()
    save_link = null;
  };

  useEffect(() => {
    if (ceptId && visible) {
      getQrCodeInfo()
    }
  }, [visible])

  return <Modal
    title="签到二维码"
    visible={visible}
    width={240}
    bodyStyle={{ padding: 0 }}
    onCancel={() => onCancel()}
    footer={<FooterCon>
      <Button disabled={msg.length > 0} loading={loading} onClick={() => handlePrint()}>打印</Button>
      <Button type="primary" disabled={msg.length > 0} loading={loading} onClick={handleSave}>保存</Button>
    </FooterCon>}
    centered>
    <Wrapper>
      <Spin spinning={loading}>
        <div className="qr-code-wrapper">
          <Qrcode id="signQrCode" value={qrCodeData} style={{ width: 200, height: 200 }} />
          {(msg && msg.length > 0) && (
            <div className="err-msg">
              <span>{msg}</span>
            </div>
          )}
        </div>
      </Spin>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  .qr-code-wrapper{
    padding: 20px;
    width: 240px;
    height: 240px;
    .err-msg{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      background: rgba(255,255,255,0.95);
      color: #000;
      font-size: 16px;
      font-weight: bold;
      span{
        vertical-align: middle;
        width: calc(100% - 1px);
        display: inline-block;
        padding: 20px;
      }
      &::after{
        content: '';
        height: 100%;
        width: 1px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
`

const FooterCon = styled.div`
  display: flex;
  &>*{
    flex: 1
  }
`