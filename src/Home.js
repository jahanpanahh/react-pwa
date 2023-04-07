import React from "react";

const Home = (props) => {
  console.log(props.token);
  return (
    <div>
      {" "}
      <h1>Home</h1>
      <text>{props.token}</text>
    </div>
  );
};

export default Home;
