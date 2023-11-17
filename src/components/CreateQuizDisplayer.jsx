import React, { useState } from 'react'
import { Box,Button} from '@chakra-ui/react';
const CreateQuizDisplayer = ({quizData}) => {
  return (
    <>
     {
        quizData.map(data=><QuizNames datatoDisplay={data}/>)
    }
    </>
  )
}

export default CreateQuizDisplayer


const QuizNames=({datatoDisplay})=>{

    const [popup , setPopup]= useState(false);
    const questionsArray=[...datatoDisplay].slice(0,datatoDisplay.length-1);
    const quizTitle = datatoDisplay.slice(datatoDisplay.length-1);
    console.log(questionsArray);
    function handlePopup(e){
setPopup(!popup);
    }

    return <Box>
{
<Button onClick={handlePopup}>{popup?JSON.stringify(questionsArray):quizTitle}</Button>
}
    </Box>
}