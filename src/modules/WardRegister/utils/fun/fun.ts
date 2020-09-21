import { wardRegisterService } from "../../services/WardRegisterService";
import { authStore } from "src/stores";
import { globalModal } from "src/global/globalModal";
import { message, Modal } from "src/vendors/antd";
import moment from "moment";
import service from "src/services/api";
import { fileDownload } from "src/utils/file/file";
// import Item from "antd/lib/list/Item";

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
  setSelectedRowKeys?: Function
}

export function getFun(context: any) {
  const {
    registerCode,
    registerName,
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
    paramMap,
    rangeConfigList,
    selectedRowKeys,
    setSelectedRowKeys
  } = context;

  /** 初始化 */
  const onInitData = async () => {
    // setPageLoading(true);
    await wardRegisterService
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
          setItemConfigList([]);
          setRangeConfigList([]);
        }
      });
  };

  // const getLastPageIndex = async (blockId: any) => {
  //   return await wardRegisterService
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

    let params = {
      startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
      endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
      range: paramMap["班次"] || '',
      blockId: selectedBlockId || blockId,
      paramMap: _paramsMap,
      ...pageOptions
    } as any


    wardRegisterService
      .getPage(registerCode, params)
      .then(res => {
        setPageLoading(false)
        if (!res.data) return

        console.log(
          thMerge(res.data.itemConfigList),
          "thMerge(res.data.itemConfigList)"
        );
        console.log(res, "res");

        let newList = res.data.itemDataPage.list || []

        setTotal(res.data.itemDataPage.totalCount);
        setItemConfigList(thMerge(res.data.itemConfigList));
        setRangeConfigList(res.data.rangeConfigList);

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
        })
      });
  };

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
        wardRegisterService
          .qcRegisterBlockCreate(registerCode, authStore.selectedDeptCode)
          .then(res => {
            message.success("创建成功");
            onInitData();
          });
      });
  };

  /** 保存 */
  const onSave = () => {
    setPageLoading && setPageLoading(true)
    let reqDataSorce = dataSource.filter((item: any) => !item.id || item.modified)

    console.log(JSON.parse(JSON.stringify(reqDataSorce)))
    wardRegisterService
      .saveAndSignAll(registerCode, selectedBlockId, reqDataSorce, false)
      .then(res => {
        message.success("保存成功");
        getPage();
      }, () => setPageLoading && setPageLoading(false));
  };

  /** 删除修订版本 */
  const onDelete = () => {
    globalModal.confirm("删除确认", "确定要删除此修订版本吗？").then(res => {
      wardRegisterService
        .qcRegisterBlockDelete(registerCode, selectedBlockId)
        .then(res => {
          message.success("保存成功");
          onInitData();
        });
    });
  };

  /** 新建行 */
  const createRow = () => {
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
    if (registerCode == 'QCRG_14_2') return false
    if (registerCode == 'QCRG_16_2') return false
    //出院患者登记本放开编辑
    if (registerCode == 'QCRG_08') return false

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

    wardRegisterService
      .exportExcel(registerCode, {
        startDate: date[0] ? date[0].format("YYYY-MM-DD") : "",
        endDate: date[1] ? date[1].format("YYYY-MM-DD") : "",
        blockId: selectedBlockId,
        range: paramMap['班次'] || '',
        paramMap: _paramsMap,
        ...pageOptions
      })
      .then(res => {
        fileDownload(res);
      });
  };

  /**回车键去到下一个输入元素 */
  const handleNextIptFocus = (e?: any, target?: any) => {
    if (target || (e.keyCode && e.keyCode == 13)) {
      let baseTableEl = document.getElementById('baseTable')
      if (baseTableEl) {
        let iptList = baseTableEl.querySelectorAll('input:enabled,textarea:enabled') as any

        for (let i = 0; i < iptList.length; i++) {
          let el = iptList[i]
          if (el == (target || e.target)) {
            if (iptList[i + 1]) {
              iptList[i + 1].focus && iptList[i + 1].focus()
              iptList[i + 1].click && iptList[i + 1].click()
            }
            // if (e && e.target) e.target.value = e.target.value.replace(/\n/g, '')
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
    const id = "wardRegisterItemCodeAttachmentUploader"
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

          wardRegisterService
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
      wardRegisterService.auditAll
        .bind(wardRegisterService)
    if (_type == 'sign') req =
      wardRegisterService.signAll
        .bind(wardRegisterService)

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

        let newRows = selectedRows.map((item: any) => {
          let newItem = JSON.parse(JSON.stringify(item))
          delete newItem.id
          return {
            ...newItem,
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
    fixInputValue
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
