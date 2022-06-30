import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Place } from "src/components/common";
import { DatePicker,Input,Button , message as Message,Modal} from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { practicalOperationScore } from './PracticalOperationScoreModal'
import  PracticalImportModal  from './components/PracticalImportModal'
import { operationScoreApi } from './api/OperationScore'
import { param } from 'jquery'

interface telist{
  technology: string;
  chapter: string;
  totalScore: string;
  paperName: string;
}

const { RangePicker } = DatePicker;

export default observer(function Notification() {

  const [modalVisible,setModalVisible] = useState(false)
  const [modalParams,setModalParams] = useState({})
  const [modalTitle,setModalTitle] = useState('')

  useEffect(()=>{
    practicalOperationScore.onload()
  },[])

  const columns:any = [
    {
      title: "序号",
      dataIndex: "",
      render: (text: any, record: any, index: number) => index + 1,
      align: "center",
      width: 50
    },
    {
      title: "标题",
      dataIndex: "paperName",
      align: "center",
      width: 120
    },
    {
      title: "章节",
      dataIndex: "chapter",
      align: "center",
      width: 60
    },
    {
      title: "分数",
      dataIndex: "totalScore",
      align: "center",
      width: 100
    },
    {
      title: "提交人",
      dataIndex: "submitter",
      align: "center",
      width: 120
    },
    {
      title: "提交时间",
      dataIndex: "createTime",
      align: "center",
      width: 150
    },
    {
      title: "修改时间",
      dataIndex: "updateTime",
      align: "center",
      width: 150
    },
    
    {
      title: "操作",
      width: 120,
      dataIndex: "cz",
      align: "center",
      render(text: any, record: any) {
        let data: any =[
          {
            text: "下载",
            color:'00A680',
            function:getCurrDownloadTemplate,
          },
          {
            text: "预览",
            color:'00A680',
            function:getPreviewDetail,
          },
          {
            text: "编辑",
            color:'00A680',
            function:getEditDetail,
            using:record.using,
          },
          {
            text: "删除",
            color:'#f33',
            function:handleDelect,
            using:record.using,
          }
        ];
        return (
          <DoCon>
            {data.map((item: any, index: any) => (
              <span
                key={index}
                onClick={() => (item.function && !item.using ? item.function(record) : {})}
                style={{color:item.color && !item.using ? item.color:'#ddd', }}
              >
                {item.text}
              </span>
            ))}
          </DoCon>
        );
      }
    }
  ];
  // 删除
  const handleDelect =(val:any) =>{
    let content = (
      <div>
        <div>您确定要删除选中的记录吗？</div>
      </div>
    );
    Modal.confirm({
      title: "提示",
      content,
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        practicalOperationScore.getDeleteByPaperId(val.id)
      }
    });
  }
  /**
  * 编辑获取数据
  */
  const getEditDetail = async (val:any) => {
    practicalOperationScore.tableLoading = true;
    let {data} = await operationScoreApi.getDetailByPaperId(val.id);
    practicalOperationScore.tableLoading = false;
    setModalTitle('编辑');
    setModalParams(data);
    setModalVisible(true);

  }
  /**
  * 预览获取数据
  */
  const getPreviewDetail = async (val:any) => {
    practicalOperationScore.tableLoading = true;
    let {data} = await operationScoreApi.getDetailByPaperId(val.id)
    practicalOperationScore.tableLoading = false;
    setModalTitle('预览')
    setModalParams(data);
    setModalVisible(true);
  }

  // 导入
  const handleImport = () =>{
     /** 获取导入模板 */
    let importElId = 'scpfgl_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      practicalOperationScore.tableLoading = true;
      operationScoreApi.importPraticalGrade(file)
        .then(res => {
          if(res.code < 250){
            let list = res.data
            setModalTitle('导入')
            practicalOperationScore.tableLoading = false;
            setModalParams(list);
            setModalVisible(true);
          }
        }, err =>err)
        .catch(err=>{
          console.log(err);
        })
      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
    
  }

  // 打开弹窗
  const handleModelOk = async (data:any)=>{
    let list = await operationScoreApi.getsaveOrUpdate(data)
    list.code == 200 && Message.success('保存成功！')
    setModalVisible(false);
    practicalOperationScore.onload();
    setModalParams({});
  }
  const getCurrDownloadTemplate = (val:any) =>{
    practicalOperationScore.getSeveralDownloadTemplate(val.id)
  }

  return (
    <Wrapper>
      <Header>
        <Title>实操评分管理</Title>
        <Place/>
        <span style={{ marginLeft: 15 }}>提交时间：</span>
        <RangePicker 
        format="YYYY-MM-DD"
        onChange={(e)=>{
          practicalOperationScore.subissionTimeBeginIndex = e[0]?.format('YYYY-MM-DD');
          practicalOperationScore.subissionTimeEndIndex = e[1]?.format('YYYY-MM-DD');
        }} />
        <Input
          style={{ width: 300, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的标题或章节"
          value={practicalOperationScore.keyWord}
          onChange={e => {
            practicalOperationScore.keyWord = e.target.value
          }}
        />
         <Button
          type="primary"
          style={{ marginLeft: 15 }}
          onClick={()=>{
            practicalOperationScore.onload()
          }}
        >
          查询
        </Button>
         <Button
          type="primary"
          style={{ marginLeft: 15 }}
          onClick={()=>{practicalOperationScore.getDownloadTemplate()}}
        >
          下载模板
        </Button>
         <Button
          type="primary"
          style={{ marginLeft: 15 }}
          onClick={handleImport}
        >
          导入
        </Button>
      </Header>
      <Content>
      <BaseTable
        loading={practicalOperationScore.tableLoading}
        dataSource={practicalOperationScore.tableList}
        columns={columns}
        surplusHeight={225}
        surplusWidth={280}
        pagination={{
          current: practicalOperationScore.pageIndex,
          total: practicalOperationScore.total,
          pageSize: practicalOperationScore.pageSize,
        }}
        onChange={(pagination) => {
          practicalOperationScore.pageIndex = pagination.current;
          practicalOperationScore.total = pagination.total;
          practicalOperationScore.pageSize = pagination.pageSize;
          practicalOperationScore.onload();
        }}
      />
      </Content>
      <PracticalImportModal 
        modalVisible={modalVisible}
        modalTitle={modalTitle}
        params={modalParams}
        onCancel={() => { setModalVisible(false)}}
        onOk={handleModelOk}
        ></PracticalImportModal>
    
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
const Header = styled.div`
  height: 60px;
  color: #333;
  line-height: 55px;
  padding: 12px 15px;
  width: 100%;
  display: flex;
  align-items:center;
  justify-center: center;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 0 20px;
`;