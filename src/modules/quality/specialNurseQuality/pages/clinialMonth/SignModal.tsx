import React from 'react'
import { message } from 'antd'
// import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
// import qs from 'qs'
// import { wardRegisterDefaultService } from '../../services/WardRegisterDefaultService'

import { DoCon } from 'src/components/BaseTable'

export interface Props {
	itemCfg: any,
	record: any,
	index: number,
	recordKey: any,
	data3: any,
	setData3: Function,
	signCodeItem: any,
	setSignCodeItem: Function,
	cellDisabled: Function,
	setTableLoading: Function,
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
		// className,
		itemCfg, //当前列配置
		index, //行下标
		// cellDisabled, //是否禁用行
		// updateDataSource,
		// registerCode,
		// selectedBlockId,
		// getPage,
		setTableLoading,
		recordKey,
		data3, setData3,
		// signCodeItem,
		// setSignCodeItem,
	} = props
	const { itemCode, itemType = ' aa-gg' } = itemCfg
	let tempDataForSign = []
	// 当前自定义签名允许操作的角色权限
	// const roleList = itemType.split('-')[1] ? (itemType.split('-')[1]).split(',') : []

	const handleSign = () => {
		const confirmText: [string, string] = props.record[recordKey] ? [`签名取消`, `你确定取消签名吗？`] : [`签名确认`, `你确定签名吗？`]
		globalModal.confirm(...confirmText)
			.then((res: any) => {
				setTableLoading(true)
				message.success(`取消签名成功`);
				if (props.record[recordKey]) {
					// 取消签名
					props.record[recordKey] = null
					tempDataForSign = data3
					tempDataForSign[index] = props.record
					setData3([...tempDataForSign])

					// signCodeItem[recordKey] = null
					// setSignCodeItem(signCodeItem)
				} else {
					
					let user = JSON.parse(sessionStorage.getItem('user') as string)
					message.success(`${user.empName}签名成功`);
					props.record[recordKey] = user.empName
					tempDataForSign = data3
					tempDataForSign[index] = props.record
					// console.log(index)
					// console.log(tempDataForSign[index])
					setData3([...tempDataForSign])

					// signCodeItem[recordKey] = user.empNo
					// setSignCodeItem(signCodeItem)
				}
				setTableLoading(false)
			});
	}
	return <DoCon>
		<span
			className={props.record[recordKey] && 'text'}
			onClick={handleSign}>
			{props.record[recordKey] || '签名'}
		</span>
	</DoCon>
}