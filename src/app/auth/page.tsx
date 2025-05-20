"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  User,
  ConfirmationResult
} from "firebase/auth";

export default function AuthPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  // Listen for auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser);
      setProfilePic(firebaseUser?.photoURL || "");
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Google sign-in failed");
    }
    setLoading(false);
  };

  // Phone Sign-In
  const handlePhone = async () => {
    setLoading(true);
    setError("");
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
    } catch (err) {
      setError("Phone sign-in failed");
    }
    setLoading(false);
  };

  // OTP Verification
  const handleOtp = async () => {
    setLoading(true);
    setError("");
    try {
      if (confirmation) {
        await confirmation.confirm(otp);
        setConfirmation(null);
        setOtp("");
      }
    } catch (err) {
      setError("Invalid OTP");
    }
    setLoading(false);
  };

  // Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
  };

  // Change Profile Picture
  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    // For demo: use a local URL. For production, upload to Firebase Storage and use the URL.
    const url = URL.createObjectURL(file);
    setProfilePic(url);
    await updateProfile(user, { photoURL: url });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 sm:mt-12 p-4 sm:p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Login / Register</h2>
      {error && <div className="text-red-500 mb-2 text-sm sm:text-base">{error}</div>}
      {!user ? (
        <>
          <button
            onClick={handleGoogle}
            className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-blue-500 text-white text-sm sm:text-base rounded-lg mb-3 sm:mb-4 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in with Google"}
          </button>
          <div className="w-full flex items-center my-3 sm:my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full mb-2 px-3 py-1.5 sm:py-2 text-sm sm:text-base border rounded"
          />
          {confirmation ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full mb-2 px-3 py-1.5 sm:py-2 text-sm sm:text-base border rounded"
              />
              <button
                onClick={handleOtp}
                className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-green-500 text-white text-sm sm:text-base rounded-lg mb-3 sm:mb-4 hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          ) : (
            <button
              onClick={handlePhone}
              className="w-full py-1.5 sm:py-2 px-3 sm:px-4 bg-green-500 text-white text-sm sm:text-base rounded-lg mb-3 sm:mb-4 hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Sign in with Phone"}
            </button>
          )}
          <div id="recaptcha-container"></div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          <img
            src={profilePic || user?.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-2 border-2 border-primary"
          />
          <label className="mb-2 cursor-pointer text-blue-600 hover:underline text-sm sm:text-base">
            Change Profile Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </label>
          <div className="text-base sm:text-lg font-semibold mb-1 text-center">{user?.displayName || user?.phoneNumber || user?.email}</div>
          <div className="text-gray-500 mb-2 text-xs sm:text-sm text-center">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="mt-2 py-1.5 sm:py-2 px-3 sm:px-4 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 