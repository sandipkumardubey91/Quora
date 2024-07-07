import React from 'react'
import './SidebarOptions.css'
import { Add } from '@mui/icons-material';

const SidebarOptions = () => {
  return (
    <div className='sidebarOptions'>
              <div className="sidebarOption">
        <img
          src="https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_1280.jpg"
          alt=""
        />
        <p>History</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://images.business.com/app/uploads/2011/06/12131215/Leadership-Skills.png"
          alt=""
        />

        <p>Business</p>
      </div>
      <div className="sidebarOption">
        <img
          src="https://c8.alamy.com/comp/R12FG0/psychology-concept-3d-illustration-R12FG0.jpg"
          alt=""
        />
        <p>Psychology</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://img.freepik.com/free-photo/side-view-cook-making-delicious-pasta_23-2150690631.jpg"
          alt=""
        />
        <p>Cooking</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOA7ZZk8mtlO4EjCYC8CWxc7X6-aUgW7nvw&s"
          alt=""
        />
        <p>Music</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2MaLPzYzsyQlwOIPNpeqpcYsNzlvwOHXAA&s"
          alt=""
        />
        <p>Science</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJegV1MqO171Yh6cEmsO2Vpdm6Qws_G_cMfg&s"
          alt=""
        />
        <p>Health</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH7qJ7ybUrEwyzk0514NbIfJeq56zs92cWQw&s"
          alt=""
        />
        <p>Movies</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://img.freepik.com/premium-photo/cardano-blockchain-platform_23-2150411956.jpg"
          alt=""
        />
        <p>Technology</p>
      </div>

      <div className="sidebarOption">
        <img
          src="https://img.freepik.com/free-photo/book-with-green-board-background_1150-3836.jpg"
          alt=""
        />
        <p>Education</p>
      </div>
      <div className="sidebarOption">
      <Add />
        <p className='text'>Discover Spaces</p>
      </div>
        
    </div>
  )
}

export default SidebarOptions