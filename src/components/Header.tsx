import styled from "@emotion/styled";
import {Avatar} from "antd";
import { FC } from "react";
import {useUserStore} from "../stores/user.ts";

const Header: FC = () => {
  const usr = useUserStore((state: any) => state.user); // Access the user data

  return (
    <Root>
      <h3>Dream Jar</h3>
      <div>
        <span>{usr?.first_name}</span>
        <Avatar />
      </div>
    </Root>
  );
};

const Root = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 32px);
  max-width: 100vw;
  height: 50px;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 16px;
`;

export default Header;