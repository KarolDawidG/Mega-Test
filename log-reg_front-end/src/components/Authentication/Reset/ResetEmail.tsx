import React, { useState } from 'react';
import axios from 'axios';
import { RedirectBtn } from '../../Others/RedirectBtn';
import { notify } from "../../Others/Notify";
import {ENDPOINT_EMAIL, INTERNET_DISCONNECTED, LINK_RESET} from '../../Utils/links';
import { Title } from '../../Others/Title';
import "../../../css/styles.css";

interface FormState {
  email: string;
}

export const ResetEmail: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
  });
  const [link, setLink] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setLink(LINK_RESET);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = { ...formState, link };
      const response = await axios.post(ENDPOINT_EMAIL, dataToSend);

      if (response.status === 200) {
        setFormState({ email: '' });
        setLink(''); 
        notify(response.data);
      } else {
        notify(response.data.message);
      }
    } catch (error: any) {
      if (error) {
        notify(error.response.data);
      } else {
        notify(INTERNET_DISCONNECTED);
      }
    }
  };

  return (
    <>
      <div className="title">
          <Title props={'Reset hasła'} />
      </div>

      <div className="container">
          <div className="right-side">
            <form className="login-form__form" onSubmit={handleSubmit}>
                  <label className="login-form__label" htmlFor="email">Email: </label>
                      <input
                        className="login-form__input"
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      /><br /><br />
                <input type="submit" className="login-form__submit" value="Send Message" />
            </form>

            <div className="redirect-btn">
              <RedirectBtn to="/">Menu</RedirectBtn>
              <RedirectBtn to="/login">Login</RedirectBtn> 
            </div>
            
          </div>
      </div>
    </>
  );
};
