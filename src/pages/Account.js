import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        setFormData({
            name: parsedUser.name,
            email: parsedUser.email
        });
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const updatedUsers = users.map(u => {
            if (u.email === user.email) { 
                return { ...u, name: formData.name, email: formData.email };
            }
            return u;
        });

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <span>Account Profile</span>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="card-body">
                        {isEditing ? (
                            <div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
                                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
