"use client";

import React, { useState, useEffect } from "react";
import { Check, Pencil } from "@gravity-ui/icons";
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
  Modal,
  Surface,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import toast from "react-hot-toast";
import { classUpdateById } from "@/lib/actions/api/class";
import { useRouter } from "next/navigation";

export function UpdateClassModal({ initialData, onRefresh }) {
  const { data: session, isPending } = authClient.useSession();
  const userData = session?.user;
   const router=useRouter()
// console.log(initialData,"its my IIIIIIIIIIII datda")
  const [selectedDays, setSelectedDays] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    if (initialData) {
      setSelectedDays(Array.isArray(initialData.scheduleDays) ? initialData.scheduleDays : []);
      setImageUrl(initialData.imageUrl || "");
      setSelectedCategory(initialData.category || "");
      setSelectedDifficulty(initialData.difficulty || "");
    }
  }, [initialData]);



  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API || "YOUR_IMGBB_API_KEY_HERE";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 32 * 1024 * 1024) {
      setUploadError("Image size must be less than 32MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const result = await response.json();

      if (result.success) {
        setImageUrl(result?.data?.url);
        setUploadError("");
        toast.success("New image uploaded!");
      } else {
        setUploadError(result.error?.message || "Image upload failed.");
      }
    } catch {
      setUploadError("An error occurred during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDayToggle = (dayValue) => {
    setSelectedDays((prev) =>
      prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedDays.length === 0) {
      toast.error("Please select at least one schedule day!");
      return;
    }
    if (!imageUrl) {
      toast.error("Please upload a class image first!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    data.scheduleDays = selectedDays;
    data.imageUrl = imageUrl;
    data.userId = userData?.id || "";
    data.category = selectedCategory;
    data.difficulty = selectedDifficulty;
    data._id = initialData._id;

    try {
      
    //   my submit related logic
    const edit=await classUpdateById(data)
    if(edit){
        toast.success("Edit success")
        router.onRefresh()
    }
    } catch (err) {
      toast.error(`Error: ${err.message || "Something went wrong"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

const categories = [
    { label: "Adventure", value: "adventure" },
    { label: "Boxing", value: "boxing" },
    { label: "Calisthenics", value: "calisthenics" },
    { label: "Cardio", value: "cardio" },
    { label: "CrossFit", value: "crossfit" },
    { label: "Dance", value: "dance" },
    { label: "Fitness", value: "fitness" },
    { label: "Flexibility", value: "flexibility" },
    { label: "Functional", value: "functional" },
    { label: "HIIT", value: "hiit" },
    { label: "Martial Arts", value: "martial arts" },
    { label: "Pilates", value: "pilates" },
    { label: "Sports", value: "sports" },
    { label: "Strength", value: "strength" },
    { label: "Swimming", value: "swimming" },
    { label: "Tech & Coding", value: "tech" },
    { label: "Weightlifting", value: "weightlifting" },
    { label: "Yoga", value: "yoga" },
  ];
 
  const difficulties = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const daysOfWeek = [
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
    { label: "Sun", value: "sunday" },
  ];

  return (
    <Modal>
      <Button variant="secondary" isIconOnly>
        <Pencil className="size-4" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Class</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update the class details below. Changes are saved immediately on submit.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form
                  validationBehavior="native"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">

                    {/* Class Name */}
                    <TextField
                      isRequired
                      name="className"
                      defaultValue={initialData?.className}
                      className="sm:col-span-2"
                      variant="secondary"
                    >
                      <Label>Class Name</Label>
                      <Input placeholder="e.g., Introduction to Pottery Wheel throwing" />
                      <FieldError />
                    </TextField>

                    {/* Image Upload */}
                    <div className="sm:col-span-2 flex flex-col gap-2">
                      <span className="text-sm font-medium text-default-800">
                        Class Cover Image <span className="text-danger">*</span>
                      </span>
                      <div className="flex flex-col sm:flex-row items-center gap-4 p-3 border border-dashed border-divider rounded-xl bg-content2">
                        {imageUrl ? (
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-divider">
                            <Image
                              src={imageUrl}
                              alt="Preview"
                              height={64}
                              width={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-24 h-16 rounded-lg bg-default-100 border border-divider text-default-400 text-xs">
                            No image
                          </div>
                        )}

                        <div className="flex flex-col gap-1 items-start w-full sm:w-auto">
                          <input
                            type="file"
                            accept="image/*"
                            id="edit-imgbb-file-input"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                          <label
                            htmlFor="edit-imgbb-file-input"
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              isUploading
                                ? "bg-default-200 text-default-400 border-divider cursor-not-allowed"
                                : "bg-background border-divider text-default-700 hover:bg-default-50"
                            }`}
                          >
                            {isUploading ? "Uploading..." : "Change Image"}
                          </label>
                          {uploadError && (
                            <Description className="text-danger text-xs">
                              ⚠️ {uploadError}
                            </Description>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* FIX 2: Category — selectedKey instead of defaultValue */}
                    <Select
                      isRequired
                      name="category"
                      selectedKey={selectedCategory}
                      onSelectionChange={(key) => setSelectedCategory(key)}
                      placeholder="Select a category"
                      variant="secondary"
                    >
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

                    {/* FIX 2: Difficulty — selectedKey instead of defaultValue */}
                    <Select
                      isRequired
                      name="difficulty"
                      selectedKey={selectedDifficulty}
                      onSelectionChange={(key) => setSelectedDifficulty(key)}
                      placeholder="Select level"
                      variant="secondary"
                    >
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
                    <TextField
                      isRequired
                      name="duration"
                      type="text"
                      defaultValue={initialData?.duration}
                      variant="secondary"
                    >
                      <Label>Duration</Label>
                      <Input placeholder="e.g., 60 mins" />
                      <FieldError />
                    </TextField>

                    {/* Price */}
                    <TextField
                      isRequired
                      name="price"
                      type="number"
                      defaultValue={initialData?.price?.toString()}
                      variant="secondary"
                    >
                      <Label>Price</Label>
                      <Input placeholder="0.00" min={0} step="0.01" />
                      <FieldError />
                    </TextField>

                    {/* FIX 3: Schedule Days — solid fill + checkmark for clarity */}
                    <div className="sm:col-span-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-default-800">
                          Schedule Days
                        </span>
                        <span className="text-xs text-default-400">
                          {selectedDays.length} selected
                        </span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {daysOfWeek.map((day) => {
                          const isSelected = selectedDays.includes(day.value);
                          return (
                            <button
                              key={day.value}
                              type="button"
                              onClick={() => handleDayToggle(day.value)}
                              className={`relative flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg border text-center text-xs font-medium transition-all select-none ${
                                isSelected
                                  ? "bg-primary border-primary text-white shadow-sm shadow-primary/30"
                                  : "bg-content1 border-divider text-default-500 hover:border-default-400 hover:text-default-800"
                              }`}
                            >
                              <span>{day.label}</span>
                              {/* Checkmark only visible when selected */}
                              <Check
                                className={`w-3 h-3 transition-opacity ${
                                  isSelected ? "opacity-100" : "opacity-0"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Schedule Time */}
                    <TextField
                      isRequired
                      name="scheduleTime"
                      type="time"
                      defaultValue={initialData?.scheduleTime}
                      className="sm:col-span-2"
                      variant="secondary"
                    >
                      <Label>Class Start Time</Label>
                      <Input />
                      <FieldError />
                    </TextField>

                    {/* Description */}
                    <TextField
                      isRequired
                      name="description"
                      defaultValue={initialData?.description}
                      className="sm:col-span-2"
                      variant="secondary"
                    >
                      <Label>Class Description</Label>
                      <Input
                        as="textarea"
                        rows={3}
                        placeholder="Tell your students what they will learn..."
                      />
                      <FieldError />
                    </TextField>
                  </div>

                  {/* Hidden submit button triggered from footer */}
                  <button type="submit" id="hidden-submit-btn" className="hidden" />
                </Form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => document.getElementById("hidden-submit-btn")?.click()}
                disabled={isUploading || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}