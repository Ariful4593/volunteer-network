import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import googleLogo from '../../logos/google-logo.png';
import logo from '../../logos/Group 1329.png';
const Login = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBfUiu89usz55dYqshS2cG91SvowkwUDuM",
        authDomain: "volunteer-networkss.firebaseapp.com",
        databaseURL: "https://volunteer-networkss.firebaseio.com",
        projectId: "volunteer-networkss",
        storageBucket: "volunteer-networkss.appspot.com",
        messagingSenderId: "806863675494",
        appId: "1:806863675494:web:a3351260e574293ba4cda7",
        measurementId: "G-VYGKHNFF07"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [user, setUser] = useState({
        name: '',
        email: '',
    })
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/register" } };
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var {displayName, email} = result.user;
            const newUser = {...user};
            newUser.name = displayName;
            newUser.email = email;
            setUser(newUser)
            setLoggedInUser(newUser)
            sessionStorage.setItem('userInfo', JSON.stringify(newUser))
            history.replace(from)
        }).catch(function (error) {
            var email = error.email;
            console.log(email)
        });
    }

    return (
        <div>
            <Container className="text-center mt-4 w-100">
            <img style={{ width: '160px' }} src={logo} alt="" />
            <Row className="mt-2 p-sm-0" style={{  }}>
                <Col className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  border text-center " style={{ boxShadow: '0px 0px 3px 0px', margin: '0 auto', height: '390px' }}>
                    <h2 style={{ marginTop: '125px' }}>Login</h2>
                    <Container style={{ width: '100%', paddingRight: 0}}>
                        <Row className="d-flex justify-content-center" style={{ borderRadius: '20px', border: '1px solid', cursor: 'pointer', width: '100%' }}>
                            <Col className="d-none d-sm-block ">
                                <img style={{ width: '35px' }} src={googleLogo} alt="" />
                            </Col>
                            <Col className="col-9">
                                <h5 style={{ marginTop: '5px' }} onClick={handleGoogleSignIn}>Continue with Google</h5>
                            </Col>

                        </Row>
                    </Container>
                    <p>Don't have account? <span style={{ cursor: 'pointer' }}>Create an Account</span></p>
                </Col>
            </Row>
        </Container>
        </div >
    );
};

export default Login;