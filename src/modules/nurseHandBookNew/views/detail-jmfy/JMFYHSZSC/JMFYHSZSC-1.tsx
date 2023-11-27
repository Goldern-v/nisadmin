import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {PageHeader} from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import  {jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";

// export interface Props {
//     deptCode?:number
//     year:string
// }

export default observer(function () {
    const {deptCode,year} =model.detail.record||{}
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    let columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'deptName',
            width: 100,
            align: 'center'
        },
        {
            title: '年龄',
            dataIndex: 'createTime',
            width: 70,
            align: 'center'
        },
        {
            title: '学历',
            dataIndex: 'creatorName',
            width: 60,
            align: 'center'
        },
        {
            title: '在岗情况',
            dataIndex: 'creatorName',
            align: 'center',
            children: [
                {
                    title: '1月',
                    dataIndex: 'month1',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '2月',
                    dataIndex: 'month2',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '3月',
                    dataIndex: 'month3',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '4月',
                    dataIndex: 'month4',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '5月',
                    dataIndex: 'month5',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '6月',
                    dataIndex: 'month6',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '7月',
                    dataIndex: 'month7',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '8月',
                    dataIndex: 'month8',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '9月',
                    dataIndex: 'month9',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '10月',
                    dataIndex: 'month10',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '11月',
                    dataIndex: 'month11',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '12月',
                    dataIndex: 'month12',
                    width: 60,
                    align: 'center'
                },
            ]
        },
    ]
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getStaffList({deptCode,year}).then((res: Obj) => {
            setDataSource(res.list)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
useEffect(()=>{
    if(deptCode && year){
        getData()
    }
},[deptCode,year])
    return (
        <Wrapper>
            <div>护理人员一览表</div>
            <BaseTable
                loading={pageLoading}
                dataSource={dataSource}
                columns={columns}
                wrapperStyle={{margin: '0 15px'}}
                type={['index']}
                surplusHeight={280}
           />

        </Wrapper>
    )
})
const Wrapper = styled.div`
    .heard{
      display: flex;
      height: 50px;
      font-size: 13px;
      position: relative;
      color: #333333;
      padding: 0 15px 0 15px;
      align-items: center;
    }

`
const WrapperHeard: any = styled(PageHeader)`
  .ant-calendar-picker {
    width: 200px;
  }
`