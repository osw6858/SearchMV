import React from "react";
import axios from "axios";
import "./boxoffice.css";
import { Card, Switch } from "antd";
import dayjs from "dayjs";
import { MOVIE_KEY } from "../key";
import Pagination from "../pagenation";


function Boxoffice(prop) {
  const [boxoffice, setBoxoffice] = React.useState([]);
  const limit = 10; //랭킹은 10등까지 보여줄 예정
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit;

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
       // console.log("박스오피스결과", result);
        const boxoffice = result.data.boxOfficeResult.dailyBoxOfficeList;
        setBoxoffice(boxoffice);
      })
      .catch((err) => {
        console.log("에러발생!", err);
      });
  }, []);

  return (
    <div>
      <section className="rank-list-card">
        {boxoffice.slice(offset, offset + limit).map((boxoffice, index) => {
          return (
           
              <Card title={`<${boxoffice.rank}위>`} type="inner" align="center" className="boxoffice-card" key={index}>
                <Card
                  type="inner"
                  title={`${boxoffice.movieNm}`}
                  align="center"
                 
                >
                   <Switch checkedChildren="찜완료" unCheckedChildren="찜하기" />
                  <p> 개봉일 : {boxoffice.openDt}</p>
                  <p>금일 관객수 : {boxoffice.audiCnt}명</p>
                  <p>누적 관객수 : {boxoffice.audiAcc}명</p>
                </Card>
              </Card>
           
          );
        })}
      </section>
      <div className="pagination">
        <Pagination
          total={boxoffice.length} //pagenation컴포넌트로 prop 전달
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Boxoffice;

//movies컴포넌트와 비슷한데 굳이 이걸 따로 만들어야 할까?

//movies 컴포넌트에서 api url만 바꿔서 한 컴포넌트에서 순위만 볼 수 있게 할 수 있을듯 => 개같이실패

//기준일 다시 계산해서 나타낼것
