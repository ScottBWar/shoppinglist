var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id) {
    // return this.items.splice(id,1);
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
		console.log(storage.items);
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(req, res) {
	console.log(storage.items);
    if (Number.isInteger(req.params.id)) {
        return res.sendStatus(400);
    }
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id == req.params.id) {
            res.status(201).json(req.params);
            return storage.items.splice(i, 1);
        }
    }
});




app.listen(process.env.PORT || 8080);