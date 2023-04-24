import "./page-info.css"
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline, Button, Modal } from 'antd';

function PageInfo() {

    const info = () => {
        Modal.info({
          title: '페이지 가이드',
          content: (
            <div>
              <p>영화검색탭에 들어가 원하는 영화를 검색할 수 있습니다.</p>
              <p>박스오피스 탭에서 하루전날 일일 박스오피스 순위를 볼 수 있습니다.</p>
              <p>원하는 영화를 찜하여 내가 찜한 영화탭에서 볼 수 있습니다.</p>
            </div>
          ),
          onOk() {},
        });
      };

    return <div>
        <div className="info-title">
        <h3 >홈페이지 가이드 & 제작 과정</h3>
        <Button onClick={info}>홈페이지 가이드</Button>
        </div>
       
        <Timeline className="time-line"
    mode="alternate"
    items={[
      {
        children: 'Create a services site 2015-09-01',
      },
      {
        children: 'Solve initial network problems 2015-09-01',
        color: 'green',
      },
      {
        dot: (
          <ClockCircleOutlined
            style={{
              fontSize: '16px',
            }}
          />
        ),
        children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      },
      {
        color: 'red',
        children: 'Network problems being solved 2015-09-01',
      },
      {
        children: 'Create a services site 2015-09-01',
      },
      {
        dot: (
          <ClockCircleOutlined
            style={{
              fontSize: '16px',
            }}
          />
        ),
        children: 'Technical testing 2015-09-01',
      },
    ]}
  />
     <div className="detail-info-button">
       <a href="https://github.com/osw6858/SearchMV"><Button >자세한 제작과정 및 기술적용과정</Button></a>
       </div>
    </div>
}

export default PageInfo;