import React, { useEffect, useState } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import { RouteComponentProps } from 'src/components/RouterView'
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore,authStore } from 'src/stores'
import { ReactComponent as CFJL } from "../images/icon/CFJL.svg";
import ClinicalMonth from './ClinicalMonth'
import ClinicalYear from './ClinicalYear'
import ClinicalQuarter from './ClinicalQuarter'
import SumMonth from './SumMonth'
import SumYear from './SumYear'
import WholeAysi from './WholeAysi'


const LEFT_MENU_CONFIG: any = appStore.hisMatch({
	map: {
		'fsxt,925': [
			// 科室临床护理质量指标
			{
				title: '临床护理质量指标',
				children: [
					{
						title: "科室质量指标月度汇总",
						path: "/goodOrBadRouter",
						redirect:'/goodOrBadRouter/clinicalMonth',
						component: ClinicalMonth,
					},
					{
						title: '科室质量指标年度汇总',
						hide:!authStore.level3publishedWatch,
						path: '/goodOrBadRouter/clinicalYear',
						component: ClinicalYear
					},
					{
						title: '全院质量指标季度汇总',
						hide:!authStore.isDepartment,
						path: '/goodOrBadRouter/clinicalQuarter',
						component: ClinicalQuarter
					},
				]
			},
			{
				title: '护理工作质量/管理指标',
				children: [
					{
						title: "月度汇总",
						path: "/goodOrBadRouter/sumMonth",
						component: SumMonth,
					},
					{
						title: '年度汇总',
						path: '/goodOrBadRouter/sumYear',
						component: SumYear
					},
					
				]
			},
			{
				title: "全院护理质量分析",
				hide:!authStore.level3publishedWatch,
				path: "/goodOrBadRouter/wholeAysi",
				component: WholeAysi,
			},
		],
		default: [
		]
	}
})


export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function GoodOrBadRouter(props: Props) {
	let currentRoutePath = props.history.location.pathname || "";
	let currentRoute = getTargetObj(LEFT_MENU_CONFIG, "path", currentRoutePath);
	// 筛选目标对象
	function getTargetObj(listDate: any, targetKey: string, targetName: string) {
		let chooseRoute = listDate.find((item: any) => {
			if (item.children) {
				return item.children.find(
					(item1: any) => item1[targetKey] === targetName
				);
			} else {
				return item[targetKey] === targetName;
			}
		});
		if (chooseRoute && chooseRoute.children) {
			chooseRoute = chooseRoute.children.find(
				(item1: any) => item1[targetKey] === targetName
			);
		}
		return chooseRoute;
	}



	return (
		<Wrapper>
			<LeftMenuCon>
				<LeftMenu config={LEFT_MENU_CONFIG} />
			</LeftMenuCon>
			<MainCon>
				{currentRoute &&
					currentRoute.component &&
					(currentRoute.keepAlive ? (
						<KeepAlive
							name={currentRoute.path}
							disabled={currentRoute.disabledKeepAlive}
						>
							<currentRoute.component
								getTitle={currentRoute && currentRoute.title}
							/>
						</KeepAlive>
					) : (
						<currentRoute.component
							getTitle={currentRoute && currentRoute.title}
						/>
					))}
			</MainCon>
		</Wrapper>
	);
}
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
`;

const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;