import { Navbar, Container, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MeetingPage } from './pages/MeetingPage';
import { Meetings } from './pages/Meetings';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Meetings</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">My meetings</Nav.Link>
              <Nav.Link href="/explore">Explore meetings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/">
            <Meetings></Meetings>
          </Route>
          <Route
            path="/meetings/:meeting_id"
            component={withRouter(MeetingPage)}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
