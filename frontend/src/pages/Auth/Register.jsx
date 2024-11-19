import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredientials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/api/userApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <section className="pl-[10rem]">
      <div className="mr-[4rem] mt-[5rem]">
        <div className="text-2xl font-semibold mb-4">Register</div>
      </div>
      <form className="container w-[40rem]">
        <div className="my-[2rem]">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-[2rem]">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-[2rem]">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-[2rem]">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmpassword"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default Register;
