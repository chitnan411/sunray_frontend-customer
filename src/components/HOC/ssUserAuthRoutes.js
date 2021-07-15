import Cookies from "js-cookie";
import queryString from "query-string";
import React, {Suspense} from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {withRouter} from "react-router";
import {ssClientAuthFlagCookieKey} from "../../utils/constants.js";
import {isObjectEmpty} from "../../utils/commonUtils.js";

const AuthRouteConfig = ({ component: Component, fullLayout, ...rest }) => {
    const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
    console.log(rest,"rest rest rest rest rest rest rest rest ")
    return (
        <Route
            {...rest}
            render={(props) =>
                (isAuthenticated && isAuthenticated === 'true')
                    ?
                    <>
                        <Component {...props} />
                    </>
                    : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        />
    )
}

const UnAuthRouteConfig = ({ component: Component, ...rest }) => {
    const isAuthenticated = Cookies.get(ssClientAuthFlagCookieKey)
    console.log(rest,"rest rest rest rest rest rest rest rest ")
    if (rest.location.pathname === '/login' || rest.location.pathname === '/forgot-password' || rest.location.pathname === "/create-account" ) {
        return (
            <Route
                {...rest}
                render={(props) =>
                    (isAuthenticated && isAuthenticated === 'true')
                        ? <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                        : <Component {...props} />
                }
            />
        )
    }
    else if (rest.location.pathname === "/create-password") {
        const queryParams=queryString.parse(rest.location.search);
        console.log(queryParams,"!queryParams !queryParams !queryParams !queryParams !queryParams !queryParams !queryParams ")
        return (
            <Route
                {...rest}
                render={(props) =>
                    ((isAuthenticated && isAuthenticated === 'true') || (isObjectEmpty(queryParams)))
                        ? <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                        : <Component {...props} />
                }
            />
        )
    }
    else {
        return (
            <Route
                {...rest}
                render={(props) =>
                    <Component {...props} />
                }
            />
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         user: state.auth.login.userRole
//     }
// }

// export const SSAuthenticatedRoute = withRouter(connect(mapStateToProps)(AuthRouteConfig))

export const SSAuthenticatedRoute = withRouter(connect(null)(AuthRouteConfig))


export const SSUnAuthenticatedRoute = withRouter(connect(null)(UnAuthRouteConfig))

// export const SSLoginProtectedRoute = withRouter(connect(mapStateToProps)(ssLoginRouteConfig()))
