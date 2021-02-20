// import Article from './Article';
// import Dashboard from './Dashboard';
// import Login from './Login';
// import NotFound from './NotFound';
// import Setting from './Setting';

//路由懒加载
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const Article = Loadable({
    loader: () => import('./Article'),
    loading: Loading,
});
const ArticleEdit = Loadable({
    loader: () => import('./Article/edit'),
    loading: Loading,
});
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
});
const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading,
});
const Setting = Loadable({
    loader: () => import('./Setting'),
    loading: Loading,
});

export {
    Article,
    ArticleEdit,
    Dashboard,
    Login,
    NotFound,
    Setting
}