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
    let result = arr.filter((v, i) => arr.indexOf(v) === i);//중복방지
    if(result.length === 0) {
      result.push("찜한 영화가 없어요.")
    }
    //console.log("arr : " ,arr)

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
        {result.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  </div>
}

export default LikeMovies;