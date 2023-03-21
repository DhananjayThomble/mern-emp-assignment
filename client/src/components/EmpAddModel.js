import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EmpAddModel(props) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [age, setAge] = useState();
  const [department, setDepartment] = useState();
  const [status, setStatus] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emp = {
      name: name,
      address: address,
      age: age,
      department: department,
      status: status,
      latitude: latitude,
      longitude: longitude,
    };
    // console.log(emp);

    await axios.post("http://localhost:3004/employees/", emp).then((res) => {
      //   get status code
      const status = res.status;
      if (status === 201) {
        // show toast
        toast.success("Employee Added Successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Modal {...props} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Status</Form.Label>
          {/* get the selected value */}
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>select your status</option>
            <option value="Remote Location">Remote Location</option>
            <option value="Contract Employee">Contract Employee</option>
            <option value="Full-time">Full-time</option>
          </Form.Select>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmpAddModel;
