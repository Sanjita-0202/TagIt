// src/App.jsx
import React, { useEffect, useState } from 'react';
import { loadItems, addItem, deleteItem, clearAll } from './utils/storage';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadItems());
  }, []);

  function handleAdd() {
    addItem({ text: 'Sample item ' + (items.length + 1), tags: ['sample'] });
    setItems(loadItems());
  }

  function handleDelete(id) {
    deleteItem(id);
    setItems(loadItems());
  }

  function handleClear() {
    clearAll();
    setItems([]);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>TagIt - Storage Test</h1>

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleAdd}>Add sample</button>
        <button onClick={handleClear} style={{ marginLeft: 8 }}>Clear all</button>
      </div>

      <ul>
        {items.length === 0 && <li style={{ color: '#777' }}>No items yet — click "Add sample".</li>}
        {items.map(it => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            <strong>{it.text}</strong> <em style={{ color: '#555' }}>[{it.tags.join(', ')}]</em>
            <button onClick={() => handleDelete(it.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
