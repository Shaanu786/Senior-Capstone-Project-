const express = require('express');
const app = express();
const port = 3001;
const { Client } = require('pg');
const client = new Client({
  user: 'kyleklauss',
  host: 'localhost',
	database: 'capstone',
	port: 5432
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log(`Connected on port ${client.port}`);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsinrsg application/x-www-form-urlencoded

app.post('/login', function (req, response) {
  console.log("Login was called"); 
  const {email, password} = req.body;
  //const {kirboid, password} = req.body;
  console.log(email);
  console.log(password);
  const query = `SELECT kirboid FROM userprofile WHERE email = '${email}' AND loginpw = '${password}'`;
  //const query = `SELECT email FROM userprofile WHERE email = ${email} AND password = ${password}`;
  //const query = "SELECT kirboid, email, loginpw FROM userprofile WHERE email = " + username + " AND loginpw = " + password;
  client.query(query, (err, res) => {
    if (err) response.status(500).json({"message": err});
    else { 
      //console.log(res);
      response.status(200).json({ data: {
        id: res.rows[0].kirboid
      }});
    }
    //console.log(res);
  })

});

app.get('/user', function(req, response) {
  console.log("I'm in");
  const query = `SELECT kirboid, firstname, lastname, email, major FROM userprofile`;
  client.query(query, (err, users) => {
    if (err) response.status(500).json({"message": err});
    else {
      let promises = [];
      // console.log("users", users.rows);
      users.rows.forEach(({ kirboid }) => {
        promises.push(new Promise((resolve, reject) => {
          const subquery = `SELECT kirboid, projectid FROM assignedprojects WHERE kirboid = ${kirboid}`;
          client.query(subquery, (err2, projectids) => {
            if (err2) {
              reject(err2);
              // response.status(500).json({
              //   "mess": err2
              // })
            } else {
              let pids = []
              for (let i = 0; i < projectids.rows.length; i++) {
                pids.push(projectids.rows[i].projectid);
              }
              //console.log("PIDS array right before assignment", pids);
              
              //console.log("In /user last else printing users" + users.rows);
              resolve({'projectid':pids});
              // console.log(projectName.rows[0].projectname);
              //response.status(200).json({"mess": res});
              // console.log(respo.rows[0].projectname);
            }
          })
        }))
      });
      Promise.all(promises)
        .then(data => { 
          //console.log("SHIT", data);
          for (let i = 0; i < users.rows.length; i++) {
            //console.log(users.rows[i]);
            //console.log(data[i].projectid);
            users.rows[i].projectid = data[i].projectid;
            //console.log("pls");
          }
          //console.log("???",users.rows);
          response.status(200).json({ data: users.rows });
        })
        .catch(issue => response.status(500).json({ message: issue }))
    }
  })
})

app.get('/user/:user/tasks', function(req, response) {
  const id = req.params.user;
  const query = `SELECT tasksid, projectid, taskname, duedate, completeflag FROM assignedtasks WHERE kirboid = ${id}`;
  client.query(query, (err, tasks) => {
    if (err) {
      response.status(500).json({ message: err });
    }
    response.status(200).json({ data: tasks.rows })
  });
});

app.get('/home/:user', function(req, response) {
  //console.log("project-page was called.");
  const id = req.params.user;
  console.log(id);
  const query = `SELECT projectid FROM assignedprojects WHERE kirboid = ${id}`;
  //const query = `SELECT projectname FROM kirboprojects WHERE projectid = ${id}`;
  // const query = `SELECT projectid FROM assignedprojects WHERE kirboid = ${kirboid}`;
  //const query = `SELECT projectname FROM assignedprojects JOIN kirboprojects WHERE projectid = (SELECT projectid IN assignedprojects WHERE kirboid = ${kirboid})`;
  client.query(query, (err, projectIds) => {
    if (err) {
      response.status(500).json({"message": err})
      client.end();
    }
    else {
      //response.status(200).json({"message": res});
      let promises = [];
      projectIds.rows.forEach(({ projectid }) => {
        promises.push(new Promise((resolve, reject) => {
          const subquery = `SELECT projectname FROM kirboprojects WHERE projectid = ${projectid}`;
          // ... run the stuff here
          client.query(subquery, (err2, projectName) => {
            if (err2) {
              reject(err2);
              // response.status(500).json({
              //   "mess": err2
              // })
            } else {
              resolve(projectName.rows[0].projectname);
              //console.log(projectName.rows[0].projectname);
              //response.status(200).json({"mess": res});
              // console.log(respo.rows[0].projectname);
            }
          })
        }))
      });
      Promise.all(promises)
        .then(data => { 
          console.log(data);
          response.status(200).json({ data });
        })
        .catch(issue => response.status(500).json({ message: issue }))
        //.finally(() => client.end());
    }
  });
});

app.post('/project', function (req, res) {

  const query = `INSERT INTO assignedtasks () VALUES ()`
  
});

