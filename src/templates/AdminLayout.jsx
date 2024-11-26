import React from "react";
import Slider from "../components/Sider/Slider";

export default function AdminLayout({ content }) {
  return (
    <div>
      <Slider content={content} />
    </div>
  );
}
