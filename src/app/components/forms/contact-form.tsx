"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { contactSchema, type ContactFormData } from "../../lib/validations";
import { Loader2, Send } from "lucide-react";

/**
 * Submit contact form data to API
 * Server-side validation and email sending
 */
async function submitContactForm(data: ContactFormData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Handle successful response
  if (response.ok) {
    const contentType = response.headers.get("content-type") || "";
    
    // Parse JSON response
    if (contentType.includes("application/json")) {
      return response.json();
    }
    
    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true };
    }
    
    // Fallback to text
    return { success: true, data: await response.text() };
  }

  // Handle error responses
  let errorMessage = "Failed to send message. Please try again.";
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    // If JSON parsing fails, try to get text
    try {
      const errorText = await response.text();
      if (errorText) {
        errorMessage = errorText;
      }
    } catch {
      // Use default error message
    }
  }

  throw new Error(errorMessage);
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      const successMessage = data?.message || "Message sent successfully! I'll get back to you soon.";
      toast.success(successMessage);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const isLoading = mutation.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
      {/* Name Field */}
      <div className="form-field">
        <label 
          htmlFor="name" 
          className="form-label"
        >
          Full Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          placeholder="Full Name"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`form-input ${errors.name ? "form-input--error" : ""}`}
        />
        {errors.name && (
          <p 
            id="name-error"
            className="form-error"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="form-field">
        <label 
          htmlFor="email" 
          className="form-label"
        >
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="email@domain.com"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`form-input ${errors.email ? "form-input--error" : ""}`}
        />
        {errors.email && (
          <p 
            id="email-error"
            className="form-error"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="form-field">
        <label 
          htmlFor="message" 
          className="form-label"
        >
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Tell me about your project or how we can work together..."
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`form-textarea ${errors.message ? "form-textarea--error" : ""}`}
        />
        {errors.message && (
          <p 
            id="message-error"
            className="form-error"
            role="alert"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="form-submit"
      >
        {isLoading ? (
          <>
            <Loader2 className="form-submit-icon form-submit-icon--loading" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="form-submit-icon" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {/* Helper Text */}
      <p className="form-helper">
        Your message will be sent securely. I typically respond within 24-48 hours.
      </p>
    </form>
  );
}