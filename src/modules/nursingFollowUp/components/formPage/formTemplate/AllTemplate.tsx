import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import resTest from "../../../../mobilePage/patientFollowUp/res"
import { foolowUp } from "./api/index"
import RadioItem from "../../input/RadioItem"
import CheckboxItem from "../../input/CheckboxItem"
import InputItem from "../../input/InputItem"
import CheckText from "../../input/CheckText"
import { followUpDetailService } from '../../../views/followUpDetailView/services/FollowUpDetailService'

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
    // props.onItemDataMapChange && syncItemDataMap()
  }

  const itemRadioFn = (e: any, itemAnswer: any) => { // 单选框的事件
    editable[itemAnswer.name] = e.currentTarget.value;
    setEditable({ ...editable });
  }

  const itemInputFn = (e: any, name: any) => { // 输入框的事件
    editable[name] = e.currentTarget.value;
    setEditable({ ...editable });
  }

  // const syncItemDataMap = () => {
  //   let temp = {}
  //   Object.keys(editable).map((key: any) => {
  //     if (typeof editable[key] == 'string' && editable[key]) {
  //       temp[key] = editable[key]
  //     } else if (editable[key]) {
  //       temp[key] = editable[key].join(',')
  //     }
  //   })
  //   props.onItemDataMapChange({ ...temp })
  // }
  const [editableSoup, setEditableSoup] = useState({} as any)
  // 每一个大区域的ref数组
  const refDom: Array<any> = []

  useEffect(() => {
    let temp = {}
    Object.keys(editable).map((key: any) => {
      if (typeof editable[key] == 'string' && editable[key]) {
        temp[key] = editable[key]
      } else if (editable[key]) {
        temp[key] = editable[key].join(',')
      }
    })
    if (JSON.stringify(temp) !== JSON.stringify(editableSoup)) {
      setEditableSoup({ ...temp })
      props.onItemDataMapChange && props.onItemDataMapChange(temp)
    }
  }, [editable])
  useEffect(() => {
    Promise.all(
      [foolowUp.getFollowUpContont({ formCode: props.formCode }),
      followUpDetailService.getFormDetailById(props.masterId)
      ]).then(res => {
        let respone = res[0].data.documentItemDtos
        let titleObj = {}
        setFormTitle(res[0].data.documentName)
        getParams(respone)
        respone.map((item: any) => {
          titleObj[item.module] = titleObj[item.module] || []
          titleObj[item.module].push(item)
        })
        setRes(titleObj)
        let itemDataMap = res[1].data.itemDataMap
        Object.keys(itemDataMap).map((key: any, index: any) => {
          if (typeof editable[key] == 'string') {
            editable[key] = itemDataMap[key]
          } else {
            editable[key] = itemDataMap[key].split(',')
          }
        })
        setEditable({ ...editable })
      })
  }, [props.formCode, props.masterId])

  // 问卷分页
  useEffect(() => {
    if (length == refDom.length) return
    setLength(refDom.length)
    // 问卷总高度
    let height = 1000;
    // 遍历目录级别区域ref元素数组
    refDom.map((item: any, index: any) => {
      // 小题目级别,以下用htmlArr代替
      let htmlArr = item.children[1].children
      // 遍历每个目录的每个小题目
      for (let i = 0; i < htmlArr.length; i++) {
        // 判断当前目录区域 + 目录标题高度是否超出问卷高度
        if (item.offsetTop + 24 > height - 30) {
          let marginTop = height - item.offsetTop
          // 如果是,则给当前目录区域添加上外边距,使其达到分页的视觉效果
          item.style.marginTop = marginTop + 20 + 40 + 'px'
          // 换页/更改当前问卷页高度
          height += 1020
        }
        // 判断答题区域是否超出问卷高度
        else if (item.children[1].offsetTop > height - 30) {
          let marginTop = height - item.children[1].offsetTop
          item.children[1].style.marginTop = marginTop + 20 + 40 + 'px'
          height += 1020
          // 判断每一道题的区域是否超出问卷高度
        } else if (item.children[1].offsetTop + htmlArr[i].offsetTop + htmlArr[i].offsetHeight > height - 30) {
          let marginTop = height - (item.children[1].offsetTop + htmlArr[i].offsetTop)
          htmlArr[i].style.marginTop = marginTop + 20 + 40 + 'px'
          height += 1020
        }
      }
      // 计算问卷画到目录最后一个区域时共需多少页
      if (index == refDom.length - 1) {
        let length = (height - 1000) / 1020
        let arr = []
        for (let i = 0; i < length; i++) {
          arr.push(1)
        }
        setPageNum(arr)
      }
    })
  }, [refDom])
  // useEffect(() => {
  //   if (!props.itemDataMap) return
  //   let isChange = false
  //   foolowUp.getFollowUpContont({ formCode: props.formCode }).then(res => {
  //     getParams(res.data.documentItemDtos)
  //     Object.keys(props.itemDataMap).map((key: any, index: any) => {
  //       if (typeof editable[key] == 'string' && editable[key] != props.itemDataMap[key]) {
  //         editable[key] = props.itemDataMap[key]
  //         isChange = true
  //       } else if (editable[key] && props.itemDataMap[key] && editable[key] != props.itemDataMap[key].split(',')) {
  //         editable[key] = props.itemDataMap[key].split(',')
  //         isChange = true
  //       }
  //     })
  //     if (isChange) setEditable({ ...editable })
  //   })
  // }, [props.itemDataMap])

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
      <div className="white-part">
        <div className="white-top">
        </div>
        <div className="white-bottom">
        </div>
      </div>
    </div>
    {
      pageNum.map((pages: any, num: any) => {
        return (
          <div className="page-item">
            <div className="white-part" style={{ display: num != pageNum.length - 1 ? 'block' : 'none' }}>
              <div className="white-top">
              </div>
              <div className="white-bottom">
              </div>
            </div>
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
    .white-part{
      width: 100%;
      height: 70px;
      position: absolute;
      bottom: -50px;
      left: 0;
      background: #fff;
      z-index: 999;
      overflow: hidden;
      .white-top{
        position: relative;
        top: 0;
        width: 100%;
        height: 20px;
        box-shadow: 0 5px 10px 0 rgb(0 0 0 / 50%);
        margin-bottom:20px;
      }
      .white-bottom{
        position: relative;
        box-shadow: 1px 5px 15px 0 rgb(0 0 0 / 50%);
        height: 30px;
      }
    }
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