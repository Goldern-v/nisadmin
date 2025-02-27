import React from 'react'
import { message } from 'antd'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { wardRegisterDefaultService } from '../../services/WardRegisterDefaultService'
import { DoCon } from 'src/components/BaseTable'

export interface Props {
  itemCfg: any,
  record: any,
  index: number,
  cellDisabled: Function,
  className?: string,
  handleNextIptFocus?: Function,
  updateDataSource: Function,
  registerCode: any,
  selectedBlockId: any,
  getPage: Function,
}

/** 时间选择render组件 */
export default function SignColumnRender(props: Props) {
  const {
    className,
    itemCfg, //当前列配置
    index, //行下标
    cellDisabled, //是否禁用行
    updateDataSource,
    registerCode,
    selectedBlockId,
    getPage,
  } = props
  const { itemCode, itemType } = itemCfg
  // 当前自定义签名允许操作的角色权限
  const roleList = itemType.split('-')[1] ? (itemType.split('-')[1]).split(',') : []

  const handleSign = () => {
    // if(!authStore.isRoleManage) {
    //   message.error(`非护士长无法${props.record[itemCode] && '取消'}签名`)
    //   return
    // }
    if (roleList.length > 0 && authStore.user) {
      let flag = (authStore.user.roleManageCodeList || []).find((v:string) => roleList.indexOf(v)> -1)
      if (!flag) return message.error(`权限不足，无法${props.record[itemCode] ? '取消': ''}签名`)
    }
    const confirmText: [string, string] = props.record[itemCode] ? [`${itemCode}签名取消`, `你确定取消${itemCode}签名吗？`] : [`${itemCode}签名确认`, `你确定${itemCode}签名吗？`]
    globalModal.confirm(...confirmText)
    .then(async(res: any) => {
      try {
        const res1: any = await wardRegisterDefaultService.saveAndSignAll(
          registerCode,
          selectedBlockId,
          [{
            ...props.record,
            [itemCode]: props.record[itemCode] ? '' : authStore.user?.empName
          }],
          true)
        message.success(`${props.record[itemCode] && '取消'}${itemCode}签名成功`);
        getPage()
        // Object.assign(props.record, res1.data.list[0]);
        // updateDataSource();
      } catch (e) {
        
      }
    });
  }
    return <DoCon>
      <span
        className={props.record[itemCode] && 'text'}
        onClick={handleSign}>
        {props.record[itemCode] || '签名'}
      </span>
    </DoCon>
}