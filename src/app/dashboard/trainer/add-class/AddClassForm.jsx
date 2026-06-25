"use client";

import React, { useState } from "react";
import {
  Check,
  Calendar,
  CircleDollar,
  Clock,
  Picture,
} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

import { postClass } from "@/lib/actions/class";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { error } from "better-auth/api";

export default function AddClassForm() {
  const { data: session, isPending } = authClient.useSession();
  const userData = session?.user;
  const [selectedDays, setSelectedDays] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  if (isPending) return <div>Loading...</div>;

  if (!userData) return <div>Not authenticated</div>;

  // console.log(session, "its worked well=====================");

  // Replace this with your actual free API key from https://api.imgbb.com/
  const IMGBB_API_KEY =
    process.env.NEXT_PUBLIC_IMGBB_API || "YOUR_IMGBB_API_KEY_HERE";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 32MB as per ImgBB)
    if (file.size > 32 * 1024 * 1024) {
      setUploadError("Image size must be less than 32MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    // Prepare form data for ImgBB API
    const formData = new FormData();
    formData.append("image", file);

    try {
      console.log("Uploading to ImgBB...");

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();
      console.log("ImgBB Response:", result);

      if (result.success) {
        // Save the direct image URL from ImgBB into state
        setImageUrl(result?.data?.url);
        setUploadError("");
        console.log("Upload successful! URL:", result.data.url);
      } else {
        // Handle specific error messages from ImgBB
        if (result.error) {
          setUploadError(
            `Upload failed: ${result.error.message || "Unknown error"}`,
          );
          console.error("ImgBB Error:", result.error);
        } else {
          setUploadError("Image upload failed. Please try again.");
        }
        alert(
          `Upload failed: ${result.error?.message || "Please check your API key and try again."}`,
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        "An error occurred during image upload. Please try again.",
      );
      alert(
        "An error occurred during image upload. Please check your internet connection and try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDayToggle = (dayValue) => {
    if (selectedDays.includes(dayValue)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayValue));
    } else {
      setSelectedDays([...selectedDays, dayValue]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // not select date error
    if (selectedDays.length === 0) {
      toast("Please select at least one available day!");
      return;
    }
    // image url na thakle

    if (!imageUrl) {
      toast("Please upload a class image first!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    data.scheduleDays = selectedDays;
    data.imageUrl = imageUrl;
    data.status = "pending";
    data.userId = userData?.id || "";

    // alert(
    //   `Form Submitted with hosted ImgBB Image!\n\nData: ${JSON.stringify(data, null, 2)}`,
    // );
    const addClass = await postClass(data);
    if (addClass) {
      toast.success("Class Add Success");
      setSelectedDays([]);
      setImageUrl("");
      setUploadError("");
    }
    if(!addClass){
      toast.error(`add class Fail for: ${error.message}`)
    }
  };

  const categories = [
    { label: "Fitness & Yoga", value: "fitness" },
    { label: "Arts & Crafts", value: "arts" },
    { label: "Cooking & Culinary", value: "cooking" },
    { label: "Tech & Coding", value: "tech" },
    { label: "Music & Dance", value: "music" },
  ];

  const difficulties = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const daysOfWeek = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-background border border-divider rounded-2xl shadow-sm p-6 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-default-900">
            Add Your New Class mr.{userData.name}
          </h1>
          <p className="text-default-500 mt-2">
            Fill out the details below to publish your class to the marketplace.
          </p>
        </div>

        <Form
          className="flex flex-col gap-6"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class Name */}
            <TextField isRequired name="className" className="md:col-span-2">
              <Label>Class Name</Label>
              <Input placeholder="e.g., Introduction to Pottery Wheel throwing" />
              <FieldError />
            </TextField>

            {/* Dynamic ImgBB Upload System */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm font-medium text-default-800">
                Class Cover Image <span className="text-danger">*</span>
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-dashed border-divider rounded-xl bg-content2">
                {imageUrl ? (
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-divider">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      height={40}
                      width={30}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-32 h-20 rounded-lg bg-default-100 border border-divider text-default-400">
                    <Picture className="w-8 h-8" />
                  </div>
                )}

                <div className="flex flex-col gap-1 items-start w-full sm:w-auto">
                  <input
                    type="file"
                    accept="image/*"
                    id="imgbb-file-input"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="imgbb-file-input"
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      isUploading
                        ? "bg-default-200 text-default-400 border-divider cursor-not-allowed"
                        : "bg-background border-divider text-default-700 hover:bg-default-50 active:scale-95"
                    }`}
                  >
                    {isUploading
                      ? "Uploading to ImgBB..."
                      : "Choose Image File"}
                  </label>
                  <Description>
                    {isUploading
                      ? "⏳ Uploading..."
                      : imageUrl
                        ? "✓ Image successfully uploaded!"
                        : "Supports PNG, JPG up to 32MB."}
                  </Description>
                  {uploadError && (
                    <Description className="text-danger">
                      ⚠️ {uploadError}
                    </Description>
                  )}
                </div>
              </div>
            </div>

            {/* Category */}
            <Select isRequired name="category" placeholder="Select a category">
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categories.map((cat) => (
                    <ListBox.Item
                      id={cat.value}
                      textValue={cat.label}
                      key={cat.value}
                    >
                      <Label>{cat.label}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>

            {/* Difficulty Level */}
            <Select isRequired name="difficulty" placeholder="Select level">
              <Label>Difficulty Level</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {difficulties.map((diff) => (
                    <ListBox.Item
                      id={diff.value}
                      textValue={diff.label}
                      key={diff.value}
                    >
                      <Label>{diff.label}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>

            {/* Duration */}
            <TextField isRequired name="duration" type="text">
              <Label>Duration</Label>
              <Input placeholder="e.g., 60 mins, 4 weeks" />
              <FieldError />
            </TextField>

            {/* Price */}
            <TextField isRequired name="price" type="number">
              <Label>Price</Label>
              <Input placeholder="0.00" min={0} step="0.01" />
              <FieldError />
            </TextField>

            {/* Schedule Days */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm font-medium text-default-800">
                Class Schedule (Select Available Days){" "}
                <span className="text-danger">*</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {daysOfWeek.map((day) => {
                  const isSelected = selectedDays.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleDayToggle(day.value)}
                      className={`group relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                        isSelected
                          ? "bg-primary/10 border-primary text-primary shadow-sm font-semibold"
                          : "bg-content1 border-divider text-default-600 hover:border-default-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <span className="text-sm">{day.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schedule - Time */}
            <TextField
              isRequired
              name="scheduleTime"
              type="time"
              className="md:col-span-2"
            >
              <Label>Class Start Time</Label>
              <Input />
              <FieldError />
            </TextField>

            {/* Description */}
            <TextField isRequired name="description" className="md:col-span-2">
              <Label>Class Description</Label>
              <Input
                as="textarea"
                rows={4}
                placeholder="Tell your students what they will learn, required materials, and what to expect..."
              />
              <FieldError />
            </TextField>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-divider">
            <Button
              type="reset"
              variant="light"
              className="px-6"
              onClick={() => {
                setSelectedDays([]);
                setImageUrl("");
                setUploadError("");
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              color="primary"
              className="px-6 font-medium"
              disabled={isUploading}
            >
              <Check className="w-4 h-4 mr-1" /> Add Class
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
