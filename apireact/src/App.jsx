import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fetch = () => {
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState(null)
  const [editCompanyName , setEditCompanyName] = useState("")
  const [editContactTitle , setEditContactTitle] = useState("")

const addSupplier = (newSupplier)=>{
  axios.post('https://northwind.vercel.app/api/suppliers',newSupplier).then(()=>{
    fetchData()
    setEditCompanyName('')
    setEditContactTitle('')
  })
  .catch((error) => {
    console.error('Error adding supplier:', error);
  });
  
  }




  const editSupplier = async (id) => {
    try {
      const response = await axios.put(`https://northwind.vercel.app/api/suppliers/${id}`, {
        companyName:editCompanyName,
        contactTitle:editContactTitle
      });

      setCategory((prevCategory) =>
        prevCategory.map((supplier) =>
          supplier.id === id ? { ...supplier, companyName:editCompanyName, contactTitle:editContactTitle } : supplier
        )
      );

      console.log('Edit Response:', response.data);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await axios.delete(`https://northwind.vercel.app/api/suppliers/${id}`);
      setCategory((prevCategory) => prevCategory.filter((supplier) => supplier.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);
  

  const fetchData = async () => {
    try {
      const response = await axios.get('https://northwind.vercel.app/api/suppliers');
      console.log(response.data);
      setCategory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
    <div>
       <input
        type="text"
        placeholder="Company Name"
        value={editCompanyName}
        onChange={(e) => setEditCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Title"
        value={editContactTitle}
        onChange={(e) => setEditContactTitle(e.target.value)}
      />
      <button onClick={() => addSupplier({ companyName: editCompanyName, contactTitle: editContactTitle })}>Add</button>
      <button onClick={ () => editSupplier(editId)}>Edit</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Contact Title</th>
          </tr>
        </thead>
        <tbody>
          {category.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.companyName}</td>
              <td>{supplier.contactTitle}</td>
              <div style={{ display: 'flex', gap: '10px' }}>
              <button
                  onClick={() => {
                    setEditId(supplier.id);
                    setEditCompanyName(supplier.companyName);
                    setEditContactTitle(supplier.contactTitle);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fetch;
