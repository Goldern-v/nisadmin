import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Select, Input, Button, Modal, message as Message } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ColumnProps } from 'antd/lib/table'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import HealthProgandaService from './api/healthProgandaService'

const api = new HealthProgandaService();

const { Option } = Select;
export interface Props extends RouteComponentProps { }

export default withRouter(observer(function 健康宣教字典(props: Props) {
  const [fileName, setFileName] = useState('');
  const [uploadVisible, setUploadVisible] = useState(false);

  const [dataLoading, setDataLoading] = useState(false);
  //科室列表
  const initDeptList: any = [];
  const [deptList, serDeptList] = useState(initDeptList);
  //宣教类型列表
  const initTypeList: any = [];
  const [typeList, setTypeList] = useState(initTypeList);
  //宣教接口请求参数
  const [cacheQuery, setCacheQuery] = useState({
    type: '',
    name: '',
    deptCode: ''
  })
  const [query, setQuery] = useState({
    type: '',
    name: '',
    deptCode: ''
  });
  //宣教列表
  const initTableData: any = []
  const [tableData, setTableData] = useState(initTableData);

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'key',
      width: 50,
      align: 'center',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '健康宣教',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 100
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      key: 'deptName',
      align: 'center',
      width: 180
    },
    {
      title: '修改人',
      dataIndex: 'creatorName',
      key: 'creatorName',
      align: 'center',
      width: 100
    },
    {
      title: '最后修改时间',
      dataIndex: 'creatDate',
      key: 'creatDate',
      align: 'center',
      width: 180
    }, {
      title: '操作',
      dataIndex: '',
      key: 'operation',
      align: 'center',
      width: 120,
      render: (text: string, record: any) => {

        return <Fragment>
          <span onClick={e => viewContent(record)} className="operation-span">查看</span>
          <span onClick={e => handleDelete(record)} className="operation-span delete-span">删除</span>
        </Fragment>
      }
    },
  ];

  useEffect(() => {
    if (authStore.user) {
      setQuery({ ...query, deptCode: authStore.user.deptCode });
      getTableData({ ...query, deptCode: authStore.user.deptCode });
    } else {
      getTableData();
    }

    getTypeList();
  }, []);

  useEffect(() => {
    if (cacheQuery.deptCode !== query.deptCode && cacheQuery.deptCode !== '') getTableData();

    setCacheQuery(query);
  }, [query])

  const getTableData = (newQuery?: any) => {
    let reqQuery = newQuery ? newQuery : query;
    setDataLoading(true);
    api.getTableList(reqQuery).then(res => {
      setDataLoading(false);
      let data = res.data;
      if (data) setTableData(data.map((item: any, key: number) => {
        return { key, ...item }
      }))
    })
  }

  const getTypeList = () => {
    api.getTypeList().then(res => {
      let data = res.data;
      if (data) setTypeList(data);
    })
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该健康宣教字典?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        api.delete(record.missionId).then(res => {
          if (res.code == 200) {
            Message.success('宣教删除成功');
            getTableData();
          }
        })
      }
    })
  }

  const handleSearch = () => {
    getTableData();
  }

  const triggerFileUpload = () => {
    let fileUpload = document.getElementById('fileUpload');
    if (fileUpload) fileUpload.click();
  }

  const handleUploadBtn = () => {
    setUploadVisible(true);

    // let fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    // let initArr: any = [];
    setFileName('');
    // if (fileUpload) fileUpload.files = initArr;
  }

  const handleUploadOkBtn = () => {
    let fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    let data = new FormData();
    if (!fileUpload.files || fileName.length <= 0) return Message.error('未选择上传文件')
    data.append('file', fileUpload.files[0])
    api.uploadWord(data)
      .then(res => {
        if (res.code == 200) {
          setUploadVisible(false);
          let originString = res.data || '';
          window.sessionStorage.healthPropagandaEditData = JSON.stringify({
            type: 'upload',
            baseInfo: {},
            content: originString.replace(/\n/g, '<br/>')
          })
          props.history.push('/healthPropagandaEdit');
        }
        Message.success('宣教导入成功')
      })
  }

  const handleUploadChange = () => {
    let fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileUpload) {
      let nameArr = fileUpload.value.split('\\');
      setFileName(nameArr[nameArr.length - 1]);
    }
  }

  const handleCreateNew = () => {
    delete window.sessionStorage.healthPropagandaEditData;
    props.history.push('/healthPropagandaEdit');
  }

  const viewContent = (record: any) => {
    props.history.push(`/healthPropagandaView/${record.missionId}`);
  }

  const handleDeptSelect = (item: any) => {
    setQuery({ ...query, deptCode: item.code });
  }

  return <Wrapper>
    <div className="topbar">
      <span className="title">健康宣教字典设置</span>
      <div className="float-right">
        <span>类别:</span>
        <span className="type">
          <Select defaultValue="" value={query.type} onChange={(type: string) => setQuery({ ...query, type })}>
            <Option value="">全部</Option>
            {typeList.map((item: any) => <Option value={item.type} key={item.id}>{item.type}</Option>)}
          </Select>
        </span>
        <span className="search-input">
          <Input value={query.name} onChange={(e: any) => setQuery({ ...query, name: e.target.value })} allowClear />
        </span>
        <span className="btn-group">
          <Button className="search" onClick={handleSearch}>搜索</Button>
          <Button className="upload" onClick={handleUploadBtn} style={{ marginRight: '5px' }}>导入</Button>
          <Button className="upload" onClick={handleCreateNew}>新建</Button>
        </span>
      </div>
    </div>
    <div className="main-contain">
      <div className="left">
        <div className="title">科室</div>
        <div className="content">
          {authStore.deptList.map((item: any) => {
            let classes = ['dept-item'];
            if (query.deptCode == item.code) classes.push('selected')
            return <div
              key={item.code}
              className={classes.join(' ')}
              onClick={() => handleDeptSelect(item)}>
              <span className="before" />{item.name}<span className="after" />
            </div>
          })}
        </div>
      </div>
      <div className="right">
        <BaseTable
          loading={dataLoading}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          surplusHeight={250} />
      </div>
    </div>
    <Modal title="导入宣教" visible={uploadVisible} onOk={handleUploadOkBtn} onCancel={() => setUploadVisible(false)}>
      <ModalWrapper>
        <Input value={fileName} className="file-name-input" /><Button onClick={triggerFileUpload}>选择</Button>
        <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={handleUploadChange} accept=".doc,.docx" />
      </ModalWrapper>
    </Modal>
  </Wrapper>
}))

const Wrapper = styled.div`
width: 100%;
height: 100%;
position: relative;

.float-right{
  float: right;
}

.topbar{
  height: 50px;
  border-bottom: 1px solid #ddd;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);
  span{
    display: inline-block;
    vertical-align: middle;
  }
  .title{
    margin-left: 20px;
    font-size: 16px;
    line-height: 50px;
  }
  .float-right{
    margin-top: 10px;
    display: inline-block;
    &>span{
      margin-right: 10px
    }
    .search-input{
      margin-right: 5px;
      width: 150px;
    }
    .btn-group{
      .search{
        margin-right: 10px;
      }
    }
  }
}

.main-contain{
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  padding: 15px;
  &>div{
    background: #fff;
  }
  .left{
    height: 100%;
    float: left;
    width: 250px;
    overflow: hidden;
    border: 1px solid #ddd;
    margin-right: 15px;
    padding-top: 32px;
    .title{
      text-indent: 30px;
      margin-top: -32px;
      border-bottom: 1px solid #ddd;
      height: 32px;
      line-height: 32px;

    }
    .content{
      height: 100%;
      width: 100%;
      overflow: auto;
      .dept-item{
        line-height: 24px;
        cursor: pointer;
        position: relative;
        text-indent: 30px;
        &:hover{
          background: #00A680;
          color: #fff;
          &.selected{
            color: #fff;
          }
        }
        &.selected{
          color:#00A680;
        }
        .before{
          position: absolute;
          display: block;
          height: 100%;
          width: 0;
          border-left: 1px dashed #aaa;
          left: 10px;
          top: 0;
        }
        .after{
          position: absolute;
          display: block;
          height: 0;
          width: 10px;
          border-top: 1px dashed #aaa;
          left: 11px;
          top: 50%;
        }
        &:first-of-type{
          .before{
            height: 50%;
            bottom: 0;
            top: auto;
          }
        }
        &:last-of-type{
          .before{
            height: 50%;
            bottom: auto;
            top: 0;
          }
        }
      }
    }
  }
  .right{
    border: 1px solid #ddd;
    height: 100%;
    overflow: hidden;
    .operation-span{
      cursor: pointer;
      &:hover{
        color: rgb(0, 166, 128);
      }
      &.delete-span{
        margin-left: 10px;
      }
    }
  }
}
`

const ModalWrapper = styled.div`
text-align:center;

.file-name-input{
  width: 250px;
  margin-right: 20px;
}
`