import React from 'react'
import "./home.css"
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/rightbar/Rightbar'
import Sidebar from '../../Components/sidebar/Sidebar'
import Topbar from '../../Components/topbar/Topbar'

const Home = () => {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
      
    </div>
  )
}

export default Home