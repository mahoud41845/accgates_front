import { useState } from "react";
import Header from "./header";

function Home(props) {
  const [counter, setCounter] = useState(40);
  return (
    <>
      <Header counter={counter} />
    </>
  );
}

export default Home;
