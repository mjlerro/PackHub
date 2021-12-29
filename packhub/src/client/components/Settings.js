import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MyNavbar from './MyNavbar';
import { useHistory } from 'react-router-dom';
import { getAuth, deleteUser, sendPasswordResetEmail } from "firebase/auth";

export default function Settings({ currentUser, setCurrentUser }) {
    const history = useHistory();

    useEffect(() => (document.title = 'PackHub | Settings'), []);

    // const onFormSubmit = e => {
    //     e.preventDefault();
    //     let unityId = email.substring(0, email.indexOf('@'));
    //     let user = {
    //         fullName: fullName,
    //         email: email,
    //         unityId: unityId
    //     }
    //     localStorage.setItem('user', JSON.stringify(user));
    //     setCurrentUser(user);
    //     history.push('/hub');
    // }

    // const [fullName, setFullName] = useState('');
    // const handleFullNameChange = (e) => { setFullName(e.target.value) }
    // const [email, setEmail] = useState('');
    // const handleEmailChange = (e) => { setEmail(e.target.value) }
    // const [password, setPassword] = useState('');
    // const handlePasswordChange = (e) => { setPassword(e.target.value) }

    const onFormDelete = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (window.confirm('Are you sure? This action cannot be reverted.')) {
            deleteUser(user).then(() => {
                // User deleted.
            }).catch((error) => {
                console.log(error);
            });

            localStorage.removeItem('user');
            setCurrentUser({});
            history.push('/login');
        }
    }

    const onPasswordReset = () => {
        if (window.confirm("Password change will be sent to your email.\nYou will be logged out, continue?")) {
            const auth = getAuth();
            const user = auth.currentUser;
            const useremail = user.email;
            sendPasswordResetEmail(auth, useremail)
                .then(() => {
                    // Password reset email sent!
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode, errorMessage);
                });
            localStorage.removeItem('user');
            setCurrentUser({});
            history.push('/login');
        }
    }

    const logout = () => {
        if (window.confirm('Are you sure?')) {
            localStorage.removeItem('user');
            setCurrentUser({});
            history.push('/login');
        }
    }

    return (
        <>
            <MyNavbar pageTitle={"Settings"} currentUser={currentUser} />
            <div className="d-flex justify-content-center flex-column">
                <Button onClick={() => logout()} className="bg-red text-white" style={{ marginTop: "10%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                    Logout
                </Button>

                <Button onClick={() => onPasswordReset()} className="bg-red text-white" style={{ marginTop: "1%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                    Change Password
                </Button>

                <Button onClick={() => onFormDelete()} className="bg-red text-white" style={{ marginTop: "1%", alignSelf: "center", backgroundColor: "darkred", border: "none", width: "20vw" }}>
                    Delete Account
                </Button>
            </div>
        </>

    )
}
