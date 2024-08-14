const express = require('express');
const cors = require('cors');
const connection = require('./connect');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Get all tutorials
app.get('/tutorials', (req, res) => {
    const { title } = req.query;
    let query = 'SELECT * FROM tutorials';
    if (title) {
        query += ' WHERE title LIKE ?';
    }
    connection.query(query, [`%${title}%`], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

// Get tutorial by ID
app.get('/tutorials/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM tutorials WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).send('Tutorial not found');
        }
        res.json(results[0]);
    });
});

// Create a new tutorial
app.post('/tutorials', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)';
    connection.query(query, [title, description, false], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        const newTutorial = { id: results.insertId, title, description, published: false };
        res.status(201).json(newTutorial);
    });
});

// Update a tutorial by ID
app.put('/tutorials/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, published } = req.body;
    const query = 'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?';
    connection.query(query, [title, description, published, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tutorial not found');
        }
        res.json({ id, title, description, published });
    });
});

// Delete a tutorial by ID
app.delete('/tutorials/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tutorials WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tutorial not found');
        }
        res.status(204).send();
    });
});

// Delete all tutorials
app.delete('/tutorials', (req, res) => {
    connection.query('DELETE FROM tutorials', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
