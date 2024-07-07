// import React, { useState } from 'react'
// import './Navbar.css'
// import {AssignmentTurnedInOutlined, FeaturedPlayListOutlined, Home as HomeIcon, LanguageOutlined, NotificationAddOutlined, PeopleAltOutlined, SearchOutlined } from '@mui/icons-material';
// import { Avatar } from '@mui/material';
// import Button from '@mui/material/Button';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';
// import { auth } from '../firebase';  
// import { Model } from 'react-model';

// const Navbar = () => {
//     const user = useSelector(selectUser);
//     const [openModel, setOpenModel] = useState(false);
//   return (
//     <div className='qHeader'>
//        <div className='qHeader_logo'>
//         <img 
//             src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png'
//             alt=''
//         />
//        </div>
//        <div className='qHeader_icons'>
//         <div className='qHeader_icon'>
//             <HomeIcon/>
//         </div>
//         <div className='qHeader_icon'>
//             <FeaturedPlayListOutlined/>
//         </div>
//         <div className='qHeader_icon'>
//             <AssignmentTurnedInOutlined/>
//         </div>
//         <div className='qHeader_icon'>
//             <PeopleAltOutlined/>
//         </div>
//         <div className='qHeader_icon'>
//             <NotificationAddOutlined/>

//         </div>
//        </div>
//        <div className='qHeader_input'>
//             <SearchOutlined/>
//             <input 
//                 type='text'
//                 placeholder='Search Quora'
//             />
//        </div>
//        <div className='qHeader_rem'>
//         <div className='qHeader_avatar'>
//             <Avatar 
//                 onClick = {() => auth.signOut()}
//                 src={user.photoURL}
//             />
//         </div>
//         <div className='qHeader_lang'></div>
//         < LanguageOutlined/>

//         <Button 
//             onClick={() => setOpenModel(true)}
//         >
//            Add Question
//         </Button>
//         <Model
//             isOpen = {openModel}
//             onRequestClose = {() => setOpenModel(false)}
//         >
//             <div className='modal_title'>
//                 <h5>Add Question</h5>
//                 <div className='modal_info'>
//                     <p>Modal Body</p>
//                 </div>
//             </div>
//         </Model>
        
//        </div>
//     </div>
//   )
// }

// export default Navbar

import React, { useState } from 'react';
import './Navbar.css';
import { 
  AssignmentTurnedInOutlined, 
  ExpandMore, 
  FeaturedPlayListOutlined, 
  Home as HomeIcon, 
  LanguageOutlined, 
  NotificationAddOutlined, 
  PeopleAltOutlined, 
  SearchOutlined,
  Link,
} from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';  
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

Modal.setAppElement('#root');

const Navbar = () => {
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("")
  const [inputUrl, setInputUrl] = useState("")
 
  const handleQuestion = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "questions"), {
        question: input,
        imageurl: inputUrl,
        timestamp: serverTimestamp(),
        user: user,
      });
      console.log("Question added successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Error adding question: ", error);
    }
    setInput("");
    setInputUrl("");
  };

  return (
    <div className='qHeader'>
      <div className='qHeader_logo'>
        <img 
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png'
          alt='Quora logo'
        />
      </div>
      <div className='qHeader_icons'>
        <div className='qHeader_icon'>
          <HomeIcon/>
        </div>
        <div className='qHeader_icon'>
          <FeaturedPlayListOutlined/>
        </div>
        <div className='qHeader_icon'>
          <AssignmentTurnedInOutlined/>
        </div>
        <div className='qHeader_icon'>
          <PeopleAltOutlined/>
        </div>
        <div className='qHeader_icon'>
          <NotificationAddOutlined/>
        </div>
      </div>
      <div className='qHeader_input'>
        <SearchOutlined/>
        <input 
          type='text'
          placeholder='Search Quora'
        />
      </div>
      <div className='qHeader_rem'>
        <div className='qHeader_avatar'>
          <Avatar 
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
        </div>
        <div className='qHeader_lang'>
          <LanguageOutlined/>
        </div>
        <Button 
          onClick={() => setOpenModal(true)}
        >
          Add Question
        </Button>
        <Modal
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc = {false}
          style={{
            overlay:{
                width: 650,
                hieght : 500,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                zIndex: "100",
                top : "50%",
                left : "50%",
                marginTop : "-230px",
                marginLeft :"-350px"
            }
           
          }}
        >
          <div className='modal__title'>
                <h5>Add Question</h5>
                <h5>Share Link</h5>
            </div>
                <div className='modal__info'>
                    <Avatar 
                        className='avatar'
                        src={user.photoURL}
                    />
                    <p>{user.displayName ? user.displayName : user.email} </p>
                    <div className='modal__scope'>
                        <PeopleAltOutlined />
                        <p>Public</p>
                        <ExpandMore />
                    </div>
                </div>
                <div className='modal__Field'>
                    <TextField 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type= "text"
                    placeholder="Start your question with 'What', 'How', 'Why' etc."
                    variant="standard"
                    required
                    />
              
                <div className='modal__fieldLink'>
                    <Link />
                    <TextField 
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className='inputt'
                    type= "text"
                    placeholder="Optional : inlcude a link that gives context"
                    variant="standard"
                    />
                </div>
                </div>
                <div className="modal__buttons">
                <button className="cancle" onClick={() => setOpenModal(false)}>
                    Cancel
                </button>
                <button
                onClick={handleQuestion}
                type="sumbit"  className="add">
                    Add Question
                </button>
          </div>
                
         
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;



