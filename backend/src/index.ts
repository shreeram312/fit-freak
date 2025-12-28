import { ENV } from "@/lib/env";
import express from "express";

const app = express();

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
