import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://amruta-assignment-backend.onrender.com//user/${id}`)
      .then(res => setData(res.data))
      .catch(() => alert("User not found"));
  }, [id]);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.name}'s Video Page</h1>
      <video src={data.videoUrl} controls className="w-full mb-4" />
      <div className="mb-4">
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Company:</strong> {data.company}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Template:</strong> {data.template}</p>
      </div>
      <div className="mt-4">
        <p className="mb-2 font-semibold">Scan QR Code:</p>
        <img src={`https://amruta-assignment-backend.onrender.com/${data.qrPath}`} alt="QR Code" />
      </div>
    </div>
  );
};

export default UserPage;