import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer, useLocalStore} from 'mobx-react'
import {message, Upload, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import styled from 'styled-components'
import ContentInput from './ContentInput'

const {Dragger} = Upload

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`
const StyledP = styled.p`
  margin: 8px 0;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
  margin: 0 auto;
  display: block;
`

const Component = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const ref1 = useRef()
  const ref2 = useRef()

  const store = useLocalStore(() => ({
    width: null,
    setWidth(width) {
      store.width = width
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    height: null,
    setHeight(height) {
      store.height = height
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      if (!store.widthStr && !store.heightStr) {
        return ImageStore.serverFile.attributes.url.attributes.url
      } else {
        return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
      }
    }
  }))

  const bandWidthChange = () => {
    store.setWidth(ref1.current.value)
  }
  const bandHeightChange = () => {
    store.setHeight(ref2.current.value)
  }

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传')
        return false
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传svg/png/jpg/jpeg/gif格式的图片')
        return false
      }
      if (file.size > 1024 * 1024 * 2) {
        message.error('不支持超过2M的图片')
        return false
      }
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        }).catch(() => {
        console.log('上传失败')
      })
      return false
    }
  }

  return (
    <div>
      <Spin tip="上传中" spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击选择或者直接拖拽图片</p>
          <p className="ant-upload-hint">
            仅支持svg/png/jpg/jpeg/gif格式的图片,且大小不超过2M
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
            <StyledP>{ImageStore.filename}</StyledP>
            <section>
              <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/>
            </section>
            <dl>
              <dt>链接</dt>
              <dd>
                <a target="_blank"
                   rel="noopener noreferrer"
                   href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
              </dd>
              <dt>自定义尺寸</dt>
              <dd>
                <input ref={ref1} onChange={bandWidthChange} placeholder="最大宽度（可选）"/>
                <input ref={ref2} onChange={bandHeightChange} placeholder="最大高度（可选）"/>
              </dd>
              <dd>
                <ContentInput title="ImageURL" baseUrl={store.fullStr}/>
                <ContentInput title="Markdown" baseUrl={store.fullStr}/>
                <ContentInput title="HTML" baseUrl={store.fullStr}/>
              </dd>
            </dl>
          </Result> :
          null
      }
    </div>
  )
})

export default Component