import React ,{ useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../public/style/components/header.css'
import {
    Row,
    Col,
    Menu,
} from 'antd'
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined,
} from '@ant-design/icons'


const Header = () => {
    const [navArray, setNavArray] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            );
            setNavArray(result)
        };

        fetchData();
    },[])

    const handleClick = (e) => {
      if (e.key == 1) {
          Router.push('/index')
      } else {
          Router.push('/list?id=' + e.key)
      }
    };

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">秋意凉</span>
                    <span className="header-text">人若无名，便可专心练剑；物若无名，便可随意取舍。</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        {
                            navArray.map(item => {
                                return (
                                    <Menu.Item key={item.id}>
                                        {item.id == 1 && <HomeOutlined />}
                                        {item.id == 2 && <YoutubeOutlined />}
                                        {item.id == 3 && <SmileOutlined />}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header