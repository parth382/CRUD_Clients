import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
    try {
        const clients = await clientService.getClients();  // it will wait untill clientServices fetch data
        res.status(200).json(clients);
    } catch (err) { 
        console.error('Error fetching clients:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createClient = async (req, res) => {
    try {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData);
        res.status(200).json(newClient);
    } catch (err) { 
        console.error('Error adding client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const clientData = req.body;

        // Attempt to update the client
        const updatedClient = await clientService.updateClient(clientId, clientData);

        // If the client is not found or update fails
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Return the updated client
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error('Error updating client:', err.message);  // Better error message for debugging
        if (err.message === 'Client not found') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        if (!deleted) {
        return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).send();
    } catch (err) { 
        console.error('Error deleting client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchClients = async (req, res) => {
    try {
      const searchTerm = req.query.q; // Get the search term from the query parameters
      const clients = await clientService.searchClients(searchTerm);
      res.status(200).json(clients);
    } catch (error) {
      console.error('Error searching clients:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
