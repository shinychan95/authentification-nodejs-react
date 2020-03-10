import React from 'react';
import logo from '../../assets/img/icons/common/logo.svg';
import { Container } from "reactstrap"


class Header extends React.Component {
    render() {
        return (
            <>
                <div className="header">
                    <img src={logo} className="header-logo"/>
                </div>    
            </>
         );
    }
}

export default Header;