import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { auth, INTERNET_DISCONNECTED } from "../../Utils/links";
import { LoginForm } from "./LoginForm";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import {LoginContextType} from '../../Utils/Interfaces/LoginContextType';
import "../../../css/styles.css";
import { Title } from "../../Others/Title";

export const LoginContext  = createContext<LoginContextType  | null>(null); 

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const redirect = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
        try {
          const response = await axios.post(auth, {
            username,
            password,
          });

          if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);    
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                notify(response.data.message);
                setIsAuthenticated(true);

            if (username === 'root') {  //shout use role: admin, not username: root TODO
                  redirect('/admin');
            } 

          } else {
              notify(response.data.message);
          }
        } catch (error: any) {
          if (error.response) {
            console.log(error.response.data.message);
            notify(error.response.data.message);
          } else {
            notify(INTERNET_DISCONNECTED);
          }
        }
    };
    
    const handleLogout = () => {
      Cookies.remove('token');
      setIsAuthenticated(false);
    };
  return (
  <>
    <LoginContext.Provider 
        value={{
          username,
          password,
          setPassword,
          setUsername,
          handleSubmit
        }}>
      <Title props={'Login panel'}/>
        <div className="container">
            {!isAuthenticated ? (<LoginForm/>) : 
            (
              <>
                {redirect(`/after-login`)}
                <LogoutButton onLogout={handleLogout} /> 
              </>
            )}
            <div className="left-side">
              <div className="regist__buttons">
                <RedirectBtn to="/">Menu</RedirectBtn>
                <RedirectBtn to="/regist">Regist</RedirectBtn>
                <RedirectBtn to="/reset-email">Reset</RedirectBtn>
              </div>
            </div>
      </div>
    </LoginContext.Provider>
  </>
  );
};
