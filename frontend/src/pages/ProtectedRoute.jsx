import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

import { createClient } from "@supabase/supabase-js";
import { Oval } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";

const supabaseUrl = "https://rsvnozpjrrzranzbuhew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm5venBqcnJ6cmFuemJ1aGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI0OTQ4NDYsImV4cCI6MjAzODA3MDg0Nn0.gzFCcrwkfeTnqi55EjQRNuidXK-faanEPbePKMM6uzE";
const supabase = createClient(supabaseUrl, supabaseKey);

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("auth");
    if (!token) {
      setLoading(false);
    }
    supabase.auth.getUser(token).then((res) => {
      if (res.data.user) {
        setAuth(true);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-white dark:bg-black flex justify-center items-center">
        <Oval
          visible={true}
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (!loading && !auth) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;
