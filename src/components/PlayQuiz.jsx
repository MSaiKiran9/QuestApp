import { Center,Button } from '@chakra-ui/react'
import { collection,doc,getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebaseUtils';
import CreateQuizDisplayer from './CreateQuizDisplayer';
const PlayQuiz = () => {
  const [show,setShow]=useState(false);
  const [quizContent,setQuizContent] = useState([]);
  const quizCollection = collection(db,'mcq-arrays');
  const handleDisplayComponent=()=>{
setShow(!show);
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getDocs(quizCollection);
        const questionsAnswers = data.docs.map(docs=>docs.data()['createdquiz']['questionsToDb']);
        setQuizContent(questionsAnswers);
      } catch (error) {
        console.log("error!" + error);
      }
    };
  
    fetchData();
  },[]);

  // console.log(quizContent[0][0].question);
  // first quiz first question

  return (
    <>
    <Center>
      <Button onClick={handleDisplayComponent} >
        PlayQuiz
      </Button>
    </Center>
    {
      show && <div>
        <h1>some data</h1>
        {
 quizContent&&<CreateQuizDisplayer quizData={quizContent}/>
        }
      </div>
    }
    </>
  )
}

export default PlayQuiz