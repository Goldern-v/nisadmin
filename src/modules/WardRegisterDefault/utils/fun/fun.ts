import { wardRegisterDefaultService } from "../../services/WardRegisterDefaultService";
import { appStore, authStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { message, Modal } from "src/vendors/antd";
import moment from "moment";
import service from "src/services/api";
import { fileDownload } from "src/utils/file/file";
const { location } = appStore

export interface ItemConfigItem {
  blockId: number;
  checkSize: number | null;
  createTime?: string;
  creatorName?: string;
  creatorNo?: string;
  indexNo?: number;
  itemCode: string;
  options: string;
  updateTime?: string;
  updaterName?: string;
  updaterNo?: string;
  width: number;
  colSpan?: number;
  label?: string;
  modified?: boolean;
  pTitle?: string,
  children?: ItemConfigItem[];
  rangeConfigList?: any[],
  selectedRowKeys?: any[],
  setSelectedRowKeys?: Function,
  setMsgMap?: Function,
  setDataMap?: Function,
  dataMap?: any,
  customSign?: any[],
}

export function getFun(context: any) {
  const {
    registerCode,
    registerName,
    setBlockList,
    setSelectedBlockId,
    setPageOptions,
    pageOptions,
    deptCode,
    setTotal,
    setDataSource,
    setData2,
    setData3,
    setItemConfigList,
    setRangeConfigList,
    setPageLoading,
    date,
    selectedBlockId,
    dataSource,
    data2,
    data3,
    paramMap,
    rangeConfigList,
    selectedRowKeys,
    setSelectedRowKeys,
    setMsgMap,
    setDataMap,
    setConfig,
    config,
    dataMap,
    customSign,
    customBatch,
    itemConfigList,
    firstAid
  } = context;

  /** 初始化 */
  const onInitData = async () => {
    // setPageLoading(true);
    await wardRegisterDefaultService
      .qcRegisterBlockGetList(registerCode, authStore.selectedDeptCode)
      .then(async res => {
        setBlockList(res.data);
        if (res.data[res.data.length - 1]) {
          let blockId = (res.data[res.data.length - 1] as any)!.id;
          // let lastPageIndex = await getLastPageIndex(blockId);
          setSelectedBlockId(blockId);
          setPageOptions({
            ...pageOptions,
            pageIndex: 1,
          });
          // getPage(blockId)
        } else {
          setSelectedBlockId(null);
          setTotal(0);
          setDataSource([]);
          setData2([])
          setData3([])
          setConfig({})
          setItemConfigList([]);
          setRangeConfigList([]);
        }
      });
  };

  // const getLastPageIndex = async (blockId: any) => {
  //   return await wardRegisterDefaultService
  //     .getPage(registerCode, {
  //       blockId: blockId,
  //       ...pageOptions
  //     })
  //     .then(res => res.data.itemDataPage.totalPage);
  // };

  /** 表头合并 */
  const thMerge = (list: ItemConfigItem[]) => {
    return list.reduce(
      (total: ItemConfigItem[], current: ItemConfigItem, index: number) => {
        if (current.itemCode.includes("：")) {
          let pTitle = current.itemCode.split("：")[0];
          let cTitle = current.itemCode.split("：")[1];
          current.label = cTitle;
          let pthObj: any = total.find(item => (item.pTitle || item.itemCode) == pTitle);
          if (!pthObj) {
            pthObj = {
              ...current,
              pTitle: pTitle,
              children: [current],
              colSpan: 1
            };
            total.push(pthObj);
          } else {
            pthObj.children.push(current);
            pthObj.colSpan += 1;
            current.colSpan = 0;
            total.push(current);
          }
        } else {
          total.push(current);
        }
        return total;
      },
      []
    );
  };

  /** 获取数据 */
  const getPage = (
    blockId?: any,
    options?: {
      stopCreateRow?: boolean
    }
  ) => {
    setPageLoading(true);

    setSelectedRowKeys && setSelectedRowKeys([])

    let _paramsMap = JSON.parse(JSON.stringify(paramMap))
    delete _paramsMap["班次"]
    if (window.location.href.includes('QCRG_WQZD_04')){
      _paramsMap['抢救记录'] = firstAid ? '是' : ''
    }
    let params = {
      startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
      endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
      range: paramMap["班次"] || '',
      blockId: selectedBlockId || blockId,
      paramMap: _paramsMap,
      ...appStore.HOSPITAL_ID =='yczyy'? {deptCode}:null,
      ...pageOptions
    } as any
    let url: Promise<any>
    // 贵州 全院的情况下需要调后端另外一个接口
    if (appStore.HOSPITAL_ID === 'gzsrm' && authStore.selectedDeptCode === '全院')
      url = wardRegisterDefaultService.getPageGZSRM(registerCode, params)
    else url = wardRegisterDefaultService.getPage(registerCode, params)

    url.then(async res => {
        setPageLoading(false)
        if (!res.data) return

        // console.log(
        //   thMerge(res.data.itemConfigList),
        //   "thMerge(res.data.itemConfigList)"
        // );
        // console.log(res, "res");

        let newList = res.data.itemDataPage.list || []

        setTotal(res.data.itemDataPage.totalCount);

        // 所有计算的项
        let auto_cal = res.data.itemConfigList.filter((it:any)=>{return it.itemType=='timeCalculation'}) || []
        if(auto_cal.length>0){
          // element.linkList = []
          res.data.itemConfigList.forEach((element:any) => {
            // 增加linkList存放有关系的列，便于计算
            element.linkList = auto_cal.filter((ii:any)=>{
              return [ii.timeBeginCode,ii.timeEndCode].includes(element.itemCode)
            })
          });
        }
        // 所有叠加项
        let auto_iderate = res.data.itemConfigList.filter((it:any)=>{return it.itemType=='cumulative'}) || []
        if(auto_iderate.length>0){
          res.data.itemConfigList.forEach((element:any) => {
            // 增加iderateList存放有关系的列，便于计算
            element.iderateList = auto_iderate.filter((ii:any)=>{
              return [ii.cumulativeTarget].includes(element.itemCode)
            })
          });
        }
        if(location.pathname.includes('QCRG_GSY_12')) res.data.config.hiddenDate=true
        if(appStore.HOSPITAL_ID === 'dgxg'){
          let ward = await wardRegisterDefaultService.getNurseByWardCode(registerCode,deptCode)
          let namelist = ward.data.map((li:any)=>li.empName)
          res.data.itemConfigList.forEach((item:any)=>{
            item.itemType==="ward_user" && (item.options=namelist.join(";"))
          })
        }
        setItemConfigList(thMerge(res.data.itemConfigList));
        setConfig(res.data.config || {})
        setRangeConfigList(res.data.rangeConfigList);

        setDataMap && setDataMap(res.data.dataMap || {})

        //清除table组件里面的表单组件残余的数值
        setDataSource([])
        setTimeout(() => {
          let stopCreateRow = false
          if (options && options.stopCreateRow) stopCreateRow = true

          //默认返回空数组时新建一行记录
          if (newList.length == 0 && !stopCreateRow) {
            setDataSource([
              { recordDate: moment().format("YYYY-MM-DD") }
            ])
          } else {
            setDataSource(newList.map((item: any) => ({ ...item, modified: false })))
          }
          getStatistics()
        })
      });

    // if (registerCode === 'QCRG_02')
    //   getMsgList()
  };
 

  /**获取统计项 */
  const getStatistics = (blockId?: any,)=>{
    setData2([])
    setData3([])
    let params = {
      startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
      endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
      blockId: selectedBlockId || blockId,
    } as any
    wardRegisterDefaultService.statisticsItem(registerCode,params).then(res=>{
        let resultType2 = res.data.filter((it:any)=>{ return it.resultType=='2'}) || []
        let resultType1 = res.data.filter((it:any)=>{ return it.resultType=='1'}) || []
        setData2([...resultType1])
        setData3([...resultType2])
    }).catch(err=>{

    })
  }

  /**获取提醒列表 */
  const getMsgList = (showLoading = false) => {
    setMsgMap({})
    if (showLoading) setPageLoading(true)
    wardRegisterDefaultService
      .getBlockMsgList(registerCode, selectedBlockId)
      .then(res => {
        if (showLoading) setPageLoading(false)

        let list = res.data.list
        let newMap = {} as any
        // console.log(res)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          let recordId = item.recordId
          let fieldEn = item.fieldEn
          let keys0 = Object.keys(newMap)

          if (fieldEn)
            if (keys0.indexOf(recordId.toString()) >= 0) {
              let parent = newMap[recordId]
              let keys1 = Object.keys(parent)

              if (keys1.indexOf(fieldEn) >= 0) {
                parent[fieldEn].push(item)
              } else {
                parent[fieldEn] = [item]
              }
            } else {
              newMap[recordId] = {} as any
              newMap[recordId][fieldEn] = [item]
            }
        }

        setMsgMap(newMap)
      })
  }

  /**新增修订 */
  const onAddBlock = () => {
    globalModal
      .confirm(
        `是否新建${registerName}`,
        `新建${registerName}开始日期为${moment().format(
          "YYYY-MM-DD"
        )}，历史${registerName}请切换修订版本查看`
      )
      .then(res => {
        wardRegisterDefaultService
          .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功");
            onInitData();
          });
      });
  };

  /** 保存 */
  const onSave = () => {
    if (appStore.HOSPITAL_ID === 'gzsrm' && authStore.selectedDeptCode === '全院') {
      message.warning('科室全院情况下不可以保存，请选择科室！')
      return
    };
    setPageLoading && setPageLoading(true)
    let reqDataSorce = dataSource.filter((item: any) => !item.id || item.modified)

    wardRegisterDefaultService
      .saveAndSignAll(registerCode, selectedBlockId, reqDataSorce, false, dataMap)
      .then(res => {
        message.success("保存成功");
        getPage();
      }, () => setPageLoading && setPageLoading(false));
  };

  /** 删除修订版本 */
  const onDelete = () => {
    globalModal.confirm("删除确认", "确定要删除此修订版本吗？").then(res => {
      wardRegisterDefaultService
        .qcRegisterBlockDelete(registerCode, selectedBlockId)
        .then(res => {
          message.success("保存成功");
          onInitData();
        });
    });
  };

  /** 新建行 */
  const createRow = () => {
    if (appStore.HOSPITAL_ID === 'gzsrm' && authStore.selectedDeptCode === '全院') {
      message.warning('科室全院情况下不可以新建行，请选择科室！')
      return
    };
    let range = ""
    let rangeIndexNo = 0
    if (rangeConfigList && rangeConfigList.length > 0) {
      range = rangeConfigList[0].itemCode
      rangeIndexNo = rangeConfigList[0].indexNo
    }
    setDataSource([])
    setSelectedRowKeys && setSelectedRowKeys([])

    setTimeout(() => {
      setDataSource([
        {
          blockId: selectedBlockId,
          description: "",
          range,
          rangeIndexNo,
          recordDate: moment().format('YYYY-MM-DD'),
          registerCode,
          editType: 'new',
          modified: true,
        },
        ...dataSource
      ])

      setTimeout(() => {
        let target = document.querySelector('.record-page-table .ant-table-row')
        target && target.scrollIntoView()
      }, 100)
    })
  };

  /** 行编辑禁用规则 */
  const cellDisabled = (record: any) => {
    // console.log(registerCode)
    //库房物品管理登记任何状态可编辑
    // if (registerCode == 'QCRG_14_2') return false
    // if (registerCode == 'QCRG_16_2') return false
    //出院患者登记本放开编辑
    // if (registerCode == 'QCRG_08') return false

    if (record.auditorNo) return true
    if (!record.signerNo) return false
    if (authStore.isNotANormalNurse) return false
    if (!authStore.user?.empNo) return true
    if (record.signerNo.toLowerCase() !== authStore.user?.empNo.toLowerCase())
      return true

    return false
  }


  /**导出 */
  const exportExcel = () => {
    let _paramsMap = JSON.parse(JSON.stringify(paramMap))
    delete _paramsMap["班次"]

    if (appStore.HOSPITAL_ID === 'gzsrm' && authStore.selectedDeptCode === '全院') {
      wardRegisterDefaultService.exportAllWard(
        registerCode,
        date[0] ? date[0].format("YYYY-MM-DD") : "",
        date[1] ? date[1].format("YYYY-MM-DD") : "",
      ).then(res => {
        fileDownload(res);
      });
      return
    }
    wardRegisterDefaultService
      .exportExcel(registerCode, {
        startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
        endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
        blockId: selectedBlockId,
        range: paramMap['班次'] || '',
        paramMap: _paramsMap,
        ...appStore.HOSPITAL_ID =='yczyy'? {deptCode}:null,
        ...pageOptions
      })
      .then(res => {
        fileDownload(res);
      });
  };

  /**回车键去到下一个输入元素 */
  const handleNextIptFocus = (e?: any, _target?: any) => {
    if (_target || (e.keyCode && e.keyCode == 13)) {
      let baseTableEl = document.getElementById('baseTable')
      if (baseTableEl) {
        let iptList = baseTableEl.querySelectorAll('.focus-allow,.ant-calendar-picker-input') as any
        let target = _target || e.target

        for (let i = 0; i < iptList.length; i++) {
          let el = iptList[i]

          if (el == target) {
            if (iptList[i + 1]) {
              iptList[i + 1].focus && iptList[i + 1].focus()
              iptList[i + 1].click && iptList[i + 1].click()
            }
            if (e && e.target) e.target.value = e.target.value.replace(/\n/g, '')
            break
          }
        }
      }
    }
  }

  /**手动触发AutoComplete组件的下拉 */
  const tiggerAutoCompleteClick = (itemCode: string, index: number) => {
    let rowEls = document.querySelectorAll('.ant-table-row') as any
    let rowEl = rowEls[index]
    if (rowEl) {
      let target = rowEl.querySelector(`[data-key="${itemCode}"]`)
      // if (target) target.click()
    }
  }

  /**附件上传 */
  const handleUpload = (
    cfg: any,
    record: any,
    index: number,
    uploadType: 'append' | 'replace',
    replaceStr?: string
  ) => {
    const id = "sensitiveRegisterItemCodeAttachmentUploader"
    const entityType = 'qcRegister'
    // const entityType = 'mail'

    let oldEl = document.getElementById(id)
    if (oldEl) document.body.removeChild(oldEl)

    let fileEl = document.createElement('input') as any
    fileEl.id = id
    fileEl.type = 'file'
    fileEl.accept = cfg.options ? cfg.options.replace(/;/g, ',') : ''
    if (!replaceStr) fileEl.multiple = 'multiple'
    fileEl.onchange = () => {
      if (fileEl.files.length >= 0) {
        setPageLoading(true)

        let reqArr = []

        for (let i = 0; i < fileEl.files.length; i++) {
          let form = new FormData()
          form.append('file', fileEl.files[0])

          reqArr.push(
            service
              .commonApiService
              .uploadAttachment(entityType, form)
          )
        }

        Promise.all(reqArr)
          .then((resArr: any[]) => {
            let newDataSource = dataSource.concat()
            let val = record[cfg.itemCode] || ''
            if (uploadType == 'replace') {
              let res = resArr[0]
              val = val.replace(
                replaceStr,
                `${res.data.name || ''},${res.data.relativePath || ''}`
              )

            } else {
              let valArr = val.split(';')

              let appendArr = resArr.map((res: any) => {
                return `${res.data.name || ''},${res.data.relativePath || ''}`
              })

              val = valArr.concat(appendArr).filter((str: string) => str.trim() !== '').join(';')
            }

            newDataSource[index][cfg.itemCode] = val
            newDataSource[index].modified = true
            setDataSource(newDataSource)
            setPageLoading(false)
          },
            () => setPageLoading(false))
      } else {
        document.body.removeChild(fileEl)
        fileEl = null
      }
    }

    document.body.appendChild(fileEl)
    fileEl.click()
  }

  /**删除行 */
  const handleDeleteRow = (record: any, idx: number) => {
    let deleteRow = () => {
      dataSource.splice(idx, 1)
      setDataSource([])
      setTimeout(() => setDataSource(dataSource.concat()))
    }
    if (!record.id) {
      deleteRow()
    } else {
      globalModal
        .confirm("删除确认", "确定要删除该条目吗？")
        .then((res) => {
          setPageLoading(true)

          wardRegisterDefaultService
            .deleteAll(registerCode, [{ id: record.id }])
            .then(res => {
              setPageLoading(false)
              message.success('删除成功')
              deleteRow()
            }, err => setPageLoading(false))
        })
    }
  }

  /**护士长批量签名 */
  const handleAuditAll = (aside?: string, type?: 'audit' | 'sign') => {
    //处理签名类型 默认 审核audit
    const _type = type || 'audit'
    let req =
      wardRegisterDefaultService.auditAll
        .bind(wardRegisterDefaultService)
    if (_type == 'sign') req =
      wardRegisterDefaultService.signAll
        .bind(wardRegisterDefaultService)

    //签名的名称
    aside = aside || '护士长'

    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }

    let selectedRows = dataSource
      .filter((item: any) => selectedRowKeys.indexOf(item.key) >= 0)

    //audit类型需要排除未签名和已审核的条目
    if (_type == 'audit') {
      let auditItems = selectedRows.filter((item: any) => item.auditorName)
      let noSignItems = selectedRows.filter((item: any) => !item.signerName)

      if (auditItems.length > 0 || noSignItems.length > 0) {
        let textArr = [] as string[]
        if (noSignItems.length > 0) {
          let idxArr = noSignItems.map((item: any) => dataSource.indexOf(item) + 1)
          textArr.push(`第${idxArr.join('、')}条未签名`)
        }
        if (auditItems.length > 0) {
          let idxArr = auditItems.map((item: any) => dataSource.indexOf(item) + 1)
          textArr.push(`第${idxArr.join('、')}条${aside}已签名`)
        }

        Modal.warn({
          centered: true,
          title: '提示',
          content: textArr.join(',')
        })
        return
      }
    }

    //sign类型需要排除未保存和已签名条目
    if (_type == 'sign') {
      let signItems = selectedRows.filter((item: any) => item.signerName)
      let noIdItems = selectedRows.filter((item: any) => !item.id)

      if (signItems.length > 0 || noIdItems.length > 0) {
        let textArr = [] as string[]
        if (noIdItems.length > 0) {
          let idxArr = noIdItems.map((item: any) => dataSource.indexOf(item) + 1)
          textArr.push(`第${idxArr.join('、')}条未保存`)
        }

        if (signItems.length > 0) {
          let idxArr = signItems.map((item: any) => dataSource.indexOf(item) + 1)
          textArr.push(`第${idxArr.join('、')}条已签名`)
        }

        Modal.warn({
          centered: true,
          title: '提示',
          content: textArr.join(',')
        })
        return
      }
    }

    let ids = selectedRows
      .map((item: any) => ({ id: item.id || '' }))

    globalModal
      .confirm(`${aside}批量签名确认`, `你确定${aside}签名吗？`)
      .then((res) => {
        setPageLoading(true)
        req(registerCode, ids)
          .then((res) => {
            message.success('签名成功')
            if (res.data && res.data.list) {
              let newDataSource = [...dataSource]
              for (let i = 0; i < res.data.list.length; i++) {
                let resRecord = res.data.list[i]
                let record = newDataSource
                  .find((item: any) => item.id == resRecord.id)

                if (record) Object.assign(record, resRecord)
              }

              setDataSource(newDataSource)
              setSelectedRowKeys([])
              setPageLoading(false)
            }
          },
            () => setPageLoading(false))
      })
  }

  /**复制新增 */
  const handleCopyCreateRow = () => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }

    globalModal
      .confirm('复制新增', '是否复制新增选择的行?')
      .then((res) => {
        let selectedRows = dataSource.filter((item: any) =>
          selectedRowKeys.indexOf(item.key) >= 0)
        // 自定义签名不需要复制
        let customSignObj: Record<string,any> = {}
        if (['whyx','lyyz','qhwy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID)) {
          customSign.map((v:any) => {
            customSignObj[v.itemCode] = ''
          })
        }
        let newRows = selectedRows.map((item: any) => {
          let newItem = JSON.parse(JSON.stringify(item))
          delete newItem.id

          return {
            ...newItem,
            ...customSignObj,
            recordDate: moment().format('YYYY-MM-DD'),
            signerName: '',
            signerNo: '',
            auditorName: '',
            auditorNo: ''
          }
        })

        let newDataSource = [...newRows, ...dataSource]
        setDataSource([])
        setSelectedRowKeys([])
        setTimeout(() => {
          setDataSource(newDataSource)
        })
      })
  }

  /**批量删除 */
  const deleteSelectedRows = ({beforeReqCB} = {beforeReqCB: () => {}} as Record<string,any>) => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }


    let restList = dataSource.filter((item: any) =>
      selectedRowKeys.indexOf(item.key) < 0)

    let deleteLists = dataSource.filter((item: any) => {
      return selectedRowKeys.indexOf(item.key) >= 0 && item.id
    })
    let deleteIds = deleteLists.map((item: any) => ({ id: item.id }))
    /**请求前的操作 */
    if (beforeReqCB && beforeReqCB(deleteLists) === false) return

    globalModal
      .confirm("删除确认", "确定要删除吗？")
      .then((res: any) => {

        const successCallback = () => {
          message.success('删除成功')
          setDataSource(restList.concat())
          setSelectedRowKeys([])
        }

        if (deleteIds.length > 0) {
          setPageLoading(true)

          wardRegisterDefaultService
            .deleteAll(registerCode, deleteIds)
            .then(res => {
              setPageLoading(false)
              successCallback()
            }, err => setPageLoading(false))
        } else {
          successCallback()
        }
      })
  }

  /**修复AutoComplete获取焦点时 赋值错误的问题 */
  const fixInputValue = (record: any, itemCodeArr: string[], index: number, timeout?: number) => {
    if (itemCodeArr.length > 0)
      setTimeout(() => {
        let rowEls = document.querySelectorAll('.ant-table-row') as any
        let rowEl = rowEls[index]

        if (rowEl) {
          for (let i = 0; i < itemCodeArr.length; i++) {
            let itemCode = itemCodeArr[i]
            let target = rowEl.querySelector(`[data-key="${itemCode}"]`) as HTMLInputElement

            if (target) {
              let val = (record[itemCode] || '').toString().replace(/\n/g, '')
              target.value = val
              target.innerHTML = val
            }
          }
        }
      }, timeout || 0)
  }
  /**批量自定义签名 */
  const handleBatchSign = (type: string) => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }

    let selectedRows = dataSource
      .filter((item: any) => selectedRowKeys.indexOf(item.key) >= 0)

    const curItem = customSign.find((v:any) => v.itemCode == type)
    const roleList = curItem?.itemType.split('-')[1] ? (curItem?.itemType.split('-')[1]).split(',') : []

    if (roleList.length > 0 && authStore.user) {
      let flag = (authStore.user.roleManageCodeList || []).find((v:string) => roleList.indexOf(v)> -1)
      if (!flag) return message.error(`权限不足，无法签名`)
    }
    // 排除已签名的
    let textArr: string[] = []
    let signItems = selectedRows.filter((item: any) => item[type])
    if (signItems.length > 0) {
      let idxArr = signItems.map((item: any) => dataSource.indexOf(item) + 1)
      textArr.push(`第${idxArr.join('、')}条已签名，请检查！`)
      Modal.warn({
        centered: true,
        title: '提示',
        content: textArr.join(',')
      })
      return
    }

    /**签名 */
    globalModal
      .confirm(`${type}批量签名确认`, `你确定${type}签名吗？`)
      .then(async(res) => {
        setPageLoading(true)
        try {
          const res1 = await wardRegisterDefaultService.saveAndSignAll(
            registerCode,
            selectedBlockId,
            selectedRows.map((v: any) => ({ ...v, [type]: authStore.user?.empName }))
          )
          if (res1.code == '200') {
            message.success('签名成功')
            getPage()
            setPageLoading(false)
          }
        } catch (e) {
          setPageLoading(false)
        }
      })
  }

  /**批量设置班次 */

  const handleBatchSet = (data: any) => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }
    let selectedRows = dataSource.filter((item: any) =>selectedRowKeys.indexOf(item.key) >= 0)

    let newRows = dataSource.map((item: any) => {
      let newItem = JSON.parse(JSON.stringify(item))
      if (selectedRowKeys.indexOf(item.key) >= 0) {
        newItem['班次'] = data.type
        newItem['modified'] = true
      }
      return {
        ...newItem,
      }
    })

    let newDataSource = [...newRows]
    setDataSource([])
    setSelectedRowKeys([])
    setTimeout(() => {
      setDataSource(newDataSource)
    })
  }

  /**综合设置 */
  const handleGeneralSet = async (data: any) => {
    if (selectedRowKeys.length <= 0) {
      message.warn('未勾选项目')
      return
    }
    let selectedRows = dataSource.filter((item: any) => selectedRowKeys.indexOf(item.key) >= 0)

    // 复制
    let newRows = []
    if (data.copy) {
      // 自定义签名不需要复制
      let customSignObj: Record<string, any> = {}
      !data.sign && customSign.map((v:any) => {
        customSignObj[v.itemCode] = ''
      })
      newRows = selectedRows.map((item: any) => {
        let newItem = JSON.parse(JSON.stringify(item))
        delete newItem.id
        newItem['班次'] = data.type ? data.type : newItem['班次']
        newItem[data.signName] = data.sign ? authStore.user?.empName : ""
        if (appStore.HOSPITAL_ID === 'whyx' && data.sign) {
          newItem['护士长签名'] = '';
        }
        // newItem[data.signName] = data.sign ? item[data.signName] : ""
        return {
          ...newItem,
          ...customSignObj,
          recordDate: data.time? moment(data.time).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
          signerName: '',
          signerNo: '',
          auditorName: '',
          auditorNo: ''
        }
      })
    }
    selectedRows = [...newRows,...selectedRows]
    setPageLoading(true)
    try {
      const res1 = await wardRegisterDefaultService.saveAndSignAll(
        registerCode,
        selectedBlockId,
        selectedRows.map((v: any) => {
          // if (data.type) {
          //   v['班次'] = data.type
          // }
          // if (data.time) {
          //   v['recordDate'] = moment(data.time).format('YYYY-MM-DD')
          // }
          if (!data.copy) {
            // v[data.signName] = data.sign ? authStore.user?.empName : data.cancelSign ? "" : v[data.signName]
            if (data.sign) {
              v[data.signName] = authStore.user?.empName
            }
            if (data.cancelSign) {
              v[data.signName] =  ""
            }
            v['班次'] = data.type ? data.type : v['班次']
          }
          return {
            ...v,
          }
        }),
      )
      if (res1.code == '200') {
        message.success('修改成功')
        getPage()
        setPageLoading(false)
      }
    } catch (e) {
      setPageLoading(false)
    }
  }

  return {
    onInitData,
    getPage,
    onAddBlock,
    onSave,
    onDelete,
    createRow,
    cellDisabled,
    exportExcel,
    handleNextIptFocus,
    tiggerAutoCompleteClick,
    handleUpload,
    handleDeleteRow,
    handleAuditAll,
    handleCopyCreateRow,
    fixInputValue,
    deleteSelectedRows,
    getMsgList,
    handleBatchSign,
    handleBatchSet,
    handleGeneralSet,
    getStatistics
  };
}
/**获取当月最后一周的日期 */
export const lastWeekDatesAMonth = (date?: any) => {
  const _date = date || undefined
  const _moment = moment(_date)
  if (!_moment.isValid()) return []
  let lastDate = _moment.endOf('M')
  //本月最后一周包含的日期
  let lastWeekDates = [lastDate.format('YYYY-MM-DD')]
  let prevDate = lastDate.subtract(1, 'd')
  while (prevDate.weekday() !== 6) {
    lastWeekDates.push(prevDate.format('YYYY-MM-DD'))
    prevDate = prevDate.subtract(1, 'd')
  }

  return lastWeekDates
}
