"use client";

import { toast } from "react-hot-toast";
import Image from "next/image";
import "./contactsection.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { contactSchema, type ContactFormData } from "../../../lib/validations";

async function submitContactForm(data: ContactFormData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to send message");
  }

  return response.json();
}

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="c-contact">
      <h2 className="c-contact-title">Let’s Make It Happen</h2>

      <p className="c-contact-subtitle">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          type="text"
          {...register("name")}
          placeholder="Your Full Name"
          className="c-contact-input"
          aria-invalid={!!errors.name}
          disabled={mutation.isPending}
        />

        <input
          type="email"
          {...register("email")}
          placeholder="Your Email"
          className="c-contact-input"
          aria-invalid={!!errors.email}
          disabled={mutation.isPending}
        />

        <textarea
          {...register("message")}
          placeholder="Your Message"
          className="c-contact-textarea"
          aria-invalid={!!errors.message}
          disabled={mutation.isPending}
        />

        <button
          type="submit"
          className="c-contact-submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* SOCIAL LINKS */}
      <div className="c-contact-links" suppressHydrationWarning>
        <a
          href="https://linkedin.com/in/siphesihle-mthethwa"
          target="_blank"
          rel="noopener noreferrer"
          className="c-contact-link"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/Sihle-Thwa"
          target="_blank"
          rel="noopener noreferrer"
          className="c-contact-link"
        >
          GitHub
        </a>

        <a
          href="https://instagram.com/username"
          target="_blank"
          rel="noopener noreferrer"
          className="c-contact-link"
        >
          Instagram
        </a>
      </div>

      {/* BACK TO TOP */}
      <div className="c-contact-nav-cta">
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="c-contact-backtotop animate-bounce"
          aria-label="Back to top"
        >
          <Image
            src="/icons/uparrow.svg"
            alt="Back to Top"
            width={42}
            height={42}
            priority
          />
        </button>
      </div>
    </section>
  );
}
