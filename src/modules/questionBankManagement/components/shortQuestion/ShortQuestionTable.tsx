import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/es/table'
import FooterBtnCon, { BtnList } from '../common/FooterBtnCon'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Modal, message as Message } from 'antd'

import LabelsAppend from './../common/LabelsAppend';
import LabelsDelete from './../common/LabelsDelete';
import ShortQuestionTemplate from './ShortQuestionTemplate'
import WrapPre from './../common/WrapPre'

import { questionBankManageService } from './../../api/QuestionBankManageService'
interface Props {
  active?: boolean,
  model: any,
  surplusHeight?: number
}

export default observer(function ShortQuestionTable(props: Props) {
  const { model, surplusHeight } = props;
  const { history } = appStore;
  const { tableTotal, tableData, query, tableLoading } = model;
  //选中的行下标
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);

  //标签添加弹窗相关
  const [labelAppendCfg, setLabelAppendCfg] = useState({
    loading: false,
    visible: false,
    labels: [] as any[],
    questionIds: [] as any[]
  })
  const handleLabelAppendOk = (newLabels: any) => {
    let questionLabelIdList = newLabels.map((item: any) => item.id);
    let questionIdList = getSelectedRows().map((item: any) => item.id);
    if (questionLabelIdList.length <= 0) {
      Message.warning('未选择标签');
      return
    }

    setLabelAppendCfg({ ...labelAppendCfg, loading: true });

    questionBankManageService.addQuestionLabel({
      questionLabelIdList,
      questionIdList
    })
      .then(res => {
        Message.success('标签修改成功');
        model.getList();
        setLabelAppendCfg({ ...labelAppendCfg, loading: false, visible: false });
      }, err => {
        setLabelAppendCfg({ ...labelAppendCfg, loading: false });
      })
  }
  const handleLabelAppendCancel = () => {
    setLabelAppendCfg({ ...labelAppendCfg, visible: false });
  }
  //标签删除弹窗相关
  const [labelDeleteCfg, setLabelDeleteCfg] = useState({
    loading: false,
    visible: false,
    labels: [] as any[],
    questionIds: [] as any[]
  })
  const handleLabelDeleteOk = (labelsDelete: any[]) => {
    if (labelsDelete.length <= 0) {
      Message.warning('未选择要删除的标签');
      return
    }
    let questionIdList = getSelectedRows().map((item: any) => item.id);

    setLabelDeleteCfg({ ...labelDeleteCfg, loading: true });

    questionBankManageService
      .deleteLabelByQuestionId({
        questionLabelIdList: labelsDelete,
        questionIdList
      })
      .then(res => {
        Message.success('标签删除成功');
        model.getList();
        setLabelAppendCfg({ ...labelAppendCfg, loading: false, visible: false });
      }, err => {
        setLabelAppendCfg({ ...labelAppendCfg, loading: false });
      })
  }
  const handleLabelDeleteCancel = () => {
    setLabelDeleteCfg({ ...labelDeleteCfg, visible: false });
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
      title: '题目',
      dataIndex: '题目',
      key: '题目',
      render(text: any, record: string, index: number) {
        return <ShortQuestionTemplate data={record} />
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
      title: '注解',
      dataIndex: 'annotation',
      key: 'annotation',
      width: 150,
      render: (text: string) => {
        return <WrapPre>{text || ''}</WrapPre>
      }
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 100,
      render(text: string, record: any) {
        return (
          <DoCon>
            <span onClick={() => handleEdit(record)}>编辑</span>
            <span onClick={() => handleDeleteQuestion(record)}>删除</span>
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
    if (record.bankType == '系统题库') {
      Message.warning('系统题库无法修改')
      return
    }
    history.push(`/continuingEdu/shortQuestionEdit?id=${record.id}`)
  }

  const handleDeleteQuestion = (record: any) => {
    if (record.bankType == '系统题库') {
      Message.warning('系统题库无法删除')
      return
    }

    let questionIdList = [record.id];

    let content = <div>
      <div>您确定要删除该题目吗？</div>
      <div>删除的题目可以在回收站里找回。</div>
    </div>

    Modal.confirm({
      title: '删除题目',
      content,
      onOk: () => {
        questionBankManageService.deleteQuestion({ questionIdList }).then(res => {
          Message.success('删除成功');
          model.getList();
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
      name: '添加标签',
      onClick: () => {
        let rows = getSelectedRows();
        if (rows.length <= 0) {
          Message.warning('未选择题目')
          return
        }

        let labels: any[] = [];
        for (let i = 0; i < rows.length; i++) {
          let questionLabels = rows[i].questionLabels;
          for (let j = 0; j < questionLabels.length; j++) {
            let label = questionLabels[j];
            if (labels.filter((item: any) => item.id == label.id).length <= 0) {
              labels.push({
                id: label.id,
                labelContent: label.labelContent
              })
            }
          }
        };

        setLabelAppendCfg({
          ...labelAppendCfg,
          visible: true,
          labels,
          questionIds: rows.map((item: any) => item.id)
        })
      }
    },
    {
      name: '移除标签',
      onClick: () => {
        let rows = getSelectedRows();
        if (rows.length <= 0) {
          Message.warning('未选择题目')
          return
        };

        let labels: any[] = [];
        for (let i = 0; i < rows.length; i++) {
          let questionLabels = rows[i].questionLabels;
          for (let j = 0; j < questionLabels.length; j++) {
            let label = questionLabels[j];
            if (labels.filter((item: any) => item.id == label.id).length <= 0) {
              labels.push({
                id: label.id,
                labelContent: label.labelContent
              })
            }
          }
        };

        setLabelDeleteCfg({
          ...labelAppendCfg,
          visible: true,
          labels,
          questionIds: rows.map((item: any) => item.id)
        })
      }
    },
    {
      name: '删除题目',
      onClick: () => {
        let rows = getSelectedRows();

        let errText = '';

        if (rows.length <= 0) errText = '未选择题目';
        if (query.bankType == '系统题库') errText = '无法修改系统题库'

        if (errText.length) {
          Message.warning(errText)
          return
        }

        let questionIdList = rows.map((item: any) => item.id);

        let content = <div>
          <div>您确定要删除选中的{questionIdList.length}个题目吗？</div>
          <div>删除的题目可以在回收站里找回。</div>
        </div>

        Modal.confirm({
          title: '删除题目',
          content,
          onOk: () => {
            questionBankManageService.deleteQuestion({ questionIdList }).then(res => {
              Message.success('删除成功');
              model.getList();
            })
          }
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
      <FooterBtnCon btnList={btnList} />
      <LabelsAppend {...labelAppendCfg} onCancel={handleLabelAppendCancel} onOk={handleLabelAppendOk} />
      <LabelsDelete {...labelDeleteCfg} onCancel={handleLabelDeleteCancel} onOk={handleLabelDeleteOk} />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
`
