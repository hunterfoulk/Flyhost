import axios from "axios";
import api from "../services/api";
import { useStateValue } from "../state";

const useLogin = () => {
  const [{ auth, components }, dispatch] = useStateValue();

  //login user
  const loginUser = async (payload, clearForm) => {
    console.log("payload", payload);
    await axios

      .post(
        "http://localhost:9000/.netlify/functions/server/filesharing/login",
        payload
      )
      .then((res) => {
        const user = { ...res.data.user, token: res.data.token };
        localStorage.setItem("user", JSON.stringify(user));

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        clearForm();

        dispatch({
          type: "login",
          auth: {
            isAuthenticated: true,
            user: user,
          },
        });

        dispatch({
          type: "manage",
          components: {
            loginModal: false,
            backdrop: false,
          },
        });
      })

      .catch((error) => {
        console.error("error", error);
      });
  };
  return loginUser;
};
export default useLogin;
