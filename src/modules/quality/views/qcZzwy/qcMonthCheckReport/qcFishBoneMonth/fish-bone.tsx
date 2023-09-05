import {useEffect, useState} from "react"
import {Obj} from "src/libs/types"
import styled from "styled-components"
import React from 'react'
import {Button, Input, Icon} from "antd"
// import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";

import debounce from "lodash/debounce";
import { qcMonthCheckData } from "../qcMonthCheckData"
const {TextArea} = Input
const list = [
    {
        title: "",
        idx: 1,
        style: {top: '0', left: '126px'},
        buttonStyle: {top: '0', left: '276px'},
        key: 'v0',
        child: [
            {
                key: "v1",
                style: {top: '276px', left: '172px'},
                hide: false,
                value: '',
            },
            {
                key: "v2",
                style: {top: '240px', left: '324px'},
                hide: false,
                value: '',
            },
            {
                key: "v3",
                style: {top: '96px', left: '257px'},
                hide: false,
                value: '',
            },
            {
                key: "v4",
                style: {top: '205px', left: '139px'},
                hide: false,
                value: '',
            },
            {
                key: "v5",
                style: {top: '168px', left: '290px'},
                hide: false,
                value: '',
            },
            {
                key: "v6",
                style: {top: '127px', left: '105px'},
                hide: false,
                value: '',
            },
            {
                key: "v7",
                style: {top: '35px', left: '227px'},
                hide: false,
                value: '',
            },
            {
                key: "v8",
                style: {top: '62px', left: '73px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 2,
        key: 'v17',
        style: {top: '0', left: '409px'},
        buttonStyle: {top: '-24px', left: '560px'},
        child: [
            {
                key: "v9",
                style: {top: '281px', left: '429px'},
                hide: false,
                value: '',
            },
            {
                key: "v10",
                style: {top: '248px', left: '581px'},
                hide: false,
                value: '',
            },
            {
                key: "v11",
                style: {top: '175px', left: '555px'},
                hide: false,
            },
            {
                key: "v12",
                style: {top: '205px', left: '397px'},
                hide: false,
                value: '',
            },
            {
                key: "v13",
                style: {top: '100px', left: '525px'},
                hide: false,
                value: '',
            },
            {
                key: "v14",
                style: {top: '132px', left: '368px'},
                hide: false,
                value: '',
            },
            {
                key: "v15",
                style: {top: '34px', left: '497px'},
                hide: false,
                value: '',
            },
            {
                key: "v16",
                style: {top: '69px', left: '344px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 3,
        key: 'v18',
        style: {top: '598px', left: '21px'},
        buttonStyle: {top: '551px', left: '174px'},
        child: [
            {
                key: "v19",
                style: {top: '327px', left: '74px'},
                hide: false,
                value: '',
            },
            {
                key: "v20",
                style: {top: '355px', left: '225px'},
                hide: false,
                value: '',
            },
            {
                key: "v21",
                style: {top: '382px', left: '46px'},
                hide: false,
            },
            {
                key: "v22",
                style: {top: '432px', left: '192px'},
                hide: false,
                value: '',
            },
            {
                key: "v23",
                style: {top: '451px', left: '12px'},
                hide: false,
                value: '',
            },
            {
                key: "v24",
                style: {top: '500px', left: '158px'},
                hide: false,
                value: '',
            },
            {
                key: "v25",
                style: {top: '520px', left: '-22px'},
                hide: false,
                value: '',
            },
            {
                key: "v26",
                style: {top: '562px', left: '127px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 5,
        key: 'v28',
        style: {top: '602px', left: '300px'},
        buttonStyle: {top: '530px', left: '452px'},
        child: [
            {
                key: "v29",
                style: {top: '327px', left: '300px'},
                hide: false,
                value: '',
            },
            {
                key: "v30",
                style: {top: '355px', left: '466px'},
                hide: false,
                value: '',
            },
            {
                key: "v31",
                style: {top: '391px', left: '292px'},
                hide: false,
            },
            {
                key: "v32",
                style: {top: '432px', left: '439px'},
                hide: false,
                value: '',
            },
            {
                key: "v33",
                style: {top: '469px', left: '272px'},
                hide: false,
                value: '',
            },
            {
                key: "v34",
                style: {top: '500px', left: '418px'},
                hide: false,
                value: '',
            },
            {
                key: "v35",
                style: {top: '535px', left: '244px'},
                hide: false,
                value: '',
            },
            {
                key: "v36",
                style: {top: '562px', left: '400px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 6,
        key: 'v37',
        style: {top: '602px', left: '500px'},
        buttonStyle: {top: '506px', left: '652px'},
        child: [
            {
                key: "v38",
                style: {top: '327px', left: '520px'},
                hide: false,
                value: '',
            },
            {
                key: "v39",
                style: {top: '355px', left: '686px'},
                hide: false,
                value: '',
            },
            {
                key: "v40",
                style: {top: '391px', left: '512px'},
                hide: false,
            },
            {
                key: "v41",
                style: {top: '432px', left: '649px'},
                hide: false,
                value: '',
            },
            {
                key: "v42",
                style: {top: '469px', left: '492px'},
                hide: false,
                value: '',
            },
            {
                key: "v43",
                style: {top: '500px', left: '638px'},
                hide: false,
                value: '',
            },
            {
                key: "v44",
                style: {top: '535px', left: '464px'},
                hide: false,
                value: '',
            },
            {
                key: "v45",
                style: {top: '562px', left: '620px'},
                hide: false,
                value: '',
            },
        ],
    },
]
const fishBoneSvg = require('./fish-bone.svg')

/**
 * reflect 映射
 */
export interface Props {
    /**回显数据**/
    value?: Obj,
    /**接收值**/
    onChange?: Function,
    updateFish?:any,
    index?:number,
    isPrint?:boolean

}

export default function QcFishBoneMonth(props: any) {
    const {value, onChange,updateFish,index,isPrint} = props
    const generateData = (count: any) => {
        const data = {};
        for (let i = 0; i <= count; i++) {
            const key = `v${i}`;
            const value = `b006208${i + 4}`;
            data[key] = value;
        }
        return Object.freeze(data);
    };
    const defEditVal = () => Array.from(Array(50)).reduce((prev, cur, i) => {
        prev[`v${i + 1}`] = '';
        return prev
    }, {id:Math.floor(1000 + Math.random() * 9000)})
    const reflect: any = generateData(40)
    const [editVal, setEditVal] = useState<Obj>(defEditVal)
    const [listState, setListState] = useState([...list]); // 初始化状态
    
    useEffect(() => {
        setEditVal(value)
        // setEditVal(qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.fishValueObj)
        
    }, [updateFish])

    const handleSearch = debounce((value: any, key: string) => {
        onChange && onChange({...editVal, [key]: value})
      }, 5000); // 设置延迟时间为 500 毫秒
    

    const onIpt = (e: Obj, key: string) => {
        // const {value} = e.target || ''
        setEditVal({...editVal, [key]: e.target.value || ''})
        setEditVal((vb:any)=>{
            onChange && onChange(vb,index)
            return vb
        })
        
    }
    /**删除选中元素**/
    const handleDelete = (k: number, vKey: number) => {
        const newList = [...listState];
        let obj: any = newList[k].child[vKey]
        newList[k].child[vKey]['hide'] = true; // 设置隐藏属性为 true
        newList[k].child[vKey]['value'] = ''
        editVal[obj['key']] = ''
        onChange && onChange(editVal)
        setListState(newList);
    };
    const handleAddElement = (k: number) => {
        const newList = [...listState];
        const hideIndex = newList[k].child.findIndex((item: any) => item.hide);
        if (hideIndex !== -1) {
            newList[k].child[hideIndex].hide = false;
            newList[k].child[hideIndex].value = '';
            setListState(newList);
        }
    };
    return (<Wrapper>
        <div className="fb-container">
        {/* {
            qcMonthCheckData.ZZWY_YDZKJCZJ_L1_003.fishValueArr.length > 1 && <Button
                className='fb-button-delete'
                type='danger' size='small'
                onClick={() => QuarterlyZzwyData.handleDeleteFishValue(index)}>删除</Button>
        } */}
        <img className="fb-bg" src={fishBoneSvg} alt="鱼骨"/>
        <div className="fb-ctx">
            {listState.map((v: any, k: number) =>
                <>
                    <>
                    {isPrint?<p className='fb-ctx-ipt print-page__pfish print-page__ptext print-page__ipt' style={{ ...v.style,'whiteSpace': 'pre-wrap' }}>{editVal ? editVal[v.key] : ''}</p>:
                    <Input className="fb-ctx-item"
                                // key={editVal.id+v.key}
                                // data-key={editVal.id+v.key}
                               maxLength={25}
                               onChange={(e) => onIpt(e, v.key)}
                               value={editVal ? editVal[v.key] : ''}  style={v.style}/>}
                        <Button className='fb-ctx-add' size={'small'} style={v.buttonStyle}
                                onClick={() => handleAddElement(k)}>+</Button>
                    </>
                    {
                        v.child.map((v1: any, vKey: number) => {
                            if (!v1.hide) {
                                return (
                                    <div id='input-container'>
                                        {isPrint?<p className='fb-ctx-ipt print-page__ptext print-page__pfish print-page__ipt' style={{ ...v1.style,'whiteSpace': 'pre-wrap' }}>{editVal ? editVal[v1.key] : ''}</p>:
                                        <TextArea
                                        // data-key={editVal.id+v1.key}
                                            maxLength={25}
                                            className="fb-ctx-ipt"
                                            // key={editVal.id+v1.key}
                                            style={v1.style}
                                            value={editVal ? editVal[v1.key] : ''}
                                            onChange={(e) => onIpt(e, v1.key)}
                                        />}

                                        {
                                            vKey > 2 && <Icon
                                                className="delete-icon"
                                                style={{
                                                    position: 'absolute',
                                                    top: `${parseInt(v1.style.top) - 8}px`,
                                                    width: '20px',
                                                    height: '20px',
                                                    color: 'red',
                                                    left: `${parseInt(v1.style.left) + 140 - 10}px`,
                                                    opacity: .7
                                                }}
                                                onClick={() => handleDelete(k, vKey)}
                                                type="delete"/>
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </>
            )
            }
        </div>
        {isPrint?<p className='fb-header__ipt print-page__pfish print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{editVal ? editVal.v46 : ''}</p>:<Input
            // key={editVal.id+'v46'}
            className="fb-header__ipt"
            type="text"
            maxLength={25}
            value={editVal ? editVal.v46 : ''}
            onChange={(e: Obj) => onIpt(e, 'v46')}
        />}
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
margin: 20px 0;
p{
    
}
.print-page__pfish{
    margin: 0;
		white-space:normal; 
		word-break:break-all;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		padding: 2px;
	}
  .fb-container {
    position: relative;
    height: 611px;

    .fb-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .fb-ctx-item {
      width: 150px;
      position: absolute;

    }

    .fb-ctx-add {
      font-size: 14px;
      color: red;
    }

    .fb-ctx-ipt {
      position: absolute;
      width: 140px !important;
      background: transparent;
      height: 28px;
      font-size: 12px;

      &:nth-child(2n) {
        //text-align: right;
      }

      //:focus{
      //  
      //}
    }

    .fb-header__ipt {
      position: absolute;
      right: 20px;
      top: 50%;
      width: 100px !important;
      background: transparent;
    }

    .delete-icon {
      visibility: hidden;
    }

    #input-container:hover .delete-icon {
      visibility: visible;
    }
  }
`
