import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Input } from 'antd'
import { ReactComponent as AgreeIcon } from '../images/默认勾选.svg'

const { TextArea } = Input
import { Modal } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { modalService } from '../services/ModalService'
const defaultHead = require('../../modules/nurseFiles/images/护士默认头像.png')
const aduitSuccessIcon = require('../images/审核通过.png')
export interface Props extends ModalComponentProps {
  allData?: any
  tableFormat?: any
  fileData?: any
  title?: string
  type: string
  id: string
}

export default function aduitModal (props: Props) {
  let { visible, onCancel } = props
  /** 表格数据 */
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
  useEffect(() => {
    if (visible) {
      // props.tableData ? setTableData(props.tableData) : setTableData([])
      props.title ? setTitle(props.title) : setTitle('审核')
      props.allData ? setAuditStatus(props.allData.auditedStatusName) : setAuditStatus({})
      props.fileData ? setFileData(props.fileData) : setFileData([])
      if (props.type === 'nurseInformation') {
        modalService.getByIdAuditeDis(props.type).then((res) => {
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
        })
      }
      /** 获取详情 */
      modalService.getByIdAudite(props.type, props.id).then((res) => {
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
      })
    }
  }, [visible])

  const onOk = () => {
    // modalService
    console.log(12312321)
  }
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel} okText='保存' forceRender width={800}>
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

        {fileData.map((obj: any, index: number) => (
          <UploadCon key={index}>
            {Object.keys(obj)[0] && <UploadItem label={Object.keys(obj)[0]} path={obj[Object.keys(obj)[0]]} />}
            {Object.keys(obj)[1] && <UploadItem label={Object.keys(obj)[1]} path={obj[Object.keys(obj)[1]]} />}
          </UploadCon>
        ))}
      </MainPart>
      <AduitCon>
        <TimeLineCon>
          <div className='label'>审核过程：</div>
          <LinCon>
            {auditeListDtos.map((item: any, index: any, arr: any) => (
              <TimeLineItem data={item} index={index} key={index} arr={arr} />
            ))}
          </LinCon>
        </TimeLineCon>
        <FormCon>
          <div className='row'>
            <div className='key'>当前进度：</div>
            <div className='vale'>
              <div className='status'>{auditStatus}</div>
            </div>
          </div>
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
              <TextArea rows={3} style={{ width: 554 }} value={opinion} onChange={(e) => setOpinion(e.target.value)} />
            </div>
          </div>
          <div className='row' style={{ paddingTop: '2px' }}>
            <div className='key'>审核人：</div>
            <div className='vale'>
              <div className='block'>夏怀虎</div>
            </div>
          </div>
        </FormCon>
      </AduitCon>
    </Modal>
  )
}

function TimeLineItem (props: any) {
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
        <img className='head' src={defaultHead} alt='' />
        {(index === 0 || data.auditedStatus.indexOf('Success') > -1) && (
          <React.Fragment>
            <img className='icon' src={aduitSuccessIcon} alt='' />
            {index != arr.length - 1 && <div className='line' />}
          </React.Fragment>
        )}
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

function UploadItem (props: any) {
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
      top: 20px;
      left: 80px;
    }
  `
  return (
    <ZyzsCon>
      <span>{label}：</span>
      <img src={path || defaultHead} alt='' />
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
  height: 210px;
  display: flex;
  margin: 10px 0;
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
