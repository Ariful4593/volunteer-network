import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import './Selected.css'
const Selected = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedData, setSelectedData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/volunteerSelectedInfo?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setSelectedData(data))
    }, [])

    const deleteItem = (id) => {
        fetch(`http://localhost:4000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                console.log('deleted Succesfully')
            })

    }
    return (
        <div className="container">
            <div className="row">
                {
                    selectedData.map(cardInfo => {
                        return (
                            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3 pb-2" key={cardInfo._id} >
                                <div className="main-card" style={{ background: `${cardInfo.bgColor}` }}>
                                    <img className="card-img-top" src={require(`../../images/${cardInfo.img}`)} alt="Card cap" />
                                    <div className="card-body" style={{ height: '65px', textAlign: 'center', padding: '12px', color: 'white' }}>
                                        <Button variant="contained" onClick={() => deleteItem(cardInfo._id)}>Cancel</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Selected;