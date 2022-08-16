import moment from 'moment'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import service from 'src/services/api'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Button,
  Col,
  DatePicker,
  Icon,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Timeline,
} from 'src/vendors/antd'
import { appStore, authStore } from 'src/stores'
import { stringify } from 'qs'

import api from '../api'
import verify from './verify'

interface Props {

}
export interface DeptType {
  code: string;
  name: string;
}
const statusMap_gzsrm = ['待提交', '待病区审核', '待片区填写意见', '审核完成']

export default observer((props: Props) => {
  // let deptList = authStore.deptList;
  const _user = JSON.parse(sessionStorage.getItem('user') || '[]')
  const userName = _user.empName
  const [deptList, setDeptList] = useState([])
  const { history, location, match } = appStore
  const [master, setMaster]: any = useState({})
  const [process, setProcess]: any[] = useState([])
  const [form, setForm]: any = useState({})
  function setFormItem(item: object) {
    const keys = ['SR0004021', 'SR0004019', 'SR0004017', 'SR0004015', 'SR0004013', 'SR0004011', 'SR0004029'];
    const sum = keys.reduce((acc: number, cur: string) => {
      const val = form[cur];
      const valNum = isNaN(+val) ? 0 : +val;
      return acc + valNum;
    }, 0);
    setForm({ ...form, ...item, 'SR0004022': sum });
  }
  // 全部科室
  const getDeptAll = () => {
    service.commonApiService.getNursingUnitAll().then(res => {
      if (res.data.deptList) setDeptList(res.data.deptList)
    })
  }

  const [wardString, setWardCode] = useState({ wardCode: '', wardName: '' })
  // const [master, setMaster] = useState({})
  // {
  //   formCode: 'SR0001',
  //   formName: '日查房评分表',
  //   deptCode: '',
  //   deptName: '',
  //   wardCode: wardString.wardCode,
  //   wardName: wardString.wardName
  // }
  const [processVisible, setProcessVisible] = useState(false)
  const [checkUserVisible, setCheckUserVisible] = useState(false)
  const defaultUser = {
    noPass: undefined,
    handleContent: '',
    empNo: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)
  const [tableId, setTableId] = useState('')
  const [checkStatus, setCheckStatus] = useState(false)

  const getData = async (id = appStore.queryObj.id) => {
    const { data } = await api.getItem(id)
    setMaster(data.master)
    setProcess(data.handlenodeDto)
    setFormItem(data.itemDataMap)
    setForm(data.itemDataMap)
    const checkStatus = data?.master?.nextNodeCode;//下一步审核状态
    setAllowRectification(['district_nurse_audit'].includes(checkStatus))
  }
  // 当前审核节点
  const currentNode = () => {
    if (!(master.currentNodeCode && process.length)) return false
    const current = process.find((item: any) => {
      return master.nextNodeCode === item.nodeCode
    })
    return current
  }

  const hasSubmit = () => {
    if (!(master.currentNodeCode && process.length)) return false
    const current = process.find((item: any) => {
      return master.nextNodeCode === item.nodeCode && item.status === '0'
    })
    return current?.canUpdate
  }

  const notFullMarks = (key: any, num: number) => {
    // const keys = ['SR0004021','SR0004019', 'SR0004017', 'SR0004015', 'SR0004013', 'SR0004011']
    // eslint-disable-next-line default-case
    switch (key) {
      case 'SR0004011':
        if (num < 15.0) {
          if (!form.SR0004010) {
            return false
          } else return true
        } else if (num == 15.0) return true
        else return false
      default:
        return true
    }
  }

  const onVerify = () => {
    // required = []
    if (JSON.stringify(form) === '{}') {
      return false
    } else {
      let newArr: any = []
      for (let key in form) {
        newArr.push({ name: key, title: form[key] })
      }
      newArr.forEach((item: { name: string; title: any; }) => {
        verify.forEach((items, index) => {
          if (item.name === items.name) {
            verify[index].value = item.title
          }
        })
      })
      let is = verify.every((item: { value: string }) => item?.value)
      return is
    }
  }
  const handleSubmit = async (status: boolean) => {
    if (onVerify()) {
      if (notFullMarks('SR0004011', form.SR0004011)) {

        // if (!appStore.queryObj.id) {
        let obj = {
          formCode: 'SR0004',
          formName: '护士长班查房评分表',
          deptCode: '',
          deptName: '',
          wardCode: wardString.wardCode,
          wardName: wardString.wardName
        }
        // }
        const res = await api.saveItem({
          master: appStore.queryObj.id || tableId ? { ...master, wardCode: wardString.wardCode, wardName: wardString.wardName } : obj,
          itemDataMap: form,
          commit: status
        })
        // if (!appStore.queryObj.id) {
        if (res.code === '200') {
          // message.success('新建成功')
          // appStore.history.push(`/checkWard/scoringRecord`)
          message.success(!status ? '暂存成功' : '保存成功')
          // 控制是否出来审核模块
          setCheckStatus(status)
          setTableId(res.data.master.id)
          await getData(res.data.master.id)


        } else {
          message.warning(res.desc)
        }
        // }
        // else {
        // message.success(!status ? '暂存成功' : '保存成功')
        // await getData(res.data.master.id)
        // }
      } else {
        message.warning("护理单元不是满分必须填写存在问题")
      }
    } else {
      message.warning("请填写必填项")
    }
  }

  const hasAudit = () => {
    if (!(master.currentNodeCode && process.length)) return false
    const current = process.find((item: any) => {
      return master.nextNodeCode === item.nodeCode && item.status === '0'
    })
    return current?.canHandle
  }

  const handleAudit = async () => {
    setUser(defaultUser)
    setProcessVisible(true)
  }

  const handleCheck = async () => {
    const params = {
      id: master.id,
      nodeCode: 'commit',
      noPass: user.noPass,
      handleContent: user.handleContent,
      empNo: user.empNo,
      password: user.password,
      itemDataMap: form,
      formId: appStore.queryObj.id || '',
      formCode: 'SR0004',
    }
    try {
      if (allowRectification) {
        const res = await saveOpinion()
      }
      await api.auditItem(params)
      await getData(tableId || appStore.queryObj.id)
      // todo
      // const current = process.find((item: any) => {
      //   return master.nextNodeCode === item.nodeCode
      // })
      // if (current.nodeName === '片区护士长填写意见') {
      //   setForm({ ...form, 'SR0004023': user.handleContent });

      // } else if (current.nodeName === '病区护士长填写病区整改') {
      //   form.SR0004024 = user.handleContent
      //   setForm({ ...form, 'SR0004024': user.handleContent });
      // }
    } finally {
      setCheckUserVisible(false)
    }
  }

  // 删除
  const [deleteVisible, setDeleteVisible] = useState(false)
  const okModal = () => {
    api.deleteitem({ id: tableId || appStore.queryObj.id }).then(res => {
      if (res.code === '200') {
        message.success('删除成功')
        appStore.history.push(`/checkWard/scoringRecord`)
      } else {
        message.warning(res.desc)
      }
    })
  }
  const cancelCommit = () => {
    api.cancelCommitForGZ({ id: tableId || appStore.queryObj.id }).then(async res => {
      if (res.code === '200') {
        message.success('撤销提交成功')
        // appStore.history.push(`/checkWard/scoringRecord`)
        await getData(tableId || appStore.queryObj.id)
      } else {
        message.warning(res.desc)
      }
    })
  }
  // 是否点击病区整改
  const [allowRectification,setAllowRectification] = useState(false)

  //状态str
  const getCheckStr = () => {
    const checkStatus = master?.nextNodeCode;//下一步审核状态
    return ['ward_nurse_audit'].includes(checkStatus) ? '病区整改' : '审核';
  }

  const saveOpinion = async() => {
    try {
      const res = await api.saveOpinion({
        formId: appStore.queryObj.id || '',
        itemValue: form.SR0004024,
        itemCode: 'SR0004024'
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (appStore.queryObj.id) {
      getData().then()
    }
    getDeptAll()
    setForm({
      'SR0004001': userName, 'SR0004003': moment(new Date).format("YYYY-MM-DD HH:mm"),
      'SR0004011': 15, 'SR0004013': 10, 'SR0004015': 25, 'SR0004017': 20, 'SR0004019': 5, 'SR0004021': 10, 'SR0004029': 15, 'SR0004022': 100
    })
  }, [])


  return (
    <Wrapper>
      <BreadcrumbBox
        style={{ padding: '5px 10px 0', height: '26px' }}
        data={appStore.queryObj.id ? [
          { name: '查房记录', link: '/checkWard/scoringRecord' },
          { name: "记录详情" },
        ] : [
          { name: '查房记录', link: '/checkWard/scoringRecord' },
          { name: "新建查房" },
        ]}
      />
      <HeadWrapper>
        <div>
          <div style={{ fontWeight: "bold" }}>{master.deptName}护士长班查房评分表</div>
          {appStore.queryObj.id && <div>状态: {statusMap_gzsrm[master.status]}</div>}
        </div>
        <div className='right-bottom'>
          {/* hasSubmit() && */}
          {<Button type='primary' className="con-item" onClick={() => handleSubmit(false)}>暂存</Button>}
          {<Button type='primary' className="con-item" onClick={() => handleSubmit(true)}>提交</Button>}
          {/* {!appStore.queryObj.id && <Button type='primary' className="con-item" onClick={() => handleSubmit()}>保存</Button>} */}
          {(hasAudit() && master.status !== '0') && <Button type='primary' className="con-item" onClick={() => handleAudit()}>审核</Button>}
          {<Button type='primary' className="con-item" onClick={() => setDeleteVisible(true)}>删除</Button>}
          {<Button type='primary' className="con-item" onClick={() => cancelCommit()}>撤销提交</Button>}
          <Button className="con-item" onClick={() => history.goBack()}>返回</Button>
        </div>
      </HeadWrapper>
      <MainWrapper>
        <div className='table-main'>
          <div className='table-wrapper'>
            <div className='table-title'>
              护士长查房评分表
            </div>
            <table className={!appStore.queryObj.id ? '' : hasSubmit() ? '' : 'disable'}>
              {/* <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
              </colgroup> */}
              <tbody>
                <tr>
                  <td className='required'>查房护士长：</td>
                  <td>
                    <Input
                      value={form.SR0004001}
                      onChange={(e) =>
                        setFormItem({ 'SR0004001': e.target.value })
                      }
                    />
                  </td>
                  <td className='required'>查房班次:</td>
                  <td>
                    {/* <Input
                      value={form.SR0004002}
                      onChange={(e) =>
                        setFormItem({ 'SR0004002': e.target.value })
                      }
                    /> */}
                    <Select className='select' value={form.SR0004002}
                      onChange={(val: any) =>
                        setFormItem({ 'SR0004002': val })
                      }
                    >
                      <Select.Option key='夜班' value='夜班'>夜班</Select.Option>
                      <Select.Option key='晚班' value='晚班'>晚班</Select.Option>
                      <Select.Option key='白班' value='白班'>白班</Select.Option>
                    </Select>
                  </td>
                  <td className='required'>查房时间:</td>
                  <td>
                    {/* <Input
                      value={form.SR0004003}
                      onChange={(e) =>
                        setFormItem({ 'SR0004003': e.target.value })
                      }
                    /> */}
                    <DatePicker
                      format="YYYY-MM-DD HH:mm"
                      allowClear={false}
                      value={moment(form.SR0004003)}
                      showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                      onChange={_date => {
                        setFormItem({ 'SR0004003': moment(_date).format("YYYY-MM-DD HH:mm") })
                      }}
                      onOk={_data => {
                        setFormItem({ 'SR0004003': moment(_data).format("YYYY-MM-DD HH:mm") })
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='required'>病区:</td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004004}
                      onChange={(e) =>
                        setFormItem({ 'SR0004004': e.target.value })
                      }
                    /> */}
                    <Select className='select inpatientAreaSel'
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      value={form.SR0004004} onChange={(val: string) => {
                        let newarr: any = deptList.filter((item: DeptType) => {
                          return item.code === val
                        })
                        let obj = {
                          wardCode: newarr[0].code,
                          wardName: newarr[0].name
                        }
                        setWardCode(obj)
                        setFormItem({ 'SR0004004': newarr[0].name })
                      }
                      }>
                      {deptList.map((item: DeptType) => (
                        <Select.Option key={item.name} value={item.code}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td className='required'>一级护理:</td>
                  <td>
                    <Input
                      value={form.SR0004005}
                      onChange={(e) =>
                        setFormItem({ 'SR0004005': e.target.value })
                      }
                    />
                  </td>
                  <td className='required'>病人数：</td>
                  <td>
                    <Input
                      value={form.SR0004006}
                      onChange={(e) =>
                        setFormItem({ 'SR0004006': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td className='required'>值班护士：</td>
                  <td>
                    <Input
                      value={form.SR0004007}
                      onChange={(e) =>
                        setFormItem({ 'SR0004007': e.target.value })
                      }
                    />
                  </td>
                  <td className='required'>特级护理:</td>
                  <td>
                    <Input
                      value={form.SR0004008}
                      onChange={(e) =>
                        setFormItem({ 'SR0004008': e.target.value })
                      }
                    />
                  </td>
                  <td className='required'>陪护数：</td>
                  <td>
                    <Input
                      value={form.SR0004009}
                      onChange={(e) =>
                        setFormItem({ 'SR0004009': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>查房标准</td>
                </tr>
                <tr>
                  <td>查房类型</td>
                  <td colSpan={3}>查房内容</td>
                  <td>存在问题</td>
                  <td>得分</td>
                </tr>
                <tr>
                  <td>护理单元(15分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、护士坚守岗位，无自行换班情况（3分）。</p>
                    <p>2、护士着装整洁、佩戴胸牌、头花、服务热情（3分）。</p>
                    <p>3、病房地面、盥洗间及卫生间清洁，无垃圾（3分）。</p>
                    <p>4、治疗室、办公室、处置室整洁，物品放置规范（3分）。</p>
                    <p>5、饮水机、微波炉等清洁、无污垢（1分）。 </p>
                    <p>6、规范使用氧气瓶，标识完整（2分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004010}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004010': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004011}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004011': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004011} min={0} max={15} step={0.1}
                      onChange={(value) => {
                        form.SR0004011 = value
                        setFormItem({ 'SR0004011': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>危重、一级术后患者护理(10分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、床单位整洁（2分）。</p>
                    <p>2、患者三短六洁（2分）。</p>
                    <p>3、导管护理符合规范（3分）。</p>
                    <p>4、跌倒、压疮、VTE预防及护理符合规范，翻身卡按要求填写（3分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004012}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004012': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004013}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004013': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004013} min={0} max={10} step={0.1}
                      onChange={(value) => {
                        form.SR0004013 = value
                        setFormItem({ 'SR0004013': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>护士操作(25分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、随机查看护士是否按规范操作（4分）。</p>
                    <p>2、操作过程中严格执行手卫生（4分）。</p>
                    <p>3、有无实习护生单独操作（4分）。</p>
                    <p>4、按要求使用PDA（4分）。</p>
                    <p>5、查看病人输液有无渗漏（4分）。 </p>
                    <p>6、询问病人护士有无及时巡视（5分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004014}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004014': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004015}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004015': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004015} min={0} max={25} step={0.1}
                      onChange={(value) => {
                        form.SR0004015 = value
                        setFormItem({ 'SR0004015': value })
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>医院感染(20分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、医疗垃圾、生活垃圾分类放置，记录正确有签名，大垃圾桶上锁（3分）。</p>
                    <p>2、液体标明开启日期、时间及用途（3分）。</p>
                    <p>3、一次性物品开启后注明日期、时间及开启人姓名（3分）。</p>
                    <p>4、治疗车清洁，清洁物品和污染物品分开放置（4分）。</p>
                    <p>5、多重耐药菌管理规范（3分）。 </p>
                    <p>6、消毒隔离工作落实到位（如：瓶装碘伏开启后密闭保存，有效期≤30天；溶媒有效期≤24h，静脉用药有效期≤2h；湿化瓶定期更换）（4分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004016}
                      rows={8}
                      onChange={(e) =>
                        setFormItem({ 'SR0004016': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004017}
                      rows={8}
                      onChange={(e) =>
                        setFormItem({ 'SR0004017': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004017} min={0} max={20} step={0.1}
                      onChange={(value) => {
                        form.SR0004017 = value
                        setFormItem({ 'SR0004017': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>急救药品、物品(5分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、抢救车、抢救仪器完好，处于备用状态（3分）。</p>
                    <p>2、抢救药品、物品登记本填写规范（2分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004018}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004018': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004019}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004019': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004019} min={0} max={5} step={0.1}
                      onChange={(value) => {
                        form.SR0004019 = value
                        setFormItem({ 'SR0004019': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>药品管理(10分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、高危药品单独放置（2分）。</p>
                    <p>2、药品标签清楚、无过期、变质、裸放、混放等（4分）。</p>
                    <p>3、内服、外用药分开放置（2分）。</p>
                    <p>4、冰箱内无药物混放（1分）。</p>
                    <p>5、药物使用符合规范（避光、冷藏等）（1分）。</p>
                    {/* <p>6、规范使用氧气瓶，标识完整</p> */}
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004020}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004020': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004021}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004021': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004021} min={0} max={10} step={0.1}
                      onChange={(value) => {
                        form.SR0004021 = value
                        setFormItem({ 'SR0004021': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>新冠疫情防控(15分)</td>
                  <td colSpan={3} className='text-left'>
                    <p>1、所有住院患者落实核酸检测结果阴性方可办理入院手续（1分）。</p>
                    <p>2、各病区规范填写患者及陪护核酸检测信息登记本（2分）。</p>
                    <p>3、所有患者入院时必须签署《贵州省人民医院新冠疫情防控期间住院患者陪护人员责任书》（1分）、《贵州省人民医院新冠疫情防控期间住院患者陪护人员情况登记表》（1分）。</p>
                    <p>4、告知患者及家属疫情防控的重要性，患者（病情允许）及陪护人员带好口罩（2分）。</p>
                    <p>5、疫情防控标识清晰（2分）。</p>
                    <p>6、各病房安排人员守门，确保无外来人员随意出入（2分），规范填写来访人员登记本（2分）。</p>
                    <p>7、各病区设置有专门的过渡病房（2分）。</p>
                  </td>
                  <td>
                    <Input.TextArea
                      value={form.SR0004028}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004028': e.target.value })
                      }
                    />
                  </td>
                  <td>
                    {/* <Input.TextArea
                      value={form.SR0004021}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004021': e.target.value })
                      }
                    /> */}
                    <InputNumber value={form.SR0004029} min={0} max={15} step={0.1}
                      onChange={(value) => {
                        form.SR0004029 = value
                        setFormItem({ 'SR0004029': value })
                      }
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>总分</td>
                  <td colSpan={5}>
                    {/* <Input
                      value={form.SR0004022}
                      onChange={(e) =>
                        setFormItem({ 'SR0004022': e.target.value })
                      }
                    /> */}
                    {form.SR0004022}
                    {/* <InputNumber value={form.SR0004022}
                      onChange={(value) =>
                        setFormItem({ 'SR0004022': value })
                      }
                    /> */}
                  </td>
                </tr>
              </tbody>
              {appStore.queryObj.id && <tbody >
                <tr className={allowRectification ? '' : 'disable'}>
                  <td>病区整改</td>
                  <td colSpan={5}>
                    <Input.TextArea
                      value={form.SR0004024}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004024': e.target.value })
                      }
                    />
                  </td>
                </tr>
                <tr className='disable'>
                  <td>片区护士长意见</td>
                  <td colSpan={5}>
                    <Input.TextArea
                      value={form.SR0004023}
                      rows={6}
                      onChange={(e) =>
                        setFormItem({ 'SR0004023': e.target.value })
                      }
                    />
                  </td>
                </tr>
              </tbody>}
            </table>
          </div>
          {(hasAudit() && master.status !== '0') && <div className='audit-wrapper'>
            <div className='audit-title'>审核流程</div>
            <div>
              <Timeline>
                {
                  process.map((item: any, index: number) => {
                    return <div key={index}>
                      {item.status === '1' && <Timeline.Item key={index} dot={<Icon type={item.noPass ? 'close-circle' : 'check-circle'} style={{ fontSize: '12px' }} />} color={item.status === '1' ? (item.noPass ? 'red' : 'green') : 'rgba(0,0,0,.25)'}>
                        <div className='timeline-item'>{item.nodeName}</div>
                        <div className='timeline-item'>{item.status === '1' ? item.handlerName : ''}</div>
                        <div className='timeline-item'>{item.status === '1' ? item.handleTime : ''}</div>
                        {
                          allowRectification && item.nodeCode === 'ward_nurse_audit' && item.status === '1' && !item.noPass
                          ? <Input.TextArea
                              value={form.SR0004024}
                              rows={3}
                              onChange={(e) =>
                                setFormItem({ 'SR0004024': e.target.value })
                              }
                              style={{
                                background: 'rgb(238,238,238)',
                                borderRadius: '5px',
                                padding: '0 5px'
                              }}
                            />
                          : <div className='timeline-item'
                              style={{
                                background: 'rgb(238,238,238)',
                                borderRadius: '5px',
                                padding: '0 5px'
                              }}> <span>{item.status === '1' ? item.handleContent : ''}</span>
                            </div>
                        }
                      </Timeline.Item>}
                      {item.status === '0' && <Timeline.Item key={index} color={item.status === '1' ? (item.noPass ? 'red' : 'green') : 'rgba(0,0,0,.25)'}>
                        <div className='timeline-item'>{item.nodeName}</div>
                        <div className='timeline-item'>{item.status === '1' ? item.handlerName : ''}</div>
                        <div className='timeline-item'>{item.status === '1' ? item.handleTime : ''}</div>
                        <div className='timeline-item'
                          style={{
                            background: 'rgb(238,238,238)',
                            borderRadius: '5px',
                            padding: '0 5px'
                          }}> <span>{item.status === '1' ? item.handleContent : ''}</span>
                        </div>
                      </Timeline.Item>}
                    </div>
                  })
                }
              </Timeline>
            </div>
          </div>}
        </div>
      </MainWrapper>
      <Modal
        title={getCheckStr()}
        visible={processVisible}
        width={680}
        onOk={() => {
          setProcessVisible(false)
          setCheckUserVisible(true)
        }}
        onCancel={() => {
          setProcessVisible(false)
        }}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          {currentNode().nodeName === '片区护士长填写意见' &&
            <Row style={{ marginBottom: '10px' }}>
              <Col span={4}>审核结果:</Col>
              <Col span={20}>
                <Radio.Group
                  value={user.noPass}
                  onChange={(e) => setUser({ ...user, 'noPass': e.target.value })}>
                  <Radio value={false}>通过</Radio>
                  <Radio value={true}>驳回</Radio>
                </Radio.Group>
              </Col>
            </Row>}
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>{getCheckStr()}意见:</Col>
            <Col span={20}>
              <Input.TextArea
                value={user.handleContent}
                rows={4}
                onChange={(e) =>
                  setUser({ ...user, 'handleContent': e.target.value })
                } />
            </Col>
          </Row>
          <Row>
            <Col span={4}>{getCheckStr()}时间:</Col>
            <Col span={20}>{moment().format("YYYY-MM-DD HH:mm")}</Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title="请输入账号密码"
        visible={checkUserVisible}
        width={400}
        onOk={() => handleCheck()}
        onCancel={() => {
          setCheckUserVisible(false)
        }}
      >
        <div style={{ lineHeight: '28px', fontSize: '16px' }}>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={4}>账号:</Col>
            <Col span={20}>
              <Input
                value={user.empNo}
                onChange={(e) =>
                  setUser({ ...user, 'empNo': e.target.value })
                } />
            </Col>
          </Row>
          <Row>
            <Col span={4}>密码:</Col>
            <Col span={20}>
              <Input
                type='password'
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, 'password': e.target.value })
                } />
            </Col>
          </Row>
        </div>
      </Modal>
      {/* 删除提示框 */}
      <Modal
        title="提示"
        visible={deleteVisible}
        onOk={okModal}
        onCancel={() => setDeleteVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p style={{ fontSize: '16px' }}>确定要删除吗？</p>
      </Modal>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
`

const HeadWrapper = styled.div`
  height: 50px;
  background: #fff;
  font-size: 14px;
  display:flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  
  .right-bottom{
    .con-item{
      margin-left: 10px;
      font-size: 12px;
    }
  }
`

const MainWrapper = styled.div`
   height: calc(100% - 50px);
   position: relative;
   .disable{
    pointer-events: none;
   }
   .table-main {
    // overflow: auto;
    height: 100%
   }
   .table-wrapper::-webkit-scrollbar-track-piece,
   .audit-wrapper::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:#f8f8f8;
    }
    .table-wrapper::-webkit-scrollbar,
    .audit-wrapper::-webkit-scrollbar {//滚动条的宽度
      width:9px;
      height:9px;
    }
    .table-wrapper::-webkit-scrollbar-track,
    .audit-wrapper::-webkit-scrollbar-track{//滚动条的设置
      background-color:#dddddd;
      border-radius:5px;
    }
    .table-wrapper::-webkit-scrollbar-thumb,
    .audit-wrapper::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#dddddd;
      background-clip:padding-box;
      min-height:18px;
      border-radius:5px;
    }
    .table-wrapper::-webkit-scrollbar-thumb:hover,
    .audit-wrapper::-webkit-scrollbar-thumb:hover {
      background-color:#bbb;
    }
   .table-wrapper{
      background: #fff;
      height: 100%;
      width: 65%;
      margin: 0 15%;
      padding: 30px 50px 80px;
      overflow: auto;
      
      
      .table-title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      table{
        border-collapse: collapse;
        border-color: #000;
        width: 100%;
        table-layout: fixed;
        tr {
          width: 100%;
        }
        td{
          border: 1px #000 solid;
          line-height: 24px;
          min-height: 24px;
          text-align: center;
          input,
          .ant-input{
            border: none;
            resize:none
          }
          .ant-input:focus,
          .ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active{
            box-shadow: none;
            border-right-width: 0 !important;
          }
          p{
            line-height: 24px;
            margin: 0;
          }
          .ant-input-number-handler-wrap{
            border: none;
          }
          .ant-calendar-picker{
            min-width: 126px !important;
            svg{
              display: none;
            }
          }
        }
        .text-left{
          text-align:left;
        }
        .select{
          width: 100%;
          height: 100%
        }
        .ant-select-selection{
          border: none;
        }
        .ant-select-arrow{
          display: none;
        }
        .required::before{
          display: inline-block;
          margin-right: 4px;
          content: "*";
          font-family: SimSun;
          line-height: 1;
          font-size: 12px;
          color: #f04134;
        }
        //病区选择
        .inpatientAreaSel{
          .ant-select-selection-selected-value{
            white-space: break-spaces;
            text-align: left;
          }
        }
      }
   }
   
   .audit-wrapper{
      position: absolute;
      height: 100%;
      width: 250px;
      background: #fff;
      top: 0;
      right: 0;
      padding: 20px 20px;
      overflow: auto;
      
      .audit-title{
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .timeline-item{
        line-height:22px;
      }
      .ant-timeline-item-last{
        .ant-timeline-item-tail{
          display: none
        }
      }
   }
`