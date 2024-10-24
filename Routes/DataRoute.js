import express from "express";
import { onAddData, onFetchData } from "../Controllers/DataController.js";

let router = express.Router();

router.post("/", onAddData);

router.get("/", onFetchData);

export default router;
