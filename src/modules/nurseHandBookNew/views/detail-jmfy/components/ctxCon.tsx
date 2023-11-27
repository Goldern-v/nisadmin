import React, {useEffect} from 'react'
import {jmfydModel as model} from '../model'
import JMFYHSZGZJH_3 from "src/modules/nurseHandBookNew/views/detail-jmfy/components/JMFYHSZGZJH_1";
import EditPage from "src/modules/nurseHandBookNew/views/detail-jmfy/components/editPage";
import JMFYHSZGZZJ_1 from "src/modules/nurseHandBookNew/views/detail-jmfy/components/JMFYHSZGZZJ_1";
import JMFYHSZGZJH_1 from "src/modules/nurseHandBookNew/views/detail-jmfy/components/JMFYHSZGZJH_1";
import JMFYHSZGZJH_2 from './JMFYHSZGZJH_2';
import  JMFYHSZSCA_All from '../JMFYHSZSC/index'
export interface Props {
}

export default function (props: Props) {
    const {menuCode = ''} = model.detail?.record || {}
    if (['JMFYHSZGZZJ_2', 'JMFYHSZGZZJ_3', 'JMFYHSZGZJH_3'].includes(menuCode)) {
        return <EditPage/>
    } else if (menuCode === 'JMFYHSZGZJH_1') {
        return <JMFYHSZGZJH_1/>
    } else if ('JMFYHSZGZZJ_1' === menuCode) {
        return <JMFYHSZGZZJ_1/>
    } else if ('JMFYHSZGZJH_2' === menuCode) {
        return <JMFYHSZGZJH_2/>
    }else if(menuCode ==='JMFYHSZSC'){
        return  <JMFYHSZSCA_All/>
    } else {
        return <div></div>
    }
}
