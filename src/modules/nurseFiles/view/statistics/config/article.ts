import { Select } from 'antd'
import { PageObj } from './getPageObj'
import { statisticsViewModal } from '../StatisticsViewModal'

export const pageObj: PageObj = {
  title: '文章',
  filterList: [
    {
      label: '科室',
      type: 'select',
      dataSource: statisticsViewModal.getDict('全部科室'),
      name: 'deptName'
    }
  ]
}
