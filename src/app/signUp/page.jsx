"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Form,
  Button,
  Fieldset,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  
} from "@heroui/react";
import { Envelope, Person, ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API;

// Uploads a File to ImgBB → returns hosted URL
async function uploadToImgBB(file) {
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const form = new FormData();
  form.append("key", IMGBB_API_KEY);
  form.append("image", base64);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: form,
  });

  const json = await res.json();
  if (!json.success)
    throw new Error(json.error?.message ?? "ImgBB upload failed");
  return json.data.url;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null); // { file, preview }
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    role: "user",
    name: "",
    email: "",
    password: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar({ file, preview: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    if (avatar?.preview) URL.revokeObjectURL(avatar.preview);
    setAvatar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      // 1. Upload image to ImgBB first → get a URL string
      let imageUrl = undefined;
      if (avatar?.file) {
        imageUrl = await uploadToImgBB(avatar.file);
      }

      // 2. Sign up — pass role via fetchOptions headers so Better Auth
      //    receives it as extra data and saves it to the user record
      const { data, error } = await authClient.signUp.email(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: imageUrl, // ✅ proper https:// URL from ImgBB
          role: formData.role, // ✅ passed as top-level field
          callbackURL: "/dashboard",
        },
        {
          // Better Auth also accepts extra fields via onRequest if needed
          onSuccess: (ctx) => {
            console.log("Sign up success:", ctx);
            toast.success("Sign Up success")
          },
          onError: (ctx) => {
            console.error("Sign up error:", ctx.error.message);
            toast.Error(`Sign Up Fail for:${ctx.error.message}`)
          },
        },
      );

      if (error) console.error("Sign up error:", error);
      else console.log("Sign up success:", data);
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setUploading(false);
    }
  };
  const handleGoogleSignUp=async()=>{
    const data = await authClient.signIn.social({
    provider: "google",
  });
  }

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen w-full bg-[#060709] flex items-center justify-center px-4 font-sans selection:bg-[#00E5FF]/30 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-[#0C0E15] border border-[#1C2030] rounded-2xl p-8 shadow-2xl"
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="rounded-xl p-1 bg-[#11131C] border border-[#1E2433]">
            <Image
              src="/YongMan-logo.png"
              height={32}
              width={32}
              alt="YongMan Logo"
              className=""
            />
          </div>
          <span className="text-white font-black tracking-widest text-sm uppercase">
            Yong<span className="text-[#00E5FF]">Man</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            Create Account
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Join thousands building healthier lifestyles.
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <Fieldset.Group className="space-y-5">
              {/* Role Selector */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  I am a
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "user", label: "User" },
                    { value: "trainer", label: "Trainer" },
                  ].map(({ value, label }) => {
                    const selected = formData.role === value;
                    return (
                      <label
                        key={value}
                        className={`flex items-center gap-2.5 p-3 rounded-xl bg-[#0F111A] border cursor-pointer transition-all ${
                          selected
                            ? "border-[#00E5FF]"
                            : "border-[#1E2433] hover:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={value}
                          checked={selected}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, role: value }))
                          }
                          className="sr-only"
                        />
                        <span
                          className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            selected ? "border-[#00E5FF]" : "border-gray-600"
                          }`}
                        >
                          {selected && (
                            <span className="h-2 w-2 rounded-full bg-[#00E5FF] block" />
                          )}
                        </span>
                        <span
                          className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                            selected ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Profile Photo
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#0F111A] border-2 border-dashed border-[#1E2433] flex items-center justify-center shrink-0 overflow-hidden">
                    {avatar ? (
                      <Image
                      height={"40"}
                      width={"40"}
                        src={avatar.preview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Person className="text-gray-600" width={24} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label className="cursor-pointer w-full h-10 rounded-xl bg-[#0F111A] border border-[#1E2433] hover:border-[#00E5FF] flex items-center justify-center gap-2 transition-all group">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 group-hover:text-[#00E5FF] transition-colors"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                        {avatar ? "Change Photo" : "Upload Photo"}
                      </span>
                    </label>

                    {avatar && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="w-full h-8 rounded-xl bg-transparent border border-[#1E2433] hover:border-red-500/50 text-gray-600 hover:text-red-400 text-[11px] font-bold uppercase tracking-wider transition-all"
                      >
                        Remove
                      </button>
                    )}

                    <p className="text-[10px] text-gray-600">
                      PNG, JPG or WEBP · Max 2MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <TextField className="w-full space-y-1.5">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative flex items-center">
                  <Person
                    className="absolute left-3.5 text-gray-500"
                    width={16}
                  />
                  <Input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={update("name")}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#0F111A] border border-[#1E2433] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] transition-all"
                  />
                </div>
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              {/* Email */}
              <TextField className="w-full space-y-1.5">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="relative flex items-center">
                  <Envelope
                    className="absolute left-3.5 text-gray-500"
                    width={16}
                  />
                  <Input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={update("email")}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#0F111A] border border-[#1E2433] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] transition-all"
                  />
                </div>
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              {/* Password */}
              <TextField className="w-full space-y-1.5">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Password
                </Label>
                <div className="relative flex items-center">
                  <Person
                    className="absolute left-3.5 text-gray-500"
                    width={16}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={update("password")}
                    className="w-full h-11 pl-10 pr-11 rounded-xl bg-[#0F111A] border border-[#1E2433] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlash width={16} />
                    ) : (
                      <Eye width={16} />
                    )}
                  </button>
                </div>
                <Description className="text-[11px] text-gray-600">
                  Use 8+ characters with a mix of letters and numbers.
                </Description>
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Actions */}
            <Fieldset.Actions className="pt-6 flex flex-col gap-3">
              <Button
                type="submit"
                isDisabled={uploading}
                endContent={!uploading && <ArrowRight width={14} />}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-black font-extrabold tracking-wider text-xs uppercase shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Create Account"}
              </Button>
              <Button
                type="reset"
                onPress={() => {
                  setFormData({
                    role: "user",
                    name: "",
                    email: "",
                    password: "",
                  });
                  removeImage();
                }}
                className="w-full h-11 rounded-xl bg-transparent border border-[#1E2433] hover:bg-[#121520] text-gray-400 hover:text-white font-bold tracking-wider text-xs uppercase transition-colors"
              >
                Clear
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <span className="flex-1 h-px bg-[#1E2433]" />
                <span className="text-[11px] text-gray-600 uppercase tracking-widest">
                  or
                </span>
                <span className="flex-1 h-px bg-[#1E2433]" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={
                  handleGoogleSignUp
                }
                className="w-full h-11 rounded-xl bg-[#0F111A] border border-[#1E2433] hover:border-gray-600 hover:bg-[#13151F] flex items-center justify-center gap-3 transition-all group"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                  Continue with Google
                </span>
              </button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        {/* Footer link */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/logIn" className="text-[#00E5FF] font-bold hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}