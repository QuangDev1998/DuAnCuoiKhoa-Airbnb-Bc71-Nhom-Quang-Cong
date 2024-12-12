import React from "react";
import Header from "../components/TempHeader/TempHeader";

export default function Layout({ content }) {
  return (
    <div>
      <Header />
      {content}
    </div>
  );
}
