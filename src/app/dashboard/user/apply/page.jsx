"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Label,
  Description,
  ListBox,
  Button,
} from "@heroui/react";
import {
  ChevronRight,
  BroomMotionFill,
  ChevronDown,
  Check,
} from "@gravity-ui/icons";
import { PostTrainerForm } from "@/lib/actions/apply";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function TrainerApplicationForm() {
  // State to manage select dropdown value (stored as an array or single key based on selection mode)
  const [specialty, setSpecialty] = useState(new Set([]));
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, "from user data in user trainer form pages");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const experience = formData.get("experience");
    const specialty = formData.get("specialty");

    // Convert Set value to a readable string for the payload
    const selectedValue = Array.from(specialty)[0] || "";

    const submissionData = {
      experience: Number(experience),
      specialty,
      status: "Pending",
      userId: user?.id,
      reasons:"",
      userName: user?.name,
    };

    console.log("--- Form Submission Data ---");
    console.log(submissionData);
    const postTrainerForm = await PostTrainerForm(submissionData);
    if (postTrainerForm) {
      toast.success(
        "Application submitted successfully! Check console for data.",
      );
    }
    if (!postTrainerForm) {
      toast.error("could not submit it");
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-content1 rounded-xl shadow-md border border-divider">
      <h2 className="text-xl font-bold mb-4 text-foreground">
        Apply to be a Trainer
      </h2>

      <Form
        onSubmit={handleSubmit}
        validationBehavior="native"
        className="flex flex-col gap-4 w-full"
      >
        {/* Experience Field */}
        <div className="flex flex-col gap-1 w-full">
          <Input
            required={true}
            label="Experience (Years)"
            name="experience"
            type="number"
            min={0}
            max={50}
            placeholder="e.g., 3"
            variant="bordered"
          />
        </div>

        {/* Composable Specialty Field */}
        <Select
         name="specialty"
          className="w-full"
          placeholder="Select your expertise"
          selectedKeys={specialty ? new Set([specialty]) : new Set()}
          onSelectionChange={(keys) => {
            const value = [...keys][0];
            setSpecialty(value);
          }}
          isRequired
        >
          <Label>Specialty</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator>
              <ChevronDown width={16} height={16} />
            </Select.Indicator>
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item id="yoga" textValue="Yoga">
                Yoga
                <ListBox.ItemIndicator>
                  <Check width={16} height={16} />
                </ListBox.ItemIndicator>
              </ListBox.Item>

              <ListBox.Item id="weights" textValue="Weights & Strength">
                Weights & Strength
                <ListBox.ItemIndicator>
                  <Check width={16} height={16} />
                </ListBox.ItemIndicator>
              </ListBox.Item>

              <ListBox.Item id="cardio" textValue="Cardio & Endurance">
                Cardio & Endurance
                <ListBox.ItemIndicator>
                  <Check width={16} height={16} />
                </ListBox.ItemIndicator>
              </ListBox.Item>

              <ListBox.Item id="pilates" textValue="Pilates">
                Pilates
                <ListBox.ItemIndicator>
                  <Check width={16} height={16} />
                </ListBox.ItemIndicator>
              </ListBox.Item>

              <ListBox.Item id="crossfit" textValue="CrossFit">
                CrossFit
                <ListBox.ItemIndicator>
                  <Check width={16} height={16} />
                </ListBox.ItemIndicator>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>

          <Description>Choose the discipline you excel at most.</Description>
        </Select>

        {/* Form Actions */}
        <div className="flex gap-2 justify-end mt-2">
          <Button
            type="reset"
            variant="flat"
            color="danger"
            startContent={<BroomMotionFill width={16} height={16} />}
            onClick={() => setSpecialty(new Set([]))}
          >
            Clear
          </Button>

          <Button
            type="submit"
            color="primary"
            endContent={<ChevronRight width={16} height={16} />}
          >
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
}
