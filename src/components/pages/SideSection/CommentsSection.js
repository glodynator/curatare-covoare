import React, { Component } from 'react';
import { FacebookProvider, Initialize, Comments } from 'react-facebook';

class CommentsSection extends Component {
    pageID = '357640388064978';

    componentDidMount() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '357640388064978',
                cookie     : true,  // enable cookies to allow the server to access the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v5.0' // use version 2.1
            });
        }.bind(this);

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    getAccessToken() {
        let accessToken = '';
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                accessToken = response.authResponse.accessToken;
                return accessToken;
            }
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.getAccessToken();
    }

    render() {
        return (
            <div className='aside-section'>
                <h4 className='aside-section__headline'>Comments</h4>
                <div className="fb-comments" data-href="https://www.facebook.com/CuratareCovoareTapiterii/" data-numposts="10"></div>
                <div>

                </div>
            </div>
        );
    }
}

export default CommentsSection;