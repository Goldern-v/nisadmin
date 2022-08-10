import BaseTable from 'src/components/BaseTable'
import EditButton from 'src/modules/quality/components/EditButton'
import OneLevelTitle from 'src/modules/quality/components/OneLevelTitle'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react'

import { getModal } from '../../AnalysisDetailModal'
import { SectionCon } from '../../style/section'
import { useColumns } from './hook/useColumns'

export interface Props {
  sectionId: string;
  sectionTitle?: string | undefined;
  modalTitle?: string | undefined;
  // getColumns: (flag: boolean, setVal?: Function) => any[]
}
export default observer(function TableSection(props: Props) {
  const { sectionTitle, sectionId } = props;
  const analysisDetailModal = useRef(getModal());
  let data = analysisDetailModal.current.getSectionData(sectionId);
  // console.log(data,1);
  
  const columns = useColumns({ tempList: data.tempList || []})
  // console.log(columns,data.tempList,'data.tempListdata.tempList');
  
  return (
    <SectionCon>
      {data.level == 1 ? (
        <OneLevelTitle text={sectionTitle} />
      ) : (
        <TwoLevelTitle text={sectionTitle} />
      )}
      <EditButton
        onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}
      >
        编辑
      </EditButton>
      <BaseTable
        dataSource={data.list}
        columns={columns}
        pagination={false}
      />
    </SectionCon>
  );
});
