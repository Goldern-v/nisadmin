import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Input, message } from 'antd'
import { ReactComponent as AgreeIcon } from '../images/morengouxuan.svg'
import { appStore, authStore } from 'src/stores'
const { TextArea } = Input
import { Modal, Spin } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import emitter from 'src/libs/ev'
import { modalService } from '../services/ModalService'
import Zimage from 'src/components/Zimage'
import service from 'src/services/api'
import { Obj } from 'src/libs/types'
const defaultHead = require('../images/护士默认头像.png')
const defaultFile = require('../images/证件空态度.png')
const aduitSuccessIcon = require('../images/审核通过.png')
export interface Props extends ModalComponentProps {
  allData?: any
  tableFormat?: any
  fileData?: any
  title?: string
  type: string
  id?: string
  empNo?: string
  getTableData?: () => {}
}

export default function AduitModal(props: Props) {
  let { visible, onCancel } = props
  /** 表格数据 */
  let [spinning, setSpinning]: [any, any] = useState(false)
  let [tableData, setTableData]: [any, any] = useState([])
  /** 文件数据 */
  let [fileData, setFileData]: [any, any] = useState([])
  /** 标题 */
  let [title, setTitle]: [any, any] = useState('')
  /** 评估结果 */
  let [agree, setAgree]: [any, any] = useState('')
  /** 审核状态 */
  let [auditStatus, setAuditStatus]: [any, any] = useState('')
  /** 评估意见 */
  let [opinion, setOpinion]: [any, any] = useState('')
  /** 审核列表 */
  let [auditeListDtos, setAuditeListDtos]: [any, any] = useState([])
  /** 是否需要当前用户审核 */
  let [needAudite, setNeedAudite]: [any, any] = useState(false)
  /**maps的图片字段 */
  const [mapsImg, setMapsImg] = useState<Obj[]>([])
  useEffect(() => {
    if (visible) {
      // props.tableData ? setTableData(props.tableData) : setTableData([])
      props.title ? setTitle(props.title) : setTitle('审核')
      props.fileData ? setFileData(props.fileData) : setFileData([])
      setAgree('agree')
      setOpinion('')
      setSpinning(true)
      if (props.type === 'nurseInformation') {
        modalService.getByIdAuditeDis(props.type, props.empNo).then((res) => {
          let data = { ...res.data, ...res.data.maps }
          let tableData = props.tableFormat.map((item: any) => {
            let keys = Object.keys(item)
            if (!keys[1]) keys[1] = ''

            //名称
            let title0 = keys[0]
            let title1 = keys[1]
            //名称对应的字段key
            let dataIndex0 = item[title0]
            let dataIndex1 = item[title1]
            //名称对应的字段value
            let val0 = data[dataIndex0]
            let val1 = data[dataIndex1]

            let formatRules = {
              'sex': (val: any) => val == '0' ? '男' : '女',
              'hireEmployees': (val: any) => val == '1' ? '是' : '否',
            } as { [p: string]: (val: any) => any }

            let formatVal = (dataIndex: string, val: any) => {
              let rule = formatRules[dataIndex] || null
              if (rule) return rule(val || '')

              return val
            }

            let newRow = {} as any
            if (title0) newRow[title0] = formatVal(dataIndex0, val0)
            if (title1) newRow[title1] = formatVal(dataIndex1, val1)

            return newRow
          })
          setTableData(tableData)

          setAuditeListDtos(data.auditeListDtos)
          if (data.statusColor === '0') {
            setNeedAudite(false)
          } else if (data.statusColor === '1') {
            setNeedAudite(true)
          }

          setAuditStatus(data.auditedStatusName)
          setFileData([
            {
              个人头像: data.nearImageUrl
            },
            ...(data.zyzsUrl
              ? data.zyzsUrl.split(',').map((item: any, index: number) => {
                return {
                  ['执业证书' + (index + 1)]: item
                }
              })
              : []),
            ...(data.hdry_qua_cer_image
              ? data.hdry_qua_cer_image.split(',').map((item: any, index: number) => {
                return {
                  ['资格证书' + (index + 1)]: item
                }
              })
              : [])
          ])

          if (Object.keys(data).includes('maps')) {
            let maps = data.maps || {}
            return new Promise((resolve, reject) => {
              service.commonApiService.listNurseExpand('User')
                .then(res => {
                  //合并拓展项目，但是有些存在拓展项目是图片
                  resolve({
                    maps,
                    mapsConfig: res.data.filter((item:any)=>{return !item.fieldName.includes('图片')}),
                    tableData,
                  })
                }, (e) => reject(e))
            })
          } else {
            setSpinning(false)
          }
        })
          .then((payload: any) => {
            setSpinning(false)
            if (payload) {
              const { maps, mapsConfig, tableData } = payload
              const newTableData = [...tableData]
              /**maps中的img */
              const mapsImg: Obj[] = []

              for (let i = 0; i < mapsConfig.length; i++) {
                let mapCfgItem = mapsConfig[i]

                let key = mapCfgItem.fieldCode
                let val = maps[key] || ''
                let name = mapCfgItem.fieldName
                let lastItem = newTableData[newTableData.length - 1]

                if (mapCfgItem.fieldType === 'select_edit' || mapCfgItem.fieldType === 'select') {
                  let options = []
                  try {
                    options = JSON.parse(mapCfgItem.fieldSelectContent)
                  } catch (e) {

                  }
                  let target = options.find((opt: any) => opt.code === val)

                  if (target) val = target.name
                } else if (mapCfgItem.fieldType === 'img') {
                  mapsImg.push.apply(mapsImg, val.split(',').map((v: string, i: number) => ({ [name + (i + 1)]: v })))
                  continue
                }

                if (Object.keys(lastItem).length > 1) {
                  newTableData.push({ [name]: val })
                } else {
                  lastItem[name] = val
                }
              }

              setTableData(newTableData)
              mapsImg.length && setMapsImg(mapsImg)
            }
          }, err => setSpinning(false))
      } else {
        /** 获取详情 */
        modalService.getByIdAudite(props.type, props.id).then((res) => {
          setSpinning(false)
          let data = res.data
          let tableData = props.tableFormat.map((item: any) => {
            let keys = Object.keys(item)
            if (!keys[1]) keys[1] = ''
            return {
              [keys[0]]: data[item[keys[0]]],
              [keys[1]]: data[item[keys[1]]]
            }
          })
          setTableData(tableData)
          setAuditeListDtos(data.auditeListDtos)
          if (data.statusColor === '0') {
            setNeedAudite(false)
          } else if (data.statusColor === '1') {
            setNeedAudite(true)
          }
          setAuditStatus(data.auditedStatusName)

          let filePathGroup = data.urlImageOne || data.path || ''
          if ((!props.fileData || props.fileData.length == 0) && filePathGroup) {
            setFileData(
              filePathGroup
                ? filePathGroup.split(',').map((item: any, index: number) => {
                  return {
                    ['附件' + (index + 1)]: item
                  }
                })
                : []
            )
          }
        })
      }
    }
  }, [visible])

  const onOk = () => {
    if (!needAudite) return onCancel()
    let agreeStatus
    if (agree === 'agree') {
      agreeStatus = true
    } else if (agree === 'disagree') {
      agreeStatus = false
    }

    let postData = {
      id: props.id,
      empNo: props.allData?.empNo || props.allData?.commiterNo,
      empName: props.allData?.empName || props.allData?.commiterName,
      saveStatus: props.allData?.saveStatus || props.allData?.auditedEntityName,
      flag: agreeStatus,
      detail: opinion,
      type: props.type,
    }
    
    modalService.auditeNurseFileIndex(props.type, postData).then((res) => {
      message.success('审核成功')
      emitter.emit('refreshNurseFileDeatilLeftMenu')
      props.getTableData && props.getTableData()
      onCancel()
    })
  }
  return (
    <Modal
      title={title}
      visible={visible}
      centered
      onOk={onOk}
      onCancel={onCancel}
      okText={needAudite ? '审核' : '关闭'}
      forceRender
      width={800}
    >
      <Spin spinning={spinning}>
        <MainPart>
          <InfoTable>
            <tbody>
              {tableData.map((obj: any, index: number) => (
                <tr key={index}>
                  <td>{Object.keys(obj)[0]}</td>
                  <td>
                    <Value>{obj[Object.keys(obj)[0]]}</Value>
                  </td>
                  <td>{Object.keys(obj)[1]}</td>
                  <td>{Object.keys(obj)[1] && <Value>{obj[Object.keys(obj)[1]]}</Value>}</td>
                </tr>
              ))}
            </tbody>
          </InfoTable>
          <div style={{ margin: '10px 0', overflow: 'hidden' }}>
            {/* {JSON.stringify(fileData)} */}
            {[...fileData, ...mapsImg].map((obj: any, index: number) => (
              <UploadCon key={index}>
                {Object.keys(obj)[0] && <UploadItem label={Object.keys(obj)[0]} path={obj[Object.keys(obj)[0]]} />}
                {/* {Object.keys(obj)[1] && <UploadItem label={Object.keys(obj)[1]} path={obj[Object.keys(obj)[1]]} />} */}
              </UploadCon>
            ))}
          </div>
        </MainPart>
        <AduitCon>
          <TimeLineCon>
            {!appStore.selfNurseFile && (
              <React.Fragment>
                <div className='label'>审核过程：</div>
                <LinCon>
                  {(auditeListDtos || []).map((item: any, index: any, arr: any) => (
                    <TimeLineItem data={item} index={index} key={index} arr={arr} />
                  ))}
                </LinCon>
              </React.Fragment>
            )}
            {appStore.selfNurseFile && (
              <React.Fragment>
                <div className='label'>审核意见：</div>
                <LinCon>{(props.allData || {}).detail || '(暂无)'}</LinCon>
              </React.Fragment>
            )}
          </TimeLineCon>
          <FormCon>
            <div className='row'>
              <div className='key'>当前进度：</div>
              <div className='vale'>
                <div className='status'>{auditStatus}</div>
              </div>
            </div>

            {needAudite && (
              <React.Fragment>
                <div className='row'>
                  <div className='key'>审核结果：</div>
                  <div className='vale'>
                    <ResultBox className={agree == 'agree' ? 'agree' : ''} onClick={() => setAgree('agree')}>
                      通过
                      <AgreeIcon />
                    </ResultBox>
                    <ResultBox className={agree == 'disagree' ? 'disagree' : ''} onClick={() => setAgree('disagree')}>
                      退回
                      <AgreeIcon />
                    </ResultBox>
                  </div>
                </div>
                <div className='row'>
                  <div className='key'>审核意见：</div>
                  <div className='vale'>
                    <TextArea
                      rows={3}
                      style={{ width: 554 }}
                      value={opinion}
                      onChange={(e: any) => setOpinion(e.target.value)}
                    />
                  </div>
                </div>
                <div className='row' style={{ paddingTop: '2px' }}>
                  <div className='key'>审核人：</div>
                  <div className='vale'>
                    <div className='block'>{authStore.user && authStore.user.empName}</div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </FormCon>
        </AduitCon>
      </Spin>
    </Modal>
  )
}

function TimeLineItem(props: any) {
  const { data, index, arr } = props
  const Con = styled.div<{ index: number }>`
    height: 72px;
    display: flex;
    ${(p) => p.index !== 0 && `margin-top: 20px;`}
    .left {
      width: 72px;
      height: 72px;
      position: relative;
      .head {
        width: 100%;
        height: 100%;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 50%;
        object-fit: cover;
      }
      .icon {
        position: absolute;
        top: 50px;
        left: 42px;
      }
      .line {
        position: absolute;
        width: 2px;
        height: 20px;
        background: #6cb45c;
        left: 35px;
        top: 72px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      margin-left: 10px;
      flex-direction: column;
      .title {
        font-size: 15px;
        color: #333333;
      }
      .aside {
        font-size: 13px;
        color: #999;
      }
      .bold {
        color: ${(p: any) => p.theme.$mtc};
      }
    }
  `
  return (
    <Con index={index}>
      <div className='left'>
        <img className='head' src={data.headUrl || defaultHead} alt='' />
        {(index === 0 || data.auditedStatus.indexOf('Success') > -1) && (
          <React.Fragment>
            <img className='icon' src={aduitSuccessIcon} alt='' />
            {index != arr.length - 1 && <div className='line' />}
          </React.Fragment>
        )}
        {<React.Fragment>{index != arr.length - 1 && <div className='line' />}</React.Fragment>}
      </div>
      <div className='right'>
        <div className='title'>{data.auditedStatusName}</div>
        <div className='aside'>
          {data.auditedName}&nbsp; {data.auditedTime}
        </div>
        <div className='aside'>{data.detail}</div>
      </div>
    </Con>
  )
}

function UploadItem(props: any) {
  const { label, path } = props
  const ZyzsCon = styled.div`
    position: relative;
    font-size: 13px;
    color: #666666;
    width: 50%;
    span {
      position: absolute;
      left: 0;
      top: 19px;
      width: 100px;
    }
    img {
      position: absolute;
      height: 150px;
      min-width: 180px;
      border: 1px solid rgba(219, 224, 228, 1);
      top: 0px;
      left: 80px;
      object-fit: cover;
    }
  `
  return (
    <ZyzsCon>
      <span>{label}：</span>
      {path ? <Zimage src={path} /> : <img src={defaultFile} alt='' />}

      {/* <img src={path || defaultHead} alt='' /> */}
    </ZyzsCon>
  )
}

const Wrapper = styled.div`
  font-size: 13px;
  color: #999;
`
const MainPart = styled.div``
const AduitCon = styled.div``
const TimeLineCon = styled.div`
  border-top: 1px dashed #cccccc;
  border-bottom: 1px dashed #cccccc;
  padding: 20px 15px 30px;
  margin: 0 -24px;
  position: relative;
  .label {
    font-size: 15px;
    color: #666666;
    position: absolute;
    top: 20px;
    left: 22px;
  }
`

const LinCon = styled.div`
  margin-left: 120px;
`

const FormCon = styled.div`
  .row {
    display: flex;
    margin-bottom: 10px;
    .status {
      font-size: 15px;
      color: #333;
      padding: 3px 0;
      font-weight: bold;
    }
    .block {
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      color: #333333;
      background: rgba(238, 239, 240, 1);
      border-radius: 2px;
      padding: 0 13px;
    }
    .value {
      color: #666;
    }
    .key {
      width: 83px;
      padding: 4px 0;
    }
  }
`

const InfoTable = styled.table`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dbe0e4;
  width: 100%;
  .head-img {
    width: 132px;
    height: 180px;
    margin: auto;
    display: block;
  }
  td {
    height: 38px;
    padding: 5px 10px;
    font-size: 13px;
    border: 1px solid #dbe0e4;
    vertical-align: middle;
  }
  & tr td:nth-of-type(1),
  & tr td:nth-of-type(3) {
  }
`
const Value = styled.div`
  background: rgba(238, 239, 240, 1);
  border-radius: 2px;
  border: 1px solid rgba(227, 228, 230, 1);
  padding: 3px 13px;
  min-height: 27px;
`

const UploadCon = styled.div`
  height: 150px;
  display: flex;
  margin: 5px 0;
  float: left;
  width: 50%;
`

const ResultBox = styled.div`
  width: 70px;
  height: 32px;
  line-height: 30px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(204, 204, 204, 1);
  margin-right: 10px;
  font-size: 13px;
  color: #333;
  position: relative;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  svg {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &.agree {
    border-color: #1d9165;
    svg path {
      fill: #1d9165;
    }
  }
  &.disagree {
    border-color: #ff3b30;
    svg path {
      fill: #ff3b30;
    }
  }
`
