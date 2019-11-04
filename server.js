const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const creativeRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const path = require("path");

let Creative = require('./models/creative.model');  

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://mkhan:password123@ds141178.mlab.com:41178/heroku_8jd58m04");
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

app.get("*", (req, res) => {
    res.sendFild(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
})

