import homeImg from '@/assets/enterprise/enterprise/home.png'
import homeActiveImg from '@/assets/enterprise/enterprise/home-active.png'
import appImg from '@/assets/enterprise/enterprise/app.png'
import appActiveImg from '@/assets/enterprise/enterprise/app-active.png'
import myImg from '@/assets/enterprise/enterprise/my.png'
import myActiveImg from '@/assets/enterprise/enterprise/my-active.png'

const getTabbarRenderList = () => {
    return [
        {
            text: '首页',
            icon: homeImg,
            activeIcon: homeActiveImg,
            width: '0.48rem',
            height: '0.48rem',
            key: 'home'
        },
        {
            text: '应用',
            icon: appImg,
            activeIcon: appActiveImg,
            width: '0.42rem',
            height: '0.42rem',
            key: 'app'
        },
        {
            text: '我的',
            icon: myImg,
            activeIcon: myActiveImg,
            width: '0.4rem',
            height: '0.42rem',
            key: 'my'
        }
    ]
}

export {
    getTabbarRenderList
}