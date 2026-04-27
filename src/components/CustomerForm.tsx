import { useState, useEffect } from "react";
import type { Customer } from "../types/types";
import API from "../service/api";

interface City {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Props {
  refresh: () => void;
}

export default function CustomerForm({ refresh }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [form, setForm] = useState<Customer>({
    name: "",
    dob: "",
    nic: "",
    mobiles: [""],
    addresses: [
      {
        line1: "",
        line2: "",
        cityId: 0,
        countryId: 0,
      },
    ],
  });

  // Load cities and countries
  useEffect(() => {
    const load = async () => {
      const cityRes = await API.get("/cities");
      const countryRes = await API.get("/countries");

      setCities(cityRes.data);
      setCountries(countryRes.data);
    };

    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.post("/customers", form);
    alert("Customer Created");
    refresh();
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create Customer</h2>

        <input
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="NIC"
          onChange={(e) => setForm({ ...form, nic: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Mobile"
          onChange={(e) => setForm({ ...form, mobiles: [e.target.value] })}
        />

        <input
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Address Line 1"
          onChange={(e) =>
            setForm({
              ...form,
              addresses: [{ ...form.addresses[0], line1: e.target.value }],
            })
          }
        />

        <input
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Address Line 2"
          onChange={(e) =>
            setForm({
              ...form,
              addresses: [{ ...form.addresses[0], line2: e.target.value }],
            })
          }
        />

        <select
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.addresses[0].cityId}
          onChange={(e) =>
            setForm({
              ...form,
              addresses: [
                {
                  ...form.addresses[0],
                  cityId: Number(e.target.value),
                },
              ],
            })
          }
        >
          <option value={0}>Select City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={form.addresses[0].countryId}
          onChange={(e) =>
            setForm({
              ...form,
              addresses: [
                {
                  ...form.addresses[0],
                  countryId: Number(e.target.value),
                },
              ],
            })
          }
        >
          <option value={0}>Select Country</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Create Customer
        </button>
      </form>
    </div>
  );
}
