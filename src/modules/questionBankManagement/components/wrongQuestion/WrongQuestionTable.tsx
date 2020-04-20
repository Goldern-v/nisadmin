import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message as Message } from 'antd'

import QuestionTemplate from './../choiceQuestions/QuestionTemplate'
import FillingQuestionTemplate from './../fillingQuestion/FillingQuestionTemplate'
import ShortQuestionTemplate from './../shortQuestion/ShortQuestionTemplate'

import { questionBankManageService } from './../../api/QuestionBankManageService'
interface Props {
  active?: boolean,
  model: any,
  surplusHeight?: number
}

export default observer(function ChoiceQuestionsTable(props: Props) {
  const { model, surplusHeight } = props;
  const { history } = appStore;
  const { tableTotal, tableData, query, tableLoading } = model;
  //选中的行下标
  // const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);

  // useEffect(() => {
  //   setSelectedRowKeys([]);
  // }, [tableData])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: string, index: number) {
        return index + 1
      }
    },
    {
      title: '提交人',
      dataIndex: 'submitterName',
      key: 'submitterName',
      width: 70,
      align: 'center'
    },
    {
      title: '处理人',
      dataIndex: 'handlerName',
      key: 'handlerName',
      width: 70,
      align: 'center'
    },
    {
      title: '题目',
      dataIndex: '题目',
      key: '题目',
      render(text: any, record: any, index: number) {
        let data: any = {};

        switch (record.questionType) {
          case '选择题':
            data = record.choiceQuestionDto
            return <QuestionTemplate data={data} />
          case '填空题':
            data = record.questionBank
            return <FillingQuestionTemplate data={data} />
          case '问答题':
            data = record.questionBank
            return <ShortQuestionTemplate data={data} />
          default:
            return <span></span>
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 60
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      align: 'center',
      width: 150
    },
    {
      title: '提交原因',
      dataIndex: 'submitReason',
      key: 'submitReason',
      align: 'center',
      width: 150
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 120,
      render(text: string, record: any) {
        return (
          <div className="operate-area">
            <div onClick={() => handleEdit(record)}>编辑</div>
            <div onClick={() => handleMark(record, true)}>标记为已处理并通知提交人</div>
            <div onClick={() => handleMark(record, true)}>仅标记已处理</div>
          </div>
        )
      }
    }
  ]

  // const rowSelection = {
  //   selectedRowKeys: selectedRowKeys,
  //   onChange: (selectedRowKeys: any, selectedRows: any) => {
  //     setSelectedRowKeys(selectedRowKeys)
  //   }
  // }

  const handleEdit = (record: any) => {
    // if (record.bankType == '系统题库') {
    //   Message.warning('系统题库无法修改')
    //   return
    // }
    let type = 'choice';
    let questionId = ''
    switch (record.questionType) {
      case '填空题':
        type = 'filling'
        questionId = record.questionBank.id
        break
      case '问答题':
        type = 'short'
        questionId = record.questionBank.id
        break
      default:
        type = 'choice'
        questionId = record.choiceQuestionDto.id
    }
    history.push(`/continuingEdu/${type}QuestionEdit?id=${questionId}`)
  }

  const handleSizeChange = (page: number, size: number) => {
    model.setQuery({ ...model.query, pageIndex: 1, pageSize: size });
    model.getList();
  }

  const handlePageChange = (page: number) => {
    model.setQuery({ ...model.query, pageIndex: page });
    model.getList()
  }

  const handleMark = (record: any, informSubmitter?: boolean) => {
    informSubmitter = informSubmitter || false;

    let params = {
      wrongQuestionId: record.id,
      informSubmitter
    }

    let modalTitle = '操作确认'

    let modalContent = '您确认要将该题目标记为已处理吗？'

    if (informSubmitter) modalContent = '您确认要将该题目标记为已处理，并通知提交人吗？'

    Modal.confirm({
      title: modalTitle,
      centered: true,
      content: modalContent,
      onOk: () => {
        questionBankManageService
          .handleWrongQuestionMark(params)
          .then(res => {
            Message.success('操作成功');
            model.getList()
          }, err => {

          })
      }
    })
  }

  // const getSelectedRows = () => {
  //   return tableData.filter((item: any, idx: any) => selectedRowKeys.indexOf(item.key) >= 0)
  // }

  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        // rowSelection={rowSelection}
        surplusHeight={surplusHeight || 284}
        pagination={{
          total: tableTotal,
          current: query.pageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '15', '20'],
          onChange: handlePageChange,
          onShowSizeChange: handleSizeChange,
          pageSize: query.pageSize
        }}
      />
      <FooterBtnCon btnList={[]} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  .operate-area{
    text-align: center;
    color: #00A680;
    &>div{
      cursor: pointer;
      margin: 8px 0;
      line-height: 14px;
      :hover{
        font-weight: bold;
      }
    }
  }
`
