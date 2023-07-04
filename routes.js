const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.get('/', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
      conn.query('SELECT * FROM tasks ORDER BY completed DESC, id DESC', (err, rows) => {
        if (err) return res.send(err);
  
        res.json(rows);
      });
    });
  });

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const taskData = req.body;
  
      conn.query('INSERT INTO tasks SET ?', taskData, (err, rows) => {
        if (err) return res.send(err);
  
        return res.send('Tarea agregada correctamente');
      });
    });
  });

routes.delete('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        // console.log(req.params.id)

        conn.query('DELETE FROM tasks WHERE id = ?', [req.params.id] , (err, rows)=>{
            if (err) return res.send(err)
        })
    })
})

routes.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      conn.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
        if (err) return res.send(err);
      });
    });
  });

module.exports = routes