import React from "react";

function LikeMovies() {
    const [Likemovies, setLikeMovies] = React.useState("");
    let Mname = localStorage.getItem("Mname");
    if(Mname===null) {
        Mname = ""
    }
    let arr = Mname.split(",");
    arr.shift();
    console.log(arr);

    function reset() {
        localStorage.clear();
        setLikeMovies()
    }

    function clearMv() {

    }

    function User({ user }) {
        return (
          <div>
            <ul>
                <li>{user}</li>
            </ul>
          </div>
        );
      }

    return <div>
         <button onClick={reset}>초기화</button>
        {arr.map((user, index) => (
        <User user={user} key={index}/>
      ))}
    </div>
}

export default LikeMovies;