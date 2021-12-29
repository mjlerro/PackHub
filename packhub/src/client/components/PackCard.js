import React from 'react';
import Button from 'react-bootstrap/Button';

export default function PackCard({pack, idx, currentUser, handleJoin}) {
    return (
        <div className="card mb-2" key={idx}>
            <div className="card-body">
                <h5 className="card-title">{pack.name}</h5>
                <p className="card-text">{pack.description}</p>
                <p className="card-text">Owner: {pack.owner === currentUser.displayName ? "Me" : pack.owner}</p>
                <p className="card-text">Current Members: {pack.joinedMembers.length > 0 ? pack.joinedMembers.join(", ") : "No members have joined yet."}</p>
                <p className="card-text">Invited Members: {pack.invitedMembers.length > 0 ? pack.invitedMembers.join(", ") : "There are no pending invitations."}</p>
                
                <Button className="text-white" style={{alignSelf: "center", backgroundColor: "darkred", border: "none"}} onClick={() => {
                    handleJoin(pack, idx);
                }}>
                    Join Pack
                </Button>
            </div>
        </div>
    )
}
