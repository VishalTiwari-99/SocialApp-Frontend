import React, { useEffect, useState } from 'react';
import "./conversation.css";
import axios from 'axios';

const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const friendId = conversation.members.find(m => m!==currentUser._id);

    const getUser = async () => {
      await axios.get("/users?userId="+friendId, {
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((res)=>{
        setUser(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    };
    getUser();
  }, [currentUser, conversation]);


  return (
    <div className="conversation">
        { user && <img className='conversationImg' src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.jpg"} alt="" />}
        {user && <span className="conversationName">{user.username}</span>}
    </div>
  )
}

export default Conversation