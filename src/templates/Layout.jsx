import React from "react";
import Header from "../components/TempHeader/TempHeader";
import TempFooter from "../components/TempFooter/TempFooter";

export default function Layout({ content }) {
  return (
    <div>
      <Header />
      {content}
      <TempFooter />
    </div>
  );
}
