import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import  { List, Spin } from 'antd'
import styled from 'styled-components'

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #EEE;  
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
       <List
         dataSource={HistoryStore.list}
         renderItem={
           item => <List.Item key={item.id}>
             <div>
               <Img src={item.attributes.url.attributes.url} alt=""/>
             </div>
             <div>
               <h5>{item.attributes.filename}</h5>
             </div>
             <div>
               <a target="_blank" rel="noopener noreferrer" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
             </div>
           </List.Item>

         }>
         {HistoryStore.isLoading && HistoryStore.hasMore && (
           <div>
             <Spin tip="加载中"/>
           </div>
         )}
       </List>
     </InfiniteScroll>
    </div>
  )
})

export default Component