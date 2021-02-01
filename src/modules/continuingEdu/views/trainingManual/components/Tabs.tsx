import React from "react";
import { observer } from "mobx-react-lite";
import BaseTabs from "src/components/BaseTabs";
import { trainingManualModal } from '../TrainingManualModal'
import Table from './Table'
interface Props { }

export default observer(function Tabs(props: Props) {
  // tabs选项
  const TABS_LIST_NURSE = [
    {
      title: 'N0',
      component: <Table levelName='轮科护士' titleName='N0' />
    },
    {
      title: 'N1',
      component: <Table levelName='初级责任护士' titleName='N1' />
    },
    {
      title: 'N2',
      component: <Table levelName='初级责任护士' titleName='N2' />
    },
    {
      title: 'N3',
      component: <Table levelName='高级责任护士' titleName='N3' />
    },
    {
      title: 'N4',
      component: <Table levelName='高级责任护士' titleName='N4' />
    },
    {
      title: 'N5',
      component: <Table levelName='专科护士' titleName='N5' />
    }
  ];


  return (
    <BaseTabs
      defaultActiveKey={trainingManualModal.tabKey}
      config={TABS_LIST_NURSE}
      onChange={(key: any) => {
        trainingManualModal.tabKey = key;
        const nurseHierarchyName: any = ["N0", "N1", "N2", "N3", "N4", "N5"];
        trainingManualModal.tabKeyName = nurseHierarchyName[Number(key)];
      }}
    />
  )
})
