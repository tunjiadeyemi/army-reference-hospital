import api from "../api";
import { handleApi } from "../../utils/apiHelper";
import type { signInType } from "./types/auth.types";


export const signInApi = async (payload: signInType) =>
  handleApi(api.post("/v1/auth/signin", payload));

