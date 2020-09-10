import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import {List, Spin} from 'antd'
import styled from 'styled-components'
import ContentInput from './ContentInput'

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #EEE;  
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
`

const StyledCenterDiv = styled.div`
  display: flex;
  justify-content: center;
`

const StyledTitle = styled.div`
  font-weight: bold;
  text-align: center;
  word-wrap:break-word; 
  word-break:break-all;
  width: 100%;
  margin: 10px auto 0;
  @media (min-width: 576px) {
    text-align: left;
    margin: 0;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledItemContent = styled.div`
  flex: 1;
  width: 100%;
  @media (min-width: 576px) {
    padding: 0 24px;
  }
`

const StyledList = styled(List)`
  .ant-list-item {
    flex-direction: column;
    box-shadow: 0 2px 4px -4px rgba(0, 0, 0, 0.2);
    @media (min-width: 576px) {
      flex-direction: row;
    }
  }
`

const Component = observer(() => {
  const {HistoryStore} = useStores()
  const loadMore = () => {
    HistoryStore.find()
  }

  useEffect(() => {
    console.log('进入组件')
    return (() => {
      console.log('组件卸载')
      HistoryStore.reset()
    })
    //eslint-disable-next-line
  }, [])

  const options = {
    initialLoad: true,
    pageStart: 0,
    loadMore,
    hasMore: !HistoryStore.isLoading && HistoryStore.hasMore,
    useWindow: true
  }

  return (
    <div>
      <InfiniteScroll {...options}>
        <StyledList
          dataSource={HistoryStore.list}
          renderItem={
            item => <List.Item key={item.id}>
              <ImageWrapper>
                <a href={item.attributes.url.attributes.url}
                   target="_blank"
                   rel="noopener noreferrer">
                  <Img src={item.attributes.url.attributes.url} alt=""/>
                </a>
              </ImageWrapper>

              <StyledItemContent>
                <StyledTitle>
                  {item.attributes.filename}
                </StyledTitle>
                <ContentInput title="ImageURL" baseUrl={item.attributes.url.attributes.url}/>
                <ContentInput title="Markdown" filename={item.attributes.filename}
                              baseUrl={item.attributes.url.attributes.url}/>
                <ContentInput title="HTML" baseUrl={item.attributes.url.attributes.url}/>
              </StyledItemContent>
            </List.Item>

          }>
          {HistoryStore.isLoading && HistoryStore.hasMore && (
            <StyledCenterDiv>
              <Spin tip="加载中"/>
            </StyledCenterDiv>
          )}
        </StyledList>
      </InfiniteScroll>
    </div>
  )
})

export default Component