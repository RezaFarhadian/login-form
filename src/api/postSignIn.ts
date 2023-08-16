import axios, { AxiosResponse } from "axios";

const postSignIn = (email: string, password: string) => {
  return axios.post(
    "https://reqres.in/api/login",
    { email, password }
  )
  .then((res: AxiosResponse<any, any>) => {
    return res.data
  })
  .catch((reason: any) => {
    throw reason
  })
}

export default postSignIn
