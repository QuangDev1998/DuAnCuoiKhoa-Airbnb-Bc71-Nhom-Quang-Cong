import React from "react";
import Carousel from "./Carousel";

import List from "./List";
import Locations from "./Location";
import SelectForm from "./SelectForm";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <SelectForm />
      <List />
      <Locations />
    </div>
  );
}
