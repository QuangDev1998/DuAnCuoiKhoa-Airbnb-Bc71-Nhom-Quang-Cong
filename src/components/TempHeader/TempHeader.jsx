import React from "react";
import { useNavigate } from "react-router-dom";

export default function TempHeader() {
  let navigate = useNavigate();
  return (
    <div>
      TempHeader
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}
