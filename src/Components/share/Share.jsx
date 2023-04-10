import React, { useContext, useRef, useState } from 'react';
import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LabelIcon from '@mui/icons-material/Label';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

const Share = () => {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    };
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }catch(err){
        console.log(err);
      }
    }

    try{
      await axios.post("/post", newPost, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      window.location.reload();
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.jpg"} alt="" className="shareProfileImg" />
          <input placeholder={`what's in your mind ${user.username}?`} className='shareInput' ref={desc} />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className="shareImgContainer">
            <img className='shareImg' src={URL.createObjectURL(file)} alt=''/>
            <CancelIcon className='shareCancelImg' onClick={()=>setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMediaIcon htmlColor='tomato' className="shareIcon"/>
              <span className="shareOptionText">Photo or Video</span>
              <input style={{display:"none"}} type="file" id="file" accept=".png, .jpg, .jpeg" onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor='blue' className="shareIcon"/>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor='green' className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor='gold' className="shareIcon"/>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type='submit' className='shareButton'>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share