import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function CheckboxItem(props: any) {

  return (
    <label>
      <div className="itemAnswer">
        <input
          type="checkbox"
          disabled={props.disabled}
          name={props.name}
          value={props.saveValue}
          checked={props.checked}
          data-checked={props.checked || false}
          onClick={props.event}
        />
        {props.value}
      </div>
    </label>
  )
}