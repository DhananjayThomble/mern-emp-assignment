import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EmpModel(props) {
  const [name, setName] = useState(props.emp.name);
  const [address, setAddress] = useState(props.emp.address);
  const [age, setAge] = useState(props.emp.age);
  const [department, setDepartment] = useState(props.emp.department);
  const [status, setStatus] = useState(props.emp.status);
  const [latitude, setLatitude] = useState(props.emp.latitude);
  const [longitude, setLongitude] = useState(props.emp.longitude);

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
    console.log(emp);
    // saving to database using axios post: http://localhost:3004/employees
    await axios
      .patch("http://localhost:3004/employees/" + props.emp.id, emp)
      .then((res) => {
        const status = res.status;
        if (status === 200) {
          // show toast
          toast.success("Employee Updated Successfully");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <Modal {...props} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Employee
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
              defaultValue={props.emp.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              defaultValue={props.emp.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Latitude"
              value={latitude}
              defaultValue={props.emp.latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Longitude"
              value={longitude}
              defaultValue={props.emp.longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              value={age}
              defaultValue={props.emp.age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Department"
              value={department}
              defaultValue={props.emp.department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Form.Group>
          <Form.Label>Status</Form.Label>
          {/* get the selected value */}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setStatus(e.target.value)}
            className="mb-3"
            defaultValue={props.emp.status}
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

export default EmpModel;
