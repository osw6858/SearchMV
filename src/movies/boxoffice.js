import React from "react";
import axios from "axios";
import "./boxoffice.css";
import { Table  } from "antd";
import { MOVIE_KEY } from "../key";

function Boxoffice() {
  const [boxoffice, setBoxoffice] = React.useState([]);
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
    axios
      .get(url)
      .then((result) => {
        console.log("박스오피스결과", result);
        const boxoffice = result.data.boxOfficeResult.dailyBoxOfficeList;
       
        setBoxoffice(boxoffice);
      })
      .catch((err) => {
        console.log("에러발생!", err);
      });
  }, []);

  const columns = [
    {
      title: '제목',
      dataIndex: 'movieNm',
    },
    {
      title: '개봉일',
      dataIndex: 'openDt',
      sorter: {
        compare: (a, b) => a.openDt - b.openDt,
        multiple: 1,
      },
    },
    {
      title: '관객수',
      dataIndex: 'audiCnt',
      sorter: {
        compare: (a, b) => a.audiCnt - b.audiCnt,
        multiple: 2,
      },
    },
    {
      title: '누적매출액',
      dataIndex: 'salesAcc',
      sorter: {
        compare: (a, b) => a.salesAcc - b.salesAcc,
        multiple: 3,
      },
    },
  ];

  return (
    
      <Table columns={columns} dataSource={boxoffice} key={boxoffice.movieNm}/>
    
  );
}

export default Boxoffice;

//movies컴포넌트와 비슷한데 굳이 이걸 따로 만들어야 할까?

//movies 컴포넌트에서 api url만 바꿔서 한 컴포넌트에서 순위만 볼 수 있게 할 수 있을듯 => 개같이실패

//기준일 다시 계산해서 나타낼것
