import Head from 'next/head'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Advert from '../components/Advert'
import marked from 'marked'
import hljs from 'highlight.js'
import '../public/style/pages/detailed.css'
import Tocify from "../components/tocify.tsx";
import servicePath from '../config/apiUrl'
import 'markdown-navbar/dist/navbar.css'

import {
    Row,
    Col,
    Breadcrumb,
    Affix,
} from 'antd'
import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined,
} from '@ant-design/icons'
import '../public/style/pages/detailed.css'

const Detailed = (props) => {
    const tocify = new Tocify();
    const renderer = new marked.Renderer();

    renderer.heading = function(text,level,raw){
        const anchor = tocify.add(text,level)
        return `<a id="${anchor}" hred="#${anchor}" class="anchor-fix" ><h${level}>${text}</h${level}></a>\n`
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value
        }
    });

    let html = marked(props.introduce + props.article_content);

    return (
        <div>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="">视频</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className="detailed-title">
                                {props.title}
                            </div>
                            <div className="list-icon center">
                                <span><CalendarOutlined/>{props.addTime}</span>
                                <span><FolderOutlined/>{props.typeName}</span>
                                <span><FireOutlined/>{props.view_count}</span>
                            </div>
                            <div className="detailed-content"
                                 dangerouslySetInnerHTML={{__html:html}}
                            />
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
};

Detailed.getInitialProps = async (ctx) => {
    let id = ctx.query.id;
    const promise = new Promise((resolve,reject) => {
        try {
            axios(servicePath.getArticleById + id).then(
                (res) => {
                    resolve(res.data.data[0]);
                }
            )
        } catch (e) {
            reject(e)
        }
    });
    return await promise
};

export default Detailed
