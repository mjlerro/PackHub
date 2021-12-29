import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MyNavbar from './MyNavbar';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function Hub({ isLoggedIn, currentUser }) {
    const history = useHistory();

    useEffect(() => {
        document.title = 'PackHub';
    }, []);

    // const logout = () => {
    //     let ans = window.confirm('Are you sure?');
    //     if (ans) {
    //         localStorage.removeItem('user');
    //         setCurrentUser({});
    //         history.push('/');
    //     }
    // }

    return (
        <>
            <div className="container">
                {isLoggedIn && <MyNavbar currentUser={currentUser} />}

                <div className="container" style={{ "margin-top": "3%", backgroundColor: 'darkred' }}>
                    <div style={{ "color": "white", "padding-top": "7vh", "padding-bottom": "2vh", "font-size": "8vmin", textShadow: ".4vmin .4vmin #000000" }}>PackHub</div>
                </div>

                <div className="container bg-dark" >
                    <div style={{ "color": "white", "padding-top": "1vh", "padding-bottom": "1.2vh", "font-size": "3vh" }}>Create Your WolfPack Project Group!</div>
                </div>

                <div className="container bg-light">
                    <div className="row">

                        <div className="col-sm-4">
                            <img src="https://i.pinimg.com/originals/2e/d5/ae/2ed5aead704a1a8ebfc80bf4525871a2.jpg" width="100%" style={{ "padding-top": "6vh" }} className="img-responsive" alt="Marcus Lerro" />
                        </div>

                        <div className="col-sm-4">
                            <h3 style={{ "padding-top": "6vh", "font-size": "2vw" }}>What Separates Us</h3>
                            <p style={{ "font-size": "1.1vw" }}>PackHub provides an environment for NCSU students who want to work together on a project, homework assignment, or any other task in a group.</p>
                            <p style={{ "font-size": "1.1vw" }}>Each "Pack" is a group of students who are dedicated to working on something of their choosing. They have the options to schedule meetings, creates tasks, create other Packs, join other Packs, or delete their Packs.</p>
                            <p style={{ "font-size": "1.1vw" }}>With a simple interface, variety of functionality, and a community of NCSU students, you will be guarenteed to find what your looking for and improve your grades!</p>
                        </div>

                        <div className="col-sm-4 d-flex flex-column justify-content-center align-items-center">
                            <Button onClick={() => history.push('/login')} className="bg-red text-white" style={{ alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vmin", height: "8vmin", fontSize: "3vmin" }}>
                                Login
                            </Button>
                        </div>
                    </div>
                    <div style={{ "padding-top": "10vh", paddingBottom: "8vh" }} className="row">
                        <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                            <h3 style={{ "text-align": "center", fontSize: "4vmin" }}>Our Supporters:</h3>
                        </div>
                        <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                            <img width="100%" alt="AppleLogo" className="img-responsive" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_logo_icon_168588.png" />
                        </div>
                        <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                            <img width="100%" alt="MicrosoftLogo" className="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png" />
                        </div>
                        <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                            <img width="100%" alt="NCSULogo" className="img-responsive" src="https://brand.ncsu.edu/assets/logos/ncstate-brick-2x2-red-rgb.jpg" />
                        </div>
                    </div>


                </div>

            </div>


        </>
    )
}
