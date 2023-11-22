const Employee = require("../models/Employee");
const employee = require("../models/Employee");
const mongoose = require("mongoose");

/**Homepage*/
exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

  const locals = {
    title: "HKMU User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const employee = await Employee.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Employee.countDocuments({});

    res.render("index", {
      locals,
      employee,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

/* New Employee Form*/
exports.addEmployee = async (req, res) => {
  const locals = {
    title: "Add New Employee",
  };

  res.render("employee/add", locals);
};

/*Create New Employee*/
exports.postEmployee = async (req, res) => {
  console.log(req.body);

  const newEmployee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Employee.create(newEmployee);
    await req.flash("info", "New employee has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/*View Employee Data*/
exports.view = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });

    const locals = {
      title: "View Employee Data",
    };

    res.render("employee/view", {
      locals,
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

/*Edit Employee Data*/
exports.edit = async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Employee Data",
    };

    res.render("employee/edit", {
      locals,
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

/*Update Employee Data*/
exports.editPost = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/*Delete Employee Data*/
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/*Search Employee Data*/
exports.searchEmployee = async (req, res) => {
  const locals = {
    title: "Search Employee Data",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const employee = await Employee.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      employee,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
