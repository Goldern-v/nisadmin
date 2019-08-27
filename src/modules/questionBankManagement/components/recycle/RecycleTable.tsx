import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message as Message } from 'antd'
import WrapPre from './../common/WrapPre'

import { questionBankManageService } from '../../api/QuestionBankManageService'
interface Props {
  active?: boolean,
  model: any
}

export default observer(function RecycleTable(props: Props) {
  const { model } = props;
  const { history } = appStore;
  const { tableTotal, tableData, query, tableLoading } = model;
  //选中的行下标
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [tableData])

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
      title: '题目',
      dataIndex: 'questionContent',
      key: 'questionContent',
      align: 'left',
      render: (text: string, record: any) => {
        let content = record.questionContent || '';
        if (record.questionType == '填空题') content = content.replace(/##/g, '____')

        return <WrapPre>
          <span className="question-content">【{record.questionType || ''}】{content}</span>
        </WrapPre>
      }
    },
    {
      title: '出题次数',
      dataIndex: 'appearTimes',
      key: 'appearTimes',
      align: 'center',
      width: 70
    },
    {
      title: '选错次数',
      dataIndex: 'wrongTimes',
      key: 'wrongTimes',
      align: 'center',
      width: 70
    },
    {
      title: '删除时间',
      dataIndex: 'deleteTime',
      key: 'deleteTime',
      align: 'center',
      width: 150
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 100,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleRecover([record])}>恢复</span>
            <span onClick={() => handleDelete([record])}>删除</span>
          </DoCon>
        )
      }
    }
  ]

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const handleRecover = (questionList: any[]) => {
    let params = {
      questionIdList: questionList.map((item) => item.id)
    }
    let modalTitle = '恢复'
    let modalContent = `你确定要恢复选中的${questionList.length}个题目吗?`;

    if (questionList.length == 1) modalContent = '你确定要恢复该题目吗?'

    Modal.confirm({
      content: modalContent,
      centered: true,
      title: modalTitle,
      onOk: () => {
        questionBankManageService
          .recoverRecord(params)
          .then(res => {
            Message.success('恢复成功');
            model.getList()
          })
      }
    })
  }

  const handleDelete = (questionList: any[]) => {
    let params = {
      questionIdList: questionList.map((item) => item.id)
    }

    let modalTitle = '删除警告'
    let modalContent = <div>
      <div>您确定要永久删除选中的{questionList.length}个题目吗？</div>
      <div>删除后将无法找回。</div>
    </div>;

    if (questionList.length == 1) modalContent = <div>你确定要永久删除该题目吗？</div>;

    Modal.confirm({
      content: modalContent,
      centered: true,
      title: modalTitle,
      onOk: () => {
        questionBankManageService
          .entireDeleteQuestion(params)
          .then(res => {
            Message.success('删除成功');
            model.getList()
          })
      }
    })
  }

  const handleSizeChange = (page: number, size: number) => {
    model.setQuery({ ...model.query, pageIndex: 1, pageSize: size });
    model.getList();
  }

  const handlePageChange = (page: number) => {
    model.setQuery({ ...model.query, pageIndex: page });
    model.getList()
  }

  const getSelectedRows = () => {
    return tableData.filter((item: any, idx: any) => selectedRowKeys.indexOf(idx) >= 0)
  }

  let btnList: BtnList[] = [
    {
      name: '恢复',
      onClick: () => {
        let questionList = getSelectedRows();
        if (questionList.length <= 0) {
          Message.warning('未勾选任何文件')
          return
        }

        handleRecover(questionList)
      }
    },
    {
      name: '删除',
      onClick: () => {
        let questionList = getSelectedRows();
        if (questionList.length <= 0) {
          Message.warning('未勾选任何文件')
          return
        }

        handleDelete(questionList)
      }
    }
  ]
  return (
    <Wrapper>
      <BaseTable
        loading={tableLoading}
        columns={columns}
        dataSource={tableData}
        rowSelection={rowSelection}
        surplusHeight={284}
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
      <FooterBtnCon btnList={btnList} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  .question-content{
    letter-spacing: -1px;
  }
`