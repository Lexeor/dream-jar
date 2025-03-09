import { useState} from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import Header from "./components/Header.tsx";

const colors = ["#FFC3A0", "#FFD700", "#98FB98", "#87CEFA", "#FFB6C1"];

export default function App() {
  const [stickers, setStickers] = useState<{ id: number; x: number; y: number; color: string; text: string }[]>([]);

  const addSticker = () => {
    const id = Date.now();
    const stickerWidth = 160;
    const stickerHeight = 160;

    // Генерация случайных координат внутри экрана с учётом размеров стикера
    const x = Math.random() * (window.innerWidth - stickerWidth);
    const y = Math.random() * (window.innerHeight - stickerHeight);

    // Генерация случайного цвета
    const color = colors[Math.floor(Math.random() * colors.length)];

    setStickers([...stickers, { id, x, y, color, text: "" }]);
  };

  const removeSticker = (id: number) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  };

  const handleInputChange = (id: number, newText: string) => {
    setStickers(prev =>
      prev.map(sticker =>
        sticker.id === id ? { ...sticker, text: newText.slice(0, 140) } : sticker
      )
    );
  };

  return (
    <AppContainer>
      <Header />
      <Toaster />
      <Button onClick={addSticker} invisible={stickers.length > 0}>Добавить стикер</Button>
      {stickers.map(({ id, x, y, color, text }) => (
        <Sticker
          key={id}
          color={color}
          initial={{
            opacity: 0,
            x: Math.random() > 0.5 ? -200 : window.innerWidth + 200, // Начинаем с левого или правого края
            rotate: Math.random() * 360, // Поворот при появлении
          }}
          animate={{
            opacity: 1,
            x: x,
            y: y,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            duration: 0.8,
          }}
        >
          <Input
            maxLength={140}
            value={text}
            placeholder="Введите текст..."
            onChange={(e) => handleInputChange(id, e.target.value)}
          />
          <StickerSaveButton onClick={() => {
            toast.success("Saved!", { duration: 2000 });
            removeSticker(id);
          }}>Save</StickerSaveButton>
          <CharacterCount>{text.length}/140</CharacterCount>
        </Sticker>
      ))}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #8e44ad 0%, #3498db 100%);
  position: relative;
  overflow: hidden;
`;

const Button = styled('button')<{ invisible?: boolean }>`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: #ff7eb3;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 1;

  &:hover {
    background: #ff758c;
  }

  ${p => p.invisible && `
    opacity: 0;
    pointer-events: none;
  `};
`;

const Sticker = styled(motion.div)<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  padding: 16px;
  background: ${({ color }) => color};
  border-radius: 8px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 140px;
  flex-direction: column;
  padding-bottom: 32px; /* Увеличиваем пространство для счётчика */
`;

const Input = styled.textarea`
  width: 100%;
  border: none;
  padding: 8px;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;
  resize: none;
  height: 124px;
  font-family: inherit;

  &::-webkit-scrollbar {
    background: transparent;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  text-align: left;
`;

const StickerSaveButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 8px 0 0 0;
  background: transparent;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.2);
  outline: none !important;
  
  &:hover {
    color: rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0,0,0,0.5);
    border-left: 1px solid rgba(0,0,0,0.5);
  }
`;
