import React, { useEffect, useState } from 'react';
import addImg from '../../logos/users-alt 1.png';
import deleteImg from '../../logos/trash-2 9.png';
import addUser from '../../logos/plus 1.png'
import './Admin.css'
const Admin = () => {
    const [volRegData, setVolRegData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/getVolunteerRegisterInfo')
            .then(res => res.json())
            .then(data => setVolRegData(data))
    })
    const deleteUser = (id) => {
        fetch(`http://localhost:4000/deleteRegister/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted Succesfully')
            })
        
    }

    return (
        <div className="container mw-100">
            <div className="row">
                <div className="col-2 p-0">
                <div className="row">
                        <div className="col-1">
                            <img style={{width: '20px'}} src={addImg} alt="" />
                        </div>
                        <div className="col">
                            <h6>Volunteer Register List</h6>
                        </div>
                    </div>

                    <div className="row" style={{cursor: 'pointer'}}>
                        <div className="col-1">
                            <img style={{width: '20px'}} src={addUser} alt="" />
                        </div>
                        <div className="col">
                            <h6>Add Event</h6>
                        </div>
                    </div>

                </div>
                <div className="col">
                    <div className="container" style={{ background: '#bab8b8', borderRadius: '10px' }}>
                        <h1>Volunteer Register List</h1>
                        <div className="row">
                            <div className="col">
                                <table className="table" style={{ border: '1px solid' }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email Id</th>
                                            <th>Registration date</th>
                                            <th>Volunteer List</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            volRegData.map(regData => {
                                                return (
                                                    <tr key={regData._id}>
                                                        <td>{regData.name}</td>
                                                        <td>{regData.email}</td>
                                                        <td>{regData.date}</td>
                                                        <td>{regData.description}</td>
                                                        <td style={{cursor: 'pointer'}}><img src={deleteImg} onClick={() => deleteUser(regData._id)} alt=""/></td>
                                                    </tr>
                                                )

                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Admin;