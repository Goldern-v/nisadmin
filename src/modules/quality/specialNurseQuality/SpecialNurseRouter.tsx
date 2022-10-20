import React from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import { RouteComponentProps } from 'src/components/RouterView'
import { KeepAlive } from 'react-keep-alive'
import { appStore,authStore } from 'src/stores'
import SpecialClinialMonth from './pages/clinialMonth/SpecialClinialMonth'
import SpecialSumMonth from './pages/sumMonth/SpecialSumMonth'
import SpecialClinialYear from './pages/clinialYear/SpecialClinialYear'
import SpecialSumYear from './pages/sumYear/SpecialSumYear'
import SpecialWholeAysi from './pages/wholeAysi/SpecialWholeAysi'


const LEFT_MENU_CONFIG: any = appStore.hisMatch({
	map: {
		'fsxt,925': [
			// 科室临床护理质量指标
			{
				title: '临床护理质量指标',
				hide:!authStore.specialMenuObj.clinicalIndicators,
				children: [
					{
						title: "科室质量指标月度汇总",
						path: "/specialNurseRouter",
						redirect:'/specialNurseRouter/clinicalMonth',
						component: SpecialClinialMonth,
					},
					{
						title: '科室质量指标年度汇总',
						hide:!authStore.level3publishedWatch,
						path: '/specialNurseRouter/clinicalYear',
						component: SpecialClinialYear
					},
					// {
					// 	title: '全院质量指标季度汇总',
					// 	hide:!authStore.isDepartment,
					// 	path: '/specialNurseRouter/clinicalQuarter',
					// 	component: SpecialClinialMonth
					// },
				]
			},
			{
				title: '护理工作质量/管理指标',
				hide:!authStore.specialMenuObj.manageIndicators,
				children: [
					{
						title: "月度汇总",
						path: "/specialNurseRouter/sumMonth",
						component: SpecialSumMonth,
					},
					{
						title: '年度汇总',
						path: '/specialNurseRouter/sumYear',
						component: SpecialSumYear
					},
					
				]
			},
			{
				title: "专科护理质量分析",
				hide:!(authStore.level3publishedWatch && authStore.specialMenuObj.qualityReport),
				path: "/specialNurseRouter/wholeAysi",
				component: SpecialWholeAysi,
			},
		],
		default: [
		]
	}
})


export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function SpecialNurseRouter(props: Props) {
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