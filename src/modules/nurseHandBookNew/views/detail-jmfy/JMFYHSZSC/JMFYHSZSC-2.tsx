import styled from 'styled-components'
import React, {useState, useEffect, useMemo} from 'react'
import {PageHeader} from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import {jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";
import {Tabs} from "antd";
const {TabPane} = Tabs;

export default observer(function () {
    const {deptCode, year} = model.detail.record || {}
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [tabIndex,setTabIndex]=useState('1')
    let columns: any = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 50,
            align: 'center',
        },
        {
            title: '指标项目',
            dataIndex: 'monitorContent',
            width: 120,
            align: 'center'
        },
        {
            title: '本月数据',
            dataIndex: 'createTime',
            width: 70,
            align: 'center'
        },
        {
            title: '目标值',
            dataIndex: 'qualified',
            width: 80,
            align: 'center'
        },
    ]
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getPublicIndicatorsItem({
            ...model.detail.record,
            assortCode:assortCode
        }).then((res: Obj) => {
            setDataSource(res.data.list || [])
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    const onChange =(key:string)=>{
        setTabIndex(key)
    }
    const assortCode =useMemo(()=>{
        return model.menuList[Number(tabIndex)].assortCode
    },[tabIndex])
    useEffect(() => {
        getData()
    }, [tabIndex])
    return (
        <Wrapper>
            <div>护理质量检测指标汇总</div>
            <Tabs defaultActiveKey={tabIndex} tabPosition={'top'} style={{height: 220}} onChange={onChange}>
                {
                    model.menuList.map((item: any, index: number) =>
                         <TabPane tab={item.name} key={index.toString()}>
                            <BaseTable
                                loading={pageLoading}
                                dataSource={dataSource}
                                columns={columns}
                                wrapperStyle={{margin: '0 15px'}}
                                surplusHeight={280}
                            />
                        </TabPane>
                  )
                }

            </Tabs>


        </Wrapper>
    )
})
const Wrapper = styled.div`
  .heard {
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