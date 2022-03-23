import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function CheckText(props: any) {

  return (
    <label>
      <div className="itemAnswer">
        <input
          type="checkbox"
          name={props.name}
          value={props.saveValue}
          checked={props.checked}
          data-checked={props.checked || false}
          onClick={props.checkEvent}
        />
        {props.value} - {props.prefixDescription}：
        <input type="text"
          value={props.InpValue}
          onInput={props.InpEvent}
        />
      </div>
    </label>
  )
}