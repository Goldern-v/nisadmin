import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { workSummaryReportService } from './../../services/WorkSummaryReportService'
import tinyPic from 'src/utils/img/tinyPic'

export interface Props {
  tip: string
  accept: string
  value?: any[]
  text?: string
  upload?: (files: FileList) => Promise<string[]>
  onChange: (value: string[]) => void
  uploadOption?: any
}

export interface State {
  loading: boolean
  group: any[]
}

export default class MultipleImageUploader extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    accept: 'image/jpg, image/jpeg, image/png, image/bmp',
    tip: '支持jpg、jpeg、png、bmp格式的图片',
    text: '上传图片',
    onChange: () => { }
  }

  public static getDerivedStateFromProps(nextProps: Props) {
    return nextProps.value ? { group: nextProps.value } : { group: [] }
  }

  public state: State = {
    loading: false,
    group: []
  }

  private refInput = React.createRef<HTMLInputElement>()

  public componentDidMount() {
    const $input = this.refInput.current
    if ($input) $input.addEventListener('change', this.onChange)
  }

  public componentWillUnmount() {
    const $input = this.refInput.current
    if ($input) $input.removeEventListener('change', this.onChange)
  }

  private open = () => {
    const $input = this.refInput.current
    if ($input) $input.click()
  }

  private getBase64 = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }

  private onOpen = () => {
    this.open()
  }

  private onChange = async (e: Event) => {
    const { upload, onChange } = this.props
    const $input = e.target as HTMLInputElement

    const files = ($input.files && $input.files) || null
    if (!files) return

    const group = []

    for (let i = 0; i < files.length; i++) {
      group.push((await this.getBase64(files[i])) || '')
    }

    // $input.value = ''
    if (upload) {
      this.setState({ group: [...this.state.group, ...group], loading: true })
      const value = await upload(files)
      this.setState({ loading: false })
      value && onChange([...(this.props.value || []), ...value])
    } else {
      this.setState({ group: [...this.state.group, ...group], loading: true })
      try {
        const promiseList = []
        for (let i = 0; i < files.length; i++) {
          /** 图片压缩 */
          let img = await tinyPic(files[i])
          var fileObj = new File([img.img], files[i].name, { type: files[i].type, lastModified: Date.now() })
          promiseList.push(
            workSummaryReportService.uploadAttachment({
              ...(this.props.uploadOption || {}),
              file: fileObj
            })
          )
          // promiseList.push(service.commonApiService.uploadFile({ ...(this.props.uploadOption || {}), file: files[i] }))
        }
        let res = await Promise.all(promiseList)
        let value = res.map((item: any) => item.data)
        this.setState({ loading: false })
        value && onChange([...(this.props.value || []), ...value])
      } catch (error) {
        console.log(error, 'errorerror')
      }
    }
  }

  public deletetImg = (index: number) => {
    this.props.value && this.props.value.splice(index, 1)
    this.props.value && this.props.onChange && this.props.onChange([...this.props.value])
  }
  public render() {
    const { tip, accept, text } = this.props
    const { loading, group } = this.state
    return (
      <Wrapper>
        {/* {JSON.stringify(group)} */}
        {group &&
          group.map((item: any, index: number) => (
            <Inner key={index}>
              <Icon type='close' title='删除图片' onClick={() => this.deletetImg(index)} />
              <Image src={item.path} />
            </Inner>
          ))}
        <Inner onClick={this.onOpen}>
          <OriginalInput ref={this.refInput} type='file' accept={accept} multiple={true} />
          <React.Fragment>
            <StyledIcon type={loading ? 'loading' : 'plus'} />
            <Text>{text}</Text>
          </React.Fragment>
        </Inner>
        <div style={{ clear: 'both' }} />
        {tip && <Tip>{tip}</Tip>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  float: left;
  margin: 5px;
  position: relative;
  &:hover {
    border-color: ${(p) => p.theme.$mtc};
  }
  .anticon-close {
    position: absolute;
    right: 4px;
    top: 2px;
    height: 10px;
    width: 10px;
  }
`

const OriginalInput = styled.input`
  display: none !important;
`

const Image = styled.img`
  width: 100%;
`

const StyledIcon = styled(Icon)`
  margin-top: 6px;
  font-size: 2.3em;
  color: rgba(0, 0, 0, 0.65);
`

const Text = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`

const Tip = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  width: auto;
  clear: both;
`
