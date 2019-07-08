import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import service from 'src/services/api'

export interface Props {
  tip: string
  accept: string
  value?: string[]
  text?: string
  upload?: (files: FileList) => Promise<string[]>
  onChange: (value: string[]) => void
}

export interface State {
  loading: boolean
  src: string[]
}

export default class MultipleImageUploader extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    accept: 'image/jpg, image/jpeg, image/png, image/bmp',
    tip: '支持jpg、jpeg、png、bmp格式的图片',
    text: '上传图片',
    onChange: () => {}
  }

  public static getDerivedStateFromProps(nextProps: Props) {
    return nextProps.value ? { src: nextProps.value } : null
  }

  public state: State = {
    loading: false,
    src: []
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

    const src = []

    for (let i = 0; i < files.length; i++) {
      src.push((await this.getBase64(files[i])) || '')
    }
    $input.value = ''
    this.setState({ src: [...this.state.src, ...src], loading: true })
    if (upload) {
      const value = await upload(files)
      this.setState({ loading: false })
      value && onChange([...(this.props.value || []), ...value])
    } else {
      const promiseList = []
      for (let i = 0; i < files.length; i++) {
        promiseList.push(service.commonApiService.uploadFile(files[i]))
      }
    }
  }

  public render() {
    const { tip, accept, text } = this.props
    const { loading, src } = this.state
    return (
      <Wrapper>
        {/* {JSON.stringify(src)} */}
        {src &&
          src.map((item: string, index: number) => (
            <Inner key={index}>
              <Image src={item} />
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

  &:hover {
    border-color: ${(p) => p.theme.$mtc};
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
