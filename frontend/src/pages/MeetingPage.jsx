import React, { useEffect, useState } from 'react';

import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const MeetingPage = ({ match }) => {
    const [meeting, setMeeting] = useState({});
    const [participantsUpdated, setParticipantsUpdated] = useState();
    const [participants, setParticipants] = useState([]);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [name, setName] = useState('');


    const addParticipant = () => {
        axios.post('http://localhost:5000/api/participants/create', { name: name }).then(res => {
            setIsOpenAddModal(false);
            setParticipantsUpdated(new Date().getTime());
        })
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }


    //get participants
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/meetings/${match.params.meeting_id}`).then(res => {
                if (res.data) {
                    setMeeting(res.data.myMeeting);
                    setParticipants(res.data.participants);
                }
            }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Meeting details page</h2>
            <h3>{meeting.descripton}</h3>
            <Badge bg="info">{meeting.url}</Badge>
            <div>{meeting.date}</div>
            <h3>Participants</h3>
            <Button variant="success" onClick={() => setIsOpenAddModal(true)}>Add a new participant</Button>


            {/* add modal */}

            <Modal show={isOpenAddModal} onHide={() => setIsOpenAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Participant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={handleNameChange} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpenAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addParticipant}>
                        Save Participant
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>
                    {participants && participants.map((participant, index) => (
                        <tr key={index}>
                            <td>{participant.id}</td>
                            <td>{participant.name}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>



    )
};

export { MeetingPage };