import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { useContext } from "react";
import { EmpContext } from "../App";
import EmpModel from "./EmpModel";
import EmpEditModel from "./EmpEditModel";
import EmpAddModel from "./EmpAddModel";
import axios from "axios";
import { toast } from "react-toastify";

function EmpGrid() {
  //   console.log(empList);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModelShow, setAddModelShow] = useState(false);
  const empList = useContext(EmpContext);

  const handleClick = (emp) => {
    // console.log(emp);
    setSelectedEmp(emp);
    setModalShow(true);
  };
  const handleEdit = (emp, e) => {
    setSelectedEmp(emp);
    setEditModalShow(true);
    // stop parent event propagation
    e.stopPropagation();
  };

  const deleteEmp = (id) => async (e) => {
    // stop parent event propagation
    e.stopPropagation();
    await axios.delete("http://localhost:3004/employees/" + id).then((res) => {
      const status = res.status;
      if (status === 200) {
        // show toast
        toast.success("Employee Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Age</th>
            <th>Department</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* add onclick listener to each row */}
          {empList.map((emp) => {
            return (
              <tr onClick={() => handleClick(emp)} key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.address}</td>
                <td>{emp.age}</td>
                <td>{emp.department}</td>
                <td>{emp.status}</td>
                <td>
                  <Button variant="primary" onClick={(e) => handleEdit(emp, e)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={deleteEmp(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="8">
              <Button variant="success" onClick={() => setAddModelShow(true)}>
                Add New Employee
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <EmpModel
        show={modalShow}
        emp={selectedEmp}
        onHide={() => setModalShow(false)}
      />
      <EmpEditModel
        show={editModalShow}
        emp={selectedEmp}
        onHide={() => setEditModalShow(false)}
      />
      <EmpAddModel show={addModelShow} onHide={() => setAddModelShow(false)} />
    </>
  );
}

export default EmpGrid;
