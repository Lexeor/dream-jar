import { useState } from 'react'
import './App.css'
import styled from '@emotion/styled';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Logo onClick={() => {
        setCount((count) => count + 1);
      }}>
        <img src="/images/dream-jar.png" className="logo" alt="Vite logo" />
      </Logo>
      {
        !count ? (
          <h1>I'm in Telegram, bitch!</h1>
          ) : (
          <h1>Bot still doesn't work yet</h1>
        )
      }
    </>
  )
}

const Logo = styled.div`
  height: 400px;
  margin-bottom: 48px;
  
  img {
    height: 100%;
  }
`;

export default App
