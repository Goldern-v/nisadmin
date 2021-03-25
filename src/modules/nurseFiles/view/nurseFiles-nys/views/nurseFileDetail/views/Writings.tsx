import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import createModal from 'src/libs/createModal'
// import EditWritingsModal from '../modal/EditWritingsModal'
import EditLiterature from '../modal/EditLiterature'
import EditPaper from '../modal/EditPaper'
import { nurseFilesService } from '../../../services/NurseFilesService'
import limitUtils from '../utils/limit'
import { globalModal } from 'src/global/globalModal'
import Zimage from 'src/components/Zimage'
import { Radio } from 'antd'
export interface Props {
  addBtnHide?: boolean
}
export default observer(function Writings(props: Props) {
  let { addBtnHide } = props

  const editLiterature = createModal(EditLiterature)
  const editPaper = createModal(EditPaper)

  const [tableData, setTableData] = useState([])
  const [query, setQuery] = useState({ type: 'nurseLiterature' })

  const btnList = addBtnHide ? [] : [
    {
      label: '添加',
      onClick: () => {
        if (query.type === 'nursePaper') {
          editPaper.show({ signShow: '添加' })
        } else {
          editLiterature.show({ signShow: '添加' })
        }
      }
    }
  ]

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 60
    },
    ...((type: string) => {
      return type !== 'nursePaper' ? [
        {
          title: '登记号',
          dataIndex: 'registerNumber',
          width: 140,
          align: 'center'
        },
        {
          title: '作品名称',
          dataIndex: 'name',
          width: 140,
          align: 'center'
        },
        {
          title: '作品类型',
          dataIndex: 'types',
          width: 80,
          align: 'center'
        },
        {
          title: '著作权人',
          dataIndex: 'copyrightOwner',
          width: 80,
          align: 'center'
        },
        {
          title: '登记日期',
          dataIndex: 'registerDate',
          width: 120,
          align: 'center'
        },
        {
          title: '发表日期',
          dataIndex: 'publishMaterial',
          width: 120,
          align: 'center'
        },
        {
          title: '出版或刊登物',
          dataIndex: 'publicDate',
          width: 120,
          align: 'center'
        },
      ] : [
        {
          title: '论文类别',
          dataIndex: 'types',
          width: 80,
          align: 'center'
        },
        {
          title: '论文名称',
          dataIndex: 'name',
          width: 150,
          align: 'center'
        },
        {
          title: '发表日期',
          dataIndex: 'publicDate',
          width: 100,
          align: 'center'
        },
        {
          title: '作者',
          dataIndex: 'owner',
          width: 80,
          align: 'center'
        },
        {
          title: '本人排名',
          dataIndex: 'range',
          width: 100,
          align: 'center'
        },
        {
          title: '出版或刊登物',
          dataIndex: 'publishMaterial',
          width: 150,
          align: 'center'
        },
      ]
    })(query.type) as ColumnProps<any>[],
    {
      title: '附件',
      width: 120,
      align: 'center',
      render: (text: any, row: any, index: any) => {
        return <DoCon>{row.urlImageOne ? <Zimage text='查看' list={row.urlImageOne.split(',')} /> : ''}</DoCon>
      }
    },
    {
      title: '状态',
      dataIndex: 'auditedStatusName',
      width: 120,
      align: 'center'
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text: any, row: any, index: number) => {
        return (
          <DoCon>
            {limitUtils(row) ? (
              <span
                onClick={() => {
                  if (query.type === 'nursePaper') {
                    editPaper.show({ data: row, signShow: '修改' })
                  } else {
                    editLiterature.show({ data: row, signShow: '修改' })
                  }
                }}
              >
                修改
              </span>
            ) : (
              ''
            )}
            <span
              onClick={() => {
                let tableFormat = [
                  {
                    登记号: 'registerNumber',
                    作品名称: 'name',
                  },
                  {
                    作品类型: 'types',
                    著作权人: 'copyrightOwner',
                  },
                  {
                    登记日期: 'registerDate',
                    发表日期: 'publicDate',
                  },
                  {
                    出版或刊登物: 'publishMaterial',
                  },
                ] as any[]

                let title = "审核著作"

                if (query.type === 'nursePaper') {
                  tableFormat = [
                    {
                      论文类别: 'types',
                      论文名称: 'name',
                    },
                    {
                      发表日期: 'publicDate',
                      作者: 'owner',
                    },
                    {
                      本人排名: 'range',
                      出版或刊登物: 'publishMaterial',
                    },
                  ]

                  title = "审核论文"
                }

                globalModal.auditModal.show({
                  getTableData: getTableData,
                  id: row.id,
                  type: query.type,
                  title,
                  tableFormat,
                  fileData: row.urlImageOne
                    ? row.urlImageOne.split(",").map((item: any, index: number) => {
                      return {
                        ["附件" + (index + 1)]: item
                      };
                    })
                    : [],
                  allData: row
                })
              }}
            >
              {limitUtils(row) ? '审核' : '查看'}
            </span>
          </DoCon>
        )
      }
    }
  ]

  const getTableData = () => {
    let reqMethod = nurseFilesService.nurseLiterature.bind(nurseFilesService)
    if (query.type === 'nursePaper') reqMethod = nurseFilesService.nursePaper.bind(nurseFilesService)

    reqMethod(appStore.queryObj.empNo).then((res) => {
      setTableData(res.data)
    })
  }



  useEffect(() => {
    getTableData()
  }, [query])

  return (
    <BaseLayout
      title='著作与论文'
      btnList={btnList}
      extra={(
        <Radio.Group
          value={query.type}
          onChange={(e: any) =>
            setQuery({ ...query, type: e.target.value })}>
          <Radio value="nurseLiterature">著作</Radio>
          <Radio value="nursePaper">论文</Radio>
        </Radio.Group>
      )}>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={305}
        type={['fixedWidth']}
        tip={''}
      />
      {<editPaper.Component getTableData={getTableData} />}
      {<editLiterature.Component getTableData={getTableData} />}
    </BaseLayout>
  )
})
const Wrapper = styled.div``
