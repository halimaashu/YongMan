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
  FieldError,
  
} from "@heroui/react";
import { Envelope, Lock, ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    const { email, password } = formData;
    const { data, error } = await authClient.signIn.email({
      email, // required
      password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    if (data) {
      toast.success("log in success")
    }
    if (error) {
      toast.error(`log in fail${error.message}`)
    }
  };

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
            Young<span className="text-[#00E5FF]">Man</span>
          </span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-black text-white uppercase tracking-wide">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Sign in to continue your wellness journey.
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit}>
          <Fieldset>
            <Fieldset.Group className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Password
                  </Label>
                  <a
                    href="/forgot-password"
                    className="text-[11px] text-gray-500 hover:text-[#00E5FF] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock
                    className="absolute left-3.5 text-gray-500"
                    width={16}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
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
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Actions */}
            <Fieldset.Actions className="pt-6 flex flex-col gap-3">
              <Button
                type="submit"
                endContent={<ArrowRight width={14} />}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-black font-extrabold tracking-wider text-xs uppercase shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all"
              >
                Sign In
              </Button>
              <Button
                type="reset"
                onPress={() => setFormData({ email: "", password: "" })}
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
                onClick={() => console.log("Google Sign In")}
                className="w-full h-11 rounded-xl bg-[#0F111A] border border-[#1E2433] hover:border-gray-600 hover:bg-[#13151F] flex items-center justify-center gap-3 transition-all group"
              >
                {/* Google SVG Icon */}
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
          Don&apos;t have an account?{" "}
          <a
            href="/signUp"
            className="text-[#00E5FF] font-bold hover:underline"
          >
            Create one
          </a>
        </p>
      </motion.div>
    </div>
  );
}
