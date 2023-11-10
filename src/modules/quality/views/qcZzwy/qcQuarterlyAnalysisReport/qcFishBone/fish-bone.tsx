import {useEffect, useState} from "react"
import {Obj} from "src/libs/types"
import styled from "styled-components"
import React from 'react'
import {Button, Input, Icon, message} from "antd"
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";

const {TextArea} = Input
let list = [
    {
        title: "",
        idx: 1,
        style: {top: '7px', left: '79px'},
        // buttonStyle: {top: '0', left: '276px'},
        key: 'v0',
        child: [
            // {
            //     key: "v1",
            //     style: {top: '276px', left: '172px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v2",
            //     style: {top: '240px', left: '324px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v3",
            //     style: {top: '96px', left: '257px'},
            //     hide: false,
            //     value: '',
            // },
            {
                key: "v4",
                style: {top: '212px', left: '54px'},
                hide: false,
                value: '',
            },
            {
                key: "v5",
                style: {top: '144px', left: '258px'},
                hide: false,
                value: '',
            },
            // {
            //     key: "v6",
            //     style: {top: '127px', left: '105px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v7",
            //     style: {top: '35px', left: '227px'},
            //     hide: false,
            //     value: '',
            // },
            {
                key: "v8",
                style: {top: '102px', left: '41px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 2,
        key: 'v17',
        style: {top: '0', left: '367px'},
        buttonStyle: {top: '-24px', left: '560px'},
        child: [
            // {
            //     key: "v9",
            //     style: {top: '281px', left: '429px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v10",
            //     style: {top: '248px', left: '581px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v11",
            //     style: {top: '175px', left: '555px'},
            //     hide: false,
            // },
            {
                key: "v12",
                style: {top: '232px', left: '377px'},
                hide: false,
                value: '',
            },
            // {
            //     key: "v13",
            //     style: {top: '100px', left: '525px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v14",
            //     style: {top: '132px', left: '368px'},
            //     hide: false,
            //     value: '',
            // },
            {
                key: "v15",
                style: {top: '110px', left: '555px'},
                hide: false,
                value: '',
            },
            {
                key: "v16",
                style: {top: '59px', left: '307px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 3,
        key: 'v18',
        style: {top: '565px', left: '75px'},
        buttonStyle: {top: '551px', left: '174px'},
        child: [
            {
                key: "v19",
                style: {top: '336px', left: '87px'},
                hide: false,
                value: '',
            },
            {
                key: "v20",
                style: {top: '402px', left: '275px'},
                hide: false,
                value: '',
            },
            // {
            //     key: "v21",
            //     style: {top: '382px', left: '46px'},
            //     hide: false,
            // },
            // {
            //     key: "v22",
            //     style: {top: '432px', left: '192px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v23",
            //     style: {top: '451px', left: '12px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v24",
            //     style: {top: '500px', left: '158px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v25",
            //     style: {top: '520px', left: '-22px'},
            //     hide: false,
            //     value: '',
            // },
            {
                key: "v26",
                style: {top: '458px', left: '38px'},
                hide: false,
                value: '',
            },
        ],
    },
    {
        title: "",
        idx: 5,
        key: 'v28',
        style: {top: '567px', left: '394px'},
        buttonStyle: {top: '530px', left: '452px'},
        child: [
            {
                key: "v29",
                style: {top: '331px', left: '400px'},
                hide: false,
                value: '',
            },
            {
                key: "v30",
                style: {top: '398px', left: '592px'},
                hide: false,
                value: '',
            },
            // {
            //     key: "v31",
            //     style: {top: '391px', left: '292px'},
            //     hide: false,
            // },
            // {
            //     key: "v32",
            //     style: {top: '432px', left: '439px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v33",
            //     style: {top: '469px', left: '272px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v34",
            //     style: {top: '500px', left: '418px'},
            //     hide: false,
            //     value: '',
            // },
            // {
            //     key: "v35",
            //     style: {top: '535px', left: '244px'},
            //     hide: false,
            //     value: '',
            // },
            {
                key: "v36",
                style: {top: '494px', left: '305px'},
                hide: false,
                value: '',
            },
        ],
    },
    // {
    //     title: "",
    //     idx: 6,
    //     key: 'v37',
    //     style: {top: '602px', left: '500px'},
    //     buttonStyle: {top: '506px', left: '652px'},
    //     child: [
    //         {
    //             key: "v38",
    //             style: {top: '327px', left: '520px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v39",
    //             style: {top: '355px', left: '686px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v40",
    //             style: {top: '391px', left: '512px'},
    //             hide: false,
    //         },
    //         {
    //             key: "v41",
    //             style: {top: '432px', left: '649px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v42",
    //             style: {top: '469px', left: '492px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v43",
    //             style: {top: '500px', left: '638px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v44",
    //             style: {top: '535px', left: '464px'},
    //             hide: false,
    //             value: '',
    //         },
    //         {
    //             key: "v45",
    //             style: {top: '562px', left: '620px'},
    //             hide: false,
    //             value: '',
    //         },
    //     ],
    // },
]
// const fishBoneSvg = require('./fish-bone.svg')
const fishBoneSvg = require('./method-draw-image.svg')

/**
 * reflect 映射
 */
export interface Props {
    /**回显数据**/
    value?: Obj,
    /**接收值**/
    onChange?: Function,
    updateFish?: any
    index: number
    isPrint?: boolean

}

export default function QcFishBone(props: any) {
    const {value, onChange, updateFish, index, isPrint} = props
    // const generateData = (count: any) => {
    //     const data = {};
    //     for (let i = 0; i <= count; i++) {
    //         const key = `v${i}`;
    //         const value = `b006208${i + 4}`;
    //         data[key] = value;
    //     }
    //     return Object.freeze(data);
    // };
    const defEditVal = () => Array.from(Array(50)).reduce((prev, cur, i) => {
        prev[`v${i + 1}`] = '';
        return prev
    }, {})
    // const reflect: any = generateData(50)
    const [editVal, setEditVal] = useState<Obj>(defEditVal)
    const [listState, setListState] = useState([...list]); // 初始化状态
    // useEffect(() => {
    //     /**需要重新变为false**/
    //     let newList = list.map((item: any) => {
    //         item.child.map((i: any) => {
    //             i['hide'] = false
    //             i[]
    //             return i
    //         })
    //         return item
    //     })
    //     setListState([...newList])
    // }, [value])
    useEffect(() => {
        setEditVal(value)
    }, [updateFish])
    const onIpt = (e: Obj, key: string) => {
        setEditVal({...editVal, [key]: e.target.value})
        setEditVal((vb: any) => {
            onChange && onChange(vb, index)
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
        if (listState[k].child.filter((item: any) => !item.hide).length == 8) {
            return message.info('不能再多了~')
        }
        const newList = [...listState];
        const hideIndex = newList[k].child.findIndex((item: any) => item.hide);
        if (hideIndex !== -1) {
            newList[k].child[hideIndex].hide = false;
            newList[k].child[hideIndex].value = '';
            setListState(newList);
        }
    };
    return (<Wrapper className="fb-container">
        {
            QuarterlyZzwyData.fishValueObj.length > 1 && <Button
                className='fb-button-delete'
                type='danger' size='small'
                onClick={() => QuarterlyZzwyData.handleDeleteFishValue(index)}>删除</Button>
        }
        <img className="fb-bg" alt="鱼骨图" src={fishBoneSvg}/>
        <div className="fb-ctx">
            {listState.map((v: any, k: number) =>
                <>
                    <>
                        {isPrint ? <p className='fb-ctx-ipt print-page__pfish print-page__ptext print-page__ipt'
                                      style={{
                                          ...v.style,
                                          whiteSpace: 'pre-wrap',
                                          // textDecoration:"underline",
                                          // borderBottom:'1px solid #00A680'
                                      }}>{editVal ? editVal[v.key] : ''}</p> :
                            <Input className="fb-ctx-item"
                                   maxLength={25}
                                   onInput={(e) => onIpt(e, v.key)}
                                   value={editVal ? editVal[v.key] : ''} key={v.idx} style={v.style}/>
                        }
                        {/*<Button className='fb-ctx-add' size={'small'} style={v.buttonStyle}*/}
                        {/*        onClick={() => handleAddElement(k)}>+</Button>*/}
                    </>
                    {
                        v.child.map((v1: any, vKey: number) => {
                            if (!v1.hide) {
                                return (
                                    <div id='input-container'>
                                        {
                                            isPrint ?
                                                <p className='fb-ctx-ipt print-page__pfish print-page__ptext print-page__ipt'
                                                   style={{
                                                       ...v1.style,
                                                       whiteSpace: 'pre-wrap',
                                                       textDecoration:"underline",
                                                       borderBottom:'1px solid #000'
                                                   }}>{editVal ? editVal[v1.key] : ''}</p> :
                                                <TextArea
                                                    maxLength={25}
                                                    className="fb-ctx-ipt"
                                                    key={v1.key}
                                                    style={v1.style}
                                                    value={editVal ? editVal[v1.key] : ''}
                                                    onInput={(e) => onIpt(e, v1.key)}
                                                />
                                        }
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
        {isPrint ? <p className='fb-header__ipt print-page__pfish print-page__ptext print-page__ipt'
                      style={{
                          whiteSpace: 'pre-wrap',
        }}>{editVal ? editVal.v46 : ''}</p> : <TextArea
            className="fb-header__ipt"
            maxLength={300}
            value={editVal ? editVal.v46 : ''}
            onInput={(e: Obj) => onIpt(e, 'v46')}
        />}
    </Wrapper>)
}

const Wrapper = styled.div`

  &.fb-container {
    margin: 50px 0;
    position: relative;
    height: 611px;

    .fb-button-delete {
      position: absolute;
      right: 20px;
      top: -10px;
    }

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
      right: 44px;
      top: 25%;
      width: 80px !important;
      background: transparent;
      height: 300px !important;
    }

    .delete-icon {
      visibility: hidden;
    }

    #input-container:hover .delete-icon {
      visibility: visible;
    }
  }
`
