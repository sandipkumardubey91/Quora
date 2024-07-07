

import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOutlined, ShareOutlined } from '@mui/icons-material';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { setQuestionInfo, selectQuestionId } from '../features/questionSlices';
import { collection, doc, addDoc, orderBy, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import db from '../firebase';

const Post = ({ Id, question, image, timestamp, quorauser }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const questionId = useSelector(selectQuestionId);
  const [openModal, setOpenModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [getAnswers, setGetAnswers] = useState([]);

  useEffect(() => {
    if (questionId) {
      const q = query(collection(db, "questions", questionId, "answers"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setGetAnswers(snapshot.docs.map((doc) => ({
          id: doc.id,
          answers: doc.data()
        })));
      });

      return () => unsubscribe();
    }
  }, [questionId]);

  const handleAnswer = async (e) => {
    e.preventDefault();

    if (questionId) {
      await addDoc(collection(db, "questions", questionId, "answers"), {
        user: user,
        answer: answer,
        questionId: questionId,
        timestamp: serverTimestamp(),
      });
    }
    setAnswer("");
    setOpenModal(false);
  };

  return (
    <div
      className='post'
      onClick={() => dispatch(setQuestionInfo({
        questionId: Id,
        questionName: question
      }))}
    >
      <div className='post_info'>
        <Avatar src={quorauser?.photoURL} />
        <h5>{quorauser?.displayName}</h5>
        <small>{timestamp ? new Date(timestamp.toDate()).toLocaleString() : "Loading..."}</small>
      </div>
      <div className='post_body'>
        <div className='post_question'>
          <p>{question}</p>
          <button className='post_btn_ans' onClick={() => setOpenModal(true)}>Answer</button>
          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 650,
                height: 500,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                zIndex: "100",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-325px"
              }
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {user.displayName ? user.displayName : user.email}
                </span>{" "}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancel" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button type="submit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {/* <div className='post_ans'>
        <h5>Replies</h5>
         {
            getAnswers.map(({id, answers})=>{
                <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                     }}
                  >
                    <span 
                    style={{ color: "#b92b27" }}
                    >
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
            })
         }
        </div> */}


        {image && <img className='img' src={image} alt="Question" />}
      </div>
      <div className='post_footer'>
        <div className='post_footerAction'>
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <RepeatOutlined />
        <ChatBubbleOutlineOutlined />
        <div className='post_footerleft'>
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
        
      </div>
      <div className="post_ans">
        <h5>Replies</h5>
          {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                      marginTop :"-5px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </div>
    </div>
  );
};

export default Post;
