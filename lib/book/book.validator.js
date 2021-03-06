"use strict";

function bookValidator() {

    var self = this;

    self.validateSelectBookParams = function(id, res) {
        try {
            var idRegex = /^\d+$/;
            var idCheck = id.match(idRegex);
            if (idCheck === null) throw new Error('Id is invalid');
        } catch (err) {
            return Promise.reject(err);
        }
        return Promise.resolve(id);
    }

    self.validateInsertBookParams = function(req, res) {
        try {
            if (req.body.author_id && req.body.title && req.body.year && req.body.isbn) {
                var idRegex = /^\d+$/;
                var idCheck = req.body.author_id.match(idRegex);
                if (idCheck === null) throw new Error('Author id is invalid');
                var yearRegex = /^\d+$/;
                var yearCheck = req.body.year.match(yearRegex);
                var isbnRegex = /^\d+$/;
                var isbnCheck = req.body.isbn.match(isbnRegex);
                if (yearCheck === null || isbnCheck === null) throw new Error('Year or isbn is invalid');
            } else {
                throw new Error('All fields are required');
            }
        } catch (err) {
            return Promise.reject(err);
        }
        return Promise.resolve(req);
    }

    self.validateUpdateBookParams = function(req, res) {
        try {
            return self.validateSelectBookParams(req.body.id, res)
                .then(result => {
                    return self.validateInsertBookParams(req, res)
                    .then(result => {
                        return Promise.resolve(req);
                    })
                })
                .catch(err => {
                    return Promise.reject(err);
                })
        } catch (err) {
            return Promise.reject(err);
        }
    }

    self.validateDeleteBookParams = function(id, res) {
        return self.validateSelectBookParams(id, res);
    }

    self.validateSelectBookGenresParams = function(id, res) {
        return self.validateSelectBookParams(id, res);
    }

}

module.exports = new bookValidator();