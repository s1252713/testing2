const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

/*Route*/
router.get('/', EmployeeController.homepage);
router.get('/add', EmployeeController.addEmployee);
router.post('/add', EmployeeController.postEmployee);
router.get('/view/:id', EmployeeController.view);
router.get('/edit/:id', EmployeeController.edit);
router.put('/edit/:id', EmployeeController.editPost);
router.delete('/edit/:id', EmployeeController.deleteEmployee);

router.post('/search', EmployeeController.searchEmployee);



module.exports = router;