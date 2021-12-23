import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from "../routes";

import {useTapedSelector} from "../hooks/useTapedSelector";

export const AppRouter = () => {

   const {isAuth} = useTapedSelector(state => state.auth)
    return (
        isAuth ?
        <Switch>
            {privateRoutes.map(route =>
            <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
                key={route.path}
            />)}
            <Redirect to={RouteNames.EVENT}/>
        </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                        key={route.path}
                    />)}
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    )
}
