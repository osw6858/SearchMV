import { useLocation } from "react-router";
import { MOVIE_KEY } from "../key";
import axios from "axios";
import React from "react";
import { Badge, Descriptions, Spin } from "antd";
import "../css/movie-detail.css";

function MovieDetail() {
  const [detail, setDetail] = React.useState([]);
  const location = useLocation();
  let movieCd = location.state.code;

  const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${MOVIE_KEY}&movieCd=${movieCd}`;

  React.useEffect(function () {
    axios
      .get(url)
      .then(function (result) {
        console.log("영화상세정보", result);
        const info = result.data.movieInfoResult.movieInfo;
        setDetail(info);
      })
      .catch(function (err) {
        console.log("에러발생", err);
      });
  }, []);

  if (detail.length === 0) {
    return (
      <div className="info-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Descriptions
      title={`${detail.movieNm}`}
      bordered="bordered"
      layout="horizontal"
    >
      <Descriptions.Item label="영문제목">{detail.movieNmEn}</Descriptions.Item>
      <Descriptions.Item label="개봉일">{detail.openDt}</Descriptions.Item>
      <Descriptions.Item label="제작년도">{detail.prdtYear}</Descriptions.Item>
      <Descriptions.Item label="런타임">{detail.showTm}분</Descriptions.Item>
      <Descriptions.Item label="영화유형" span={2}>
        {detail.typeNm}
      </Descriptions.Item>
      <Descriptions.Item label="개봉상태" span={3}>
        <Badge status="processing" text={`${detail.prdtStatNm}`} />
      </Descriptions.Item>
      <Descriptions.Item label="장르">
        {detail.genres &&
          detail.genres.map((name, index) => {
            let seperate = name.genreNm + "/";
            let mvGenre = name.genreNm;
            if (detail.genres.length === 1) {
              return mvGenre;
            } else {
              return seperate;
            }
          })}
      </Descriptions.Item>
      <Descriptions.Item label="영화코드">{detail.movieCd}</Descriptions.Item>
      <Descriptions.Item label="제작사">
        {detail.companys &&
          detail.companys.map((name, index) => {
            return (
              <ul key={index}>
                <li>{name.companyNm}</li>
              </ul>
            );
          })}
      </Descriptions.Item>
      <Descriptions.Item label="출연배우">
        {detail.actors &&
          detail.actors.map((name, index) => {
            if (detail.actors.length === 1) {
              return name.peopleNm;
            } else {
              return (
                <ul key={index}>
                  <li>{name.peopleNmEn}</li>
                  <li>{name.peopleNm}</li>
                </ul>
              );
            }
          })}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieDetail;
