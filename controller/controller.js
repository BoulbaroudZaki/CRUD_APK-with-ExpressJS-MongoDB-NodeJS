const Userdb = require('../model/model');

//Create and Save a new User
exports.create = async (req, res) => {

    //Vaidate request
    if(!req.body){
        res.status(400).send({ message: 'Content can not be empty!' })
        return;
    }

    //New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    //Save User in DataBase
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating a create operation'
            });
        });
};

//Retrieve and Return all Users
exports.findAll = (req, res) =>{
    Userdb.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error Occured while retrieving user information' })
        });
};

//Retrieve and Return a Single User
exports.findOne = (req, res) => {
    const id = req.params.id;

    Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: 'Not found user with id'+ id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error Retrieving user with id'+ id })
        });
};


//Update a new Identified user by user id
exports.update = (req, res) => {

    if(!req.body){
        return res.status(400).send({ message: 'Data to update can not be empty!' })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false })
        .then(data => {
            if(!data){
            res.status(404).send({ message: ` Cannot Update User with ${id}. Maybe user not found! ` })
            } else {
                res.status(200).send({ message: 'User was Updated Successfully!' , user: data})
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error Update user information' })
        });
};

//Delete user with specified user id in the request
exports.delete = (req, res) => {

    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: ` Cannot Delete user with ${id}. Maybe id is wrong` })
            } else {
                res.send({ message: 'User was Deleted Successfully!' , user: data })
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Could not Delete user with id' + id });
        });
};