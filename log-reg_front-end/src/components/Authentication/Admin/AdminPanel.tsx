import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROLE } from "../../Utils/links";
import { LogoutButton } from "../../Others/LogoutButton";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { Loader } from "../../Utils/Loader";
import { Title } from "../../Others/Title";
import jwtDecode from "jwt-decode";

export const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const redirect = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    redirect(`/login`);
  }, [redirect]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return redirect("/be-login");
    }

    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole === ADMIN_ROLE) {
      setIsLoading(false);
    } else {
      return redirect("/be-login");
    }
  }, [redirect]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Title props={"Admin panel"} />
      <div className="container">
        <div className="right-side">
          <div className="redirect-btn">
            <RedirectBtn to="/">Menu</RedirectBtn>
            <RedirectBtn to="/users">Users</RedirectBtn>
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
};
