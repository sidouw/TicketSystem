import React, { useState,useEffect } from 'react';
import {useSelector} from 'react-redux'

import { Comment, Avatar, Form, Button, List, Input,Divider,Skeleton } from 'antd';
import {UserOutlined,ToolOutlined,SearchOutlined} from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

import {selectActiveTicket} from '../Store/Reducers/ticketsReducer'
import {selectUser} from '../Store/Reducers/userReducer'
import {addComment,getCommentsById} from '../utils/commentsUtils'

const { TextArea } = Input;


const ContainerHeight = 300;
const pageSize = 3
const userIcons = [<UserOutlined/>,<ToolOutlined/>,<SearchOutlined/>]
// const CommentList = ({ comments }) => (

//     <List
//       dataSource={comments}
//       bordered
//       header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//       itemLayout="horizontal"
//       renderItem={props => <Comment {...props} />}
//     />


//   );
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  
  const TicketCommenst = ()=>{

    const ticket = useSelector(selectActiveTicket)
    const user = useSelector(selectUser)
    const [comments,setComments] = useState([])
    const [value,setValue] = useState('')
    const [loadingComments,setLoadingComments] = useState(false)
    const [submitting,setSubmitting] = useState(false)
    const [newCommentsLength,setNewCommentsLength] = useState(pageSize)
    const [page,setPage] = useState(0)

    useEffect(()=>{
      loadMoreData()
      // eslint-disable-next-line
    },[])

    const loadMoreData = () => {
      if(loadingComments) {return }
      setLoadingComments(true)

      getCommentsById(ticket._id,page,pageSize).then((data)=>{

        setNewCommentsLength(data.length)
        const nComments= data.map(comment=>{
            return {
              _id:comment._id,
              author: comment.user.username,
              avatar: <Avatar icon={userIcons[comment.user.role]} />,
              content: <p>{comment.content}</p>,
              datetime: moment().from(comment.createdAt),
              actions:user.role===0 ? [
                <Button danger type = 'link'>Delete</Button>
              ]:[]
            }
        })

        
        setComments([...comments,...nComments])
        setLoadingComments(false)
        setPage(page+pageSize)
      })
    }

    const handleSubmit = () => {
        if (!value) {
          return;
        }
        
        setSubmitting(true)
        const newComment = {
          ticket:ticket._id,
          user:user._id,
          content:value
        }
        addComment(newComment).then((data)=>{

          setSubmitting(false) 
          setValue('')
          setComments([
            {
              _id:data._id,
              author:user.username,
              avatar: <Avatar icon={userIcons[user.role]} />,
              content: <p>{data.content}</p>,
              datetime: moment().from(data.createdAt),
              actions:user.role===0 ? [
                <Button danger type = 'link'>Delete</Button>
              ]:[]
            },
            ...comments,
          ])
        })
      }
    
    const handleChange = e => {
      setValue(e.target.value)
    }

    return (
        <>
        <div
          id="scrollableDiv"
          style={{
            height: ContainerHeight,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={comments.length}
            next={loadMoreData}
            hasMore={newCommentsLength>=pageSize}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            endMessage={<Divider plain>No more Comments</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={comments}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  <Comment {...item} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        
        <Comment
          avatar={<Avatar icon={userIcons[user.role]} />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    )
  }

  export default TicketCommenst