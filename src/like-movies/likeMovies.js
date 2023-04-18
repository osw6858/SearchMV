function LikeMovies() {

    let Mname = localStorage.getItem("Mname");
    let arr = Mname.split(",");
    arr.shift();
    console.log(arr);

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
        {arr.map((user, index) => (
        <User user={user} key={index}/>
      ))}
    </div>
}

export default LikeMovies;