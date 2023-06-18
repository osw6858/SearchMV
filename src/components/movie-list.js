import "../css/movie-list.css";
import { List, Button } from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../pagenation";
import { MOVIE_KEY } from "../key";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function MovieList(prop) {
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const limit = 20; //한 화면에서 보여질 카드 갯수
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit; //해당 페이지의 첫 게시물의 위치(index)
  let searching = prop.searchString;
  let select = prop.selected;
  const Mname = localStorage.getItem("Mname");
  let likeMovies = [Mname];
  const now = dayjs().format("YYYY-MM-DD");

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
      axios
        .get(url)
        .then(function (result) {
          //console.log("영화목록결과", result);
          const movies = result.data.movieListResult.movieList;
          const filterMv = movies.filter(
            (param) => param.repGenreNm !== "성인물(에로)"
          );
          setMovies(filterMv);
        })
        .catch(function (err) {
          console.log("에러발생", err);
        });
    },
    [prop.searchString, isSelect]
  );

  const success = (Mname) => {
    // console.log("영화이름", Mname);
    likeMovies.push(Mname);
    window.localStorage.setItem("Mname", likeMovies);
    alert("찜완료");
  };

  function Mvdetail(movieCd) {
    //console.log("영화코드", movieCd);
    navigate("/movie-detail", {
      state: {
        code: movieCd,
      },
    });
  }

  return (
    <div>
      <section className="movie-list-card">
        <List
          className="info-list"
          size="large"
          header={<div className="date">{now} 기준</div>}
          bordered
          dataSource={movies.slice(offset, offset + limit)}
          renderItem={(movies) => (
            <List.Item className="info-list-item">
              <div className="info-items">
                <span className="movie-title">{movies.movieNm}</span>
                {"   "}
                <span>
                  감독 :
                  {movies.directors.map((name) => {
                    let setName = name.peopleNm;
                    if (movies.directors.length === 1) {
                      return setName;
                    } else {
                      return setName + ",";
                    }
                  })}
                </span>
              </div>
              <div className="info-items">
                <Button
                  type="primary"
                  className="detail-button"
                  danger="danger"
                  onClick={() => success(movies.movieNm)}
                >
                  찜하기
                </Button>

                <Button
                  danger="danger"
                  className="detail-button"
                  onClick={() => Mvdetail(movies.movieCd)}
                >
                  상세정보
                </Button>
              </div>
            </List.Item>
          )}
        />
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
  );
}

export default MovieList;
