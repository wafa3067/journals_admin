"use client";

import { useState } from "react";

interface Receiver {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function ReceiverPage() {
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddReceiver = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      const newReceiver: Receiver = {
        id: Date.now().toString(),
        ...formData,
      };
      setReceivers((prev) => [...prev, newReceiver]);
      setFormData({ name: "", email: "", password: "" });
    }
  };

  const handleDeleteReceiver = (id: string) => {
    setReceivers((prev) => prev.filter((receiver) => receiver.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Receiver Management</h1>

      {/* Add Receiver Form */}
      <form
        onSubmit={handleAddReceiver}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Receiver
        </button>
      </form>

      {/* Receiver List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Added Receivers</h2>
        {receivers.length === 0 ? (
          <p className="p-6 text-gray-500">No receivers added yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map((receiver) => (
                <tr key={receiver.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{receiver.name}</td>
                  <td className="px-6 py-3">{receiver.email}</td>
                  <td className="px-6 py-3">
                    {"•".repeat(receiver.password.length)}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDeleteReceiver(receiver.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
