import { useEffect, useState } from "react";
import API from "../service/api";
import type { Customer } from "../types/types";

interface Props {
  reload?: boolean; // optional trigger
}

export default function CustomerList({ reload }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [reload]);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Customer List</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        customers.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid gray",
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <p>
              <strong>Name:</strong> {c.name}
            </p>
            <p>
              <strong>NIC:</strong> {c.nic}
            </p>
            <p>
              <strong>DOB:</strong> {c.dob}
            </p>

            {/* 📱 Mobiles */}
            <p>
              <strong>Mobiles:</strong> {c.mobiles?.join(", ") || "N/A"}
            </p>

            {/* 🏠 Address */}
            {c.addresses && c.addresses.length > 0 && (
              <div>
                <strong>Address:</strong>
                <p>{c.addresses[0].line1}</p>
                <p>{c.addresses[0].line2}</p>
                <p>
                  City ID: {c.addresses[0].cityId} | Country ID:{" "}
                  {c.addresses[0].countryId}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
