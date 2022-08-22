import { TextAreaProps } from "antd/es/input"
import TextArea from "antd/es/input/TextArea"
import React, { memo } from "react"

const TTextArea = memo(function(props: TextAreaProps) {
  return <TextArea
    {...props} />
  }, (per, cur) => {
    return per.value  ===  cur.value
  })
export default TTextArea