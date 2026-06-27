"use client";

import React, { useState } from "react";
import {
  Table,
  Modal,
  Button,
  TextField,
  Label,
  InputGroup,
} from "@heroui/react";

const ManageTrainerPage = ({ allTrainerForm }) => {
  // Safe fallback if data hasn't loaded yet
  const [trainers, setTrainers] = useState(allTrainerForm || []);

  // Modal tracking state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Handler to approve right away
  const handleApprove = (id) => {
    setTrainers((prev) =>
      prev.map((trainer) =>
        trainer._id === id ? { ...trainer, status: "Approved" } : trainer
      )
    );
  };

  // Open rejection workflow modal
  const openRejectModal = (id) => {
    setSelectedTrainerId(id);
    setRejectReason("");
    setIsModalOpen(true);
  };

  // Handle final rejection inside modal
  const handleFinalRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) return;

    setTrainers((prev) =>
      prev.map((trainer) =>
        trainer._id === selectedTrainerId
          ? { ...trainer, status: "Rejected", reasons: rejectReason }
          : trainer
      )
    );

    // Reset and close modal state
    setIsModalOpen(false);
    setSelectedTrainerId(null);
    setRejectReason("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-200 p-6 md:p-10 font-sans">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Trainer Applications
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Review, approve, or reject incoming application requests from trainers.
          </p>
        </div>
      </div>

      {/* Main Layout Table */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
        <Table className="w-full text-left border-collapse">
          <Table.ScrollContainer>
            <Table.Content aria-label="Trainer requests manage grid">
              <Table.Header className="bg-[#1e1e1e] border-b border-neutral-800 text-xs font-medium text-neutral-400 tracking-wider">
                <Table.Column isRowHeader className="p-4">
                  Trainer Name
                </Table.Column>
                <Table.Column className="p-4">Specialty</Table.Column>
                <Table.Column className="p-4">Experience</Table.Column>
                <Table.Column className="p-4">Applied Date</Table.Column>
                <Table.Column className="p-4">Status</Table.Column>
                <Table.Column className="p-4 text-right">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {trainers.map((trainer) => {
                  const statusLower = trainer.status?.toLowerCase() || "pending";

                  return (
                    <Table.Row
                      key={trainer._id}
                      className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors"
                    >
                      {/* Name column matching visual avatar structure */}
                      <Table.Cell className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-950 flex items-center justify-center text-xs font-semibold text-blue-400 border border-blue-900/60 uppercase">
                          {trainer.userName
                            ? trainer.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "?"}
                        </div>
                        <span className="font-medium text-sm text-neutral-100">
                          {trainer.userName || "Unknown"}
                        </span>
                      </Table.Cell>

                      {/* Specialty */}
                      <Table.Cell className="p-4 text-sm text-neutral-400 capitalize">
                        {trainer.specialty}
                      </Table.Cell>

                      {/* Experience */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {trainer.experience} Years
                      </Table.Cell>

                      {/* Formatting Join / Created At strings */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {formatDate(trainer.createAt)}
                      </Table.Cell>

                      {/* Reactive Status Column Pill */}
                      <Table.Cell className="p-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              statusLower === "approved"
                                ? "bg-emerald-500"
                                : statusLower === "rejected"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium capitalize ${
                              statusLower === "approved"
                                ? "text-emerald-400"
                                : statusLower === "rejected"
                                  ? "text-red-400"
                                  : "text-amber-400"
                            }`}
                          >
                            {trainer.status}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Table contextual conditional actions row handles */}
                      <Table.Cell className="p-4 text-sm text-right font-medium">
                        {statusLower === "pending" ? (
                          <div className="flex items-center justify-end gap-3 text-xs">
                            <button
                              onClick={() => handleApprove(trainer._id)}
                              className="text-emerald-400 hover:underline bg-transparent border-none cursor-pointer p-0"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => openRejectModal(trainer._id)}
                              className="text-red-500 hover:underline bg-transparent border-none cursor-pointer p-0"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-500 italic">
                            {statusLower === "rejected" ? "Rejected" : "Active"}
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* HeroUI Rejection Reason Capture Modal Component */}
      {isModalOpen && (
        <Modal>
          <Modal.Backdrop>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Modal.Container className="w-full max-w-md bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                <Modal.Dialog>
                  <Modal.CloseTrigger>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 text-lg bg-transparent border-none cursor-pointer"
                    >
                      &times;
                    </button>
                  </Modal.CloseTrigger>

                  <form onSubmit={handleFinalRejectSubmit}>
                    <Modal.Header className="p-6 pb-4 border-b border-neutral-800">
                      <Modal.Heading className="text-lg font-semibold text-white">
                        Reject Application
                      </Modal.Heading>
                    </Modal.Header>

                    <Modal.Body className="p-6 space-y-4">
                      <p className="text-sm text-neutral-400">
                        Please state the reason for rejecting this trainer applicant.
                      </p>

                      <TextField>
                        <Label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Reason for Rejection
                        </Label>
                        <InputGroup>
                          <InputGroup.Input
                            required
                            type="text"
                            placeholder="e.g., Incomplete certification details provided."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full bg-[#242424] border border-neutral-800 rounded-lg p-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 transition-colors"
                          />
                        </InputGroup>
                      </TextField>
                    </Modal.Body>

                    <Modal.Footer className="p-6 pt-4 border-t border-neutral-800 bg-[#1e1e1e] flex justify-end gap-3">
                      {/* FIX: Removed nested <button> elements inside HeroUI <Button> components */}
                      <Button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white bg-transparent transition-colors"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                      >
                        Reject Trainer
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Dialog>
              </Modal.Container>
            </div>
          </Modal.Backdrop>
        </Modal>
      )}
    </div>
  );
};

export default ManageTrainerPage;