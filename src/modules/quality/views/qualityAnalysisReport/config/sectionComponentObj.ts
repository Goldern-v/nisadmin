import TitleSection from '../components/title/TitleSection'

import TitleModal from '../components/title/TitleModal'

import Line from '../components/common/Line'
import TitleTextareaSection from '../components/titleTextarea/TitleTextareaSection'
import TextareaModal from '../components/titleTextarea/TextareaModal'
import ChartTableModal from '../components/chartTable/ChartTableModal'
import ChartTableSection from '../components/chartTable/ChartTableSection'

export const sectionComponentObj = {
  title: {
    section: TitleSection,
    modal: TitleModal
  },
  line: {
    section: Line
  },
  titleTextarea: {
    section: TitleTextareaSection,
    modal: TextareaModal
  },
  chartTable: {
    section: ChartTableSection,
    modal: ChartTableModal
  }
}
