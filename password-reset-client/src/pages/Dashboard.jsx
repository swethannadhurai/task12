import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <p>You have successfully logged in.</p>

         <div className="mt-4">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  Reset Password
              </Link>
          </div>
    </div>
  );
}
  