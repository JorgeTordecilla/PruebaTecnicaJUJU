import { startLogin } from "../../actions/authActions";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    user_login: "",
    password_login: "",
  });

  const { user_login, password_login } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(user_login, password_login));
  };

  return (
    <div className="login-container">

      <div className="login-form">
        <h3>Ingreso</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>User</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="user_login"
              value={user_login}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password_login"
              value={password_login}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};
