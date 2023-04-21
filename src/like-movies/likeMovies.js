import React from "react";
import { Button, Checkbox  } from 'antd';
import "./likeMovies.css"

function LikeMovies() {
    const [rest, setRest] = React.useState("");
    let Mname = localStorage.getItem("Mname");
    if(Mname===null) {
        Mname = ""
    }
    let arr = Mname.split(",");
    arr.shift();
    if(arr.length === 0) {
      arr.push("찜한 영화가 없어요.")
    }
    console.log("arr : " ,arr)

    function reset() {
        localStorage.clear();
        setRest()
    }

    function User({ user }) {
      return (
        <div>
          <ul className="like-movies">
          <Checkbox ><li className='like-movie-list'>{user}</li></Checkbox>
          </ul>
        </div>
      );
    }

    return <div>
      <div className="reset-button">
          <Button type="primary" danger onClick={reset} >
      초기화
    </Button>
    </div>
    <div className="like-movies-container">
        {arr.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  </div>
}

export default LikeMovies;