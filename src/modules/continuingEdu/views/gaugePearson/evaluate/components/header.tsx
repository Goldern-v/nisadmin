import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState, useLayoutEffect,ChangeEvent } from "react";
import { Select, Input, Button, DatePicker, Modal, message} from "antd";
import { PageTitle } from "src/components/common";
import moment, { duration } from 'moment'
import {evaluateDatas} from "../data"
import { getFileType, getFilePrevImg } from "src/utils/file/file";
import Zimage from "src/components/Zimage";
import {trainingSettingApi} from "../../api/TrainingSettingApi";

// import { formApplyModal } from "../FormApplyModal"; // 仓库数据
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
    // evaluateDatas.year = value
    evaluateDatas.onload()
  }

  const handleOpenChange = (status: boolean) => {
    setyearPickerIsOpen(status)
  }

  const handleYearClear = () => {
    // evaluateDatas.year = undefined;
  }
  // 查询
  const handelInquire = ()=>{
    evaluateDatas.onload()
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
      evaluateDatas.tableLoading = true;
      trainingSettingApi.uploadPictures(file)
        .then(res => {
          console.log(res);
          evaluateDatas.uploadingId = res.data.id;
          evaluateDatas.uploadingPath = res.data.path;
          evaluateDatas.uploadingName = res.data.name;
          message.success('导入成功')
          evaluateDatas.uploadingStatus = true
          evaluateDatas.tableLoading = false
        }, err => evaluateDatas.tableLoading = false)

      document.body.removeChild(importEl)
    }
    document.body.appendChild(importEl)
    importEl.click()
    // trainingSettingApi.uploadPictures()
      
  }
  // 上传提交
  const handleOk = ()=>{
    let obj = {
      attachmentId:evaluateDatas.uploadingId,
      // year:moment(evaluateDatas.yearImport).format("YYYY") ,
    }
    trainingSettingApi.saveOrUpdate(obj).then((res)=>{
      evaluateDatas.onload()
      
    }).catch((err)=>{
      console.log(err);
    })
    setEditVisible(false)
    evaluateDatas.uploadingStatus = false ;
  }

  return (
    <Wrapper>
      <RightIcon>
        <span style={{marginRight:'10px',marginLeft:'10px'}}>规培时间：</span>
        <DatePicker.RangePicker
          style={{width: '250px'}}
          defaultValue={[evaluateDatas.planTrainBeginTime, evaluateDatas.planTrainEndTime]}
          format={"YYYY-MM-DD"}
        />
        <span style={{marginLeft:'10px'}}>科室：</span>
        <Select
          mode="multiple"
          allowClear
          style={{ minWidth: '260px', maxWidth:'500px',  maxHeight: "110px"}}
          placeholder="请选择科室"
          defaultValue={['']}
          value={evaluateDatas.deptCodeMultiple}
          onChange={(value: any[]) => {
            evaluateDatas.deptCodeMultiple = value 
            evaluateDatas.onload()
          }}
          // onChange={handleChange}
        >
          {evaluateDatas.deptCode.map((item: any) => {
            return <Option value={item.code} key={item.code}>{item.name}</Option>
          })}
        </Select>
        <Input
          style={{ width: 180, marginLeft: 10, marginRight: 5 }}
          placeholder="请输入要搜索的关键字"
          value={evaluateDatas.keyWord}
          onChange={e => {
            evaluateDatas.keyWord = e.target.value 
            evaluateDatas.onload()
          }}
        />
        <Button
         type="primary"
         className="span"
          onClick={handelInquire}
        >
          查询
        </Button>
        {/* <Button
          className="span"
          type="primary"
          onClick={()=>{
            setEditVisible(true)
          }}
        >
          导入
        </Button> */}
        <Button
          className="span"
          // onClick={()=>{bacisManagData.export()}}
        >
          导出
        </Button>
        <Button
          className="span"
          type="primary"
          onClick={()=>{evaluateDatas.save()}}
        >
          保存
        </Button>
      </RightIcon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  width: calc(100vw-200px);
  justify-content: space-between;
  min-height: 55px;
  max-height: 110px;
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
    font-size:14px;
    margin-left: 15px;
  }
  .ant-select-selection--multiple{
    max-height: 90px;
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
