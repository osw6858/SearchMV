import { useLocation } from "react-router";
import {MOVIE_KEY} from "../key";
import axios from "axios";
import React from "react";
import { Badge, Descriptions } from 'antd';

function MovieDetail() {
    const [detail, setDetail] = React.useState([]);
    const location = useLocation();
    let movieCd = location.state.code;
    console.log("code",movieCd );

    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${MOVIE_KEY}&movieCd=${movieCd}`
   
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

    return  <Descriptions title={`${detail.movieNm}`} bordered>
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
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item>
  </Descriptions>
}

export default MovieDetail;