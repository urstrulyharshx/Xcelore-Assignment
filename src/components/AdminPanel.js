import React, { useEffect, useContext } from 'react';
import AdminContext from '../store/adminContext';

const AdminPanel = () => {
    const { users, getUsers, updateUser, deleteUser } = useContext(AdminContext);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div>
            <h2>Admin Panel</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => updateUser(user._id, { ...user, role: user.role === 'User' ? 'Admin' : 'User' })}>Toggle Role</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
