import express from 'express';

const routeRouter = express.Router();

routeRouter.get('/', (req, res) => {
      res.send("성공!");
});

export default routeRouter;