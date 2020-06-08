import {
    Avatar,
    Divider,
} from 'antd'
import {
    QqOutlined,
    WechatOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import '../public/style/components/Author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://cn.bing.com/th?id=OIP.cyo-rhl6D-zhZKqldGCzewHaEo&pid=Api&rs=1" />
            </div>
            <div className="author-introduction">
                这是一段介绍
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<QqOutlined/>} className="account" />
                <Avatar size={28} icon={<WechatOutlined/>} className="account" />
                <Avatar size={28} icon={<GithubOutlined/>} className="account" />
            </div>
        </div>
    )
}

export default Author