import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("framer-motion", () => {
  const React = require("react");
  const strip = ({ initial, whileInView, viewport, transition, animate, exit, ...p }) => p;
  return {
    motion: new Proxy({}, { get: (_, tag) => ({ children, ...p }) => React.createElement(tag, strip(p), children) }),
  };
});

import ContactForm from "@/components/ContactForm";

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

beforeEach(() => {
  global.fetch = vi.fn();
});

describe("<ContactForm />", () => {
  it("shows validation errors and does not call the API", async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));
    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("shows success only when the API succeeds", async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    render(<ContactForm />);
    fill(/^name/i, "Asha Rao");
    fill(/^email/i, "asha@corp.com");
    fill(/message/i, "We would love to hire you.");
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));
    expect(await screen.findByText(/submitted successfully/i)).toBeInTheDocument();
  });

  it("shows an error (not success) when the server fails to deliver", async () => {
    fetch.mockResolvedValue({ ok: false, json: async () => ({ ok: false, error: "We couldn't deliver your message right now." }) });
    render(<ContactForm />);
    fill(/^name/i, "Asha Rao");
    fill(/^email/i, "asha@corp.com");
    fill(/message/i, "We would love to hire you.");
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't deliver/i);
    expect(screen.queryByText(/submitted successfully/i)).not.toBeInTheDocument();
  });

  it("shows an error on network failure", async () => {
    fetch.mockRejectedValue(new Error("Network down"));
    render(<ContactForm />);
    fill(/^name/i, "Asha Rao");
    fill(/^email/i, "asha@corp.com");
    fill(/message/i, "We would love to hire you.");
    fireEvent.click(screen.getByRole("button", { name: /submit enquiry/i }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(/network down/i));
  });
});
