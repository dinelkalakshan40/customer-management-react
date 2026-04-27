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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="date"
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
      <input
        placeholder="NIC"
        onChange={(e) => setForm({ ...form, nic: e.target.value })}
      />

      <input
        placeholder="Mobile"
        onChange={(e) => setForm({ ...form, mobiles: [e.target.value] })}
      />

      <input
        placeholder="Address Line1"
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], line1: e.target.value }],
          })
        }
      />

      <input
        placeholder="Address Line2"
        onChange={(e) =>
          setForm({
            ...form,
            addresses: [{ ...form.addresses[0], line2: e.target.value }],
          })
        }
      />

      <select
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

      <br />

      <select
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

      <button type="submit">Create</button>
    </form>
  );
}
