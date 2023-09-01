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
    style: { top: '0', left: '78px' },
    key: 'v0',
    child: [
      {
        key: "v1",
        style: { top: '55px', left: '32px' },
      },
      {
        key: "v2",
        style: { top: '42px', left: '142px' },
      },
      {
        key: "v3",
        style: { top: '110px', left: '49px' },
      },
      {
        key: "v4",
        style: { top: '110px', left: '164px' },
      },
    ],
  },
  {
    text: "管 理",
    idx: 2,
    style: { top: '0', left: '226px' },
    key: 'v5',
    child: [
      {
        key: "v6",
        style: { top: '62px', left: '305px' },
      },
      {
        key: "v7",
        style: { top: '74px', left: '192px' },
      },
      {
        key: "v8",
        style: { top: '147px', left: '214px', textAlign: 'right'},
      },
    ],
  },
  {
    text: "管 理",
    idx: 2,
    style: { top: '0', left: '377px' },
    key: 'v9',
    child: [
      {
        key: "v10",
        style: { top: '62px', left: '454px' },
      },
      {
        key: "v11",
        style: { top: '120px', left: '360px' },
      },
      {
        key: "v12",
        style: { top: '120px', left: '471px' },
      },
    ],
  },
  {
    text: "环 境",
    idx: 3,
    style: { bottom: '28px', left: '78px' },
    key: "v13",
    child: [
      {
        key: "v14",
        style: { bottom: '162px', left: '58px', textAlign: 'right' },
      },
      {
        key: "v15",
        style: { bottom: '128px', left: '161px', textAlign: 'left' },
      },
      {
        key: "v16",
        style: { bottom: '100px', left: '40px', textAlign: 'right' },
      },
    ],
  },
  {
    text: "制 度",
    idx: 4,
    style: { bottom: '28px', left: '232px' },
    key: "v17",
    child: [
      {
        key: "v18",
        style: { bottom: '170px', left: '216px', textAlign: 'right'  },
      },
      {
        key: "v19",
        style: { bottom: '142px', left: '318px', textAlign: 'left' },
      },
      {
        key: "v20",
        style: { bottom: '103px', left: '306px' },
      },
      {
        key: "v21",
        style: { bottom: '91px', left: '193px' },
      },
    ],
  },
  {
    text: "设 备",
    idx: 5,
    style: { bottom: '28px', left: '384px' },
    key: "v22",
    child: [
      {
        key: "v23",
        style: { bottom: '177px', left: '374px' },
      },
      {
        key: "v24",
        style: { bottom: '115px', left: '468px' },
      },
      {
        key: "v25",
        style: { bottom: '71px', left: '342px' },
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

  const onIpt = (e: Obj, key: string) => {

    setEditVal({ ...editVal, [key]: e.target.value })
    onChange && onChange({ [reflect[key]]: e.target.value })
  }

  return (<Wrapper>
    <div className="fb-container">
      <img className="fb-bg" src={fishBoneSvg} alt="鱼骨" />
      <Input
        className="fb-trail__ipt"
        value={editVal ? editVal.v27 : ''}
        onInput={(e: Obj) => onIpt(e, 'v27')}
      />
      <div className="fb-ctx">
        {list.map((v: any) =>
          <>
            <div className="fb-ctx-item" key={v.idx} style={v.style} >
              {/* {v.text} */}
              <Input
                className="fb-ctx-ipt"
                type="text"
                key={v.key}
                style={{ textAlign: 'center' }}
                value={editVal ? editVal[v.key] : ''}
                onInput={(e) => onIpt(e, v.key)}
              />
            </div>
            {
              v.child.map((v1: any) =>
                <span className="fb-ctx-div" style={v1.style}>
                  <Input
                    className="fb-ctx-ipt"
                    type="text"
                    key={v1.key}
                    style={{ textAlign: 'center' }}
                    value={editVal ? editVal[v1.key] : ''}
                    onInput={(e) => onIpt(e, v1.key)}
                  />
                </span>
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
    </div>
  </Wrapper>)
}

const Wrapper = styled.div`
  margin: 20px auto;
  width: 700px;
  .fb-container {
    position: relative;
    height:400px;
    width: 100%;
    .fb-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .fb-ctx-item, .fb-ctx-div {
      position: absolute;
      text-align: center;
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
      top: 46.5%;
      width: 100px !important;
      background: transparent;
      text-align: center;
      height: 25px !important;
    }
    .fb-header__ipt{
      right: 0;
    }
    .fb-trail__ipt{
      left: 28px;
      top: 43%;
    }
  }
`
