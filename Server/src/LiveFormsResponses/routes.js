import { Router } from "express";
import { saveResponse } from "../controllers/liveFormResponse.controller.js";
// adjust this path to the file that exports your auth middlewares
import { authenticateFormViewer } from "../middlewares/auth.middlewares.js";

const liveFormResponse = Router();

// mount with : app.use("/live-form-response" , liveFormResponseRoutes);
// :status is the status written in the live link (public | unlisted | restricted) , the same one /liveform/show uses.
// authenticateFormViewer reads it from req.params.status. The controller still checks the real status
// from the database , so a changed :status can only ever lead to "user not authorized" , never to extra access
liveFormResponse.post("/save/:status" , authenticateFormViewer , saveResponse);

export default liveFormResponse;