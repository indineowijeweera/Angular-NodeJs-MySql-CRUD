const Customer = require('../models/customer');
const {validationResult } = require("express-validator/check");

exports.getAllCustomers = async (req, res, next) => {
    try {
        let limit = req.query.pageSize || 20;
        let start = req.query.pageNo || 0;

        if (limit == 'all') {
            start = 0;
        } else {
            start = (start - 1) * limit;
        }

        limit = parseInt(limit);
        start = parseInt(start);

        let customers = await Customer.fetchAll(start, limit);
        let customersCount = await Customer.findCount();
        let customersResult = {
            "customers": customers[0],
            "customersCount": customersCount[0]
        }
        res.status(200).json(customersResult);
    } catch (err) {
        res.status(422).send(err.message);
        next(err);
    }
};

exports.postCustomer = async (req, res, next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ success: false, data: null, error: errors.array() });
        }

        let customerName = req.body.customerName;
        let description = req.body.description;
        let address = req.body.address;
        let city = req.body.city;
        let contactNumber = req.body.contactNumber;
        let datetime = new Date();
        let customerData = {
            customer_name: customerName,
            description: description,
            address: address,
            city: city,
            contact_number: contactNumber,
            created_at: datetime
        };

        const postResponse = await Customer.post(customerData);
        res.status(201).json(postResponse);
    } catch (err) {
        res.status(422).send(err.message);
        next(err);
    }
};

exports.putCustomer = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ success: false, data: null, error: errors.array() });
        }

        let customerRef = req.body.customerRef;
        let customerName = req.body.customerName;
        let description = req.body.description;
        let address = req.body.address;
        let city = req.body.city;
        let contactNumber = req.body.contactNumber;
        let datetime = new Date();

        let customerData = {
            customer_name: customerName,
            description: description,
            address: address,
            city: city,
            contact_number: contactNumber,
            updated_at: datetime
        };

        const putResponse = await Customer.update(customerRef, customerData);
        res.status(200).json(putResponse);
    } catch (err) {
        res.status(422).send(err.message);
        next(err);
    }
};

exports.deletCustomer = async (req, res, next) => {
    try {
        let customerRef = req.query.customerRef;
        const deleteResponse = await Customer.delete(customerRef);
        res.status(200).json(deleteResponse[0]);
    } catch (err) {
        res.status(422).send(err.message);
        next(err);
    }
};
