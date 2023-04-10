import React from 'react';
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from '../../dummyData';
import Friend from '../friend/Friend';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeedIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Feed</span>
                </li>
                <li className="sidebarListItem">
                    <ChatIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Chats</span>
                </li>
                <li className="sidebarListItem">
                    <PlayCircleIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Videos</span>
                </li>
                <li className="sidebarListItem">
                    <GroupIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Groups</span>
                </li>
                <li className="sidebarListItem">
                    <BookmarkIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Bookmarks</span>
                </li>
                <li className="sidebarListItem">
                    <HelpOutlineIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Questions</span>
                </li>
                <li className="sidebarListItem">
                    <WorkOutlineIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Job</span>
                </li>
                <li className="sidebarListItem">
                    <EventIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Events</span>
                </li>
                <li className="sidebarListItem">
                    <SchoolIcon className='sidebarListIcon'/>
                    <span className="sidebarListItemText">Courses</span>
                </li>
            </ul>
            <button className="sidebarButton">Show more</button>
            <hr className='sidebarHr'/>
            <ul className="sidebarFriendList">
                {Users.map(u=>(
                    <Friend key={u.id} user={u}/>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar