import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tabs, Select, Input, Radio } from 'antd'
import { Wrapper } from './../../components/common'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { trainingResultModel } from './../../models/TrainingResultModel'
import MultipleImageUploader from "src/components/ImageUploader/MultipleImageUploader";
import printing, { preview } from 'printing'


const Option = Select.Option;
const TabPane = Tabs.TabPane
const { TextArea } = Input;

export interface Props {
}

//查看培训结果
export default observer(function TrainingRecordTable() {
  const [isPrint, setIsPrint] = useState(false)
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

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  //打印
  const handlePrint = () => {
    setIsPrint(true)
    setTimeout(() => {
      let printEl = document.getElementById('tableID')
      
      if (printEl) 
        printing(printEl, {
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
        }).then(() => {
          setIsPrint(false)
        }).catch(() => {
          setIsPrint(false)  
        })
    }, 500)
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
        <h2 className='table-title'>培训实施记录与小结</h2>
        <table>
          <colgroup>
            <col width="15%" />
            <col width="35%" />
            <col width="15%" />
            <col width="35%" />
          </colgroup>
          <tbody>
            <tr>
              <td>培训日期</td>
              <td>{trainingResultModel.time}</td>
              <td>培训部门</td>
              <td>
                <Select
                  value={trainingResultModel.trainingDepartment}
                  style={{ width: '100%' }}
                  onChange={(value: any, option: any) => {
                    trainingResultModel.trainingDepartment = option.props.children
                    updateData(trainingResultModel)
                  }}
                >
                  {trainingResultModel.trainingDeptName.map((item: any) => {
                    return <Option value={item.code} key={item.code}>{item.name}</Option>
                  })}
                </Select>
              </td>
            </tr>
            <tr>
              <td>培训地点</td>
              <td>{trainingResultModel.address}</td>
              <td>培训人员</td>
              <td>{trainingResultModel.teacher}</td>
            </tr>
            <tr>
              <td>培训主题</td>
              <td colSpan={3}>{trainingResultModel.title}</td>
            </tr>
            <tr>
              <td>参加人员</td>
              <td colSpan={3}>{trainingResultModel.people}</td>
            </tr>
            <tr className='comment'>
              <td>培训统计</td>
              <td colSpan={3}>
                <TextArea
                  className='textarea'
                  autosize={{ minRows: 6 }}
                  maxLength={1000}
                  value={trainingResultModel.statistics}
                  onChange={e => {
                    trainingResultModel.statistics = e.target.value
                    updateData(trainingResultModel)
                  }}
                />
              </td>
            </tr>
            <tr className='comment'>
              <td>培训效果评价</td>
              <td colSpan={3} style={{ textAlign: 'left' }}>
                <Radio.Group 
                  onChange={(e) => {
                    trainingResultModel.comments = e.target.value;
                    updateData(trainingResultModel)
                  }} 
                  value={trainingResultModel.comments}
                >
                  { 
                    ['满意,达到预期目标', '一般，基本达到目标，部分环节有待改进', '不满意，没有达到目标，需要重新培训']
                    .map((item, index) => (
                      <Radio style={radioStyle} value={item}>
                        { item }
                      </Radio>
                    )) 
                  }
                </Radio.Group>
              </td>
            </tr>
            <tr className='comment'>
              <td>培训内容及效果总结</td>
              <td colSpan={3}>
                <TextArea
                  className='textarea'
                  autosize={{ minRows: 10 }}
                  maxLength={1000}
                  value={trainingResultModel.summary}
                  onChange={e => {
                    trainingResultModel.summary = e.target.value
                    updateData(trainingResultModel)
                  }}
                />
              </td>
            </tr>
            <tr className='additional'>
              <td>培训照片</td>
              <td colSpan={3}>
                {
                  isPrint ?
                  <div className='img-box'>
                    {trainingResultModel.trainingPhotos.split(',').map(v => (
                      <img 
                        className={
                          'img--print' + (!trainingResultModel.trainingPhotos.includes(',') 
                            ? ' img-large--print' 
                            : '')
                        } 
                        key={v} 
                        alt={v} 
                        src={v} 
                      />
                    ))}
                  </div>
                  :
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
                      trainingResultModel.trainingPhotos = imgs.join(',')
                      updateData(trainingResultModel)
                    }}
                  />
                }
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
  .table-title {
    text-align: center;
    font-weight: bold;
  }
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
  .img-box {
    display: flex;
    flex-wrap: wrap;
  }
  .img--print {
    margin: 10px;
    width: 350px;
    height: 350px;
    object-fit: scale-down;
    &.img-large--print {
      width: 500px;
      height: 500px;
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