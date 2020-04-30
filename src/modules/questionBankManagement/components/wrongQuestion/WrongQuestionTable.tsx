import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message, Input, Button } from 'antd'

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
      dataIndex: 'applyerName',
      key: 'applyerName',
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
        switch (record.questionType) {
          case '选择题':
          case '单选题':
          case '多选题':
            return <QuestionTemplate hideLabels data={record} />
          case '填空题':
            return <FillingQuestionTemplate hideLabels data={record} />
          case '问答题':
            return <ShortQuestionTemplate hideLabels data={record} />
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
      width: 60,
      render(text: any, record: any) {
        switch (text) {
          case '2':
            return '已处理'
          case '3':
            return '已通知'
          default:
            return '待处理'
        }
      }
    },
    {
      title: '提交时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      align: 'center',
      width: 150
    },
    {
      title: '提交原因',
      dataIndex: 'applyContent',
      key: 'applyContent',
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
            {record.status == '1' && <React.Fragment>
              <div onClick={() => handleMark(record, true)}>标记为已处理并通知提交人</div>
              <div onClick={() => handleMark(record)}>仅标记已处理</div>
            </React.Fragment>}
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
    //   message.warning('系统题库无法修改')
    //   return
    // }
    let type = 'choice';
    let questionId = ''
    switch (record.questionType) {
      case '填空题':
        type = 'filling'
        questionId = record.flowId
        break
      case '问答题':
        type = 'short'
        questionId = record.flowId
        break
      default:
        type = 'choice'
        questionId = record.flowId
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

  const handleMark = (record?: any, isSendNotice = false) => {

    let params = {
      flowId: record?.flowId || '',
      isSendNotice
    }

    let handleContent = ''

    let modalTitle = '操作确认'

    const TextStyle = {
      width: 260,
      marginTop: 15
    }

    let modalContent =
      <div>
        <div>您确认要将该题目标记为已处理吗？</div>
        <div>
          <Input.TextArea
            placeholder="请输入备注"
            style={TextStyle}
            onChange={(e: any) => handleContent = e.target.value} />
        </div>
      </div>

    if (isSendNotice)
      modalContent = <div>
        <div>您确认要将该题目标记为已处理，并通知提交人吗？</div>
        <div>
          <Input.TextArea
            placeholder="请输入备注"
            style={TextStyle}
            onChange={(e: any) => handleContent = e.target.value} />
        </div>
      </div>

    Modal.confirm({
      title: modalTitle,
      centered: true,
      content: modalContent,
      onOk: () => {
        // console.log({ ...params, handleContent })
        questionBankManageService
          .handleWrongQuestionMark({
            ...params,
            handleContent,
            empNo: authStore.user?.empNo,
            isSendNotice: isSendNotice ? '1' : '0'
          })
          .then(res => {
            message.success('操作成功');
            model.getList()
          }, err => { })
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
