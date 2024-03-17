import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editInfo , setEditInfo] = useState('')
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:3000/products', { Name: editName,Info:editInfo,Price: editPrice });
      setEditId(null)
      setEditName('');
      setEditInfo('')
      setEditPrice('');
    } catch (error) {
      console.error('Error:', error);
    }
    fetchData();
  };

  const editProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/products/${editId}`, {
        
        Name: editName,
        Info:editInfo,
        Price: editPrice
      });

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editId ? { ...product, Name: editName,Info:editInfo, Price: editPrice } : product
        )
      );

      console.log('Edit Response:', response.data);
    } catch (error) {
      console.error('Error editing data:', error);
    } finally {
      setEditId(null); 
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Product Name"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />
        <input
       type="text"
       placeholder="Product Info"
       value={editInfo}
       onChange={(e) => setEditInfo(e.target.value)}
     />
      <input
        type="text"
        placeholder="Product Price"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>
      <button onClick={editProduct}>Edit</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Info</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.Name}</td>
              <td>{product.Info}</td>
              <td>{product.Price}</td>
              <td>
                <button onClick={() => {
                  setEditId(product.id);
                  setEditName(product.Name);
                  setEditInfo(product.Info)
                  setEditPrice(product.Price);
                }}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
