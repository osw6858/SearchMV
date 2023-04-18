import "./movie-list.css";
import {Card, Result, Button, message} from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../pagenation";
import {MOVIE_KEY} from "../key";


function MovieList(prop) {
    const [movies, setMovies] = React.useState([]);
    const limit = 20; //한 화면에서 보여질 카드 갯수
    const [page, setPage] = React.useState(1);
    const [checked, setChecked] = React.useState(false);
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
        isSelect = "movieNm"
    }

    //console.log("검색어", searching);
    const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${MOVIE_KEY}&curPage=1&itemPerPage=50&${isSelect}=${searching}`;

    React.useEffect(function () {
        axios
            .get(url)
            .then(function (result) {
                console.log("영화목록결과", result);
                const movies = result.data.movieListResult.movieList;
                const filterMv = movies.filter((param) => param.repGenreNm !== "성인물(에로)");
                setMovies(filterMv);

            })
            .catch(function (err) {
                console.log("에러발생", err);
            });
    }, [prop.searchString, isSelect]);

    
    const [messageApi, contextHolder] = message.useMessage();
    const success = (e, Mname ) => {
        likeMovies.push(Mname);
        window.localStorage.setItem("Mname", likeMovies);
        console.log("likeMovies",likeMovies);
      messageApi
        .open({
          type: 'loading',
          content: '진행중...',
          duration: 0.5,
        })
        .then(() => message.success('찜완료!', 2.5))
    };

    

    return (
        <div>
            <section className="movie-list-card">
                {
                    movies
                        .slice(offset, offset + limit)
                        .map((movies, index) => {
                            let Mname = movies.movieNm;
                            return (
                                <Card
                                    title={Mname}
                                    type="inner"
                                    className="info-card"
                                    key={index}>
                                        {contextHolder}
                                     <Button onClick={(e) => success(e, Mname)}>찜하기!</Button>
                                    <p className="info">장르 : {movies.genreAlt}</p>
                                    <p className="info">국가 : {movies.repNationNm}</p>
                                    <p className="info">제작년도 : {movies.prdtYear}년</p>
                                    <p className="info">상영상태 : {movies.prdtStatNm}</p>
                                    <p className="info">감독 : {
                                            movies
                                                .directors
                                                .map((name) => {
                                                    return name.peopleNm
                                                })
                                        }</p>
                                </Card>

                            );
                        })
                }
            </section>
            <div className="pagination">
                <Pagination total={movies.length}
                    //pagenation컴포넌트로 prop 전달
                    limit={limit} page={page} setPage={setPage}/>
            </div>
        </div>

    )

}

export default MovieList;