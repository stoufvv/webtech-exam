import React, { useEffect, useState } from 'react';
import { MeetingCard } from '../components/MeetingCard';
import { Pagination, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Meetings.css';

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [meetingsUpdated, setMeetingsUpdated] = useState();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');

  const updateMeetingNotice = (refreshTime) => {
    setMeetingsUpdated(refreshTime);
  }

  const addMeeting = () => {
    axios.post('http://localhost:5000/api/meetings/create', { description: description, url: url, date: date }).then(res => {
      setIsOpenAddModal(false);
      setMeetingsUpdated(new Date().getTime());
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

  //get meetings
  useEffect(() => {
    axios.get('http://localhost:5000/api/meetings').then(res => {
      if (res.data.length) {
        setMeetings(res.data);
      }
    }).catch(err => console.log(err));
  }, [meetingsUpdated]);

  return (
    <>
      <Button variant="success" onClick={() => setIsOpenAddModal(true)}>Add a new meeting</Button>
      <div className="meetings-container">
        {meetings.map((meeting, index) => <MeetingCard meetingHasUpdated={updateMeetingNotice} key={index} meeting={meeting} />)}
      </div>
      <div className="pagination-component">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Next />
        </Pagination>
      </div>

      {/* add modal */}
      <Modal show={isOpenAddModal} onHide={() => setIsOpenAddModal(false)}>
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
              <Form.Control type="text" onChange={handleUrlChange} value={url} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" value={date} onChange={handleDateChange} placeholder={'Please use the format YYYY-MM-DD'} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpenAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addMeeting}>
            Save Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export { Meetings };