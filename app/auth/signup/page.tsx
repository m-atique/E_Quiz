"use client";

import { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Cookies from "js-cookie";

const token = Cookies.get("authToken");

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

function SubmitButton({
  text,
  loadingText,
  className,
  loading = false, // Default to false
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className={cn(className)}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}

export default function SignupForm() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    uname: "",
    rank: "",
    designation: "",
    cnic: "",
    password: "",
    password_confirmation: "", // Added confirmPassword
    utype: "", // Added utype for "Admin" or "User"
  });

  const [errors, setErrors] = useState({
    uname: "",
    rank: "",
    designation: "",
    cnic: "",
    password: "",
    password_confirmation: "", // Added confirmPassword
    utype: "", // Added utype for validation
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateForm = () => {
    const newErrors = { 
      uname: "",
      rank: "",
      designation: "",
      cnic: "",
      password: "",
      password_confirmation: "", // Added confirmPassword
      utype: "", // Added utype validation
    };
    let isValid = true;

    // Validate username
    if (!formData.uname.trim()) {
      newErrors.uname = "Name is required.";
      isValid = false;
    }

    // Validate rank
    if (!formData.rank.trim()) {
      newErrors.rank = "Rank is required.";
      isValid = false;
    }

    // Validate designation
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required.";
      isValid = false;
    }

    // Validate CNIC (assuming CNIC should be numeric and 13 digits)
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required.";
      isValid = false;
    } else if (!/^\d{13}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC must be a 13-digit number.";
      isValid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    // Validate confirmPassword
    if (!formData.password_confirmation.trim()) {
      newErrors.password_confirmation = "Please confirm your password.";
      isValid = false;
    } else if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = "Passwords do not match.";
      isValid = false;
    }

    // Validate utype
    if (!formData.utype.trim()) {
      newErrors.utype = "utype is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      try {
        // Assuming you have an API endpoint for signing up
        console.log("tesintgggg", formData)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/user/register`, formData,{
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed, e.g., 'Content-Type': 'application/json'
          },
        });
        
        // setModalMessage("Sign up successfully");
        // setShowModal(true);

        // Redirect or handle successful sign up
        router.push("../../auth/signin"); 

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error during sign up:", error);
          setModalMessage("Sign up failed. Please try again.");
          setShowModal(true);
        } else {
          console.error("Unexpected error:", error);
          setModalMessage("An unexpected error occurred.");
          setShowModal(true);
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col p-4 min-h-screen  bg-qblue"
    style={{ backgroundImage: "url('/quiz.jpg')",
        backgroundSize: 'cover',               // Ensures the image covers the entire background
}} // Update the path to your image
    
    >

    <div className="flex-1 flex items-center justify-center"
    
    >
      <form onSubmit={handleSubmit}>
        <Card className="w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing fields */}
            <div className="space-y-2">
              <Label htmlFor="uname">Username</Label>
              <Input
                id="uname"
                name="uname"
                type="text"
                placeholder="username"
                value={formData.uname}
                onChange={handleChange}
                className={errors.uname ? "border-red-500" : "border-black"}
              />
              {errors.uname && (
                <p className="text-red-500 text-sm">{errors.uname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rank">Rank</Label>
              <Input
                id="rank"
                name="rank"
                type="text"
                placeholder="rank"
                value={formData.rank}
                onChange={handleChange}
                className={errors.rank ? "border-red-500" :  "border-black"}
              />
              {errors.rank && (
                <p className="text-red-500 text-sm">{errors.rank}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                type="text"
                placeholder="designation"
                value={formData.designation}
                onChange={handleChange}
                className={errors.designation ? "border-red-500" : "border-black"}
              />
              {errors.designation && (
                <p className="text-red-500 text-sm">{errors.designation}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                name="cnic"
                type="text"
                placeholder="cnic"
                value={formData.cnic}
                onChange={handleChange}
                className={errors.cnic ? "border-red-500" :  "border-black"}
              />
              {errors.cnic && (
                <p className="text-red-500 text-sm">{errors.cnic}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : "border-black"}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="confirm password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={errors.password_confirmation ? "border-red-500" :  "border-black"}
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
              )}
            </div>

            {/* New utype Field */}
            <div className="space-y-2">
              {/* <Label htmlFor="utype">utype</Label> */}
              <select
                id="utype"
                name="utype"
                value={formData.utype}
                onChange={handleChange}
                className={errors.utype ? "border-red-500" :  "border-black text-m"}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.utype && (
                <p className="text-red-500 text-sm">{errors.utype}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton className="w-full" text={loading ? "Loading..." : "Sign Up"} loadingText="Loading" />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm text-white">
          Have an account?{" "}
          <Link href="../auth/signin" className="text-amber-300">
            Sign In
          </Link>
        </div>
      </form>

      {/* Modal for error messages */}
      {showModal && (
        <div className="fixed inset-0 flex text-center items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md item-center">
            <p>{modalMessage}</p>
            <button
              className=" item-center text-center mt-4 px-4 py-2 bg-blue-600 text-white rounded "
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
