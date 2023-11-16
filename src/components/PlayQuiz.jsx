import { Center,Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const PlayQuiz = () => {
  const [show,setShow]=useState(false);
  const handleDisplayComponent=()=>{
setShow(!show);
  }
  return (
    <>
    <Center>
      <Button onClick={handleDisplayComponent} >
        PlayQuiz
      </Button>
    </Center>
    {
      show && <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta quis reprehenderit vero dolor accusantium, perspiciatis quidem ab doloremque aperiam sapiente consequuntur quas quo minus nihil consequatur, et ex illum! Eius dolorem culpa inventore.
      </div>
    }
    </>
  )
}

export default PlayQuiz