import { useEffect, useState } from "react";
import API from "../service/api";
import type { Customer } from "../types/types";

interface Props {
  reload?: boolean;
}

export default function CustomerList({ reload }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = async () => {
    const res = await API.get("/v1/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, [reload]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer List</h2>

      {customers.length === 0 ? (
        <p className="text-gray-500">No customers found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">NIC</th>
                <th className="py-3 px-4 text-left">DOB</th>
                <th className="py-3 px-4 text-left">Mobiles</th>
                <th className="py-3 px-4 text-left">Address</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-blue-600">
                    {c.name}
                  </td>

                  <td className="py-3 px-4">{c.nic}</td>

                  <td className="py-3 px-4">{c.dob}</td>

                  <td className="py-3 px-4">
                    {c.mobiles?.join(", ") || "N/A"}
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    {c.addresses && c.addresses.length > 0 ? (
                      <>
                        <div>{c.addresses[0].line1}</div>
                        <div>{c.addresses[0].line2}</div>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
