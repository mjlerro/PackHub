import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import {auth} from '../../lib/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';


export default function Signup({setCurrentUser}) {
    const history = useHistory();

    useEffect(() => (document.title = 'PackHub | Signup'), []);
    
    const onFormSubmit = e => {
        e.preventDefault();
        let unityId = email.substring(0, email.indexOf('@'));
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
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

    const [fullName, setFullName] = useState('');
    const handleFullNameChange = (e) => { setFullName(e.target.value) }
    const [email, setEmail] = useState('');
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const [password, setPassword] = useState('');
    const handlePasswordChange = (e) => { setPassword(e.target.value) }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value) }

    return (
        <div className="d-flex justify-content-center flex-column p-5">
            <h1 className="text-center" style={{color: "darkred"}}>Signup</h1>
            <Form onSubmit={onFormSubmit} className="d-flex justify-content-center flex-column" >
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicFullName">
                    <Form.Label>First and Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="First Last" value={fullName} onChange={handleFullNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                </Form.Group>
                <Form.Group className="mb-3" style={{alignSelf: "center"}} controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type="password" placeholder="ConfirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                </Form.Group>
                <Button className="text-white mb-3" style={{alignSelf: "center", backgroundColor: "darkred", border: "none", width: "200px"}} type="submit">
                    Submit
                </Button>
                <Button className="text-white mb-3" variant="dark" style={{alignSelf: "center", border: "none", width: "200px"}} onClick={() => history.push('/')}>
                    Cancel
                </Button>
                <span style={{alignSelf: "center"}}>Already have an account? <a style={{color: "darkred"}} href="/login">Log in here</a></span>
            </Form>
        </div>
    )
}
