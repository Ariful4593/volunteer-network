import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../../App';
import FormControl from '@material-ui/core/FormControl'
import { Input, InputLabel } from '@material-ui/core';
import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

const VolunteerRegister = () => {
    const [selectedDate, setSelectedDate] = React.useState({
        date: new Date(),
        name: '',
        email: '',
        description: '',
        books: '',

    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { cardId } = useParams();
    const [volunteerCardInfo, setVolunteerCardInfo] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/getDatabase')
            .then(res => res.json())
            .then(data => setVolunteerCardInfo(data))
    }, [])
    const { handleSubmit } = useForm();
    const history = useHistory()
    const onSubmit = data => {
        fetch('http://localhost:4000/addVolunteer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedDate)
        })

        const volCard = volunteerCardInfo.filter(data => data._id === cardId);
        volCard[0].email = loggedInUser.email
        fetch(`http://localhost:4000/addVolunteerSelected?email=${loggedInUser.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(volCard[0])
        })
        history.push(`/selected/${cardId}`)
    };
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            const newName = { ...selectedDate }
            newName.name = e.target.value;
            setSelectedDate(newName);
        }
        if (e.target.name === 'email') {
            const newName = { ...selectedDate }
            newName.email = e.target.value;
            setSelectedDate(newName);
        }
        if (e.target.name === 'date') {
            const newName = { ...selectedDate }
            newName.date = e.target.value;
            setSelectedDate(newName);
        }
        if (e.target.name === 'description') {
            const newName = { ...selectedDate }
            newName.description = e.target.value;
            setSelectedDate(newName);
        }
        if (e.target.name === 'books') {
            const newName = { ...selectedDate }
            newName.books = e.target.value;
            setSelectedDate(newName);
        }
    }

    // const handleDateChange = (date) => {
    //     const newDate = { ...selectedDate };
    //     newDate.date = date
    //     setSelectedDate(newDate);
    // };
    return (
        <Container className="">
            <Row className="mt-4" style={{ padding: '50px' }}>
                <Col className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6  border text-center" style={{ boxShadow: '0px 0px 3px 0px', margin: '0 auto' }}>
                    <h2>Register as a Volunteer</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="volunteer-form">
                        <FormControl className="w-100">
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input id="name" aria-describedby="my-helper-text" name="name" defaultValue={loggedInUser.name} onBlur={handleChange} />
                        </FormControl><br />
                        <FormControl className="w-100">
                            <InputLabel htmlFor="email">Username or Email</InputLabel>
                            <Input id="email" aria-describedby="my-helper-text" name="email" defaultValue={loggedInUser.email} onBlur={handleChange} />
                        </FormControl><br />
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <Grid container justify="space-around" >
                                <KeyboardDatePicker
                                    className="w-100"
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={(new Date(selectedDate.date))}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider> */}
                        <FormControl className="w-100">
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input id="description" aria-describedby="my-helper-text" name="description" onBlur={handleChange} required />
                        </FormControl><br />
                        <FormControl className="w-100">
                            <InputLabel htmlFor="books">Organize book at the library</InputLabel>
                            <Input id="books" aria-describedby="my-helper-text" name="books" onBlur={handleChange} required />
                        </FormControl><br />
                        <input type="submit" value="Registration" variant="contained" color="primary" className="mb-4 mt-4" />
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default VolunteerRegister;