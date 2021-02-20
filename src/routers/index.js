import {
    Article,
    Dashboard,
    Login,
    NotFound,
    Setting,
    ArticleEdit,
} from '../views'

const commonRoutes = [
    {
        pathname: '/login',
        component: Login,
    },
    {
        pathname: '/404',
        component: NotFound,
    },
]

const privateRoutes = [
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: '仪表盘',
        icon: 'DashboardOutlined',
        isTop: true,
    },
    {
        pathname: '/admin/article',
        component: Article,
        title: '文章管理',
        icon: 'BookOutlined',
        exact: true,
        isTop: true,
    },
    {
        //http://localhost:3000/#/admin/article/edit/601e668a03d797cf5b66f437
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit,
        title: '文章编辑',
        icon: 'BookOutlined',
        isTop: false,
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title: '系统设置',
        icon: 'SettingOutlined',
        isTop: true,
    },
]

export {
    commonRoutes,
    privateRoutes
}