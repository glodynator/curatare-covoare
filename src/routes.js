import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './components/authRoutes/privateRoutes';
import PublicRoute from './components/authRoutes/publicRoutes';

import Layout from './hoc/Layout';

//user routes
import SignIn from './components/user/signin';
import Register from './components/user/register';

//public routes
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import Services from './components/pages/Services';
import Contact from './components/pages/Contact';
import Questions from './components/pages/Questions';
import Articles from './components/pages/Articles';
import ArticleDetail from './components/pages/ArticleDetail';
import Gallery from './components/pages/Gallery';

//private routes
import UserProfile from './components/admin/UserProfile';
import AddEditArticle from './components/admin/AddEditArticle';
//import AddEditArticleHook from './components/admin/AddEditArticleHook';
import AddEditGalleryImage from './components/admin/AddEditGalleryImage';
import Subscribers from './components/admin/Subscribers';

const Routes = (props) => {
    return(
        <Layout>
            <Switch>
                <PrivateRoute {...props} path="/user_profile" exact component={UserProfile}/>
                <PrivateRoute {...props} path="/add_article" exact component={AddEditArticle}/>
                {/*<PrivateRoute {...props} path="/add_article" exact component={AddEditArticleHook}/>*/}
                <PrivateRoute {...props} path="/edit_article/:id" exact component={AddEditArticle}/>
                <PrivateRoute {...props} path="/add_gallery_image" exact component={AddEditGalleryImage}/>
                <PrivateRoute {...props} path="/edit_gallery_image/:id" exact component={AddEditGalleryImage}/>
                <PrivateRoute {...props} path="/send_email" exact component={Subscribers}/>
                <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
                <PublicRoute {...props} restricted={true} path="/register" exact component={Register}/>
                <PublicRoute {...props} restricted={false} path="/articles" exact component={Articles}/>
                <PublicRoute {...props} restricted={false} path="/article/:id" exact component={ArticleDetail}/>
                <PublicRoute {...props} restricted={false} path="/about_us" exact component={AboutUs}/>
                <PublicRoute {...props} restricted={false} path="/services" component={Services}/>
                <PublicRoute {...props} restricted={false} path="/gallery" component={Gallery}/>
                <PublicRoute {...props} restricted={false} path="/contact" exact component={Contact}/>
                <PublicRoute {...props} restricted={false} path="/questions" exact component={Questions}/>
                <PublicRoute {...props} restricted={false} path="/site_admin" exact component={Home}/>
                <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
                <PublicRoute {...props} restricted={false} path="/*" isRedirect={true} component={Home}/>
            </Switch>
        </Layout>
    );
};

export default Routes;
