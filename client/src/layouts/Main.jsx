import React, { useState } from 'react';
import logo from '../assets/img/icons/common/logo.svg';
import { Container, Row, Col } from "reactstrap";
import withAuth from '../utils/withAuth';

import Header from "../components/Header/Header.jsx";

function Main () {
  return (
    <>
      <Header/>
      <div className="main-content mt-7">
          <Row className="justify-content-center">
            <p>안녕하세요 :)</p>
          </Row>
      </div>
    </>
  );
}

export default withAuth(Main);
