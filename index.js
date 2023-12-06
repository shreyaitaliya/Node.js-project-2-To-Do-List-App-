const express = require('express');

const port = 8000;

const app = express();

app.use(express.urlencoded());

app.set('view engine', 'ejs');

let record = [
    {
        name: "Shreya",
        email: "shreya@gmail.com",
        userid: 3580,
        course: "node.js",
    },
    {
        name: "Ruta",
        email: "ruta@gmail.com",
        userid: 3590,
        course: "node.js,react.js",
    },
]

app.get('/', (req, res) => {
    let single = {};
    res.render('form', {
        record,
        single
    })
})

app.post('/addName', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let course = req.body.course;
    let editid = req.body.editId;
    let userid = Math.floor(Math.random() * 10000);
    let obj = {
        name: name,
        email: email,
        course: course,
        userid: userid,
    }
    if (editid) {
        let edit = record.map((value) => {
            if (value.userid == editid) {
                value.name = req.body.name;
                value.email = req.body.email;
                value.course = req.body.course;
            }
            return value;
        })
        record = edit;
        return res.redirect('/');

    }
    record.push(obj);
    return res.redirect('/');
})

app.get('/deleteData', (req, res) => {
    let id = req.query.delId;
    let deleteRecord = record.filter((value) => {
        return value.userid != id;
    })
    record = deleteRecord;
    return res.redirect('/');
})

app.get('/editData', (req, res) => {
    let id = req.query.edId;
    let editRecord = record.find((value) => {
        return value.userid == id;
    })
    return res.render('form', {
        single: editRecord,
        record
    })
})

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})