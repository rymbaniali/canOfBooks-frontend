import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginButton from './components/LoginButton';
import Profile from './components/profile';
import MyFavoriteBooks from './myFavoriteBooks'
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log('app', this.props)
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />

            <Switch>
              <Route exact path="/">

                {isAuthenticated === true ? <MyFavoriteBooks /> : <LoginButton />}

                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
              </Route>
              <Route exact path="/profile">
                <Profile />
                { /* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              </Route>

            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    )
  }
}


export default withAuth0(App);
