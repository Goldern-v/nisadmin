import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import resTest from "../../../../mobilePage/patientFollowUp/res"
import { foolowUp } from "./api/index"
import RadioItem from "../../input/RadioItem"
import CheckboxItem from "../../input/CheckboxItem"
import InputItem from "../../input/InputItem"
import CheckText from "../../input/CheckText"

export default function AllTemplate(props: any) {
  // 渲染的问卷题目数据
  const [res, setRes] = useState({} as any)
  // 表单名称
  const [formTitle, setFormTitle] = useState('')
  // 最终提交时的字段数组
  const [editable, setEditable] = useState({} as any)
  // 目录字段切割
  const nameSplit = (name: String) => {
    while (name.includes("-")) {
      name = name.split("-")[1]
    }
    return name
  }
  // 联动功能(暂未开发)
  const isShow = () => {
    return "none"
  }
  // 问卷页数
  const [pageNum, setPageNum] = useState<any>([])
  // 目录条数
  const [length, setLength] = useState(-1)
  // 递归提取出最终提交时的字段
  const getParams = (arr: any) => {
    arr.map((item: any) => {
      if (item.documentName) {
        item.documentName = nameSplit(item.documentName)
        item.flexWidth = item.documentName.length + 1
      }
      if (
        item.name &&
        item.type != "checkbox" &&
        item.type != "checkbox_text"
      ) {
        editable[item.name] = "";
      } else if (item.type == "checkbox" || item.type == "checkbox_text") {
        editable[item.name] = [];
      }
      //  else if (item.type == "date(yyyy-mm-dd)") {
      // }
      setEditable({ ...editable });
      if (item.documentItemLists && item.documentItemLists.length != 0) {
        getParams(item.documentItemLists);
      }
    });
  };

  const itemCheckFn = (e: any, itemAnswer: any) => { // 复选框的事件
    let i = editable[itemAnswer.name].indexOf(
      e.currentTarget.value
    );
    if (i != -1) {
      editable[itemAnswer.name].splice(i, 1);
    } else {
      editable[itemAnswer.name].push(
        e.currentTarget.value
      );
    }
    setEditable({ ...editable });
  }

  const itemRadioFn = (e: any, itemAnswer: any) => { // 单选框的事件
    editable[itemAnswer.name] = e.currentTarget.value;
    setEditable({ ...editable });
    console.log(editable);
  }

  const itemInputFn = (e: any, name: any) => { // 输入框的事件
    editable[name] = e.currentTarget.value;
    setEditable({ ...editable });
    console.log(editable);
  }
  // 每一个大区域的ref数组
  const refDom: Array<any> = []

  useEffect(() => {
    // setRes(resTest.data.documentItemDtos)
    console.log(props);
    foolowUp.getFollowUpContont({ formCode: props.formCode }).then(res => {
      let respone = res.data.documentItemDtos
      let titleObj = {}
      setFormTitle(res.data.documentName)
      getParams(respone)
      console.log(editable);

      respone.map((item: any) => {

        // item.documentName = nameSplit(item.documentName)

        titleObj[item.module] = titleObj[item.module] || []
        titleObj[item.module].push(item)
      })
      console.log(titleObj);
      setRes(titleObj)
    })

  }, [])

  // 问卷分页
  useEffect(() => {
    if (length == refDom.length) return
    setLength(refDom.length)
    let height = 1000;
    refDom.map((item: any, index: any) => {
      if (item.offsetTop + item.offsetHeight > height) {
        let marginTop = height - refDom[index - 1].offsetTop - refDom[index - 1].offsetHeight - 8
        console.log(refDom[index - 1].offsetTop);
        console.log(item.offsetTop);
        console.log(refDom[index - 1].offsetHeight);
        console.log(item.offsetHeight);

        console.log(marginTop);
        item.style.marginTop = marginTop + 80 + 'px'
        height += 1000
      }
      if (index == refDom.length - 1) {
        let length = Math.floor(item.offsetTop / 1000)
        let arr = []
        for (let i = 0; i < length; i++) {
          arr.push(1)
        }
        setPageNum(arr)
      }
    })
  }, [refDom])
  return <PageGroup>
    <div className="page-item">
      <div className="form-title">
        <div>{formTitle}</div>
        <div>（随访部分）</div>
      </div>
      <div
        className="align-center"
        style={{
          margin: '20px 0px'
        }}>
        （适用于国家脑卒中防治基地医院开展住院人群出院1、6、12个月随访和健康管理）
      </div>
      {Object.keys(res).map((item: any, index: any) => {
        return (
          <div ref={(node) => refDom[index] = node}>
            {/* 题目目录 */}
            <div className="sub-title" key={item}>{item}</div>
            {/* 题目目录级别区域 */}
            <div className="form-area">
              {res[item].map((itemRow: any) => {
                return (
                  // 每道题的区域
                  <div className="data-row" key={itemRow.id}>
                    {/* 每道题左侧题干 */}
                    <span className="row-title" style={{ width: `${itemRow.flexWidth * 14}px` }}>{itemRow.documentName}：</span>
                    {/* 每道题右侧答案/选项 */}
                    <div className="answer-group">
                      {
                        itemRow.documentItemLists.map((itemAnswer: any) => {
                          return (itemAnswer.type == 'radio' && // 判断类型,返回对应的表单控件
                            <RadioItem
                              name={itemAnswer.name} // 单选功能
                              value={itemAnswer.value} // 展示的值
                              saveValue={itemAnswer.saveValue} // 展示的值
                              checked={editable[itemAnswer.name] == itemAnswer.saveValue} // 决定选框是否选中
                              event={(e: any) => itemRadioFn(e, itemAnswer)}
                            />)
                            ||
                            (itemAnswer.type == 'checkbox' && (
                              <CheckboxItem
                                name={itemAnswer.name}
                                saveValue={itemAnswer.saveValue} // 真正保存的值
                                value={itemAnswer.value}  // 选项展示的值
                                checked={editable[itemAnswer.name].includes( // 决定选框是否选中
                                  itemAnswer.saveValue
                                )}
                                event={(e: any) => itemCheckFn(e, itemAnswer)}
                              />
                            ))
                            ||
                            (
                              (itemAnswer.type == 'date(yyyy-mm-dd)' || itemAnswer.type == 'text') && (
                                <InputItem
                                  type={itemAnswer.type}
                                  name={itemAnswer.name}
                                  value={editable[itemAnswer.name]}
                                  saveValue={itemAnswer.saveValue}
                                  prefixDescription={itemAnswer.prefixDescription}
                                  event={(e: any) => itemInputFn(e, itemAnswer.name)}
                                />
                              )
                            )
                            ||
                            (
                              itemAnswer.type == 'checkbox_text' && (
                                <CheckText
                                  name={itemAnswer.name}
                                  saveValue={itemAnswer.saveValue} // 真正保存的值
                                  value={itemAnswer.value}  // 选项展示的值
                                  checked={editable[itemAnswer.name].includes( // 决定选框是否选中
                                    itemAnswer.saveValue
                                  )}
                                  checkEvent={(e: any) => itemCheckFn(e, itemAnswer)}
                                  InpValue={editable[itemAnswer.documentItemLists[0].name]}
                                  prefixDescription={itemAnswer.documentItemLists[0].prefixDescription}
                                  InpEvent={(e: any) => itemInputFn(e, itemAnswer.documentItemLists[0].name)}
                                />
                              )
                            )
                        })
                      }
                    </div>
                    <div style={{ display: isShow() }}></div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
    {
      pageNum.map((num: any) => {
        return (
          <div className="page-item">
          </div>
        )
      })
    }
  </PageGroup>
}
const PageGroup = styled.div`
  .page-item{
    padding: 30px 40px!important;
    margin-bottom:20px;
    position:relative;
  }
  .sub-title{
    position:relative;
    z-index:999;
    font-size:18px;
    font-weight: bold;
    line-height: 24px;
  }
  .row-title{
    font-weight: bold;
  }
  .form-area{
    position:relative;
    z-index:999;
    border: 1px solid #000 !important;
    padding: 5px;
    margin-bottom: 8px;
    &.no-padding{
      padding: 0;
    }
  }
  .data-row{
    margin-bottom: 2px;
    display:flex;
    min-height:17px;
    .answer-group{
      display:flex;
      flex:1;
      flex-wrap:wrap;
      .itemAnswer{
        margin-bottom:10px;
        input{
          margin-right: 5px;
          border-bottom: 1px solid #000;
        }
        margin-right:5px;
      }
      input{
        vertical-align: middle;
      }
    }
    &>*{
      vertical-align: middle;
    }
    &.with-padding{
      padding: 3px 5px;
      margin: 0;
    }
    &.border-bottom{
      border-bottom: 1px solid #000;
    }
  }
`