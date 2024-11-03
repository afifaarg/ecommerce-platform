import { useState } from "react";
import axios from "axios";

export default function AuthentificationModal() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecommerce-platform-api.onrender.com/backendAPI/login/",
        {
          username,
          password,
        }
      );
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem(
        "user_data",
        JSON.stringify(response.data.user_data)
      );
      alert("Login successful!");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const response = await axios.post(
        "https://ecommerce-platform-api.onrender.com/backendAPI/signup/",
        {
          username,
          full_name: fullName,
          role: "customer",
          phone_number: phoneNumber,
          address,
          email,
          password,
        }
      );
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("user_data", JSON.stringify(response.data.user));
      alert("Registration successful!");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 sm:w-1/3 bg-white mx-auto rounded-lg p-8 transition duration-500 ease-in-out transform">
        <h1 className="text-2xl text-primary text-center uppercase font-semibold">
          Authentification
        </h1>

        {/* Tab Buttons */}
        <div className="w-full sm:w-1/2 mx-auto flex justify-between mt-4">
          <span
            onClick={() => setActiveTab("signin")}
            className={`p-4 cursor-pointer transition duration-300 ${
              activeTab === "signin"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
            }`}
          >
            Connexion
          </span>
          <span
            onClick={() => setActiveTab("signup")}
            className={`p-4 cursor-pointer transition duration-300 ${
              activeTab === "signup"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500"
            }`}
          >
            Inscription
          </span>
        </div>

        {/* Form Section */}
        <div className="p-2">
          {error && <p className="text-red-500">{error}</p>}
          {activeTab === "signin" ? (
            // Sign-In Form
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-gray-700">Nom d'utilisateur</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700">Mot de Passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                  placeholder="Mot de Passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer"
                >
                  {/* Eye icon for show/hide password */}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md border font-bold hover:border-primary hover:bg-white hover:text-primary"
              >
                Connexion
              </button>
            </form>
          ) : (
            // Sign-Up Form
            <form onSubmit={handleSignUp}>
              <div className="flex space-x-2 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700">Nom Complet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Nom & Prénom"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700">N°: Téléphone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Téléphone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Adresse</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Adresse"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <div className=" relative">
                  <label className="block text-gray-700">Mot de Passe</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="block text-gray-700">
                    Confirmation du Mot de Passe
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md border font-bold hover:border-primary hover:bg-white hover:text-primary"
              >
                Inscription
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
