//  Empresa
const express = require("express");
//const router = express.Router();
const db = require("../db/models/index");

exports.createComp = async (req, res) => {
  const { emp_razaosoci, emp_cnpj, emp_email, emp_nomefantasia } = req.body;

  const newUser = {
    emp_email,
    emp_cnpj,
    emp_razaosoci,
    emp_nomefantasia,
  };

  const result = await compService.createComp(newUser, emp_cnpj);

  if (!result.success) {
    return res.status(201).json({ success: true, user: result.data });
  } else {
    return res
      .status(result.status)
      .json({ success: false, message: result.message });
  }
};

exports.listComp = async (req, res) => {
  const Comp = await compService.listComp();
  return res.json({ success: true, Comp });
};

exports.deleteComp = async(req, res) => {
  const CompId = parseInt(req.params.id);

  const deletedComp = await compService.deleteComp(CompId);

  if (deletedComp === null) {
    return res
      .status(404)
      .json({ success: false, message: "Usuário não encontrado" });
  }

  return res.json({ success: true, user: deletedUser });
};

exports.updateComp = async (req, res) => {
  const CompId = parseInt(req.params.id);
  const updatedUser = req.body;

  const result = await compService.updateComp(CompId, updatedUser);

  if (result.success) {
    return res.json({ success: true, user: result.user });
  } else {
    return res.status(404).json({ success: false, message: result.message });
  }
};

//module.exports = router;
