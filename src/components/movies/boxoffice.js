import React from "react";
import axios from "axios";

import "../../styles/boxoffice.css";
import { Table, Spin } from "antd";

function Boxoffice() {
  const [boxoffice, setBoxoffice] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const MOVIE_KEY = process.env.REACT_APP_MOVIE_KEY;
  let date = new Date();

  function getFormatDate(date) {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = date.getDate() - 1; //d -> 오늘 하루 전
    day = day >= 10 ? day : "0" + day; //day 두자리로 저장
    return year + month + day;
  }

  date = getFormatDate(date);
  //console.log("date", date);

  const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${MOVIE_KEY}&targetDt=${date}`;

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((result) => {
        // console.log("박스오피스결과", result);
        const boxoffice = result.data.boxOfficeResult.dailyBoxOfficeList;

        setBoxoffice(boxoffice);
        setLoading(false);
      })
      .catch((err) => {
        console.log("에러발생!", err);
      });
  }, []);

  const columns = [
    {
      key: "1",
      title: "제목",
      dataIndex: "movieNm",
    },
    {
      key: "2",
      title: "개봉일",
      dataIndex: "openDt",
    },
    {
      key: "3",
      title: "관객수(명)",
      dataIndex: "audiCnt",
      sorter: {
        compare: (a, b) => a.audiCnt - b.audiCnt,
        multiple: 1,
      },
    },
    {
      key: "4",
      title: "누적매출액(원)",
      dataIndex: "salesAcc",
      sorter: {
        compare: (a, b) => a.salesAcc - b.salesAcc,
        multiple: 2,
      },
    },
    {
      key: "5",
      title: "관객수 증감 비율(%)",
      dataIndex: "audiChange",
    },
    {
      key: "6",
      title: "전일대비 순위 증감",
      dataIndex: "rankInten",
    },
  ];

  return (
    <Spin size="large" spinning={loading}>
      <Table columns={columns} dataSource={boxoffice} rowKey="movieNm" />
    </Spin>
  );
}

export default Boxoffice;
