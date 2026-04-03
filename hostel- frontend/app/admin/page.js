"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = () => {
    fetch("http://127.0.0.1:8000/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data));
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const resolveComplaint = async (id) => {
    await fetch(`http://127.0.0.1:8000/complaint/${id}`, {
      method: "PUT",
    });

    fetchComplaints();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c.complaint_id}>
              <td>{c.complaint_id}</td>
              <td>{c.student_id}</td>
              <td>{c.category}</td>
              <td>{c.description}</td>
              <td>{c.status}</td>

              <td>
                {c.status === "Pending" ? (
                  <button onClick={() => resolveComplaint(c.complaint_id)}>
                    Resolve
                  </button>
                ) : (
                  "Resolved"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}