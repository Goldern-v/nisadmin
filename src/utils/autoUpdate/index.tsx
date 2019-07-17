import * as React from 'react'

import { notification } from 'antd'
// 自动更新模块 2018-09-27
import $ from 'axios'
import { Icon, Button } from 'src/vendors/antd'

const openMessage = () => {
  notification.open({
    message: '更新提示',
    description: '发现新的版本了，点击立即更新',
    btn: (
      <Button type='primary' size='small' onClick={() => window.location.reload(true)}>
        更新
      </Button>
    ),
    duration: 0
  })
}
async function getHtml() {
  return new Promise((resolve, reject) => {
    $.get('./').then((res) => {
      resolve(res)
    })
  })
}
export default async function() {
  let currentHtml = await getHtml()
  let recentHtml: any = ''
  setInterval(async () => {
    recentHtml = await getHtml()
    console.log(recentHtml, 'currentHtml')
    if (recentHtml != currentHtml) {
      try {
        openMessage()
      } catch (e) {}
      currentHtml = recentHtml
    }
  }, 1000 * 200)
}
