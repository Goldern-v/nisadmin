import { observer } from 'mobx-react'
import React from 'react'
import { handbookModel as model } from '../model'
import { Menu } from 'antd'
import { Obj } from 'src/libs/types'
const { Item } = Menu
export interface IProps {
}
export default observer(function HandbookMenu(props: IProps) {
  const formatDataId = (item: Obj) => {
    const { id, masterId, tableName, templateId, templateType
    } = item
    // return `${masterId},${templateId},${id},${templateType},${tableName}`
    return JSON.stringify({ id, masterId, tableName, templateId, templateType })
  }
  return (
    <Menu
      style={{ width: '200px' }}
      onClick={(e) => model.selectMenu(e)}
      selectedKeys={[model.curCatalogue?.id + '' ]} mode="inline">
      {
        model.catalogue.map(v =>
          <Item key={v.id} data-id={formatDataId(v)}>
            {v.tableName}
          </Item>
        )
      }
    </Menu>
  )
})

