import React, {Component} from 'react';
import cookie from 'react-cookies';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import './header.css';

class Header extends Component {

    state = {
        element1: <Nav.Link href="/auth/sign_in">Sign in</Nav.Link>,
        element2: <Nav.Link href="/auth/sign_up">Sign up</Nav.Link>,
        element3: undefined,
        element4: [],
        element5: undefined,
        element6: undefined,
    };

    componentDidMount() {
        const authorized = cookie.load('authorized');
        const imgSrc = "./dark_logo.png";

        if (authorized) {
            this.setState({
                element1: undefined,
                element2: undefined,
                element3: <Nav.Link href="/auth/sign_out">Sign out</Nav.Link>,
                element4: <NavDropdown title={
                        <img className="logo"
                            src={imgSrc}
                            alt="Logo"
                        />} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/followers_list">Followers</NavDropdown.Item>
                    <NavDropdown.Item href="/news">News</NavDropdown.Item>
                    <NavDropdown.Item href="/activity">My activity</NavDropdown.Item>
                    <NavDropdown.Item href="/statistics">Statistics</NavDropdown.Item>
                </NavDropdown>,
                element5: <Nav.Link href="/">Main</Nav.Link>,
                element6: <Nav.Link href="/my_page">My page</Nav.Link>,
            });
        } else {
            this.setState({
                element1: <Nav.Link href="/auth/sign_in">Sign in</Nav.Link>,
                element2: <Nav.Link href="/auth/sign_up">Sign up</Nav.Link>,
                element3: undefined,
                element4: <Nav.Link href="#">BlogBeast</Nav.Link>,
                element5: undefined,
                element6: undefined,
            });
        }
    }

    render() {
        return (
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {this.state.element4}
                        {this.state.element5}
                        {this.state.element6}
                    </Nav>
                    <Nav>
                        {this.state.element1}
                        {this.state.element2}
                        {this.state.element3}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
