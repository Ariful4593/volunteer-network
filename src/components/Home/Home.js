import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

// import Data from '../Data/Data'
const Home = () => {
    const [volunteerData, setVolunteerData] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/getDatabase')
            .then(res => res.json())
            .then(data => setVolunteerData(data))
    }, [])

    const [searchItem, setSearchItem] = useState('');
    useEffect(() => {
        fetch('/tasks?search=' + searchItem)
            .then(res => res.json())
            .then(data => setSearchItem(data))
    }, [searchItem])


    return (

        <>
            <div className="text-center mt-4 col-md-8 col-lg-6 container">
                <h3>I GROW BY HELPING PEOPLE IN NEED</h3>
                <form>
                    <div className="row d-flex justify-content-center">
                        <div className="col-6 col-sm-6 col-md-5 col-lg-6 col-xl-6 m-0 p-0">
                            <input type="search" className=" w-100 form-control" style={{ borderRadius: '5px 0px 0px 5px' }} name="" id="" />
                        </div>
                        <div className="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 p-0">
                            <input type="submit" value="Search" className="btn btn-primary m-0 w-100" style={{ borderRadius: '0px 5px 5px 0px' }} />
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className="container">
                <div className="row">
                    {
                        volunteerData.map(volData => {
                            return (
                                <div className="col-sm-6 col-md-3 col-lg-3 col-xl-3 pb-2" key={volData._id} >
                                    <div className="main-card" style={{ background: `${volData.bgColor}` }}>
                                        <img className="card-img-top" src={require(`../../images/${volData.img}`)} alt="Card cap" />
                                        <div className="card-body" style={{ height: '65px', textAlign: 'center', padding: '12px', color: 'white' }}>
                                            <Link to={`register/${volData._id}`}>
                                                {volData.title}
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Home;