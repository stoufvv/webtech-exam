import axios from 'axios';
import React, { useState } from 'react';
import { Card, Button, Modal, Row, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

const MeetingCard = (props) => {
    const history = useHistory();
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [description, setDescription] = useState(props.meeting.description);
    const [url, setUrl] = useState(props.meeting.url);
    const [date, setDate] = useState(props.meeting.date);

    const goToDetailsPage = () => {
        history.push(`/meetings/${props.meeting.id}`);
    }

    const deleteMeeting = () => {
        axios.delete(`http://localhost:5000/api/meetings/${props.meeting.id}/delete`).then(() => {
            setIsModalDeleteOpen(false);
            // refresh meetings in parent
            props.meetingHasUpdated(new Date().getTime());
        })
    }

    const updateMeeting = () => {
        const updatedMeeting = {
            description: description,
            url: url,
            date: date
        };
        axios.put(`http://localhost:5000/api/meetings/${props.meeting.id}/update`, { updatedMeeting }).then(res => {
            setIsModalEditOpen(false);
            // refresh meetings in parent
            props.meetingHasUpdated(new Date().getTime());
        })
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    return (
        <>
            <Card style={{ width: '18rem', padding: '10px', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>{props.meeting.description}</Card.Title>
                    <Row><Button onClick={goToDetailsPage}>Go to meeting details page</Button></Row>
                    <Row style={{ margin: '10px' }}>
                        <Button variant="danger" onClick={() => setIsModalDeleteOpen(true)}>Delete</Button>
                        <Button style={{ marginTop: '10px' }} variant="warning" onClick={() => setIsModalEditOpen(true)}>Edit</Button>
                    </Row>
                </Card.Body>
            </Card>

            {/* edit modal */}
            <Modal show={isModalEditOpen} onHide={() => setIsModalEditOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={handleDescriptionChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Url</Form.Label>
                            <Form.Control type="text" value={url} onChange={handleUrlChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" value={date} onChange={handleDateChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalEditOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateMeeting}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* delete modal */}

            <Modal show={isModalDeleteOpen} onHide={() => setIsModalDeleteOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the meeting <b>{description}</b>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalDeleteOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteMeeting}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export { MeetingCard };