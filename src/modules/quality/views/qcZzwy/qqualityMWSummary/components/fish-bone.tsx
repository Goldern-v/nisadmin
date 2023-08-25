import { useEffect, useState } from "react"
import { Obj } from "src/libs/types"
import styled from "styled-components"
import React from 'react'
import { Input } from "antd"
const { TextArea } = Input;

const list = [
  {
    text: "个人因素",
    idx: 1,
    style: { top: '-6px', left: '78px' },
    key: 'v0',
    child: [
      {
        key: "v1",
        style: { top: '40px', left: '31px' },
      },
      {
        key: "v2",
        style: { top: '24px', left: '138px' },
      },
      {
        key: "v3",
        style: { top: '104px', left: '58px' },
      },
      {
        key: "v4",
        style: { top: '88px', left: '164px' },
      },
    ],
  },
  {
    text: "管 理",
    idx: 2,
    style: { top: '-6px', left: '226px' },
    key: 'v5',
    child: [
      {
        key: "v6",
        style: { top: '62px', left: '305px' },
      },
      {
        key: "v7",
        style: { top: '54px', left: '188px' },
      },
      {
        key: "v8",
        style: { top: '118px', left: '214px', textAlign: 'right'},
      },
    ],
  },
  {
    text: "管 理",
    idx: 2,
    style: { top: '-6px', left: '377px' },
    key: 'v9',
    child: [
      {
        key: "v10",
        style: { top: '35px', left: '449px' },
      },
      {
        key: "v11",
        style: { top: '95px', left: '359px' },
      },
      {
        key: "v12",
        style: { top: '94px', left: '471px' },
      },
    ],
  },
  {
    text: "环 境",
    idx: 3,
    style: { bottom: '22px', left: '78px' },
    key: "v13",
    child: [
      {
        key: "v14",
        style: { bottom: '108px', left: '58px', textAlign: 'right' },
      },
      {
        key: "v15",
        style: { bottom: '70px', left: '158px', textAlign: 'left' },
      },
      {
        key: "v16",
        style: { bottom: '45px', left: '33px', textAlign: 'right' },
      },
    ],
  },
  {
    text: "制 度",
    idx: 4,
    style: { bottom: '22px', left: '232px' },
    key: "v17",
    child: [
      {
        key: "v18",
        style: { bottom: '106px', left: '211px', textAlign: 'right'  },
      },
      {
        key: "v19",
        style: { bottom: '93px', left: '320px', textAlign: 'left' },
      },
      {
        key: "v20",
        style: { bottom: '59px', left: '305px' },
      },
      {
        key: "v21",
        style: { bottom: '33px', left: '182px' },
      },
    ],
  },
  {
    text: "设 备",
    idx: 5,
    style: { bottom: '22px', left: '384px' },
    key: "v22",
    child: [
      {
        key: "v23",
        style: { bottom: '121px', left: '372px' },
      },
      {
        key: "v24",
        style: { bottom: '65px', left: '465px' },
      },
      {
        key: "v25",
        style: { bottom: '27px', left: '335px' },
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
    <Input
      className="fb-trail__ipt"
      value={editVal ? editVal.v27 : ''}
      onInput={(e: Obj) => onIpt(e, 'v27')}
    />
    <div className="fb-ctx">
      {list.map((v: any) =>
        <>
          <div className="fb-ctx-item" key={v.idx} style={v.style}>
            {/* {v.text} */}
            <Input
              className="fb-ctx-ipt"
              key={v.key}
              style={{ textAlign: 'center' }}
              value={editVal ? editVal[v.key] : ''}
              onInput={(e) => onIpt(e, v.key)}
            />
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
      value={editVal ? editVal.v26 : ''}
      onInput={(e: Obj) => onIpt(e, 'v26')}
    />
  </Wrapper>)
}

const Wrapper = styled.div`
  margin: 20px 0;

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
    position: absolute;
  }
  .fb-ctx-ipt {
    position: absolute;
    width: 100px !important;
    background: transparent;
    font-size: 12px;
    height: 25px !important;
    &:nth-child(2n) {
      text-align: right;
    }
  }

  .fb-header__ipt, .fb-trail__ipt {
    position: absolute;
    top: 45%;
    width: 100px !important;
    background: transparent;
    text-align: center;
    height: 25px !important;
  }
  .fb-header__ipt{
    right: 0;
  }
  .fb-trail__ipt{
    left: 0;
  }
}
`
