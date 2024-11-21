import React from "react";
import TempHeader from "../components/TempHeader/TempHeader";
import Slider from "../components/Sider/Slider";

export default function AdminLayout({ content }) {
  return (
    <div>
      <TempHeader />
      <Slider content={content} />
    </div>
  );
}
