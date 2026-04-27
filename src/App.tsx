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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Customer Management System
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 mb-6 hover:shadow-2xl transition-all duration-300">
          <CustomerForm refresh={refresh} />
        </div>

        {/* Optional Grid Section */}
        {/*
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6">
          <FamilyForm />
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6">
          <BulkUpload />
        </div>
      </div>
      */}

        {/* List Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-300">
          <CustomerList />
        </div>
      </div>
    </div>
  );
}

export default App;
