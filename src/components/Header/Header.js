import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import img from '../../logos/Group 1329.png'
import { useContext } from 'react';
import { UserContext } from '../../App';
// import Data from '../Data/Data';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const email = 'arifkhagoria2015@gmail.com';
    const test = loggedInUser.email == email;
    console.log(test)
    const adminPanel = () => {
        history.push('/adminPanel')
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Link to="/">
                    <Navbar.Brand>
                        <img style={{ width: '130px' }} src={img} alt="" />
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="mr-auto navLink justify-content-end">
                    <Link to="home">Home</Link>
                    <Link to="donation">Donation</Link>
                    <Link to="events">Events</Link>
                    <Link to="blog">Blog</Link>
                    {
                        loggedInUser.name ? <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>{loggedInUser.name}</Button> : <Link to="login">
                            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Register</Button>
                        </Link>
                    }
                    {
                        test ? <Button onClick={adminPanel} className="bg-secondary">Dashboard</Button> : ''
                    }
                    
                </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Header;