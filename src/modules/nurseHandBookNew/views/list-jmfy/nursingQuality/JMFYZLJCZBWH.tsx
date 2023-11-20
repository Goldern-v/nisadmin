import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button, Row, Col} from 'antd'
import {PageHeader, PageTitle, Place} from 'src/components/common'
import { Select, Input} from 'src/vendors/antd'
import {appStore, authStore} from 'src/stores'
import BaseTable from 'src/components/BaseTable'
import {observer} from 'mobx-react-lite'
import YearPicker from "src/components/YearPicker";
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {Obj} from "src/libs/types";
import createModal from "src/libs/createModal";
import AddClassModal from "src/modules/nurseHandBookNew/views/list-jmfy/nursingQuality/addClassModal";
import AddContent from "src/modules/nurseHandBookNew/views/list-jmfy/nursingQuality/addContent";

const {Option} = Select

export interface Props {
    title?: string
    menuCode?: string
}

export default observer(function (props: Props) {
    const {title, menuCode} = props
    const [pageLoading, setPageLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [menuList, setMenuList] = useState([])
    const [total, setTotal] = useState(0)
    const addClassModal = createModal(AddClassModal)  //分类添加
    const addContent = createModal(AddContent) ////指标添加
    const [query, setQuery] = useState<Obj>({
        deptCode: authStore.defaultDeptCode,
        pageSize: 20,
        menuCode: "",
        monitorContent: '',
        pageNum: 1,
        wideIndicators:1,
        assortCode:'',
    })

    let columns: any = [

        {
            title: '序号',
            dataIndex: 'index',
            width: 60,
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'deptName',
            width: 150,
            align: 'center'
        },
        {
            title: '指标名称',
            dataIndex: 'monitorContent',
            width: 100,
            align: 'center'
        },
        {
            title: '达标值',
            dataIndex: 'finalValue',
            width: 80,
            align: 'center'
        },
        {
            title: '汇总',
            width: 100,
            dataIndex: 'qualified',
            align: 'center'
        },

        {
            title: '均值(年)',
            width: 100,
            dataIndex: 'qualified',
            align: 'center'
        }
    ]
    const handleAddClass =()=>{
        addClassModal.show({
            onOkCb: onOkAddClass,
            menuCode:menuCode
        })
    }
    const onOkAddClass =()=>{

    }
    const handleAddContent =()=>{
        addContent.show({
            onOkCb: onOkAddContent,
            menuCode:menuCode
        })
    }
    const onOkAddContent =()=>{

    }
    const getMenuCode = () => {
        nurseHandBookService.getFormList().then(res => {
            setMenuList(res.data)
        })
    }
    const getData = () => {
        setPageLoading(true)
        nurseHandBookService.getPublicIndicatorsItem({...query}).then((res: Obj) => {
            setDataSource(res.data.list||[])
            setTotal(res.data.totalCount)
            setPageLoading(false)
        }).catch(e => setPageLoading(false))
    }
    useEffect(() => {
        getData()
    }, [query])
    useEffect(() => {
        if(menuCode){
            getMenuCode()
        }
    }, [menuCode])
    useEffect(() => {
        return () => {
            addClassModal.unMount()
            addContent.unMount()
        }
    }, [appStore.location.pathname])
    return (
        <Wrapper>
            <WrapperHeard>
                <PageTitle>{title}</PageTitle>
                <Place/>
                <Select value={query.wideIndicators} onChange={(e: any) => {
                    setQuery({...query, wideIndicators: e})
                }}>
                    {
                        [{label:'全院共性指标',value:1},{label:'专科指标',value:0}].map(v => (
                            <Option key={v.value} value={v.value}>{v.label}</Option>
                        ))
                    }</Select>
                <span className='label'>科室:</span>
                <Select value={query.deptCode} onChange={(e: any) => {
                    setQuery({...query, deptCode: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        authStore.deptList.map(v => (
                            <Option key={v.code} value={v.code}>{v.name}</Option>
                        ))
                    }</Select>

                <span className='label'>年份:</span>
                <YearPicker value={query.year} onChange={(e: any) => {
                    setQuery({...query, year: e})
                }}/>
                <span className='label'>分类:</span>
                <Select value={query.assortCode} onChange={(e: any) => {
                    setQuery({...query, assortCode: e})
                }}>
                    <Option key={0} value={''}>全部</Option>
                    {
                        menuList.map((v:any) => (
                            <Option key={v.menuCode} value={v.menuCode}>{v.name}</Option>
                        ))
                    }
                </Select>
                <Input
                    placeholder='请输入指标名称'
                    style={{width: '120px'}} value={query.monitorContent} onChange={(e: any) => {
                    setQuery({...query, year: e.target.value})
                }}/>
                <Button type='primary' onClick={handleAddContent}>新增</Button>
                <Button type='primary' onClick={handleAddClass}>分类维护</Button>
                <Button type='primary'>导入</Button>
                <Button type='primary'>导出模板</Button>
            </WrapperHeard>
            <BaseTable
                loading={pageLoading}
                dataSource={dataSource}
                columns={columns}
                wrapperStyle={{margin: '0 15px'}}
                type={['index']}
                pagination={{
                    current: query.pageNum,
                    pageSize: query.pageSize,
                    total,
                }}
                onChange={(pagination) => {
                    setQuery({
                        ...query,
                        pageNum: pagination.current,
                        pageSize: pagination.pageSize,
                    })
                }}
            />
            <addClassModal.Component/>
            <addContent.Component/>
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