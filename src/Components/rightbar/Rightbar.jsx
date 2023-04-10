import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from '../online/Online';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user]);
  
  useEffect(()=>{
    const getFriends = async() => {
      axios.get("/users/friends/"+user._id,{
        headers:{
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        setFriends(response.data);
        console.log(response.data);
      }).error((err)=>{
        console.log(err);
      })
    };
    getFriends();
  },[user]);

  const handleClick = async () =>{
    let url;
    if(followed){
      url = "/users/"+user._id+"/unfollow";
      dispatch({type:"UNFOLLOW", payload: user._id});
    }else{
      url = "/users/"+user._id+"/follow";
      dispatch({type:"FOLLOW", payload: user._id});
    }

    axios.put(url, {userId: currentUser._id}, {
      headers:{
        'Content-Type': 'application/json',
      }
    }).then((response)=>{
      setFollowed(!followed);
    }).error((err)=>{
      console.log(err);
    })
  }

  const handleLogOut = (e) => {
    localStorage.removeItem("user");
    dispatch({type:"LOGOUT"});
    navigate("/");
  }

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
            <img src="assets/gift.png" alt='' className='birthdayImg' />
            <span className="birthdayText"> <b>Vin Diesel</b> and <b>3 other friends</b> have birthday today</span>
          </div>
          <img src="assets/ad.png" alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map(u=>(
              <Online key={u.id} user={u} />
            ))}
          </ul>
      </>
    );
  }

  const ProfileRightbar = () => {
    return(
       <>
       {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveIcon/> : <AddIcon/>}
        </button>
       )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1 ? "Single" : user.relationship===2 ? "Married" : "Complicated"}</span>
          </div>
        </div>

        <h4 className='rightbarTitle'>User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>  
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.jpg"} alt="" className='rightbarFollowingImg'/>
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>

        {user.username === currentUser.username && 
          (<button className="logoutButton" onClick={handleLogOut}>Log Out</button>)
        }
       </>
    );
  }

  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
    </div>
  )
}

export default Rightbar