import { config } from "@/config";
import axios from "axios";

export const publicInstance = axios.create({
  baseURL: `${config.IA_URL}/chat`,
});
