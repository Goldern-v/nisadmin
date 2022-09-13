import styled from 'styled-components'
import React, {useState} from 'react'
import {Radio, Checkbox} from 'antd'
import {ScrollBox} from 'src/components/common'
export interface Props {
    filterObj?: any
    onFilterObjChange?: Function
}

let checkOther: any = []

export default function QHWYShiftChoose(props: Props) {
    const {filterObj, onFilterObjChange} = props

    const visibleType:any = Object.keys(filterObj).find((key: string) => filterObj[key].checked)
    // 控制全选
    const [checkAll, setCheckAll]: any = useState([])
    // const [checkAll1, setCheckAll1]: any = useState([])
    // 初始化-控制复选框
    filterObj[visibleType || '']?.list?.forEach(() => {
        checkOther.push(true)
    })

    const handleTypeChange = (currentType: string) => {
        let newFilterObj = {...filterObj}

        if (currentType === 'shift_type') {
            setCheckAll(true)
            checkOther = []
            newFilterObj['shift_type']?.list?.forEach(() => {
                checkOther.push(true)
            })
        }

        let selectAll = true

        Object.keys(newFilterObj).forEach((key: string) => {
            let item = newFilterObj[key]
            if (currentType === key) {
                let newChecked = !newFilterObj[key].checked
                if (newChecked) selectAll = false

                item.checked = newChecked
                item.list = item.list.map((item: any) => ({...item, checked: newChecked}))
            } else {
                item.checked = false
                item.list = item.list.map((item: any) => ({...item, checked: false}))
            }
        })

        if (selectAll) {
            Object.keys(newFilterObj).forEach((key: string) => {
                let item = newFilterObj[key]
                item.list = item.list.map((item: any) => ({...item, checked: true}))
            })
        }

        onFilterObjChange && onFilterObjChange(newFilterObj)
    }

    // 全选按钮
    const onCheckAllChange = (e: { target: { checked: any } }) => {
        // 控制全选样式
        let newFilterObj = {...filterObj}
        setCheckAll(e.target.checked)
        checkOther = []
        newFilterObj[visibleType]?.list?.forEach((item: { checked: any }) => {
            checkOther.push(e.target.checked)
            item.checked = e.target.checked
        })
        // // 控制表格隐藏 显示
        onFilterObjChange && onFilterObjChange(newFilterObj)
    }

    const handleFilterChange = ($e: any, typeName: string, idx: number) => {
        let newFilterObj = {...filterObj}

        // 控制当选checkbox
        checkOther[idx] = $e.target.checked
        // 处理点击不是全选复选框 控制全选复选框勾选与否
        let arr = checkOther.find((item: boolean) => item === false)
        if (arr === undefined) setCheckAll(true)
        else setCheckAll(false)

        newFilterObj[typeName].list[idx].checked = $e.target.checked

        onFilterObjChange && onFilterObjChange(newFilterObj)
    }

    const filterList = (type:string) => {
        return (
            <React.Fragment>
                   <div>
                        <Checkbox
                            onChange={onCheckAllChange}
                            checked={checkAll}>
                            全选
                        </Checkbox>
                    </div>
                {
                    filterObj[type].list.map((item: any, itemIdx: number) => (
                        <div
                            key={itemIdx}
                            className="RightChooseByShiftCheckboxItem"
                            style={{display: (visibleType === type || !visibleType) ? 'block' : 'none'}}>
                            <Checkbox
                                checked={checkOther[itemIdx]}
                                onChange={(e) => handleFilterChange(e, type, itemIdx)}>
                                {item.name}
                            </Checkbox>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }

    return (
        <Con>
            {/* <TableModel /> */}
            <RightChooseByShift>
                <div className='RightChooseByShiftHeader'>统计班次</div>
                <div className='RightChooseByShiftRadio'>
                    <Radio
                        checked={filterObj['shift_type']?.checked}
                        onClick={() =>
                            handleTypeChange('shift_type')}>
                        按班次大类
                    </Radio>
                    <Radio
                        checked={filterObj['range_name']?.checked}
                        onClick={() =>
                            handleTypeChange('range_name')}>
                        自定义班次
                    </Radio>
                </div>
                <RightChooseByShiftCheckbox>
                    {filterList(visibleType)}
                </RightChooseByShiftCheckbox>
            </RightChooseByShift>
        </Con>
    )
}

const Con = styled.div`
  width: 100%;
`
const RightChooseByShift = styled.div`
  /* position: absolute;
  top: -270px;
  right: 20px; */
  height: 380px;
  border: 1px solid #d0d0d0;
  font-size: 12px;

  .RightChooseByShiftHeader {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    background-color: #e4e4e4;
  }

  .RightChooseByShiftRadio {
    padding-left: 10px;
    height: 44px;
    line-height: 44px;

    .ant-radio-wrapper {
      margin: 0;
      padding: 0;
      width: 104px;
    }
  }
`

// @ts-ignore
const RightChooseByShiftCheckbox = styled(ScrollBox)`
  /* 调整间距 */
  margin-top: 20px;
  padding-left: 10px;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  overflow-y: auto;
  height: 270px;

  .RightChooseByShiftCheckboxItem {
    width: 104px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
  }
`
