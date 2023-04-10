import React, { useContext, useEffect, useState } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import "./feed.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  useEffect(()=>{
    const fetchPosts = async() => {
      var url = username ? `/post/profile/${username}` : "/post/timeline/"+user._id;
      axios.get(url, {
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((response)=>{
        setPosts(response.data.sort((p1, p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))
      })
    };
    fetchPosts();
  },[username,user._id])

  return (
    <div className='feed'>
        <div className="feedWrapper">
          {(!username || username===user.username) && <Share />}
          {posts.map(p=>(
            <Post key={p._id} post={p}/>
          ))}
        </div>
    </div>
  )
}

export default Feed