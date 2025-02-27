import React from 'react'
import {
  Map
} from 'immutable'
import {
  DefaultDraftBlockRenderMap
} from 'draft-js'
import {
  getExtensionBlockRenderMaps
} from 'src/modules/badEvents/views/editor/helpers/extension'

export default (props, blockRenderMap) => {

  let customBlockRenderMap = Map({
    'atomic': {
      element: ''
    },
    'code-block': {
      element: 'code',
      wrapper: < pre className = "braft-code-block" / >
    }
  })

  try {

    const extensionBlockRenderMaps = getExtensionBlockRenderMaps(props.editorId)

    customBlockRenderMap = extensionBlockRenderMaps.reduce((customBlockRenderMap, item) => {
      return customBlockRenderMap.merge(typeof item.renderMap === 'function' ? item.renderMap(props) : item.renderMap)
    }, customBlockRenderMap)

    if (blockRenderMap) {
      if (typeof blockRenderMap === 'function') {
        customBlockRenderMap = customBlockRenderMap.merge(blockRenderMap(props))
      } else {
        customBlockRenderMap = customBlockRenderMap.merge(blockRenderMap)
      }
    }

    customBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap)

  } catch (error) {
    console.warn(error)
  }

  return customBlockRenderMap

}