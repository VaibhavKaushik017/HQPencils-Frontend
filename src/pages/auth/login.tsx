import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { useLoginMutation } from "../../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api-types";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }

      console.log(user);
    } catch (error) {
      toast.error("Sign in Failed");
    }
  };

  return (
    <div className="my-24">
      <main className="w-[300px] flex flex-col items-center mx-auto">
        <h1 className="text-2xl font-semibold">Login</h1>

        <div className="w-full">
          <label>Gender</label>
          <select
            className="w-full border border-gray-400 rounded-md"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-full">
          <label>Date of Birth</label>
          <input
            className="w-full border border-gray-400 p-2 rounded-md"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="w-full text-center mt-5">
          <p>Already Signed In Once</p>
          <button
            className="flex items-center justify-center gap-2 bg-blue-400 p-2 text-white rounded-md w-full"
            onClick={loginHandler}
          >
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
