import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

function EmpModel(props) {
  const skater = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
  });
  return (
    <Modal {...props} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.emp.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col> ID: {props.emp.id} </Col>
            <Col> Name: {props.emp.name} </Col>
          </Row>
          <Row>
            <Col> Address: {props.emp.address} </Col>
            <Col> Age: {props.emp.age} </Col>
          </Row>
          <Row>
            <Col> Department: {props.emp.department} </Col>
            <Col> Status: {props.emp.status} </Col>
          </Row>
          <Row>
            <Col> Latitude: {props.emp.latitude} </Col>
            <Col> Longitude: {props.emp.longitude} </Col>
          </Row>
          <Row>
            <Col>
              <div className="leaflet-container">
                <MapContainer
                  center={[props.emp.latitude, props.emp.longitude]}
                  zoom={13}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[props.emp.latitude, props.emp.longitude]}
                    icon={skater}
                  >
                    <Popup>A popup</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmpModel;
