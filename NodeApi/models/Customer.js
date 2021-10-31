const db = require('../util/database');

module.exports = class Customer {

    static fetchAll(start, limit) {
        return db.execute('SELECT * FROM customer ORDER BY created_at DESC LIMIT ?,?', [start, limit]);
    }

    static findCount() {
        return db.execute('SELECT COUNT(*) FROM customer');
    }

    static post(customer) {
        return db.execute('INSERT INTO customer (customer_name,description,address,city,contact_number,created_at) VALUES (?,?,?,?,?,?)', [customer.customer_name, customer.description, customer.address, customer.city, customer.contact_number, customer.created_at]);
    }

    static update(customerRef, customer) {
        const columns = Object.keys(customer);
        let sql = "UPDATE customer SET " + columns.join(" = ? ,") +" = ? WHERE customer_ref = ?";
        return db.execute(sql, [customer.customer_name, customer.description, customer.address, customer.city, customer.contact_number,customer.updated_at, customerRef]);
    }

    static delete(customerRef) {
        return db.execute('DELETE FROM customer WHERE customer_ref = ?', [customerRef]);
    }
};
