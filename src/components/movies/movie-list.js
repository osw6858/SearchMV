import "../../styles/movie-list.css";
import { Card, Button, message, Spin } from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../../pagenation";
import { MOVIE_KEY } from "../../key";
import { useNavigate } from "react-router-dom";

function MovieList(prop) {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const limit = 20; //한 화면에서 보여질 카드 갯수
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit; //해당 페이지의 첫 게시물의 위치(index)
  let searching = prop.searchString;
  let select = prop.selected;
  const Mname = localStorage.getItem("Mname");
  let likeMovies = [Mname];

  let isSelect;
  if (select === "movieNm") {
    isSelect = "movieNm";
  } else if (select === "directorNm") {
    isSelect = "directorNm";
  } else {
    isSelect = "movieNm";
  }

  //console.log("검색어", searching);
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${MOVIE_KEY}&curPage=1&itemPerPage=50&${isSelect}=${searching}`;

  React.useEffect(
    function () {
      setLoading(true);
      axios
        .get(url)
        .then(function (result) {
          //console.log("영화목록결과", result);
          const movies = result.data.movieListResult.movieList;
          const filterMv = movies.filter(
            (param) => param.repGenreNm !== "성인물(에로)"
          );
          setMovies(filterMv);
          setLoading(false);
        })
        .catch(function (err) {
          console.log("에러발생", err);
        });
    },
    [prop.searchString, isSelect]
  );

  const [messageApi, contextHolder] = message.useMessage();
  const success = (e, Mname) => {
    likeMovies.push(Mname);
    window.localStorage.setItem("Mname", likeMovies);
    //console.log("likeMovies",likeMovies);
    messageApi
      .open({ type: "loading", content: "진행중...", duration: 0.3 })
      .then(() => message.success("찜완료!", 2.5));
  };

  function Mvdetail(e, movieCd) {
    console.log("영화코드", movieCd);
    navigate("/movie-detail", {
      state: {
        code: movieCd,
      },
    });
  }

  return (
    <Spin size="large" spinning={loading}>
      <div className="content" />

      <div>
        <section className="movie-list-card">
          {movies.slice(offset, offset + limit).map((movies, index) => {
            let Mname = movies.movieNm;
            let movieCd = movies.movieCd;
            return (
              <Card
                title={Mname}
                type="inner"
                className="info-card"
                key={index}
              >
                {contextHolder}
                <Button
                  type="primary"
                  danger="danger"
                  onClick={(e) => success(e, Mname)}
                >
                  찜하기
                </Button>
                <br />
                <Button
                  danger="danger"
                  className="detail-button"
                  onClick={(e) => Mvdetail(e, movieCd)}
                >
                  상세정보
                </Button>
                <p className="info">장르 : {movies.genreAlt}</p>
                <p className="info">국가 : {movies.repNationNm}</p>
                <p className="info">제작년도 : {movies.prdtYear}년</p>

                <p className="info">
                  감독 :{" "}
                  {movies.directors.map((name) => {
                    let setName = name.peopleNm;
                    if (movies.directors.length === 1) {
                      return setName;
                    } else {
                      return setName + ",";
                    }
                  })}
                </p>
              </Card>
            );
          })}
        </section>
        <div className="pagination">
          <Pagination
            total={movies.length}
            //pagenation컴포넌트로 prop 전달
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </Spin>
  );
}

export default MovieList;
