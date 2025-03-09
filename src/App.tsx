import { useState } from 'react'
import './App.css'
import styled from '@emotion/styled';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Root>
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
    </Root>
  )
}

const Root = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  height: 200px;
  margin-bottom: 48px;
  
  img {
    height: 100%;
  }
`;

export default App
