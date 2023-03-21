import EmpGrid from "./components/EmpGrid";
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmpContext = createContext(null);
function App() {
  const [empList, setEmpList] = useState([]);
  // export EmpContext
  useEffect(() => {
    axios.get("http://localhost:3004/employees").then((res) => {
      setEmpList(res.data);
    });
  }, []);

  // console.log(empList);

  return (
    <>
      <EmpContext.Provider value={empList}>
        <EmpGrid />
        <ToastContainer />
      </EmpContext.Provider>
    </>
  );
}

export default App;
export { EmpContext };
