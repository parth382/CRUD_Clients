import React from 'react'
import { useState , useEffect} from 'react';

export default function Modelform( {isOpen,onClose,mode,onSubmit,clientData} ) {

    const [rate,setRate] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [job,setJob] = useState('');
    const [isactive,setIsActive] = useState();

    const handleStatusChange = (e) => {
      setIsActive(e.target.value === 'Active'); // Set status as boolean
  };

  const resetBtn = () => {
          setName('');
          setEmail('');
          setJob('');
          setRate('');
          setIsActive();
  };

  // Function to generate a random string of letters (no numbers)
  const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };


  // Function to generate random data for form fields
  const handleRandomFill = () => {
    const randomName = `${generateRandomString(6)}`;
    const randomEmail = `email${Math.floor(Math.random() * 1000)}@domain.com`;
    const randomJob = `${generateRandomString(6)}`;
    const randomRate = (Math.random() * 100).toFixed(2); // Random rate between 0 and 100

    // Generate a random ID and set isActive based on even/odd ID
    const randomId = Math.floor(Math.random() * 100); // Generate a random ID

    // Set isActive to 'Active' if the ID is even, else 'Inactive'
    setIsActive(randomId % 2 === 0); // Active if ID is even, inactive if odd


    // Update form fields with random values
    setName(randomName);
    setEmail(randomEmail);
    setJob(randomJob);
    setRate(randomRate);
  };

   // Set initial modified date to created date
  

  const currentDate = new Date().toISOString();


  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const newClientData  = {name, email, job, rate: Number(rate) , isactive: isactive
          }
          await onSubmit(newClientData);
          setName('');
          setEmail('');
          setJob('');
          setRate('');
          setIsActive(false);
          onClose();
      } catch (err) {
          console.error("Error adding client" , err);
      }      
  };

  useEffect(() => {
    if (mode === 'edit' && clientData) {
        setName(clientData.name);
        setEmail(clientData.email);
        setJob(clientData.job);
        setRate(clientData.rate);
        setIsActive(clientData.isactive);  // Assuming isActive is a boolean
    } else {
        // Reset fields when adding a new client
        setName('');
        setEmail('');
        setJob('');
        setRate('');
        setIsActive(false);
    }
  }, [mode, clientData]);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_3" className="modal" open={isOpen}>
  <div className="modal-box">
  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
    <h3 className='font-bold text-lg py-4'> {mode === 'edit' ? 'Edit Client' : 'Client Details'} </h3>
    <form method="dialog" onSubmit={handleSubmit}  >
      {/* if there is a button in form, it will close the modal */}

        <label className="input input-bordered my-4 flex items-center gap-2">
            Name
            <input type="text" className="grow" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Daisy" />
        </label>

        <label className="input input-bordered my-4 flex items-center gap-2">
            Email
            <input type="text" className="grow" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="daisy@site.com" />
        </label>

        <label className="input input-bordered my-4 flex items-center gap-2">
            Job
            <input type="text" className="grow" value={job} onChange={(e)=>setJob(e.target.value)}  placeholder="Daisy" />
        </label>

        
        <div className='flex mb-4 justify-between my-4'>

        <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
            Rate
            <input type="number" className="grow" value={rate} onChange={(e)=>setRate(e.target.value)}  placeholder="Daisy" />
        </label>

        <select value={isactive ? 'Active' : 'Inactive' }  className="select select-bordered w-full mt-4 max-w-xs" onChange={handleStatusChange}>
            <option>Inactive</option>
            <option>Active</option>
        </select>

        </div>

      <button type='submit' className='btn btn-success'> { mode==='edit' ? 'Save Changes' :'Add Client' } </button>
      { mode !== 'edit' && (
        <>
        <button type='button' className='btn btn-success mx-2' onClick={resetBtn}>Reset</button> 
        <button type="button" onClick={handleRandomFill} className="btn btn-primary mx-2"> Randomly Fill Form </button>
        </>
      )};
    </form>
  </div>
</dialog>
    </>
  )
}
