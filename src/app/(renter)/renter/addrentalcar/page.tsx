"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
import { createCarProvider } from "@/libs/createCarProvider";
import AddCarProviderForm from "@/components/AddCarProviderForm"; 

export default function AddCarProviderPage() {
  // Get session data and authentication status
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form state for car provider data
  const [form, setForm] = useState({
    name: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    dailyrate: "",
    seat: "",
    picture: "",
  });

  // State for image upload and snackbar alerts
  const [imageUploaded, setImageUploaded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning">("success");

  // Redirect unauthorized users (non-renters) to home page
  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "renter") {
      router.push("/");
    }
  }, [session, status]);

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file upload and convert to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, picture: reader.result as string });
      setImageUploaded(true);
    };
    reader.readAsDataURL(file);
  };

  // Submit form to create a car provider
  const handleSubmit = async () => {
    // Check that all fields in the form are completed
    const isFormComplete = Object.values(form).every((value) => value.trim() !== "");

    if (!isFormComplete) {
      setSnackbarMessage("Please fill in all fields before submitting.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = session?.user.token;
      if (!token) throw new Error("Missing token");

      await createCarProvider(token, form);
      setSnackbarMessage("Car provider created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      console.error(err);
      setSnackbarMessage("Failed to create car provider");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <main className="flex justify-center py-10 bg-[#FFEBD6] min-h-screen">
      {/* Add car provider form */}
      <AddCarProviderForm
        form={form}
        imageUploaded={imageUploaded}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleSubmit={handleSubmit}
      />

      {/* Snackbar alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}
