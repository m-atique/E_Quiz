"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
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
import Cookies from 'js-cookie';
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


const token = Cookies.get("authToken");


export default function ChangePassword() {
  const router = useRouter();


  const [formData, setFormData] = useState({
    uname: "",
    oldpw: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    uname: "",
    oldpw: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors = { uname: "", oldpw: "", password: "", password_confirmation: "" };
    let isValid = true;

    if (!formData.uname.trim()) {
      newErrors.uname = "username is required.";
      isValid = false;
    }

    if (!formData.oldpw.trim()) {
      newErrors.oldpw = "Current password is required.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "New password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "New password must be at least 6 characters long.";
      isValid = false;
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
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
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/user/change-password`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.status === 1) {
          setSuccessMessage("Password changed successfully.");
          setFormData({
            uname: "",
            oldpw: "",
            password: "",
            password_confirmation: "",
          });
        } else {
          setModalMessage("Failed to change password. Please try again.");
          setShowModal(true);
        }
        
      } catch (error) {
        setModalMessage("An error occurred while changing the password.");
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = async () => {
    // Clear auth token and session when password is changed
    Cookies.remove('authToken');
    localStorage.clear();
    sessionStorage.clear();

    // Optionally, remove any tokens or data from axios headers
    delete axios.defaults.headers.common['Authorization'];

    // Redirect to the sign-in page
    router.push("/auth/signin");
  };

  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-center"
  >
      <div className="flex-1 flex items-center justify-left px-36"
          style={{ backgroundImage: "url('/to.jpg')",
                  backgroundSize: 'cover',      
                  backgroundRepeat: 'no-repeat',        // Prevents the image from repeating
                  backgroundPosition: 'center center',  // Centers the image in the viewport
                  height: '100vh',                      // Sets the height to 100% of the viewport height
                  width: '100vw', 
          }} 
      >
        <form onSubmit={handleSubmit}>
          <Card className="w-[500px] items-center justify-center">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Change Password</CardTitle>
              <CardDescription>
                Enter your uname, current, and new passwords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="uname">Username</Label>
                <Input
                  id="uname"
                  name="uname"
                  type="text"
                  placeholder="uname"
                  value={formData.uname}
                  onChange={handleChange}
                  className={errors.uname ? "border-red-500" : ""}
                />
                {errors.uname && (
                  <p className="text-red-500 text-sm">{errors.uname}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldpw">Current Password</Label>
                <Input
                  id="oldpw"
                  name="oldpw"
                  type="password"
                  placeholder="Current password"
                  value={formData.oldpw}
                  onChange={handleChange}
                  className={errors.oldpw ? "border-red-500" : ""}
                />
                {errors.oldpw && (
                  <p className="text-red-500 text-sm">{errors.oldpw}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm New Password</Label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className={errors.password_confirmation ? "border-red-500" : ""}
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton
                className="w-full"
                text={loading ? "Loading..." : "Submit"}
                loadingText="Loading"
                loading={loading}
              />
            </CardFooter>
          </Card>
        </form>
      </div>
      {/* Success Message Modal */}
      {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white border border-gray-300 rounded-md shadow-lg p-6 z-50">
              <h3 className="text-xl font-bold mb-4 text-center">Success</h3>
              <p className="text-center">{successMessage}</p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleCloseSuccess}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Modal for password change feedback */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40"></div>
          <div className="relative bg-white border border-orange-500 rounded-lg p-6 z-50 max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-red-500 text-center">Change Password</h3>
            <p className="text-center text-black">{modalMessage}</p>
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleModalClose}
                className="bg-white text-black border border-black px-4 py-2 rounded-md shadow-md hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-black py-1">
        <p className="text-black">Copyright &copy; Reserved by the IT Branch of Training College Sheikhpura</p>
      </footer>
    </div>
  );
}
