import {React, useEffect, useState } from 'react';
import "./profile.css";
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Topbar from '../../Components/topbar/Topbar'
import axios from 'axios';
import { useParams } from 'react-router';

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({_id:"1",});
    const username = useParams().username;
    const URL = process.env.REACT_APP_SERVER_URL;
    
    useEffect(()=>{
        const fetchUser = async () => {
          axios.get(URL+`/users?username=${username}`, {
            headers:{
              'Content-Type': 'application/json',
            }
          }).then((response)=>{
            setUser(response.data)
          })
        };
        fetchUser();
      },[username, URL]);

  return (
    <div>
        <Topbar />
        <div className="profile">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.jpg"} alt="" className='profileCoverImg'/>
                        <img src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.jpg"} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className='profileInfoDesc'>{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile