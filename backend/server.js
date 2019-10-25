const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const creativeRoutes = express.Router();
const PORT = 4000;

let Creative = require('./models/creative.model');  

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/creatives', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

creativeRoutes.route('/').get((req, res) => {
    Creative.find((err, creatives) => {
        if(err)
            console.log(err);
        else
            res.json(creatives);
    });
});

creativeRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Creative.findById(id, (err, creative) => {
        res.json(creative);
    });
});

creativeRoutes.route('/add').post((req, res) => {
    let creative = new Creative(req.body);

    creative.save()
    .then(creative => {
        res.status(200).json({'creative': 'creative added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new creative failed');
    });
});

creativeRoutes.route('/update/:id').post((req, res) => {
    Creative.findById(req.params.id, (err, creative) => {
        if(!creative)
            res.status(400).send('Cannot find creative');
        else {
            creative.name = req.body.name;
            creative.email = req.body.email;
            creative.instagram = req.body.instagram;
            creative.facebook = req.body.facebook;
            creative.mediums = req.body.mediums;

            creative.save()
            .then(creative => {
                res.json('Creative updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            })
        }
    })
});

app.use('/creatives', creativeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
})

