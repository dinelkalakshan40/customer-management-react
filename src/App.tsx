import { useState } from "react";
import "./App.css";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";

function App() {
  const [reload, setReload] = useState(false);

  const refresh = () => {
    setReload(!reload);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Customer Management System</h1>

      <CustomerForm refresh={refresh} />
      {/* <FamilyForm />
      <BulkUpload /> */}
      <CustomerList />
    </div>
  );
}

export default App;
