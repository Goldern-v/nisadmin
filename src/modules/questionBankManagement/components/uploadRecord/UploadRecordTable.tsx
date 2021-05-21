import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message as Message } from 'antd'
import BankTableEdit from './BankTableEdit'
import BankTableDelete from './BankTableDelete'
import qs from 'qs'

import { questionBankManageService } from '../../api/QuestionBankManageService'
interface Props {
  active?: boolean,
  model: any
}

export default observer(function BankTable(props: Props) {
  const { model } = props;
  const { history } = appStore;
  const { tableTotal, tableData, query, tableLoading } = model;
  //选中的行下标
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);
  //文件编辑弹窗相关
  const [bankEditCfg, setBankEditCfg] = useState({
    visible: false,
    bank: {
      id: '',
      bankName: ''
    }
  });
  const handleEditCancel = (info: any) => {
    if (info && info.reload) model.getList();
    setBankEditCfg({ ...bankEditCfg, visible: false })
  }
  //文件删除弹窗相关
  const [bankDeleteCfg, setBankDeleteCfg] = useState({
    visible: false,
    banks: [] as any
  });
  const handleDeleteCancel = (info: any) => {
    if (info && info.reload) model.getList();
    setBankDeleteCfg({ ...bankDeleteCfg, visible: false })
  }

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
      title: `导入${query.bankType == '1' ? '书籍名称' : '文件名称'}`,
      dataIndex: 'bankName',
      key: 'bankName',
      align: 'left'
    },
    {
      title: '导入时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      align: 'center',
      width: 150
    },
    {
      title: '导入用户',
      dataIndex: 'uploadName',
      key: 'uploadName',
      align: 'center',
      width: 70
    },
    {
      title: '题目数量',
      dataIndex: 'bankQuestionCount',
      key: 'bankQuestionCount',
      align: 'center',
      width: 80
    },
    {
      title: '状态',
      dataIndex: 'isHided',
      key: 'isHided',
      align: 'center',
      width: 60,
      render(text: string, record: any, index: number) {
        let statusText = '显示';
        if (record.isHided) statusText = '隐藏'
        return statusText
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 170,
      render(text: string, record: any) {
        let isHided = record.isHided || false;
        return (
          <DoCon>
            <span onClick={() => handleEdit(record)}>修改</span>
            <span onClick={() => handleToogleHides([record], !isHided)}>{isHided ? '显示' : '隐藏'}</span>
            <span onClick={() => handleDelete([record])}>删除</span>
            <span onClick={() => handleQuestionView(record)}>查看题目</span>
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

  const handleEdit = (record: any) => {
    setBankEditCfg({
      bank: {
        id: record.id,
        bankName: record.bankName
      },
      visible: true
    })
  }

  const handleToogleHides = (banks: any[], isHided: boolean) => {
    let params = {
      bankIdList: banks.map((item) => item.id),
      isHided
    }

    let modalTitle = '隐藏';
    let hideTitle = <div>您确定要隐藏选中的{banks.length}个文件吗？</div>;
    if (banks.length == 1) {
      hideTitle = <div>您确定要隐藏文件“{banks[0].bankName || ''}”吗？</div>;
      if (!isHided) modalTitle = '显示'
    }

    let modalContent = <div>
      {hideTitle}
      <div>文件隐藏后，再其他模块中将搜不到该文件，也无法通过此文件搜索关联的题目</div>
    </div>

    Modal.confirm({
      content: modalContent,
      centered: true,
      title: modalTitle,
      onOk: () => {
        questionBankManageService
          .hideOrShowUpload(params)
          .then(res => {
            Message.success('修改成功');
            model.getList()
          })
      }
    })
  }

  const handleDelete = (banks: any[]) => {
    setBankDeleteCfg({
      banks,
      visible: true
    })
  }

  const handleQuestionView = (record: any) => {
    let newQuery = {
      id: record.id,
      bankName: record.bankName,
      bankType: model.query.bankType
    }
    history.push(`/continuingEdu/uploadRecordQuestionBank?${qs.stringify(newQuery)}`)
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
    return tableData.filter((item: any, idx: any) => selectedRowKeys.indexOf(item.key) >= 0)
  }

  let btnList: BtnList[] = [
    {
      name: '隐藏',
      onClick: () => {
        let banks = getSelectedRows();
        if (banks.length <= 0) {
          Message.warning('未勾选任何文件')
          return
        }
        handleToogleHides(banks, true)
      }
    },
    {
      name: '删除',
      onClick: () => {
        let banks = getSelectedRows();
        if (banks.length <= 0) {
          Message.warning('未勾选任何文件')
          return
        }
        setBankDeleteCfg({
          banks: getSelectedRows(),
          visible: true
        })
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
      <BankTableEdit {...bankEditCfg} onCancel={handleEditCancel} />
      <BankTableDelete {...bankDeleteCfg} onCancel={handleDeleteCancel} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
`