import "./App.css";
import { Layout, Menu, theme, Input, Select } from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";
import { debounce } from "lodash";
import "./index.css";
import MovieList from "./components/movies/movie-list";
import Boxoffice from "./components/movies/boxoffice";
import LikeMovies from "./components/like-movies/likeMovies";
import MovieDetail from "./components/movies/movie-detail";
const { Header, Content, Footer } = Layout;

function App() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");
  const [selected, setSelected] = React.useState("");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = ["영화검색", "일일박스오피스", "찜한 영화"];

  function onTitleClike({ key }) {
    if (key === "1") {
      navigate("/SearchMV");
    }
    if (key === "2") {
      navigate("/box-office");
    }
    if (key === "3") {
      navigate("/like-movies");
    }
  }

  const onChange = debounce((e) => {
    setSearchValue(e.target.value);
  }, 300);

  const handleChange = (value) => {
    //console.log(`selected ${value}`);
    setSelected(value);
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menu.map((item, index) => {
            const key = index + 1;
            return { key, label: `${item}` };
          })}
          onClick={onTitleClike}
        />
      </Header>

      <Input
        className="search-input"
        size="large"
        placeholder="검색해 주세요"
        onChange={(e) => onChange(e)}
      ></Input>
      <Select
        defaultValue="movieNm"
        className="selector"
        onChange={handleChange}
        options={[
          {
            value: "movieNm",
            label: "제목",
          },
          {
            value: "directorNm",
            label: "감독",
          },
        ]}
      />

      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route
              path="/SearchMV"
              element={
                <MovieList searchString={searchValue} selected={selected} />
              }
            />
            <Route path="/box-office" element={<Boxoffice></Boxoffice>} />
            <Route path="/like-movies" element={<LikeMovies></LikeMovies>} />
            <Route path="/movie-detail" element={<MovieDetail></MovieDetail>} />
          </Routes>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ver.1.1 / Made by Woong
      </Footer>
    </Layout>
  );
}

export default App;
