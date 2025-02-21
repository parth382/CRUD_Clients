import { query } from "../db.js"

export const getClients = async() => {
    const {rows} = await query('SELECT * FROM clients_tb');
    return rows;
}

export const createClient = async (clientData) => { 
  const { name, email, job, rate, isactive } = clientData;
  
  try {
    const { rows } = await query(
      `INSERT INTO clients_tb (name, email, job, rate, isactive, created, modified) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    return rows[0];
  } catch (err) {
    console.error('Error executing query:', err);
    throw new Error('Database query failed');
  }
};

export const updateClient = async (clientId, clientData) => {
  const { name, email, job, rate, isactive } = clientData;

  try {
      // Check if client with the given ID exists
      const { rows: existingClient } = await query(
          'SELECT * FROM clients_tb WHERE id = $1',
          [clientId]
      );
      if (existingClient.length === 0) {
          throw new Error('Client not found');
      }

      // Proceed with updating the client
      const { rows } = await query(
          `UPDATE clients_tb 
           SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 , modified_at = CURRENT_TIMESTAMP
           WHERE id = $6 RETURNING *`,
          [name, email, job, rate, isactive, clientId]
      );

      return rows[0]; // return the updated client data
  } catch (err) {
      console.error('Error updating client:', err);
      throw new Error('Database query failed');
  }
};


  export const deleteClient = async (clientId) => {
    const { rowCount } = await query(`DELETE FROM clients_tb WHERE id = $1`, [clientId]);
    return rowCount > 0; // Returns true if a row was deleted, false otherwise
};

export const searchClients = async (searchTerm) => {
    const { rows } = await query(
      `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  };