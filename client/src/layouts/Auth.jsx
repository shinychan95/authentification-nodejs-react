import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import constants from '../config/constants';
import axios from 'axios'; // HTTP 클라이언트 라이브러리
import routes from "../routes.js";

// core components
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";


axios.defaults.baseURL = constants.apiUrl;

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    // 각 prop에 대해서 모두 실행해본다.
    if(this.props.token && this.props.isAuthenticated){
      return (
        <Redirect to="/main"/>
      );
    }

    console.log(this.props)
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        console.log("Test: ", prop)
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <NavBar />
        <div className="main-content">
          <div className="header py-5 py-lg-6">
            <Container>
              <div className="header-body text-center">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome!</h1>
                    <p className="text-lead text-light">
                      Login or Create New Account
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
        </div>
        <Footer />
      </>
    );
  }
}

export default Auth;
