import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import  { List, Spin } from 'antd'
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
  width: 120px;
  margin-left: 24px;
  margin-right: auto;
`

const StyledItemContent = styled.div`
  flex: 1;
  padding: 0 24px;
`

const StyledList =styled(List)`
  .ant-list-item {
    box-shadow: 0 2px 4px -4px rgba(0, 0, 0, 0.2)
  }
`

const Component = observer(() => {
  const { HistoryStore } = useStores();
  const loadMore = () =>{
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
             <div>
               <a href={item.attributes.url.attributes.url}
                  target="_blank"
                  rel="noopener noreferrer">
               <Img src={item.attributes.url.attributes.url} alt=""/>
               </a>
             </div>
             <StyledTitle>
               <h5>{item.attributes.filename}</h5>
             </StyledTitle>
             <StyledItemContent>
               <ContentInput title="ImageURL" baseUrl={item.attributes.url.attributes.url}/>
               <ContentInput title="Markdown" filename={item.attributes.filename} baseUrl={item.attributes.url.attributes.url}/>
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