import React, { Component } from "react";
import { Route } from "react-router-dom";
import mainCSS from './main.css';
import NavBar from '../navigation/nav_bar';
import Header from "../header/header";
import Footer from '../footer/footer';
import Splash from "../../splash/splash";
import Stable from "../../stable/stable";
import Tour from '../../tour/tour';
import Search from '../../search/search';
import Confirmation from '../../confirmation/confirmation';

import { Query } from "react-apollo";
import Queries from "../../../graphql/queries";


const { IS_LOGGED_IN } = Queries;

class Main extends Component {


  render() {

    return (
      <div className="app" id="test" >
        <div className="main">
          <NavBar />
          <Header />
          <Route exact path="/" component={Splash} />
          <Route exact path="/stable" component={Stable} />
          <Route exact path="/tour" component={Tour} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/book" component={Confirmation} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
