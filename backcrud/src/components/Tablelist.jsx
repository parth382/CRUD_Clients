import axios from 'axios';
import { useState} from 'react';

export default function Tablelist({ handleOpen,tableData,setTableData,searchTerm}) {
  {/* make table of sample sata */}
  const [error, setError] = useState(null);
  

   // Filter the tableData based on the searchTerm
   const filteredData = tableData.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:4000/api/clients/${id}`); // API call to delete client
            setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
        } catch (err) {
            setError(err.message); // Handle any errors
        }
    }
};

  return (
      <>
      {/* ++mt-10 */}

      {error && <div className="alert alert-error">{error}</div>}

      <div className="overflow-x-auto mt-10">
          <table className="table">
              {/* head */}
              <thead>
              <tr>
                  {/* ++status rate */}
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Rate</th>
                  <th>Status</th>
                  {/* <th>Created</th>
                  <th>Modified</th> */}
                  <th></th>
                  <th></th>

              
              </tr>
              </thead>
              {/* ++ hover */}
              <tbody className="hover">
              {/* row 1 */}
                  {filteredData.map((client) => (
                      <tr key={client.id} className="hover">
                          <th>{client.id}</th>
                          <td>{client.name}</td>
                          <td>{client.email}</td>
                          <td>{client.job}</td>
                          <td>{client.rate}</td>
                          {/* ++button logic ++rounded-full w-20  */}
                          <td>
                              <button
                                  className={`btn rounded-full w-20 ${client.isactive ? 'btn-secondary' : 'btn-outline btn-error'}`}>
                                  {client.isactive ? 'Active' : 'Inactive'}
                              </button>
                          </td>
                          {/* <td> 12/10/2022 </td>
                          <td> 12/12/2024 </td> */}
                          <td>
                              <button className="btn btn-secondary " onClick={() => handleOpen('edit', client)}>Update</button>
                          </td>
                          <td>
                              <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
      
              </tbody>
          </table>
          </div>
      </>
  )
}