import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function RadioItem(props: any) {
  return (
    <div className="itemAnswer">
      {props.type == 'date(yyyy-mm-dd)' ? '' : props.prefixDescription}
      <input type="text"
        disabled={props.disabled}
        value={props.value}
        onInput={props.event}
      />
    </div>
  )
}