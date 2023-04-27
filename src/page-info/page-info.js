import "./page-info.css"
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

function PageInfo() {

    const info = () => {
        Modal.info({
          title: '페이지 가이드',
          content: (
            <div>
              <p>- 영화검색탭에 들어가 원하는 영화를 검색할 수 있습니다.</p>
              <p>- 상세정보를 클릭하여 보다 상세한 영화정보를 볼 수 있습니다.</p>
              <p>- 박스오피스 탭에서 하루전날 일일 박스오피스 순위를 볼 수 있습니다.</p>
              <p>- 원하는 영화를 찜하여 내가 찜한 영화탭에서 볼 수 있습니다.</p>
            </div>
          ),
          onOk() {},
        });
      };

    return <div>
        <div className="info-title">
        <h3 >홈페이지 가이드 & 제작 과정</h3>
        <Button onClick={info} danger>홈페이지 가이드</Button>
        </div>
       
        <Timeline className="time-line"
    mode="alternate"
    items={[
      {
        children: '프로젝트 시작 / 2023-04-01 ',
      },
      {
        children: 'antd를 이용하여 레이아웃 구상 / 2023-04-02 ',
      },
      {
        children: '검색기능 구현 / 2023-04-03 ',
      },
      {
        children: '성인물 차단 / 2023-04-03 ',
        color: 'green'
      },
      {
        children: '검색결과가 부정확함, api호출 과다 문제 / 2023-04-04 ',
        color: 'red'
      },
      {
        children: '디바운싱 활용, 영화 검색시 api 호출 최적화 / 2023-04-05 ',
        color: 'green'
      },
      {
        children: '제목/감독 카테고리별 검색 기능 추가 / 2023-04-08 ',
        color: 'green'
      },
      {
        children: '박스오피스 순위 페이지 구현 / 2023-04-011 ',
      },
      {
        children: '박스오피스 레이아웃 수정 / 2023-04-012 ',
        color: 'green'
      },
      {
        children: '검색목록 페이징 처리 / 2023-04-015 ',
      },
      {
        children: '모바일로 접속시 화면깨짐 수정 2023-04-016',
      },
      
      {
        children: '찜목록 구현 2023-04-20',
      },
      {
        children: '찜목록 중복방지 및 초기화기능 추가 2023-04-20',
        color:"green"
      },
      {
        children: '영화 상세정보 페이지 구현 2023-04-22',
      },
      {
        children: '오류 수정 및 레이아웃 개선 2023-04-25',
      },
      {
        dot: (
          <ClockCircleOutlined
            style={{
              fontSize: '16px',
            }}
          />
        ),
        children: '배포 및 테스트 2023-04-28 ~',
      },
    ]}
  />
     <div className="detail-info-button">
       <a href="https://github.com/osw6858/SearchMV"><Button type="primary" danger >자세한 제작과정 및 기술적용과정</Button></a>
       </div>
    </div>
}

export default PageInfo;