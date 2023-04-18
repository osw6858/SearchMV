import './App.css';
import {Layout, Menu, theme, Input, Select} from 'antd';
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import React from "react";
import {debounce} from "lodash";
import "./index.css"
import MovieList from './movies/movie-list';
import Boxoffice from './movies/boxoffice';
const {Header, Content, Footer} = Layout;

function App() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = React.useState("");
    const [selected, setSelected] = React.useState("");

    const {token: {
            colorBgContainer
        }} = theme.useToken();

    const menu = ["영화목록", "일일박스오피스", "홈페이지 정보"]

    function onTitleClike({key}) {
        if(key === "1") {
        navigate("/SearchMV")
        }
        if(key === "2") {
          navigate("/box-office")
        }
    }

    const onChange = debounce((e) => {
        setSearchValue(e.target.value);
    }, 300);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelected(value);
    };

    return (
        <Layout className="layout">
            <Header>
            
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menu.map((item, index) => {
                        const key = index + 1;
                        return {key, label: `${item}`};
                    })}
                    onClick
                    ={onTitleClike}/>
            </Header>
         
            <Input
                className='search-input'
                size='large'
                placeholder='검색해 주세요'
                onChange={(e) => onChange(e)}></Input>
            <Select
                defaultValue="movieNm"
                className="selector"
                onChange={handleChange}
                options={[

                    {
                        value: 'movieNm',
                        label: '제목'
                    }, {
                        value: 'directorNm',
                        label: '감독'
                    }
                ]}/>
                
            <Content style={{
                    padding: '0 50px'
                }}>

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer
                    }}>
                     
                       <Routes>
                        <Route
                        path="/SearchMV"
                        element={  <MovieList searchString = {
                          searchValue
                      }
                      selected = {
                          selected
                      }/>}/>
                      <Route
                        path="/box-office"
                        element={<Boxoffice></Boxoffice>}/>
                      </Routes>
                     
                </div>
            </Content>
            <Footer style={{
                    textAlign: 'center'
                }} >
                ver.1.1 / Made by Woong
            </Footer>
        </Layout>
    );
}

export default App;
