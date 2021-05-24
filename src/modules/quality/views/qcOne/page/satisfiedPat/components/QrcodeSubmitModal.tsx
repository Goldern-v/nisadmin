import styled from 'styled-components'
import React from 'react'
import Qrcode from 'qrcode.react'
import { observer } from 'mobx-react-lite'
import { ModalComponentProps } from "src/libs/createModal"
import { Modal } from 'antd'
import { appStore } from 'src/stores'
import moment from 'moment'
import qs from 'qs'

export interface Props extends ModalComponentProps {
  id?: string,
  wardName?: string | number,
  wardCode?: string | number,
}

export default observer(function QrcodeSbmitModal(props: Props) {
  const { visible, onCancel, id, wardName, wardCode } = props
  const testIp = appStore.hisMatch({
    map: {
      wh: 'http://nurse.cr-health.com:34002',
      other: ''
    },
  })

  const productIp = appStore.hisMatch({
    map: {
      wh: 'http://nurse.cr-health.com:34001',
      other: ''
    },
  })

  const baseRoute = `/crNursing/manage/#/satisfiedPatSubmit?${qs.stringify({
    id,
    wardName,
    wardCode
  })}`

  const targetUrl = appStore.isDev ?
    `${testIp}${baseRoute}` :
    `${productIp}${baseRoute}`

  function screenShot() {
    var type = 'png';
    var d = document.getElementById("sxszltx") as any;
    var imgdata = d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type: any) {
      type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    };
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
    //3.0 将图片保存到本地
    var date = new Date();
    var filename = '满意度调查表填写地址_' + moment().format('YYYY_MM_DD_HH:mm:ss') + '.' + type;
    savaImage(imgdata, filename);
  };

  function savaImage(data: any, filename: any) {
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as any;
    save_link.href = data;
    save_link.download = filename;
    save_link.click()
    save_link = null;
  };

  const handleOk = () => screenShot()

  return (
    <Modal
      title="满意度调查表填写"
      visible={visible}
      width={204}
      onCancel={onCancel}
      okText="保存二维码"
      onOk={handleOk}
      centered>
      <Wrapper>
        <Qrcode id="sxszltx" value={targetUrl} />
      </Wrapper>
    </Modal>
  )
})
const Wrapper = styled.div`
  text-align: center;
`