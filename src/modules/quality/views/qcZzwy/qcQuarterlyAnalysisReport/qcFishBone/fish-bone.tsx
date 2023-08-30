import {useEffect, useState} from "react"
import {Obj} from "src/libs/types"
import styled from "styled-components"
import React from 'react'
import {Button, Input, Icon} from "antd"

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

}

export default function QcFishBone(props: any) {
    const {value, onChange} = props
    const generateData = (count: any) => {
        const data = {};
        for (let i = 0; i <= count; i++) {
            const key = `v${i}`;
            const value = `b006208${i + 4}`;
            data[key] = value;
        }
        return Object.freeze(data);
    };
    const defEditVal = () => Array.from(Array(40)).reduce((prev, cur, i) => {
        prev[`v${i + 1}`] = '';
        return prev
    }, {})
    const reflect: any = generateData(40)
    const [editVal, setEditVal] = useState<Obj>(defEditVal)
    const [listState, setListState] = useState([...list]); // 初始化状态
    useEffect(() => {
        if (reflect) {
            const obj: Obj = {}
            for (const key in reflect) {
                obj[key] = value[reflect[key]] || ''
            }
            setEditVal(obj)
        }
    }, [value])
    // useEffect(() => {
    //     console.log('test-editVal', editVal)
    // }, [editVal])


    const onIpt = (e: Obj, key: string) => {
        setEditVal({...editVal, [key]: e.target.value})
        // onChange && onChange({[reflect[key]]: e.target.value})
        onChange && onChange(editVal)
    }
    /**删除选中元素**/
    const handleDelete = (k: number, vKey: number) => {
        const newList = [...listState];
        let obj: any = newList[k].child[vKey]
        newList[k].child[vKey]['hide'] = true; // 设置隐藏属性为 true
        newList[k].child[vKey]['value'] = ''
        editVal[obj['key']] = ''
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
    return (<Wrapper className="fb-container">
        <img className="fb-bg" src={fishBoneSvg} alt="鱼骨"/>
        <div className="fb-ctx">
            {listState.map((v: any, k: number) =>
                <>
                    <>
                        <Input className="fb-ctx-item"
                               maxLength={25}
                               onInput={(e) => onIpt(e, v.key)}
                               value={editVal ? editVal[v.key] : ''} key={v.idx} style={v.style}/>
                        <Button className='fb-ctx-add' size={'small'} style={v.buttonStyle}
                                onClick={() => handleAddElement(k)}>+</Button>
                    </>
                    {
                        v.child.map((v1: any, vKey: number) => {
                            if (!v1.hide) {
                                return (
                                    <div id='input-container'>
                                        <TextArea
                                            maxLength={25}
                                            className="fb-ctx-ipt"
                                            key={v1.key}
                                            style={v1.style}
                                            value={editVal ? editVal[v1.key] : ''}
                                            onInput={(e) => onIpt(e, v1.key)}
                                        />
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
        <Input
            className="fb-header__ipt"
            type="text"
            maxLength={25}
            value={editVal ? editVal.v18 : ''}
            onInput={(e: Obj) => onIpt(e, 'v0')}
        />
    </Wrapper>)
}

const Wrapper = styled.div`

  &.fb-container {
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
