import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import {auth} from '../../lib/firebase';
import {signInWithEmailAndPassword, updateProfile} from 'firebase/auth';


export default function Login({setCurrentUser}) {
    const history = useHistory();

    useEffect(() => (document.title = 'PackHub | Login'), []);
    
    const onFormSubmit = e => {
        e.preventDefault();
        let unityId = email.substring(0, email.indexOf('@'));
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: unityId
                }).then(() => {
                    localStorage.setItem('user', JSON.stringify(auth.currentUser));
                    setCurrentUser(auth.currentUser);
                    history.push('/mypacks');
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });
        
    }

    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => { setPassword(e.target.value) }

    return (
        <div className="d-flex justify-content-center flex-column p-5">
            <h1 className="text-center" style={{color: "darkred"}}>Login</h1>
            <Form onSubmit={onFormSubmit} className="d-flex justify-content-center flex-column" >
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                </Form.Group>
                <Button className="text-white mb-3" style={{alignSelf: "center", backgroundColor: "darkred", border: "none", width: "200px"}} type="submit">
                    Submit
                </Button>
                <Button className="text-white mb-3" variant="dark" style={{alignSelf: "center", border: "none", width: "200px"}} onClick={() => history.push('/')}>
                    Cancel
                </Button>
                <span style={{alignSelf: "center"}}>Need an account? <a style={{color: "darkred"}} href="/signup">Sign up here</a></span>
            </Form>
        </div>
    )
}
