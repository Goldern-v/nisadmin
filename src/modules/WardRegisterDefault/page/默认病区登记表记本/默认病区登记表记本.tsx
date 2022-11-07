import styled from "styled-components";
import React, { useState, useEffect, useMemo, useLayoutEffect, Fragment, useRef } from "react";
import { Button, Modal } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import {
  ColumnProps,
  // PaginationConfig,
  // AutoComplete,
  message,
  Input,
  Select,
  DatePicker,
  Popover,
  InputNumber
} from "src/vendors/antd";
import { authStore, appStore } from "src/stores";
import { observer } from "mobx-react-lite";
import { PageHeader, Place } from "src/components/common";
import DeptSelect from "src/components/DeptSelect";
import createModal from "src/libs/createModal";
import SettingModal from "./modal/SettingModal";
import moment from "moment";
import { throttle } from "src/utils/throttle/throttle";
import { codeAdapter } from "../../utils/codeAdapter";
import { signRowObj } from "../../utils/signRowObj";
import { NullBox } from "../../components/NullBox";
import { TableCon, Wrapper } from "../../utils/style/style";
import { getFun, ItemConfigItem } from "../../utils/fun/fun";
import { numberFormat } from "src/utils/number/numberFormat";
import { createFilterItem } from "../../components/Render.v1/FilterItem";
import classNames from "classnames";
import { createFilterInput } from "../../components/Render.v1/FilterInput";
// import TextArea from "antd/lib/input/TextArea";
// import { wardRegisterDefaultService } from "../../services/WardRegisterDefaultService";
// import { globalModal } from "src/global/globalModal";
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import { getCurrentMonth } from 'src/utils/date/currentMonth'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import reactZmage from 'react-zmage'
import FileUploadColumnRender from '../../components/Render.v1/FileUploadColumnRender'
import DatePickerColumnRender from '../../components/Render.v1/DatePickerColumnRender'
import InputColumnRender from '../../components/Render.v1/InputColumnRender'
import InputRender from '../../components/Render.v1/InputRender'

import PatientDialog from "src/modules/indicator/selfDeclaration/components/patientDialog";
import SignColumnRender from "../../components/Render.v1/SignColumnRender";
import SettingShiftModal from "./modal/SettingShiftModal";
import SettingGeneralModal from "./modal/SettingGeneralModal";
export interface Props {
  payload: any;
}

const throttler = throttle(500);
const throttler2 = throttle();

export default observer(function 敏感指标登记本(props: Props) {
  const [patientVisible, setPatientVisible] = useState(false)
  const handlePatientSelect = (item: any) => {
    setPatientVisible(false)
    setDataSource([...dataSource, {
      blockId: selectedBlockId,
      description: "",
      editType: "new",
      modified: true,
      range: "",
      rangeIndexNo: 0,
      recordDate: item.admissionDate.format('YYYY-MM-DD'),
      key: 'key0',
      '床号': item.bedLabel,
      '患者姓名': item.patientName,
      registerCode: "QCRG_GSY_07"
    }])
  }
  const registerCode = props.payload && props.payload.registerCode;
  const registerName = props.payload && props.payload.registerName;
  const [dataSource, setDataSource]: any = useState([]);
  const [itemConfigList, setItemConfigList] = useState([]);
  const [rangeConfigList, setRangeConfigList] = useState([]);
  const [selectedRange, setSelectedRange] = useState("")
  const [config, setConfig] = useState({} as any)
  const [pageLoading, setPageLoading] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const [selectedBlockId, setSelectedBlockId]: any = useState(null);
  const [date, setDate]: any = useState('');
  const [popoverVisible, setPopoverVisible]: any = useState(false);
  const [surplusHeight, setSurplusHeight]: any = useState(220);
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  });
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])

  /** 选中的blockObj */
  const selectedBlockObj = blockList.find(
    (item: any) => item.id == selectedBlockId
  );

  const settingModal = createModal(SettingModal);
  const previewModal = createModal(PreviewModal)
  const settingShiftModal = createModal(SettingShiftModal)
  const settingGeneralModal = createModal(SettingGeneralModal)
  const updateDataSource = (isAll?: boolean) => {
    if (isAll) {
      setDataSource([]);
      setDataSource([...dataSource]);
    } else {
      throttler2(() => {
        setDataSource([...dataSource]);
      });
    }
  };

  // 贵州-科室加全部选项 location.href.includes('QCRG_GSY_09')
  let isAllDepartments = location.href.includes('QCRG_GSY_09') || location.href.includes('QCRG_GSY_10') || location.href.includes('QCRG_GSY_11')
 
  // const flFilterItem = createFilterItem(
  //   "分类",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const bcFilterItem = createFilterItem(
  //   "班次",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const wzcdFilterItem = createFilterItem(
  //   "危重程度",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const hljbFilterItem = createFilterItem(
  //   "护理级别",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );

  // const zlnlFilterItem = createFilterItem(
  //   "自理能力",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const yzlxFilterItem = createFilterItem(
  //   "医嘱类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const zgFilterItem = createFilterItem(
  //   "转归",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const ypglflFilterItem = createFilterItem(
  //   "药品管理分类",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const ymFilterItem = createFilterItem(
  //   "药名",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false)
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const wpmcFilterItem = createFilterItem(
  //   "物品名称",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const bfzlxFilterItem = createFilterItem(
  //   "并发症类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const jmlxFilterItem = createFilterItem(
  //   "静脉类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const zhpjlxFilterItem = createFilterItem(
  //   "综合评价类型",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const rylxFilterItem = createFilterItem(
  //   "人员类别",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const yqmcFilterItem = createFilterItem(
  //   "仪器名称",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const sbztFilterItem = createFilterItem(
  //   "设备状态",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // );
  // const chFilterItem = createFilterInput(
  //   "床号",
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   });

  // const xmFilterItem = createFilterInput(
  //   "姓名",
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   });
  // const zyzdFilterItem = createFilterItem(
  //   "中医诊断",
  //   itemConfigList,
  //   rangeConfigList,
  //   () => {
  //     setPopoverVisible(false);
  //     setPageOptions({ ...pageOptions, pageIndex: 1 })
  //   }
  // )

  // const popoverContent = codeAdapter(
  //   {
  //     QCRG_03: (
  //       <div>
  //         <wzcdFilterItem.Component />
  //         <hljbFilterItem.Component />
  //         <zlnlFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_04: (
  //       <div>
  //         <bcFilterItem.Component />
  //         <yzlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_05: null,
  //     QCRG_08: (
  //       <div>
  //         <zgFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_10: (
  //       <div>
  //         <ypglflFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_13: (
  //       <div>
  //         <ymFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_14_1: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_14_2: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_16_1: (
  //       <div>
  //         <bfzlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_16_2: (
  //       <div>
  //         <jmlxFilterItem.Component />
  //         <bfzlxFilterItem.Component />
  //       </div>
  //     ),
  //     // QCRG_19_1: (
  //     //   <div>
  //     //     <jmlxFilterItem.Component />
  //     //   </div>
  //     // ),
  //     QCRG_19_2: (
  //       <div>
  //         <rylxFilterItem.Component />
  //         {/* <jmlxFilterItem.Component /> */}
  //       </div>
  //     ),
  //     QCRG_19_3: (
  //       <div>
  //         <jmlxFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_20_2: (
  //       <div>
  //         <yqmcFilterItem.Component />
  //         <sbztFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_15_1: (
  //       <div>
  //         <chFilterItem.Component />
  //         <xmFilterItem.Component />
  //         <zyzdFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_12_2: (
  //       <div>
  //         <flFilterItem.Component />
  //       </div>
  //     ),
  //     QCRG_21: (
  //       <div>
  //         <wpmcFilterItem.Component />
  //       </div>
  //     ),
  //   },
  //   registerCode
  // );

  /** 查询参数 */
  const paramMap = {
    // ...wzcdFilterItem.value,
    // ...hljbFilterItem.value,
    // ...zlnlFilterItem.value,
    // ...bcFilterItem.value,
    // ...hljbFilterItem.value,
    // ...yzlxFilterItem.value,
    // ...zgFilterItem.value,
    // ...ypglflFilterItem.value,
    // ...ymFilterItem.value,
    // ...wpmcFilterItem.value,
    // ...bfzlxFilterItem.value,
    // ...jmlxFilterItem.value,
    // ...zhpjlxFilterItem.value,
    // ...rylxFilterItem.value,
    // ...yqmcFilterItem.value,
    // ...sbztFilterItem.value,
    // ...flFilterItem.value,
    // ...chFilterItem.value,
    // ...xmFilterItem.value,
    // ...zyzdFilterItem.value,
    '班次': selectedRange,
  };

  /** 判断是否快过期 */
  const isEndTime = (record: any) => {
    let current = ''
    let endTime = ''
    let itemCode = '有效期'

    if (
      registerCode == "QCRG_14_1"
      || registerCode == 'QCRG_21'
    ) {
      itemCode = '失效日期'
    }

    endTime = record[itemCode] || ''
    current = moment().format('YYYY-MM-DD')

    var currentDate = moment(current);
    var endTimeDate = moment(endTime);
    if (
      currentDate.isValid() &&
      endTimeDate.isValid() &&
      current && endTime
    ) {
      let m = endTimeDate.diff(currentDate, "d");
      if (m <= 90) return "color-red";
      // if (m < 3) return "color-orange";
    }
    return "";
  };

  // const isEndTimeQCRG_12_2 = (record: any, item: any) => {
  //   const { itemCode, itemType } = item

  //   if (itemType == 'date' && record[itemCode]) {
  //     var currentDate = moment()
  //     var endDate = moment(record[itemCode])
  //     if (
  //       currentDate.isValid() &&
  //       endDate.isValid()
  //     ) {
  //       let m = endDate.diff(currentDate, "d");
  //       if (m <= 90) return "color-red";
  //     }
  //   }

  //   return ''
  // }

  //是否显示护理单元
  const isShowWardCode = ():boolean =>{
    // && ["gzsrm"].includes(appStore.HOSPITAL_ID)
    // console.log(authStore.deptList)
    // console.log(authStore.selectedDeptCode)
    if (registerName==="新生儿科空气消毒登记本") return  true;
    return false;
  }

//   计算器
  const getTrueVal = (item:any,record:any)=>{
	console.log(record[item.timeEndCode].length)
	let deval = null
	let incremental = false //记录是否要递增
	if(item.calculationType == 'hour'){
		deval = moment(record[item.timeEndCode],"hh:mm").diff(moment(record[item.timeBeginCode],"hh:mm"),'hours',true)
	}else if(item.calculationType == 'dayTime'){
		// 日期时间，天数+1，保留小数
		incremental = true
		deval = moment(record[item.timeEndCode]).diff(moment(record[item.timeBeginCode]),'days',true)
	}else{
		incremental = true
		// 是否保留小数，天数+1
		deval = moment(record[item.timeEndCode]).diff(moment(record[item.timeBeginCode]),'days')
	}				
	if(isNaN(deval)){
		return ''
	}else{
		// 如果是天数，就要+1
		if(incremental){
			return numberFormat(deval+1,1)
		}
		return numberFormat(deval,1)
	}
  }
//   叠加器
  const getTrueIderate = (item:any,record:any,index:number)=>{
	// console.log('计算叠加器啦')
	if(index == dataSource.length-1){
		// 改的是组后一条数据
		return isNaN(Number(record[item.cumulativeTarget]))?'':record[item.cumulativeTarget] || ''
	}else{
		if(isNaN(Number(record[item.cumulativeTarget]))){
			// 当输入非数字
			return dataSource[index+1][item.itemCode] || ''
		}
		if(isNaN(Number(dataSource[index+1][item.itemCode]))){
			// 下一条数据是空的
			return record[item.cumulativeTarget] || ''
		}
		return numberFormat(Number(dataSource[index+1][item.itemCode])+Number(record[item.cumulativeTarget]),1)
	}
  }

  /**继续计算 */
  const gotoContiun = (itemConfig:any,record:any,index:number)=>{
	if(itemConfig.linkList.length>0){
		// 计算使用时间
		// console.log('计算器')
		itemConfig.linkList.forEach((element:any) => {
			// if(element.itemType == 'timeCalculation'){
				// 自动计算
				record[element.itemCode] = String(getTrueVal(element,record))
				// 这个计算器实体可能有叠加器和计算器,就是会联动第三级计算
				if(element.linkList.length>0 || element.iderateList.length>0){
					gotoContiun(element,record,index)
				}
			// }
		});
	}
	if(itemConfig.iderateList.length>0){
		// 计算使用时间
		// console.log('叠加器')
		itemConfig.iderateList.forEach((element:any) => {
				// 自动计算
				record[element.itemCode] = String(getTrueIderate(element,record,index)) || ''
				if(element.linkList.length>0 || element.iderateList.length>0){
					gotoContiun(element,record,index)
				}
		});
	}

  }

/**
 * 
 * @param calculationType dayTime、day单位都是天，hour单位是小时
 */
  const getDayOrHours = (calculationType:string)=>{
	if(['qhwy'].includes(appStore.HOSPITAL_ID)){
		if(['dayTime','day'].includes(calculationType)) return '(天)'
		if(['hour'].includes(calculationType)) return '(时)'
		return ''
	}
	return ''
	
  }
  //registerName
  const isWhyx = ['whyx','lyyz','qhwy','whhk'].includes(appStore.HOSPITAL_ID)

  const columns: ColumnProps<any>[] | any = [
    ...appStore.hisMatch({
      map: { 
        gzsrm:[
          isShowWardCode() && {
            title: "护理单元",
            dataIndex: "wardCode",
            align: "center",
            className: "input-cell",
            width: 100,
            render(text: string, record: any, index: number) {
              return <>{(authStore.deptList?.find(item=> item?.code==authStore.selectedDeptCode))?.name}</>
              //return <>{(authStore.deptList?.find(item=> item?.code==authStore.defaultDeptCode))?.name}</>
            }
          },
        ],
        other: []
      }
    }),
    ...!config.hiddenDate ? [{
      title: "日期",
      dataIndex: "recordDate",
      align: "center",
      className: "input-cell",
      width: 100,
      render(text: string, record: any, index: number) {
        return (
          <Input
            disabled={cellDisabled(record)}
            defaultValue={text}
            onKeyUp={handleNextIptFocus}
            onChange={e => {
              record.modified = true
              record.recordDate = e.target.value
            }}
            onBlur={() => updateDataSource()}
            className={isEndTime(record) || ""}
          />
        );
      }
    }] : [],
    ...config.showRange ? [
      {
        title: "班次",
        width: 73,
        dataIndex: "range",
        className: "input-cell",
        align: "center",
        render(text: string, record: any, index: number) {
          let children = <InputColumnRender
            {...{
              cellDisabled,
              options: rangeConfigList.map((item: any) => item.itemCode),
              record,
              itemCode: 'range',
              updateDataSource,
              handleNextIptFocus
            }}
          />
          let obj = {
            children
          };
          return obj;
        }
      }
    ] : [],
    //后端返回的自定义项目
    ...itemConfigList.map((item: any, index: number) => {
      if (item.itemType.indexOf('autograph') == 0 && isWhyx) {
        return {
          title: item.itemCode,
          width: (15 * item.width || 50) + 8,
          align: "center",
          render: (text: string, record: any) => {
            return <SignColumnRender {
              ...{
                cellDisabled,
                record,
                index,
                itemCfg: item,
                updateDataSource,
                registerCode,
                selectedBlockId,
                getPage,
              }
            }/>
          }
        }
      }
      return {
        title: item.children ? (
          <PTitleTh>
            <MergeTitle>
              <pre>{item.pTitle || item.itemCode}</pre>
            </MergeTitle>
            <PTitleCon>
              {item.children.map(
                (cItem: ItemConfigItem, index: number, arr: any) => (
                  <CTitleBox
                    key={index}
                    style={{
                      ...{ flex: (15 * cItem.width || 50) + 8, width: 0 },
                      ...(index == arr.length - 1 ? { border: 0 } : {})
                    }}
                  >
                    {cItem.checkSize ? (
                      <ThBox>
                        <div className="title">
                          <span className="title-text">
                            <pre>
                              {cItem.label || cItem.itemCode}
                            </pre>
                          </span>
                        </div>
                        <div className="aside">{cItem.checkSize}</div>
                      </ThBox>
                    ) : (
                      <span className="title-text">
                        <pre>
                          {cItem.label || cItem.itemCode}
                        </pre>
                      </span>
                    )}
                  </CTitleBox>
                )
              )}
            </PTitleCon>
          </PTitleTh>
        ) : item.checkSize ? (
          () => (
            <ThBox>
              <div className="title"><span className="title-text">
                <pre>
                  {item.itemCode}
                </pre>
              </span>
              </div>
              <div className="aside">{item.checkSize}</div>
            </ThBox>
          )
        ) : (
          <pre>
            {item.label || item.itemCode+getDayOrHours(item.calculationType)}
          </pre>
        ),
        align: "center",
        className: "input-cell",
        colSpan: item.colSpan,
        width: (15 * item.width || 50) + 8,
        dataIndex: item.itemCode,
        render(text: string, record: any, index: number) {
          let children: JSX.Element
          let childrenClassName = classNames({
            "warning-value": text == "未完成",
            "checkSize-warning":
              item.checkSize && (text != item.checkSize && text != "√")
          })

          childrenClassName +=
            ` ${codeAdapter({
              other: isEndTime(record)
            }, registerCode)}`

          if (item.itemType == 'date' || item.itemType == 'date_time' || item.itemType == 'time') {
            let format = 'YYYY-MM-DD'
            if (item.itemType == 'date_time') format = 'YYYY-MM-DD HH:mm'
            if (item.itemType == 'time') format = 'HH:mm';
            children = <DatePickerColumnRender
              {...{
                className: childrenClassName,
                cellDisabled,
                record,
                itemCfg: item,
                index,
                showTime: item.itemType == 'date_time' || item.itemType == 'time',
                format,
                handleNextIptFocus,
                updateDataSource,
                registerCode,
                onChangeDate: (newVal: string) => {	
			if(['qhwy'].includes(appStore.HOSPITAL_ID)){
				// 时间改变 时间关联的有计算器和叠加器
				gotoContiun(item,record,index)
			}		
                  watchRecord(item.itemCode, record)	  
                },
              }}
            />
          }
          else if (item.itemType == "attachment") {
            //处理上传附件类型
            children = <FileUploadColumnRender
              {...{
                className: childrenClassName,
                record,
                itemCfg: item,
                index,
                cellDisabled,
                handleUpload,
                handlePreview,
                updateDataSource
              }} />

          } else if(item.itemType == "timeCalculation"){
			
			// 自动计算项
			children = <InputRender
			{...{
			  cellDisabled,
			  options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
			  record,
			  className: childrenClassName,
			  itemCode: item.itemCode,
			  updateDataSource,
			  handleNextIptFocus,
			  onBlur: (newVal: string, oldVal: any) => {
				// 失去焦点,判断是否有影响项
				gotoContiun(item,record,index)
			  },
			}}
		  />
		  }else if(item.itemType == "cumulative" || item.itemType == ""){
			// 累计时间
			// 不初始化数据
			children = <InputRender
			{...{
			  cellDisabled,
			  options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
			  record,
			  className: childrenClassName,
			  itemCode: item.itemCode,
			  updateDataSource,
			  handleNextIptFocus,
			  onBlur: (newVal: string, oldVal: any) => {
				if(['qhwy'].includes(appStore.HOSPITAL_ID)){
					if(item.itemType == ""){
						// 时间改变 时间关联的有计算器和叠加器
						gotoContiun(item,record,index)
					}
				}
				
				
			  },
			}}
		  />
		  }else {
            const multiple = (() => {
              if (item.itemType == "multiple_select")
                return true

              return false
            })()

            children = <InputColumnRender
              {...{
                cellDisabled,
                options: item.options ? item.options.split(";").map((itemCfg: any) => itemCfg || " ") : undefined,
                record,
                className: childrenClassName,
                itemCode: item.itemCode,
                updateDataSource,
                handleNextIptFocus,
                multiple,
                onBlur: (newVal: string, oldVal: any) => {},
                selectAll: multiple,
              }}
            />
          }

          let obj = { children }

          return obj
        }
      };
    }),
    ...config.showDesc ? [
      {
        title: "备注",
        width: 150,
        dataIndex: "description",
        className: "input-cell",
        render(text: string, record: any, index: number) {
          return <InputColumnRender
            {...{
              cellDisabled,
              itemCode: 'description',
              handleNextIptFocus,
              record,
              updateDataSource,
            }} />
        }
      },
    ] : [],
    ...appStore.hisMatch({
      map: {
        'whyx,lyyz,qhwy,whhk': [],
        other: (config.signList || []).map((signItem: any) =>
          signRowObj({
            title: signItem.title,
            width: 15 * signItem.width || 50,
            dataIndex: signItem.fieldName,
            aside: signItem.title,
            registerCode,
            updateDataSource,
            selectedBlockId
          })),
      },
      vague: true
    }),
    ...(isWhyx && !authStore.isAdmin ? [] : [{
      title: "操作",
      width: 50,
      className: "",
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            {cellDisabled(record) ? (
              <aside style={{ color: "#aaa" }}>删除</aside>
            ) : (
              <span
                onClick={() => handleDeleteRow(record, index)}>
                删除
              </span>
            )}
          </DoCon>
        );
      }
    }])
  ];
  let handlePer = (arr: string[], data: any) => {
    let hours: any = ''
    if (data[arr[0]] && data[arr[1]]) {
      let startDate = moment(moment(data[arr[0]]).format('YYYY-MM-DD HH:MM'))
      let endDate = moment(moment(data[arr[1]]).format('YYYY-MM-DD HH:MM'))
      const m = startDate && endDate ? endDate.diff(startDate, "m") : 0;
      hours = Math.floor(m / 30) * 0.5 + '小时';
      console.log(startDate,endDate);
      
    }
    data[arr[2]] = String(hours)
  }
  const watchRecordSeries = {
    '起始时间': ['起始时间', '终止时间', '消毒时长'],
    '终止时间': ['起始时间', '终止时间', '消毒时长'],
    '消毒时长': ['起始时间', '终止时间', '消毒时长'],
  }
  const watchRecord = (value: any, data: any) => {
    let key = value
    if (!key || !watchRecordSeries[key]) return
    handlePer(watchRecordSeries[key], data)
  }

  const handlePreview = (file: any) => {
    if (getFileType(file.name) == 'img') {
      reactZmage.browsing({ src: file.path, backdrop: 'rgba(0,0,0, .8)' })
    } else {
      previewModal.show({
        title: file.name,
        path: file.path
      })
    }
  }

  const addPatient = () => {
  }
  const handleSelectedChange = (payload: any[]) => {
    setSelectedRowKeys(payload)
    // console.log(payload)
  }
  /**自定义签名按钮配置 */ 
  const [customSign, setCustomSign] = useState<any[]>([])
  // 自定义批量按钮
  const [customBatch,setCustomBatch] = useState<any[]>([])
  useEffect(() => {
    setCustomSign(itemConfigList.filter((v: any) => v.itemType.indexOf('autograph') == 0))
    setCustomBatch(itemConfigList.filter((v: any) => v.itemCode == '班次'))
  }, [itemConfigList])

  const setShift = () => {
    let options: any = itemConfigList.find((item: any) => item.itemCode == "班次") || {}
    let optionList = (options.options as any).split(";").map((itemCfg: any) => itemCfg || " ")
    settingShiftModal.show({
      data:optionList,
      onOkCallBack: (value) => {
        handleBatchSet(value)
      }
    })
  }

  const setGeneral = (data:any) => {
    let options: any = itemConfigList.find((item: any) => item.itemCode == "班次") || {}
    let optionList = (options.options as any)?.split(";").map((itemCfg: any) => itemCfg || " ")
    settingGeneralModal.show({
      data: {
        optionList,
        signName:data.itemCode
      },
      onOkCallBack: (value) => {
        handleGeneralSet(value)
      }
    })
  }

  /**批量按钮 */
  const SelectedBtnCon = observer(function(props: Record<string, any>) {
    const { config, customSign, customBatch } = props;    
    const general =['whyx','whhk'].includes(appStore.HOSPITAL_ID) && !!customSign?.length // && customSign.find((item: any) => item.itemCode == '护士签名')// && customBatch.length != 0
    return (<Fragment>
      {
        appStore.hisMatch({
          map: {
            'whyx,lyyz,qhwy,whhk': (
              <Fragment>
                {customSign && customSign.map((item: any) => (
                  <Button
                    key={item.itemCode}
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() => {handleBatchSign(item.itemCode)}}>
                      {item.itemCode}签名
                  </Button>
                ))}
                {/* {customBatch && customBatch.map((item: any) => (
                  <Button
                    key={item.itemCode}
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() => {setShift()}}>
                      批量修改班次
                  </Button>
                ))} */}
                {
                  general && <Button
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() => {setGeneral(customSign[0])}}>
                      批量修改
                  </Button>
                }
              </Fragment>
            ),
            'other': (
              <Fragment>
                {(config.signList || []).map((signItem: any) => (
                  <Button
                    key={signItem.fieldName}
                    disabled={
                      pageLoading ||
                      selectedRowKeys.length <= 0
                    }
                    type="primary"
                    onClick={() =>
                      handleAuditAll(signItem.title, signItem.fieldName === 'auditorName' ? 'audit' : 'sign')}>
                    {signItem.title}签名
                  </Button>
                ))}
              </Fragment>
            )
          },
          vague: true
        })
      }
      
      {isWhyx && !general ? (
        <Button
          disabled={
            (pageLoading ||
            selectedRowKeys.length <= 0)
          }
          type="primary"
          onClick={() => handleCopyCreateRow()}>
          复制新增
        </Button>):""}
        <Button
          disabled={
            pageLoading ||
            selectedRowKeys.length <= 0
          } type="primary"
          onClick={() => deleteSelectedRows(isWhyx ? {beforeReqCB: (arr: any) =>{
            let index = arr.findIndex((v: any) => customSign.filter((v1: any) => v[v1.itemCode]).length > 0)
            if (index > -1) {
              Modal.warn({
                centered: true,
                title: '提示',
                content: `第${index + 1}条已签名,不能删除`})
              return false
            }
          }}: {})}>
          删除
      </Button>
    </Fragment>)
  })

  /** 公共函数 */
  const {
    onInitData,
    getPage,
    onAddBlock,
    onSave,
    onDelete,
    createRow,
    cellDisabled,
    exportExcel,
    handleNextIptFocus,
    handleUpload,
    handleDeleteRow,
    handleAuditAll,
    fixInputValue,
    handleCopyCreateRow,
    deleteSelectedRows,
    handleBatchSign,
    handleBatchSet,
    handleGeneralSet
  } = getFun({
    registerCode,
    registerName,
    config,
    setBlockList,
    setSelectedBlockId,
    setPageOptions,
    pageOptions,
    setTotal,
    setDataSource,
    setItemConfigList,
    setRangeConfigList,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    selectedRowKeys,
    setSelectedRowKeys,
    setConfig,
    paramMap,
    customSign,
    customBatch,
    itemConfigList
  });

  useEffect(() => {
    onInitData();
  }, [authStore.selectedDeptCode]);

  useEffect(() => {
    // console.log(dataSource);
  }, [dataSource]);

  useEffect(() => {
    // selectedBlockId && getPage();
    selectedBlockId && throttler(getPage);
  }, [pageOptions, date, selectedBlockId, selectedRange]);

  const pageHeaderRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    let tableHead: any = document.querySelector(".ant-table-thead");
    if (tableHead && pageHeaderRef?.current) {
      setSurplusHeight(tableHead.offsetHeight + 140 + pageHeaderRef.current?.offsetHeight);
    }
  });

  return (
    <Container>
      <NewPageHeader ref={pageHeaderRef}>
        {authStore.isAdmin && (
          <Button style={{ marginLeft: 0 }} onClick={onAddBlock}>
            修订
          </Button>
        )}
        <span className="label">记录</span>
        <Select
          value={selectedBlockId}
          onChange={(value: any) => {
            setSelectedBlockId(value)
            setPageOptions({ ...pageOptions, pageIndex: 1 })
          }}
        >
          {blockList.map((item: any) => (
            <Select.Option value={item.id} key={item.id}>
              {item.registerName +
                " " +
                moment(item.createTime).format("MM-DD")}
            </Select.Option>
          ))}
        </Select>
        <span className="label">日期</span>
        <DatePicker.RangePicker
          value={date}
          onChange={value => {
            setDate(value)
            setPageOptions({ ...pageOptions, pageIndex: 1 })
          }}
          allowClear={true}
          style={{ width: 220 }}
        />
        <span className="label">科室</span>
        <DeptSelect hasAllDept={ appStore.HOSPITAL_ID === 'gzsrm' ? isAllDepartments: false} onChange={() => { }} style={{ width: 150 }} />
        {/* {popoverContent && (
          <Popover
            placement="bottom"
            title={"筛选条件"}
            visible={popoverVisible}
            content={popoverContent}
            trigger="hover"
            onVisibleChange={visible => setPopoverVisible(visible)}
          >
            <Button>筛选</Button>
          </Popover>
        )} */}

        <Place />
        {rangeConfigList.length > 0 && <React.Fragment>
          <span className="label">班次</span>
          <Select
            style={{ width: 70, minWidth: 70 }}
            value={selectedRange}
            onChange={(value: any) => {
              setSelectedRange(value);
              setPageOptions({ ...pageOptions, pageIndex: 1 })
            }}
          >
            <Select.Option value="">全部</Select.Option>
            {rangeConfigList.map((item: any) => (
              <Select.Option value={item.itemCode} key={item.itemCode}>
                {item.itemCode}
              </Select.Option>
            ))}
          </Select>
        </React.Fragment>}
        {
          location.href.includes('QCRG_GSY_07') && (
            <Button onClick={() => setPatientVisible(true)}>添加患者</Button>
          )
        }
        {selectedBlockId && (
          <React.Fragment>
            <Button onClick={getPage}>查询</Button>
            <Button type="primary" onClick={createRow} disabled={pageLoading}>
              新建行
            </Button>
            <Button type="primary" onClick={onSave} disabled={pageLoading}>
              保存
            </Button>
            <Button onClick={exportExcel}>导出</Button>
            {authStore.isAdmin && (
              <Button
                onClick={() =>{
                  if (appStore.HOSPITAL_ID === 'gzsrm' && authStore.selectedDeptCode === '全院') {
                    message.warning('科室全院情况下不可以设置，请选择科室！')
                    return
                  };
                  settingModal.show({
                    blockId: selectedBlockId,
                    selectedBlockObj,
                    registerCode,
                    onOkCallBack: () => {
                      getPage();
                    }
                  })
                }}>
                设置
              </Button>
            )}
            {
              appStore.hisMatch({
                map: {
                  'whyx,lyyz,qhwy,whhk': authStore.isAdmin ? (
                    <Button onClick={onDelete}>版本删除</Button>
                  ) : '',
                  other: authStore.isNotANormalNurse ? (
                    <Button onClick={onDelete}>删除</Button>
                  ) : '',
                },
                vague: true
              })
            }
          </React.Fragment>
        )}
        {
          isWhyx &&
          <SelectedBtnCon {...{config,customSign,customBatch}}/>
        }
      </NewPageHeader>
      <TableCon
      className={[['whyx','whhk'].includes(appStore.HOSPITAL_ID) ? 'whyxTable':''].join(' ')}
      >
        {selectedBlockId ? (
          <React.Fragment>
            <BaseTable
              className="record-page-table"
              loading={pageLoading}
              dataSource={dataSource}
              rowSelection={{
                selectedRowKeys,
                onChange: handleSelectedChange,
              }}
              columns={columns.filter((item: any) => item)}
              surplusHeight={surplusHeight}
              surplusWidth={300}
              useOuterPagination
              pagination={{
                onChange: (pageIndex: number) => {
                  setPageOptions({ ...pageOptions, pageIndex })
                },
                onShowSizeChange: (pageIndex: number, pageSize: number) => {
                  setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })
                },
                pageSizeOptions: ['20', '30', '40', '50', '100'],
                current: pageOptions.pageIndex,
                pageSize: pageOptions.pageSize,
                total: total
              }}
              rowClassName={(record: any, idx: number) => {
                if (cellDisabled(record)) return 'disabled-row'

                return ''
              }}
            />
            {
              !isWhyx &&
              <div className="selected-operate-con">
                <SelectedBtnCon {...{config,customSign}}/>
              </div>
            }
            {
              appStore.hisMatch({
                map: {
                  'whyx,whhk':<div className="search-box">
                    <InputNumber onChange={(value) => {
                      setPageOptions({ ...pageOptions, pageSize:value || 20, pageIndex: 1 })
                    }} placeholder="请输入条数" />
                </div>
                },
                vague: true
              })
            }

          </React.Fragment>
        ) : (
          <NullBox
            onClick={onAddBlock}
            text={"创建登记本"}
            registerName={registerName}
          />
        )}
      </TableCon>
      <settingModal.Component />
      <previewModal.Component />
      <settingShiftModal.Component />
      <settingGeneralModal.Component />
      {/* 患者弹窗 */}
      <PatientDialog
        visible={patientVisible}
        onOk={handlePatientSelect}
        onCancel={() => setPatientVisible(false)}
      />
    </Container >
  );
});

// @ts-ignore
const Container = styled(Wrapper)`
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .ant-input[disabled]{
      color: #000!important;
        background: rgba(0,0,0,0.0)!important;
    }
  }
  
  .ant-input[disabled]{
    color: #000!important;
    background: rgba(0,0,0,0.03)!important;
  }

  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }

  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
  }
`;
const  NewPageHeader = styled(PageHeader)`
height: auto;
min-height: 50px;
flex-wrap: wrap;
justify-content: flex-end;
padding-top: 5px;
.ant-btn {
  margin-bottom: 5px;
}`;

const LineCon = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 100px;
  &.height-50{
    min-height: 50px;
  }
`;

const SvgCon = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  line {
    stroke: #e8e8e8;
    stroke-width: 1;
  }
`;
const TextCon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;
const Text = styled.div<{ x: string; y: string; deg: string }>`
  position: absolute;
  left: ${p => p.x};
  top: ${p => p.y};
  white-space: nowrap;
  transform: rotate(${p => p.deg}deg);
`;

const ThBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 4px;
    display: flex;
  }
  .aside {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-top: 1px solid #e8e8e8;
    font-weight: normal;
  }
`;

const PTitleTh = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const PTitleCon = styled.div`
  display: flex;
  align-items: stretch;
  flex: 1;
  .title-text {
    display: block;
    padding: 4px 0;
  }
`;
const CTitleBox = styled.div`
  flex: 1;
  border-right: 1px solid #e8e8e8;
  box-sizing: content-box;
  /* padding: 4px 0; */
`;

const MergeTitle = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid #e8e8e8;
`;

const DisableSpan = styled.div`
  width: 100%;
  height: 100%;
  background: #eee;
`
