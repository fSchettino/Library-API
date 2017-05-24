var bookController = require('./book.controller');

function http() {
    this.configure = function(app) {

        app.get('/book/:id/', function(req, res){
            bookController.selectBook(req.params.id, res);
        })

        app.post('/book/', function(req, res){
            bookController.insertBook(req.body, res);
        })

        app.delete('/book/:id/', function(req, res){
            bookController.deleteBook(req.params.id, res);
        })

        app.get('/book/:id/genres/', function(req, res){
            bookController.selectBookGenres(req.params.id, res);
        })
    }
}

module.exports = new http();