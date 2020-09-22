import type { Request, Response } from "express";
import { encrypt, decrypt } from "../utils/cryptography";
import { Cliente } from "../entities/Cliente";

export default {
  async index(_req: Request, res: Response): Promise<Response> {
    const ListClientes = await Cliente.find();

    return res.status(200).json(ListClientes);
  },

  async create(req: Request, res: Response): Promise<Response> {
    const NewCliente = new Cliente();

    NewCliente.name = req.body.name;
    NewCliente.lastname = req.body.lastname;
    NewCliente.password = await encrypt(req.body.password);

    await NewCliente.save();

    return res.status(201).json({ msg: "Account successfully created!" });
  },

  async read(req: Request, res: Response): Promise<Response> {
    const ClienteFound = await Cliente.findOne(
      { where: { name: req.params.name } },
    );

    if (!ClienteFound) {
      return res.status(404).json({ msg: "Cliente not found!" });
    }

    return res.status(200).json(ClienteFound);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const ClienteToUpdate = await Cliente.findOne(
      { where: { name: req.params.name } },
    );

    if (!ClienteToUpdate) {
      return res.status(404).json({ msg: "Cliente not found!" });
    }

    if (!decrypt(req.body.oldpassword, ClienteToUpdate.password)) {
      return res.status(401).json({ msg: "incorrect Password!" });
    }

    if (typeof req.body.name !== "undefined") {
      ClienteToUpdate.name = req.body.name;
    }

    if (typeof req.body.lastname !== "undefined") {
      ClienteToUpdate.lastname = req.body.lastname;
    }

    if (typeof req.body.newpassword !== "undefined") {
      ClienteToUpdate.password = await encrypt(req.body.newpassword);
    }

    await ClienteToUpdate.save();

    return res.status(204).json({ msg: "Account Updated!" });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const ClienteToDelete = await Cliente.findOne(
      { where: { name: req.params.name } },
    );

    if (!ClienteToDelete) {
      return res.status(404).json({ msg: "Cliente not found!" });
    }

    await ClienteToDelete.remove();

    return res.status(204).json({ msg: "Account Deleted!" });
  },
};
