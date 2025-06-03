import React, { useEffect, useState } from 'react';
import './userProfile.css';

export default function UserProfile(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user/' + props.userId)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user', err);
      });
  }, []);

  const handleChange = (e) => {
    user[e.target.name] = e.target.value;
    setUser(user);
  };

  const handleSubmit = () => {
    fetch('/api/user/' + props.userId, {
      method: 'POST',
      body: JSON.stringify(user),
    });
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {loading ? (
        'Loading...'
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input name="username" value={user?.username || ''} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input name="email" value={user?.email || ''} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
