import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore, authStore } from 'src/stores'
import { ColumnProps } from 'src/vendors/antd'
import BaseTable, { DoCon, TabledCon } from 'src/components/BaseTable'
import { Link } from 'react-router-dom'
import { satisfyInvestigationServices } from './services/SatisfyInvestigationServices'
import SatisfiedFormModal from './components/SatisfiedFormModal'

export interface Props { }

export default function SatisfyInvestigationDetail() {
  const { queryObj, history } = appStore
  const [personList, setPersonList] = useState([] as any[])
  const [detailInfo, setDetailInfo] = useState({} as any)

  const [formVisible, setFormVisible] = useState(false)
  const [formQuestionList, setFormQuestionList] = useState([] as any[])
  const [formEditable, setFormEditable] = useState(false)
  const [formId, setFormId] = useState('')
  const [loading, setLoading] = useState(false)


  // 计算满意人数 和满意率 70分算满意
  const satisfiedPersonSize = personList.filter((person: any) => Number(person.score || 0) > 70).length
  let satisfiedRate = parseInt((satisfiedPersonSize / personList.length * 10000).toString()) / 100
  if (isNaN(satisfiedRate)) satisfiedRate = 0

  const editId = (() => {
    let editPerson = personList.find(
      (person: any) => {
        if (person.empNo.toLocaleUpperCase() !== authStore.user?.empNo.toLocaleUpperCase()) return false

        if (person.status !== '0') return false

        return true
      }
    )

    if (editPerson) return editPerson.id

    return ''
  })()

  const columns: ColumnProps<any>[] = [
    {
      key: 'index',
      title: '序号',
      width: 80,
      align: 'center',
      render: (text: string, record: any, idx: number) => idx + 1
    },
    {
      dataIndex: 'empNo',
      title: '工号',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'empName',
      title: '姓名',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'title',
      title: '职称',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'wardName',
      title: '科室',
      width: 180,
      align: 'center',
    },
    {
      dataIndex: 'status',
      title: '调查表',
      width: 80,
      align: 'center',
      render: (text: string) => {
        if (text === '0') {
          return <span style={{ color: '#999' }}>未填写</span>
        } else {
          return <span style={{ color: '#00A680' }}>已填写</span>
        }
      }
    },
    {
      dataIndex: 'operate',
      title: '操作',
      width: 80,
      align: 'center',
      render: (text: string, record: any) => {
        if (record.status !== '0')
          return <DoCon>
            <span onClick={() => handleReview(record)}>查看</span>
          </DoCon>
        else
          return <span style={{ color: '#999' }}>查看</span>
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
    setFormId(editId)
    setFormEditable(true)
    setFormVisible(true)
  }

  const getDetailData = () => {
    setLoading(true)

    satisfyInvestigationServices
      .satisfiedInstanceDetail(queryObj.id)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setPersonList(res.data.satisfiedDetail)
          setDetailInfo(res.data.satisfiedInstance)
        }
      }, () => setLoading(false))
  }

  const handleExport = () => {
    satisfyInvestigationServices
      .exportDetail(queryObj.id)
  }

  useEffect(() => {
    getDetailData()
  }, [])

  return <Wrapper>
    <TopPannel>
      <NavCon>
        <Link to="/satisfyInvestigation">护士满意度调查表</Link>
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
        <span className="content">共调查{personList.length || 0}位护士</span>
        <span className="content">满意人数：{satisfiedPersonSize}人</span>
        <span className="content">满意度：{satisfiedRate}%</span>
      </SubContent>
      <ButtonGroups>
        {editId && (
          <Button type="primary" onClick={() => openFormModal()}>填写调查表</Button>
        )}
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
    <SatisfiedFormModal
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