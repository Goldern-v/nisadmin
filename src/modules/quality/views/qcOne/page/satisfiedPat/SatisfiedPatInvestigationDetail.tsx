import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore, authStore } from 'src/stores'
import { ColumnProps } from 'src/vendors/antd'
import BaseTable, { DoCon, TabledCon } from 'src/components/BaseTable'
import { Link } from 'react-router-dom'
import { satisfiedPatInvestigationServices } from './services/SatisfiedPatInvestigationServices'
import SatisfiedPatFormModal from './components/SatisfiedPatFormModal'
import QrcodeSubmitModal from './components/QrcodeSubmitModal'
import createModal from 'src/libs/createModal'

export interface Props { }

export default function SatisfiedPatInvestigationDetail() {
  const { queryObj, history } = appStore
  const [personList, setPersonList] = useState([] as any[])
  const [detailInfo, setDetailInfo] = useState({} as any)

  const [formVisible, setFormVisible] = useState(false)
  const [formQuestionList, setFormQuestionList] = useState([] as any[])
  const [formEditable, setFormEditable] = useState(false)
  const [formId, setFormId] = useState('')
  const [loading, setLoading] = useState(false)

  const qrcodeSubmitModal = createModal(QrcodeSubmitModal)


  // 计算满意人数 和满意率 70分算满意
  const satisfiedPersonSize = personList.filter((person: any) => Number(person.score || 0) > 70).length
  let satisfiedRate = parseInt((satisfiedPersonSize / personList.filter((person: any) => person.content).length * 10000).toString()) / 100
  if (isNaN(satisfiedRate)) satisfiedRate = 0

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      dataIndex: 'bedNo',
      title: '床位',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'name',
      title: '姓名',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'age',
      title: '年龄',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'phone',
      title: '联系方式',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'wardName',
      title: '就诊科室',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '调查表',
      width: 80,
      align: 'center',
      render: (text: string) => {
        return <span style={{ color: '#00A680' }}>已填写</span>
        // if (text === '0') {
        //   return <span style={{ color: '#999' }}>未填写</span>
        // } else {
        //   return <span style={{ color: '#00A680' }}>已填写</span>
        // }
      }
    },
    {
      dataIndex: 'operate',
      title: '操作',
      width: 80,
      align: 'center',
      render: (text: string, record: any) => {
        return <DoCon>
          <span onClick={() => handleReview(record)}>查看</span>
        </DoCon>
        // if (record.status !== '0')
        //   return <DoCon>
        //     <span onClick={() => handleReview(record)}>查看</span>
        //   </DoCon>
        // else
        //   return <span style={{ color: '#999' }}>查看</span>
      }
    }
  ]

  const handleReview = (record: any) => {
    try {
      let newFormQuestionList = JSON.parse(record.content)
      setFormQuestionList(newFormQuestionList)
    } catch (e) { }

    setFormId(record.id)
    setFormEditable(false)
    setFormVisible(true)
  }

  const openFormModal = () => {
    qrcodeSubmitModal.show({
      id: detailInfo.id,
      wardCode: detailInfo.wardCode,
      wardName: detailInfo.wardName,
    })
  }

  const getDetailData = () => {
    setLoading(true)

    satisfiedPatInvestigationServices
      .satisfiedPatDetail(queryObj.id)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setPersonList(res.data.satisfiedPatDetail)
          setDetailInfo(res.data.satisfiedPat)
        }
      }, () => setLoading(false))
  }

  const handleExport = () => {
    satisfiedPatInvestigationServices
      .exportDetail(queryObj.id)
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/satisfiedPatInvestigation">患者满意度调查表</Link>
        <span>/</span>
        <span>详情</span>
      </NavCon>
      <MainTitle>{queryObj.title || detailInfo.title}</MainTitle>
      <SubContent>
        <span className="content">由{detailInfo.creatorName || '...'}于{detailInfo.createDate || '...'}创建</span>
        <span className="label">单元:</span>
        <span className="content">{detailInfo.wardName || '...'}</span>
        <span className="label">时间:</span>
        <span className="content">{detailInfo.year || '...'}年{detailInfo.month || '...'}月</span>
        <span className="content">共调查{personList.length || 0}位患者</span>
        <span className="content">满意人数：{satisfiedPersonSize}人</span>
        <span className="content">满意度：{satisfiedRate}%</span>
      </SubContent>
      <ButtonGroups>
        <Button type="primary" onClick={() => openFormModal()}>填写二维码</Button>
        <Button onClick={() => handleExport()}>导出</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </ButtonGroups>
    </TopPannel>
    <MainPannel>
      <TableWrapper>
        <BaseTable
          surplusHeight={250}
          dataSource={personList}
          loading={loading}
          columns={columns} />
      </TableWrapper>
    </MainPannel>
    <SatisfiedPatFormModal
      visible={formVisible}
      isEdit={formEditable}
      questionListOrigin={formQuestionList}
      id={formId}
      onOk={() => {
        setFormVisible(false)
        setFormQuestionList([])
        getDetailData()
      }}
      onClose={() => { }}
      onCancel={() => {
        setFormQuestionList([])
        setFormVisible(false)
      }} />
    <qrcodeSubmitModal.Component />
  </Wrapper>
}

const Wrapper = styled.div``

const TopPannel = styled.div`
  height: 100px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  padding: 10px 15px;
  font-size: 12px;
  position: relative;
`
const MainTitle = styled.div`
  font-size: 24px;
  color: #000;
  min-height: 36px;
  min-width:100px;
`
const SubContent = styled.div`
  span{
    vertical-align:middle;
    &.label{
      margin-right: 5px;
    }
    &.content{
      margin-right: 15px;
      display: inline-block;
      /* min-width: 60px; */
    }
  }
`
const ButtonGroups = styled.div`
  position: absolute;
  right: 15px;
  top: 35px;
  button{
    margin-right:10px;
    &:last-of-type{
      margin-right:0;
    }
  }
`
const MainPannel = styled.div`
  flex: 1;
  padding-top: 15px;
  padding-bottom: 15px;
`

const ActiveText = styled.span`
  cursor: pointer;
  color: #1db38b;
  &:hover{
    font-weight: bold;
  }
`

const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`

// @ts-ignore
const TableWrapper = styled(TabledCon)`
`