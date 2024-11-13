"use client";
import '../../globals.css'
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
import { getSession, signIn } from "next-auth/react"
import {Modal} from '@/components/ui/alert'

// Loader component
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
  loading = false,
}: Readonly<SubmitButtonProps>) {
  return (
    <Button
      type="submit"
      aria-disabled={loading}
      disabled={loading}
      className={cn(className)}
    >
      {loading ? <Loader text={loadingText} /> : text}
    </Button>
  );
}

interface FormData {
  uname: string;
  password: string;
}

export default function SigninForm() {
  const router = useRouter(); 

  const [formData, setFormData] = useState<FormData>({
    uname: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    uname: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const [alertInfo,setAlertInfo] =useState({
    open: false,
    title: "",
    detail: "",
    cancel: "",
    ok: "OK",
    type: "success",
  }
)

  const validateForm = () => {
    const newErrors = { uname: "", password: "", general: "" };
    let isValid = true;

    if (!formData.uname.trim()) {
      newErrors.uname = "Username is required.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = "Password is not correct.";
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
        const response = await   signIn('credentials', {
          username: formData.uname,
          password: formData.password,
          redirect: false, 
          callbackUrl :'/'
        });
      

        
        if(response?.status == 200){

       
          const nx_session = await getSession()

        
        if (nx_session?.user?.token && nx_session?.user?.role) {
          // console.log("Authentication successful:", response.data);
          Cookies.set('authToken', nx_session?.user?.token, { expires: 1, sameSite: 'Strict'});
          Cookies.set('lastActivity', new Date().getTime().toString());
          Cookies.set('usertype', nx_session?.user?.role, { expires: 1, sameSite: 'Strict'});
console.log(response?.user)
          if(nx_session?.user?.role == 'admin'){
            router.push("/admin");
          }
          else if(nx_session?.user?.role == 'user'){
            router.push("/user");
          } else if(nx_session?.user?.role == 'superadmin'){
            router.push("/super_admin");
          }
         
        } else {
          // console.error("Authentication failed:", response.data);
          setModalMessage("Authentication failed. Please check your credentials.");
          setShowModal(true);
        }
      }else{
        setAlertInfo({
          ...alertInfo,
          open: true,
          title: "Login Error",
          detail: response?.error,
          type: "failed",
        });
      }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverMessage = error.response?.data?.message || "Authentication failed.";
          console.error("Error during authentication:", serverMessage);
          setModalMessage(serverMessage);
        } else {
          console.error("Unexpected error:", error);
          setModalMessage("An unexpected error occurred.");
        }
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form validation failed.");
    }
  };  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-gradient-to-bl  from-slate-500 to-slate-300  bg-opacity-10 bg-repeat-y "
  >
      <div className="flex-1 flex items-center justify-left px-36  "
          style={{ backgroundImage: "url('/to.jpg')",
                  backgroundSize: 'cover',      
                  backgroundRepeat: 'no-repeat',        // Prevents the image from repeating
                  backgroundPosition: 'center center',  // Centers the image in the viewport
                  height: '100vh',                      // Sets the height to 100% of the viewport height
                  width: '100vw', 
          }} 
      >

        <h1 className='font-extrabold text-3xl capitalize w-full  bg-gradient-to-bl bg-clip-text text-transparent  from-indigo-900 to-slate-900 drop-shadow-xl'>  e-Quiz Repository  </h1>
        <form onSubmit={handleSubmit}>
        <Card className="w-[500px] items-center justify-center drop-shadow-2xl bg-slate-300">
        <CardHeader className="space-y-1 ">
              <CardTitle className="text-3xl font-bold ">Sign In</CardTitle>
              <CardDescription className="text-black ">
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 bd">
              <div className="space-y-2">
                <Label htmlFor="uname">Username</Label>
                <Input
                  id="uname"
                  name="uname"
                  type="text"
                  placeholder="username"
                  value={formData.uname}
                  onChange={handleChange}
                  className={cn("border-2 rounded-md p-2", errors.uname ? "border-red-500" : "border-black")}

                />
                {errors.uname && (
                  <p className="text-red-500 text-sm">{errors.uname}</p>
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
                  className={cn("border-2 rounded-md p-2", errors.password ? "border-red-500" : "border-black")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton 
                className="w-full" 
                text={loading ? "Loading..." : "Sign In"} 
                loadingText="Loading" 
                loading={loading}
              />
            </CardFooter>
          </Card>
          <div className="mt-2 text-center text-sm">
            Don't have an account? Contact the IT Branch
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-black py-1">
        <p className="text-black">Copyright &copy; Reserved by the IT Branch of Training College Sheikhpura</p>
      </footer>

      {/* Modal for authentication errors */}
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold">Error</h2>
            <p>{modalMessage}</p>
            <Button onClick={handleModalClose}>Close</Button>
          </div>
        </div>
      )} */}

      <Modal  open={alertInfo.open}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
        title={alertInfo.title}
        detail={alertInfo.detail}
        cancel={alertInfo.cancel}
        ok={alertInfo.ok}
        type ={alertInfo.type}
        />
    </div>
  );
}
