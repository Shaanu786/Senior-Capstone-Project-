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
      console.log(res);
      response.status(200).json({ data: {
        id: res.rows[0].kirboid
      }});
    }
    //console.log(res);
  })

});

app.get('/user/:user/tasks', function(req, response) {
  const id = req.params.user;
  const query = `SELECT tasksid, projectid, taskname, duedate, completeflag FROM assignedtasks WHERE kirboid = ${id}`;
  client.query(query, (err, tasks) => {
    if (err) {
      response.status(500).json({ message: err });
    }
    let promises = [];
    // response.status(200).json({ data: tasks.rows });
    //console.log(tasks.rows);
    tasks.rows.forEach(({ projectid }) => {
      promises.push(new Promise((resolve, reject) => {
        const subquery = `SELECT projectname FROM kirboprojects WHERE projectid = ${projectid}`;
        client.query(subquery, (err2, projectName) => {
          if (err2) {
            reject(err2);
          }
          else {
            //console.log(projectName.rows[0].projectname)
            //console.log(projectName.rows[0].projectname);
            //for (var i = 0; i < tasks.rows.length; i++) {
            //  tasks.rows[i].projectname = projectName.rows[0].projectname;
            //}
            resolve(projectName.rows[0].projectname);
            //console.log(tasks.rows.unshift(projectName.rows));
            //console.log(projectName.rows);
          }
        })
      }))
    });
    Promise.all(promises)
        .then(data => { 
          console.log(data);
          for (var i = 0; i < tasks.rows.length; i++) {
            tasks.rows[i].projectname = data[i];
          }
          console.log(tasks.rows);
          response.status(200).json( { data:tasks.rows });
        })
        .catch(issue => response.status(500).json({ message: issue }))
   });
});

app.get('/home/:user', function(req, response) {
  console.log("project-page was called.");
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
              // console.log(projectName.rows[0].projectname);
              //response.status(200).json({"mess": res});
              // console.log(respo.rows[0].projectname);
            }
          })
        }))
      });
      Promise.all(promises)
        .then(data => { 
          data.forEach(({ projectName }) => {
            console.log(projectName);
            console.log("I am here");
          })
          console.log( data );
          response.status(200).json({ data });
        })
        .catch(issue => response.status(500).json({ message: issue }))
        //.finally(() => client.end());
    }
  });
});

app.post('/project', function (req, response) {
  console.log("please give me output");
  const statuses = {
    'todo': 0 ,
    'progress': 1,
    'finished': 2
  };
  const { taskid, newStatus } = req.body;

  const stat = statuses[newStatus];
  console.log("please", stat);

  const query = `UPDATE assignedtasks SET completeflag = ${stat} WHERE assignedtasks.tasksid = ${taskid}`;

  client.query(query, (err, res) => {
    if (err) {
      console.log(stat);
      response.status(500).json({"message": err});
    }
    else { 
      console.log(res);
      response.status(200).json({ data: {
        'taskid': taskid,
        'status': stat
      }});
    }
    //console.log(res);
  })


});

app.post('/addtask', function (req, response) {
  console.log("please give me output");
  const statuses = {
    'todo': 0 ,
    'progress': 1,
    'finished': 2
  };
  const { title, description, project, projectid, status, duedate, user, taskid } = req.body;

  const assignedflag = 1
  const stat = statuses[status];
  console.log("display user " +  user);

  const query = `INSERT into assignedtasks (tasksid, kirboid, projectid, taskname, completeflag, smallcomment, duedate, assignedflag) VALUES
                (${taskid}, ${user}, ${projectid}, '${title}', ${stat}, '${description}', ${duedate}, ${assignedflag})`;

  client.query(query, (err, res) => {
    if (err) {
      console.log("Please give me output you son of a bitch", res);
      response.status(500).json({"message": response});
    }
    else { 
      console.log(res);
      response.status(200).json({ data: {
        'taskid': taskid,
        'user':user,
        'project': project,
        'projectid':projectid,
        'taskname':title,
        'status': stat,
        'description': description,
        'duedate':duedate,
        'assignedflag': assignedflag
      }});
    }
    //console.log(res);
  })


});