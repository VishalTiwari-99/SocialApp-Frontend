import {React, useState, useEffect, useContext} from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {
    const [like, setLike] = useState(post.likes.length);
    const[isliked, setIsliked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    const URL = process.env.REACT_APP_SERVER_URL;

    useEffect(()=>{
      setIsliked(post.likes.includes(currentUser._id));
    },[post.likes, currentUser._id])

    useEffect(()=>{
        const fetchUser = async () => {
          axios.get(URL+`/users?userId=${post.userId}`, {
            headers:{
              'Content-Type': 'application/json',
            }
          }).then((response)=>{
            setUser(response.data)
          })
        };
        fetchUser();
      },[post.userId, URL])

    const likeHandler = () => {
      try{
        axios.put(URL+"/post/"+post._id+"/like", {userId:currentUser._id});
      }catch(err){

      }
        setLike(isliked ? like-1 : like+1);
        setIsliked(!isliked);
    }

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.jpg"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon />
                </div>
            </div>
            <div className="postCenter">
                <span className='postText'>{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="" className='likeIcon' onClick={likeHandler} />
                    <img src={`${PF}heart.png`} alt="" className='likeIcon' onClick={likeHandler} />
                    <span className="postlikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post;