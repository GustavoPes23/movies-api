import express, { Request, Response } from "express";

import UserFactory from "../../../domain/user/factory/UserFactory";

const userRoute = express.Router();

userRoute.post("/", async (req: Request, res: Response) => {
  const useCase = UserFactory.createUsecase();
  
  try {
    const inputDto = {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    };

    const output = await useCase.execute(inputDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoute.get("/", async (req: Request, res: Response) => {
  const useCase = UserFactory.findAllUsecase();

  try {
    const output = await useCase.execute();
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default userRoute;