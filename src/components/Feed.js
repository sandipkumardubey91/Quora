

import React, { useEffect, useState } from 'react';
import './Feed.css';
import QuoraBox from './QuoraBox';
import Post from './Post';
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';
import  db  from '../firebase';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        question: doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='feed'>
      <QuoraBox />
      {posts.map(({ id, question }) => (
        <Post 
          key={id}
          Id={id}
          image={question.imageurl}
          question={question.question}
          timestamp={question.timestamp}
          quorauser={question.user}
        />
      ))}
    </div>
  );
}

export default Feed;
