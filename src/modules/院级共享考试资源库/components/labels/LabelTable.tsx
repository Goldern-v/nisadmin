import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message as Message } from 'antd'
import LabelTableEdit from './LabelTableEdit'
import LabelTableDelete from './LabelTableDelete'
import qs from 'qs'

import { questionBankManageService } from './../../api/QuestionBankManageService'
import { checkIsDeparment } from '../../utils/checkIsDeparment'
interface Props {
  active?: boolean,
  model: any
}

export default observer(function LabelTable(props: Props) {
  const { model } = props;
  const { history } = appStore;
  const { tableTotal, tableData, query, tableLoading } = model;
  //选中的行下标
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);
  //标签编辑弹窗相关
  const [labelEditCfg, setLabelEditCfg] = useState({
    visible: false,
    label: {
      id: '',
      labelContent: ''
    }
  });
  const handleEditCancel = (info: any): any => {
    if (info && info.reload) model.getList();
    setLabelEditCfg({ ...labelEditCfg, visible: false })
  }
  //标签删除弹窗相关
  const [labelDeleteCfg, setLabelDeleteCfg] = useState({
    visible: false,
    labels: [] as any
  });
  const handleDeleteCancel = (info: any) => {
    if (info && info.reload) model.getList();
    setLabelDeleteCfg({ ...labelDeleteCfg, visible: false })
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
      title: '标签',
      dataIndex: 'labelContent',
      key: 'labelContent',
      align: 'left'
    },
    {
      title: '题目数量',
      dataIndex: 'questionCount',
      key: 'questionCount',
      align: 'center',
      width: 80
    },
    {
      title: '状态',
      dataIndex: 'hided',
      key: 'hided',
      align: 'center',
      width: 60,
      render(text: string, record: any, index: number) {
        let statusText = '显示';
        if (record.hided) statusText = '隐藏'
        return statusText
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 170,
      render(text: string, record: any) {
        let hided = record.hided || false;
        return (
          <DoCon>
            <span onClick={() => handleEdit(record)}>修改</span>
            <span onClick={() => handleToogleHides([record], !hided)}>{hided ? '显示' : '隐藏'}</span>
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
    if (!checkIsDeparment()) return

    setLabelEditCfg({
      label: {
        id: record.id,
        labelContent: record.labelContent
      },
      visible: true
    })
  }

  const handleToogleHides = (labels: any[], hide: boolean) => {
    if (!checkIsDeparment()) return

    let params = {
      labelIdList: labels.map((item) => item.id),
      hide
    }

    let modalTitle = '隐藏';
    let hideTitle = <div>您确定要隐藏选中的{labels.length}个标签吗？</div>;
    if (labels.length == 1) {
      hideTitle = <div>您确定要隐藏标签“{labels[0].labelContent || ''}”吗？</div>;
      if (!hide) modalTitle = '显示'
    }

    let modalContent = <div>
      {hideTitle}
      <div>标签隐藏后，再其他模块中将搜不到该标签，也无法通过此标签搜索关联的题目</div>
    </div>

    Modal.confirm({
      content: modalContent,
      centered: true,
      title: modalTitle,
      onOk: () => {
        questionBankManageService
          .hideOrShowLabelByLabelIdList(params)
          .then(res => {
            Message.success('修改成功');
            model.getList()
          })
      }
    })
  }

  const handleDelete = (labels: any[]) => {
    if (!checkIsDeparment()) return

    setLabelDeleteCfg({
      labels,
      visible: true
    })
  }

  const handleQuestionView = (record: any) => {
    let newQuery = {
      id: record.id,
      bankType: 1,
      labelContent: record.labelContent
    }
    history.push(`/continuingEdu/labelQuestionBank_hj1?${qs.stringify(newQuery)}`)
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
        let labels = getSelectedRows();
        if (labels.length <= 0) {
          Message.warning('未勾选任何标签')
          return
        }
        handleToogleHides(labels, true)
      }
    },
    {
      name: '删除',
      onClick: () => {
        let labels = getSelectedRows();
        if (labels.length <= 0) {
          Message.warning('未勾选任何标签')
          return
        }
        setLabelDeleteCfg({
          labels: getSelectedRows(),
          visible: true
        })
      }
    },
    {
      name: '新建标签',
      onClick: () => {
        setLabelEditCfg({
          label: {
            id: '',
            labelContent: ''
          },
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
      <LabelTableEdit
        {...labelEditCfg}
        onOk={() => { }}
        onCancel={() => { }}
        onClose={() => { }}
        onCancelCallback={handleEditCancel} />
      <LabelTableDelete {...labelDeleteCfg} onCancel={handleDeleteCancel} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
`