import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const PrisonManager = () => {
  const [prisoners, setPrisoners] = useState([]);
  const [prisoner, setPrisoner] = useState({
    id: '',
    name: '',
    gender: '',
    cellBlock: '',
    crime: '',
    sentenceYears: '',
    status: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedPrisoner, setFetchedPrisoner] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/prisonapi`;

  useEffect(() => {
    fetchAllPrisoners();
  }, []);

  const fetchAllPrisoners = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setPrisoners(res.data);
    } catch (error) {
      setMessage('Failed to fetch prisoners.');
    }
  };

  const handleChange = (e) => {
    setPrisoner({ ...prisoner, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in prisoner) {
      if (!prisoner[key] || prisoner[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addPrisoner = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, prisoner);
      setMessage('Prisoner added successfully.');
      fetchAllPrisoners();
      resetForm();
    } catch (error) {
      setMessage('Error adding prisoner.');
    }
  };

  const updatePrisoner = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, prisoner);
      setMessage('Prisoner updated successfully.');
      fetchAllPrisoners();
      resetForm();
    } catch (error) {
      setMessage('Error updating prisoner.');
    }
  };

  const deletePrisoner = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllPrisoners();
    } catch (error) {
      setMessage('Error deleting prisoner.');
    }
  };

  const getPrisonerById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedPrisoner(res.data);
      setMessage('');
    } catch (error) {
      setFetchedPrisoner(null);
      setMessage('Prisoner not found.');
    }
  };

  const handleEdit = (prsn) => {
    setPrisoner(prsn);
    setEditMode(true);
    setMessage(`Editing prisoner with ID ${prsn.id}`);
  };

  const resetForm = () => {
    setPrisoner({
      id: '',
      name: '',
      gender: '',
      cellBlock: '',
      crime: '',
      sentenceYears: '',
      status: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="prison-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Prison Management</h2>

      <div className="form-section">
        <h3>{editMode ? 'Edit Prisoner' : 'Add Prisoner'}</h3>
        <div className="form-flex">
          <input type="number" name="id" placeholder="ID" value={prisoner.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={prisoner.name} onChange={handleChange} />
          <select name="gender" value={prisoner.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <input type="text" name="cellBlock" placeholder="Cell Block" value={prisoner.cellBlock} onChange={handleChange} />
          <input type="text" name="crime" placeholder="Crime" value={prisoner.crime} onChange={handleChange} />
          <input type="number" name="sentenceYears" placeholder="Sentence (Years)" value={prisoner.sentenceYears} onChange={handleChange} />
          <select name="status" value={prisoner.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="RELEASED">RELEASED</option>
          </select>
          <input type="text" name="contact" placeholder="Contact" value={prisoner.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addPrisoner}>Add Prisoner</button>
          ) : (
            <>
              <button className="btn-green" onClick={updatePrisoner}>Update Prisoner</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div className="fetch-section">
        <h3>Get Prisoner By ID</h3>
        <div className="fetch-flex">
          <input
            type="number"
            value={idToFetch}
            onChange={(e) => setIdToFetch(e.target.value)}
            placeholder="Enter ID"
          />
          <button className="btn-blue" onClick={getPrisonerById}>Fetch</button>
        </div>

        {fetchedPrisoner && (
          <div>
            <h4>Prisoner Found:</h4>
            <pre>{JSON.stringify(fetchedPrisoner, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="table-section">
        <h3>All Prisoners</h3>
        {prisoners.length === 0 ? (
          <p>No prisoners found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(prisoner).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prisoners.map((prsn) => (
                  <tr key={prsn.id}>
                    {Object.keys(prisoner).map((key) => (
                      <td key={key}>{prsn[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(prsn)}>Edit</button>
                        <button className="btn-red" onClick={() => deletePrisoner(prsn.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default PrisonManager;
