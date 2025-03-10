import styled from "@emotion/styled";
import {Avatar} from "antd";
import {FC} from "react";
import {GoogleLoginButton} from "./GoogleLoginButton.tsx";
import {useUserStore} from "../stores/user.ts";
import { jwtDecode } from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
import {toast} from "react-hot-toast";

interface IUser {
  name: string;
  email: string;
  picture: string;
}

const Header: FC = () => {
  const userStore = useUserStore();
  const { user, setUser } = userStore;

  const userRender = user && jwtDecode(user);

  const onLogout = () => {
    googleLogout();
    setUser(null);
    toast.success('Google logout success!');
  }

  return (
    <Root>
      <h3>Dream Jar</h3>
      <div>
        {
          !userRender ? (
            <GoogleLoginButton />
          ) : (
            <RightMenu onClick={onLogout}>
              <Avatar src={userRender.picture}/>
              {userRender.email}
            </RightMenu>
          )
        }
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

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export default Header;