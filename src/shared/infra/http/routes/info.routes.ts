import Router from "express";

import pacote from "../../../../../package.json";

const infoRoutes = Router();

infoRoutes.get("/", (request, response) => {
  return response.json({
    API: pacote.name,
    Version: pacote.version,
    Documentation: "/docs",
  });
});

export default infoRoutes;
