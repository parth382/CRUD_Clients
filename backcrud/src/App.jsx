import './App.css'
import Navbar from './components/Navbar'
import { useState,useEffect } from 'react';
import Tablelist from './components/Tablelist';
import Modelform from './components/Modelform';
import axios from 'axios';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const fetchClients = async () => {
    try {
      const response  = await axios.get('http://localhost:4000/api/clients')
      setTableData(response.data); // Set the fetched data

    } catch (err) {
        setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  
  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:4000/api/clients', newClientData); // Replace with your actual API URL
        console.log('Client added:', response.data); // Log the response
        setTableData((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added client
        } catch (error) {
          console.error('Error adding client:', error.response ? error.response.data : error.message);
        } 
      
      

    } else {
      console.log('Updating client with ID:', clientData.id); // Log the ID being updated
            try {
                const response = await axios.put(`http://localhost:4000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTableData((prevData) =>
                  prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
                
                } catch (error) {
                console.error('Error updating client:', error); 
            } 
        

    }
  }


  return (
    <>
    {/* ++ py-5 px-5 */}
    <div className="py-5 px-5 ">
        <Navbar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
        <Tablelist  setTableData={setTableData} tableData={tableData} handleOpen={handleOpen} searchTerm={searchTerm}/>
        <Modelform  isOpen={isOpen} onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} clientData={clientData} />
    </div>
      
    </>
  )
}
