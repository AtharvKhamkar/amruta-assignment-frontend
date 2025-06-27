import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        company: '',
        location: '',
        template: 'Template1',
    });
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video) return alert("Please upload a video");

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        data.append('video', video);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:9999/submit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setSubmittedId(res.data.id);
            setLoading(false);
        } catch (err) {
            console.error(err);
            alert("Submission failed");
            setLoading(false);
        }
    };

    if (submittedId) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Submission Successful!</h2>
                <a
                    href={`/user/${submittedId}`}
                    className="text-blue-500 underline"
                >
                    View Your Page
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Video Submission Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'email', 'company', 'location'].map(field => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                ))}

                <select
                    name="template"
                    value={form.template}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option>Template1</option>
                    <option>Template2</option>
                    <option>Template3</option>
                </select>

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Home;