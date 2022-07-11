import React from 'react'

import OneLevelTitle from './OneLevelTitle'
import TwoLevelTitle from './TwoLevelTitle'

export interface Props {
  text: any
  level?: string | number | undefined
  [p:string]: any
}

export default function LevelTitle(props: Props) {
  const {level = 1} = props
  return <>
  {level == 1 && <OneLevelTitle text={props.text}/> }
  {level == 2 && <TwoLevelTitle text={props.text}/> }
  </>
}
