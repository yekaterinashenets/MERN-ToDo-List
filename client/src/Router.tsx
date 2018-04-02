import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Auth from './containers/Auth';

class Router extends React.Component {
    getPath = (path: string) => {
        return '/' + path;
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path={this.getPath('list')} component={Home} />
                    <Route exact={true} path={this.getPath('')} component={Auth} />
                </Switch> 
            </BrowserRouter>
        );
    }
}

export default Router;