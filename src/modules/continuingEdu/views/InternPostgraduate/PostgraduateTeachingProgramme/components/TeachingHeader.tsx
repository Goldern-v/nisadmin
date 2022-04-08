import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect } from "react";
import { Select, Input, Button, DatePicker,Modal,message } from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import Left from "src/modules/quality/views/checkWard/view/details/components/Left";
import {teachingPost} from "../TeachingPost"
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import {internPostgraduateApi} from "../../api/InternPostgraduate";
import Zimage from "src/components/Zimage";
// import FormEditModal from "../modal/FormEditModal"; // 新建弹窗

const Option = Select.Option;

interface Props {}
interface IDeucOption {
  value: string;
  item: string;
}
export default observer(function ApplyHeader(props: Props) {
  const [query, setQuery] = useState({
    year: moment() as null | moment.Moment,
    deucValue:'',
    sexValue:'',
    keyWord:'',
  } as any) //初始化默认值
  const [editVisible, setEditVisible] = useState(false); // 控制一弹窗状态
  const [yearPickerIsOpen, setyearPickerIsOpen] = useState(false); // 控制年份下拉打开
  const [yearImportIsOpen, setyearImportIsOpen] = useState(false); // 控制导入年份下拉打开


  const handleEditOk = () => {
    // formApplyModal.onload();
    setEditVisible(false);
  };
  const handlePanelChange = (value: any) => {
    setyearPickerIsOpen(false)
    teachingPost.year = value
    teachingPost.onload()
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    teachingPost.year = undefined
  }
  // 查询
  const handelInquire = ()=>{
    teachingPost.onload()
  }

  // 上传附件
  const handleUploading = ()=>{
    let importElId = 'sxslrb_import_file_el'
    let lastEl = document.getElementById('importElId')
    if (lastEl) document.body.removeChild(lastEl)

    let importEl = document.createElement('input')
    importEl.id = importElId
    importEl.style.display = 'none'
    importEl.type = 'file'
    importEl.onchange = (e: any) => {
      let file = e.target.files[0]
      teachingPost.tableLoading = true;
      internPostgraduateApi.uploadPictures(file)
        .then(res => {
          console.log(res);
          teachingPost.uploadingId = res.data.id;
          teachingPost.uploadingPath = res.data.path;
          teachingPost.uploadingName = res.data.name;
          message.success('导入成功')
          teachingPost.uploadingStatus = true
          teachingPost.tableLoading = false
        }, err => teachingPost.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
      
  }
  // 上传提交
  const handleOk = ()=>{
    let obj = {
      attachmentId:teachingPost.uploadingId,
      year:moment(teachingPost.yearImport).format("YYYY") ,
    }
    internPostgraduateApi.saveOrUpdate(obj).then((res)=>{
      teachingPost.onload()
      
    }).catch((err)=>{
      console.log(err);
    })
    setEditVisible(false)
    teachingPost.uploadingStatus = false ;
  }

  return (
    <Wrapper>
      <LeftIcon>
        <PageTitle>{`${moment(teachingPost.year).format("YYYY")}年护理实习生教学计划`}</PageTitle>
      </LeftIcon>
      <RightIcon>
        <span style={{marginRight:'10px'}}>年份</span>
        <DatePicker
          style={{ width: 100 }}
          value={teachingPost.year}
          open={yearPickerIsOpen}
          mode='year'
          className='year-picker'
          placeholder='全部'
          format='YYYY'
          onChange={handleYearClear}
          onOpenChange={handleOpenChange}
          onPanelChange={handlePanelChange}
        />
        <span style={{marginLeft:'10px'}}>关键字：</span>
        <Input
          style={{ width: 300, marginLeft: 15, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={teachingPost.courseName}
          onChange={e => {
            teachingPost.courseName = e.target.value;
            teachingPost.onload()
          }}
        />
        <Button
         type="primary"
         className="span"
          onClick={handelInquire}
        >
          查询
        </Button>
        <Button
          className="span"
          type="primary"
          onClick={()=>{ setEditVisible(true)}}
        >
          导入
        </Button>
      </RightIcon>
      <Modal bodyStyle={{}} title="导入教学计划附件" visible={editVisible}  onCancel={() => {
        setEditVisible(false); teachingPost.uploadingStatus = false ;
        } } footer={[]} width="600px" >
         <span>请先选择导入年份：</span>
          <DatePicker
            style={{ width: 300 }}
            value={teachingPost.yearImport}
            open={yearImportIsOpen}
            mode='year'
            className='year-picker'
            placeholder='全部'
            format='YYYY'
            onChange={()=>{teachingPost.yearImport = undefined}}
            onOpenChange={(status)=>{ setyearImportIsOpen(status)}}
            onPanelChange={(val)=>{
              teachingPost.yearImport = val
              setyearImportIsOpen(false)
            }}
          />
          <FileBox>
            {!teachingPost.uploadingStatus ? (
              <div style={{width: "100%",display:"flex" ,justifyContent: "center",flexWrap: "wrap"}}>
              <Button type="primary" size="large" style={{width:'150px' ,margin:'20px', fontSize:'16px'}} onClick={handleUploading}>上传附件</Button>
              <span>支持格式："图片；".pdf;"".doc;"".docx;"".ppt;"".pptx;"".xls;"".xlsx;"".mp4"</span>
            </div>
            ) : (
              <div className="file-box__item">
                {getFileType(teachingPost.uploadingPath) == "img" ? (
                  <Zimage
                    src={teachingPost.uploadingPath}
                    className="type-img"
                    alt=""
                  />
                ) : (
                  <img
                    src={getFilePrevImg(teachingPost.uploadingPath)}
                    className="type-img"
                    alt=""
                  />
                )}
                <div className="name">{teachingPost.uploadingName}</div>
                <div className="butName">
                  <Button style={{width:'80px' ,margin:'20px'}} onClick={()=>{setEditVisible(false)
                  teachingPost.uploadingStatus = false }}>取消</Button>
                  <Button style={{width:'80px' ,margin:'20px'}} onClick={handleOk} type="primary">提交</Button>
                </div>
              </div>
            )}
          </FileBox>
         
       </Modal>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;
`;
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    font-size:16px;
    margin-left: 15px;
  }
`;
const FileBox = styled.div`
  .file-box__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top:30px;
    .type-img {
      width: 30px;
    }
    .name {
      flex: 1;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .delete {
      width: 20px;
      height: 20px;
      font-size: 18px;
      background: #ccc;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      margin: 0 4px;
      cursor: pointer;
    }
    .ant-btn + .ant-btn {
      margin-left: 40px;
    }
    .butName{
      width:100%;
      display: flex;
      justify-content: center;
    }
  }
  .tip {
    font-size: 13px;
    color: #999;
    margin-top: 6px;
  }
`;

