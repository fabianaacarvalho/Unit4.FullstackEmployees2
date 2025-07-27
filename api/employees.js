import express from "express";
const router = express.Router();
export default router;

// TODO: this file!
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

router
  .route("/")
  .get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("Field is required.");

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id))
      return res.status(400).send("ID must be a positive integer.");

    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.send(employee);
  })

  .delete(async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id))
      return res.status(400).send("ID must be a positive integer.");

    const employee = await deleteEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.sendStatus(204);
  })

  .put(async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id))
      return res.status(400).send("ID must be a positive integer.");

    if (!req.body) return res.status(400).send("Request body is required.");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary)
      return res.status(400).send("Field is required.");

    const employee = await updateEmployee({
      id,
      name,
      birthday,
      salary,
    });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.send(employee);
  });
