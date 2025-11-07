import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/AppRouter/AppRouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import { Spin } from "antd";

const App = () => {

  const { data: user, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true
      });
      return res.data.user;
    },
    retry: false
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <Spin size="small" />
  </div>

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;