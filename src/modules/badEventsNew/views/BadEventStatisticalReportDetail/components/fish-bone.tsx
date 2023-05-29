import { useEffect, useState } from "react"
import { Obj } from "src/libs/types"
import styled from "styled-components"
import React from 'react'
import { Input } from "antd"
const list = [
  {
    text: "个人因素",
    idx: 1,
    style: { top: '0', left: '126px' },
    child: [
      {
        key: "v1",
        style: { top: '31px', left: '45px' },
      },
      {
        key: "v2",
        style: { top: '64px', left: '184px' },
      },
      {
        key: "v3",
        style: { top: '100px', left: '77px' },
      },
    ],
  },
  {
    text: "管 理",
    idx: 2,
    style: { top: '0', left: '409px' },
    child: [
      {
        key: "v4",
        style: { top: '31px', left: '319px' },
      },
      {
        key: "v5",
        style: { top: '64px', left: '462px' },
      },
      {
        key: "v6",
        style: { top: '100px', left: '350px' },
      },
    ],
  },
  {
    text: "环 境",
    idx: 3,
    style: { bottom: '0', left: '113px' },
    child: [
      {
        key: "v7",
        style: { bottom: '105px', left: '46px' },
      },
      {
        key: "v8",
        style: { bottom: '70px', left: '158px' },
      },
      {
        key: "v9",
        style: { bottom: '35px', left: '18px' },
      },
    ],
  },
  {
    text: "制 度",
    idx: 4,
    style: { bottom: '0', left: '270px' },
    child: [
      {
        key: "v10",
        style: { bottom: '105px', left: '203px' },
      },
      {
        key: "v11",
        style: { bottom: '70px', left: '315px' },
      },
      {
        key: "v12",
        style: { bottom: '35px', left: '174px' },
      },
    ],
  },
  {
    text: "设 备",
    idx: 5,
    style: { bottom: '0', left: '433px' },
    child: [
      {
        key: "v13",
        style: { bottom: '105px', left: '364px' },
      },
      {
        key: "v14",
        style: { bottom: '70px', left: '476px' },
      },
      {
        key: "v15",
        style: { bottom: '35px', left: '334px' },
      },
    ],
  },
]
const fishBoneSvg = require('./fish-bone.svg')
/**
 * reflect 映射
 */
export interface Props {
  value?: Obj,
  onChange?: Function,
  reflect?: Obj

}
export default function FishBone1(props: any) {
  const { value, onChange, reflect } = props
  const defEditVal = () => Array.from(Array(15)).reduce((prev, cur, i) => { prev[`v${i + 1}`] = ''; return prev }, {})
  const [editVal, setEditVal] = useState<Obj>(defEditVal)
  useEffect(() => {
    if (reflect) {
      const obj: Obj = {}
      for (const key in reflect) {
        obj[key] = value[reflect[key]]
      }
      setEditVal(obj)
    }
  }, [value])
  useEffect(() => {
    
    // setEditVal(value)
    console.log('test-editVal', editVal)
  }, [editVal])
  const onIpt = (e: Obj, key: string) => {

    setEditVal({ ...editVal, [key]: e.target.value })
    onChange && onChange({ [reflect[key]]: e.target.value })
  }

  return (<Wrapper className="fb-container">
    <img className="fb-bg" src={fishBoneSvg} alt="鱼骨" />
    <div className="fb-ctx">
      {list.map((v: any) =>
        <>
          <div className="fb-ctx-item" key={v.idx} style={v.style}>
            {v.text}
          </div>
          {
            v.child.map((v1: any) =>
              <Input
                className="fb-ctx-ipt"
                key={v1.key}
                style={v1.style}
                value={editVal ? editVal[v1.key] : ''}
                onInput={(e) => onIpt(e, v1.key)}
              />
            )}
        </>
      )
      }
    </div>
    <Input
      className="fb-header__ipt"
      type="text"
      value={editVal ? editVal.v0 : ''}
      onInput={(e: Obj) => onIpt(e, 'v0')}
    />
  </Wrapper>)
}

const Wrapper = styled.div`

&.fb-container {
  position: relative;
  height:300px;
  .fb-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .fb-ctx-item {
    border: 1px solid #000;
    position: absolute;
  }
  .fb-ctx-ipt {
    position: absolute;
    width: 120px !important;
    background: transparent;
    font-size: 12px;
    &:nth-child(2n) {
      text-align: right;
    }
  }

  .fb-header__ipt {
    position: absolute;
    right: 0;
    top: 50%;
    width: 100px !important;
    background: transparent;
  }
}
`
