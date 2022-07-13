import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tabs, Select, Input } from 'antd'
import { Wrapper } from './../../components/common'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { trainingResultModel } from './../../models/TrainingResultModel'
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import printing from 'printing'


const Option = Select.Option;
const TabPane = Tabs.TabPane
const { TextArea } = Input;

export interface Props {
}

//查看培训结果
export default observer(function TrainingRecordTable() {
  //初始化表格数据
  useEffect(() => {
    trainingResultModel.onload();
  }, []);

  useEffect(() => {
    trainingResultModel.getDeptName();
  }, []);

  // 函数
  const updateData = (record: any) => {
    const dataIndexOne: any = trainingResultModel.tableCopyList.findIndex(
      (obj: any) => record.empNo === obj.empNo
    );
    trainingResultModel.tableCopyList[dataIndexOne] = record;
    const arrOne = trainingResultModel.tableCopyList.slice();
    trainingResultModel.tableCopyList = [];
    trainingResultModel.tableCopyList = arrOne;
  };

  //打印
  const handlePrint = () => {
    let printEl = document.getElementById('tableID')

    // let documentTitle = window.document.title
    // window.document.title = '护理人员信息档案'

    if (printEl) printing(printEl, {
      injectGlobalCss: true,
      scanStyles: false,
      css: `
        @page {
          margin: 10mm;
        }
        *{
          color:#000;
        }
        .textarea {
          text-align:left;
          height: auto;
          word-wrap:break-word;
          white-space:pre-line;
        }
        #${'tableID'} {
          display:block!important;
        }
      `
    })

    // setTimeout(() => window.document.title = documentTitle, 1000)
  }

  return (
    <Wrapper>
      <Header>
        <div className='fr'>
          <Button
            type="primary"
            onClick={() => trainingResultModel.handleSave()}
          >
            保存
          </Button>
          <ExportBtn onClick={handlePrint}>打印</ExportBtn>
        </div>
      </Header>
      <Table id='tableID'>
        <table>
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr>
              <td colSpan={4} className='title'>培训实施记录</td>
            </tr>
            <tr>
              <td>培训科室</td>
              <td>
                <Select
                  value={trainingResultModel.trainingDepartment}
                  style={{ width: 250 }}
                  onChange={(value: any, option: any) => {
                    trainingResultModel.trainingDepartment = option.props.children
                    updateData(trainingResultModel.trainingDepartment)
                  }}
                >
                  {trainingResultModel.trainingDeptName.map((item: any) => {
                    return <Option value={item.code} key={item.code}>{item.name}</Option>
                  })}
                </Select>
              </td>
              <td>培训教师</td>
              <td>{trainingResultModel.teacher}</td>
            </tr>
            <tr>
              <td>培训时间</td>
              <td>{trainingResultModel.time}</td>
              <td>培训地点</td>
              <td>{trainingResultModel.address}</td>
            </tr>
            <tr>
              <td>参与人员</td>
              <td colSpan={3}>{trainingResultModel.people}</td>
            </tr>
            <tr className='additional'>
              <td>培训照片</td>
              <td colSpan={3}>
                <MultipleImageUploader
                  accept='image/jpg'
                  text="添加图片"
                  imgLimitedMb={20}
                  value={trainingResultModel.trainingPhotos.split(',').filter((item: string) => item)}
                  tip={
                    "支持png、jpg格式，单文件最大支持20m 最多上传10张 "
                  }
                  sizeLimited={10}
                  onChange={(imgs) => {
                    console.log(imgs);
                    
                    trainingResultModel.trainingPhotos = imgs.join(',')
                    updateData(trainingResultModel.trainingPhotos)
                  }}
                />
              </td>
            </tr>
            <tr className='comment'>
              <td>效果评价/培训考核</td>
              <td colSpan={3}>
                <TextArea
                  className='textarea'
                  autosize={{ minRows: 10 }}
                  maxLength={1000}
                  value={trainingResultModel.comments}
                  onChange={e => {
                    trainingResultModel.comments = e.target.value
                    updateData(trainingResultModel.comments)
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Table>
    </Wrapper>
  )
})

const Table = styled.div`
  margin: 0 auto;
  table {
    width: 1000px;
    // border-collapse: collapse;
    text-align: center;
    // box-shadow: 0px 2px 4px rgb(0 0 0 / 15%);
    tr {
      .title {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        font-weight: 700
      }
      td{
        border: 1px solid #ccc;
        margin: 0;
        padding: 0 2px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
    .additional {
      height: 280px;
      line-height: 280px;
      .dSSVnq {
        height:240px
      }
    }
    .comment {
      height: 160px;
      line-height: 160px;
    }
    .ant-select-selection {
      border:none
    }
    .textarea {
      border: none;
      resize: none;
      outline: none;
    }
  }
`
const Header = styled.div`
  padding: 0 15px 10px 15px;
  width: 100%;
  height: 50px;
  .fr {
    float: right;
  }
`
const ExportBtn = styled(Button)`
  margin: 0 15px 0 10px;
  font-size: 14px;
  &:last-of-type {
  margin-right: 0;
  }
`