const fs = require("fs");
const Customer = require("./../models/customerModel"); //memanggil model

const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      status: "success",
      totalData: customers.length,
      requestAt: req.requestTime,
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customers = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: "success",
      message: "berhasil update data",
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "berhasil delete data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//menjadikan sebuah async function tambhakan async didepan
const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body); //untuk membuat data customer

    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
