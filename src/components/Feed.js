// import React, { useEffect, useState } from 'react'
// import './Feed.css'
// import QuoraBox from './QuoraBox'
// import Post from './Post'

// const Feed = () => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     db.collection("questions").orderBy("timestamp", "desc").onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => (({
//       id : doc.id,
//       question : doc.data()
//     })))))
//   },[])
//   return (
//     <div className='feed'>
//         <QuoraBox/>
//         {
//           posts.map(({id, question}) =>{
//             <Post 
//               key = {id}
//               id = {id}
//               image = {question.imageUrl}
//               question = {question.question}
//               timestamp = {question.timestamp} 
//               quoraUser = {question.user}
//             />
//           })
//         }
//         <Post/>
//         <Post/>
//         <Post/>
//         <Post/>
//         <Post/>
//         <Post/>

  
//     </div>
//   )
// }

// export default Feed

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
