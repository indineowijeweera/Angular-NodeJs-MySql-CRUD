const express = require('express');
const customerController = require('../../controller/customer')
const { check } = require("express-validator/check");

const router = express.Router();

router.get('/:pageSize?:pageNo?', customerController.getAllCustomers);

router.post('/add', [
    check("customerName")
        .exists()
        .not()
        .isEmpty(),
    check("description")
        .exists()
        .not()
        .isEmpty(),
    check("address")
        .exists()
        .not()
        .isEmpty(),
    check("city")
        .exists()
        .not()
        .isEmpty(),
    check("contactNumber")
        .exists()
        .not()
        .isEmpty()
], customerController.postCustomer);

router.put('/update', [
    check("customerRef")
        .exists()
        .not()
        .isEmpty()
], customerController.putCustomer);

router.delete('/:customerRef?', customerController.deletCustomer);

module.exports = router;