"use client";

import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { contactSchema, type ContactFormData } from "../../lib/validations";
import { Loader2, Send } from "lucide-react";

// Types for API responses
interface ApiSuccessResponse {
  message: string;
  success: true;
  messageId?: string;
  timestamp: string;
}

interface ApiErrorResponse {
  error: string;
  message: string;
  success: false;
  timestamp: string;
  details?: Record<string, unknown>;
}

interface ValidationErrorResponse extends ApiErrorResponse {
  issues: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Submit contact form data to API with enhanced error handling
 * @param data - Validated contact form data
 * @returns Promise resolving to API response
 */
async function submitContactForm(data: ContactFormData): Promise<ApiSuccessResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle successful response
    if (response.ok) {
      const contentType = response.headers.get("content-type") || "";
      
      // Parse JSON response
      if (contentType.includes("application/json")) {
        const result = await response.json();
        return result as ApiSuccessResponse;
      }
      
      // Handle 204 No Content
      if (response.status === 204) {
        return { 
          success: true, 
          message: "Message sent successfully!",
          timestamp: new Date().toISOString()
        };
      }
      
      // Fallback for non-JSON success responses
      return { 
        success: true, 
        message: "Message sent successfully!",
        timestamp: new Date().toISOString()
      };
    }

    // Handle error responses with detailed error parsing
    let errorMessage = "Failed to send message. Please try again.";
    let errorDetails: Record<string, unknown> | undefined;
    
    try {
      const errorData: ApiErrorResponse | ValidationErrorResponse = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
      
      // Handle validation errors specifically
      if ('issues' in errorData && errorData.issues) {
        const fieldErrors = errorData.issues.map(issue => `${issue.field}: ${issue.message}`).join(", ");
        errorMessage = `Validation error: ${fieldErrors}`;
      }
      
      errorDetails = errorData.details;
    } catch {
      // If JSON parsing fails, try to get text response
      try {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      } catch {
        // Use status-specific error messages
        switch (response.status) {
          case 429:
            errorMessage = "Too many requests. Please wait before sending another message.";
            break;
          case 503:
            errorMessage = "Email service is temporarily unavailable. Please try again later.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = `Request failed with status ${response.status}`;
        }
      }
    }

    const error = new Error(errorMessage) as Error & { details?: Record<string, unknown>; status?: number };
    error.details = errorDetails;
    error.status = response.status;
    throw error;

  } catch (error) {
    clearTimeout(timeoutId);
    
    // Handle network and timeout errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error("Request timeout. Please check your connection and try again.");
      }
      if (error.message.includes('fetch')) {
        throw new Error("Network error. Please check your connection and try again.");
      }
    }
    
    throw error;
  }
}

export default function ContactForm() {
  // Ref for form reset and focus management
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    watch,
    clearErrors,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Watch form values for dynamic validation feedback
  const watchedValues = watch();
  const hasContent = Object.values(watchedValues).some(value => value && value.trim().length > 0);

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      const successMessage = data?.message || "Message sent successfully! I'll get back to you soon.";
      toast.success(successMessage, {
        duration: 5000,
        position: 'top-center',
      });
      reset();
      
      // Focus back to name input for better UX
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    },
    onError: (error: Error & { details?: Record<string, unknown>; status?: number }) => {
      console.error('Form submission error:', error);
      
      const errorMessage = error.message || "Failed to send message. Please try again.";
      
      // Provide more specific error messages based on error type
      if (error.status === 429) {
        toast.error("Too many requests. Please wait before sending another message.", {
          duration: 6000,
          position: 'top-center',
        });
      } else if (error.status === 503) {
        toast.error("Email service is temporarily unavailable. Please try again later or contact me directly.", {
          duration: 6000,
          position: 'top-center',
        });
      } else {
        toast.error(errorMessage, {
          duration: 4000,
          position: 'top-center',
        });
      }
    },
  });

  const onSubmit = useCallback((data: ContactFormData) => {
    // Clear any existing errors
    clearErrors();
    
    // Submit the form
    mutation.mutate(data);
  }, [mutation, clearErrors]);

  // Enhanced loading state that considers both form validation and API request
  const isLoading = mutation.isPending || isSubmitting;

  // Accessibility: Announce form status to screen readers
  const getFormAriaLabel = () => {
    if (isLoading) return "Sending your message, please wait";
    if (mutation.isError) return "Form submission failed, please review and try again";
    if (mutation.isSuccess) return "Message sent successfully";
    return "Contact form";
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)} 
      className="contact-form" 
      noValidate
      aria-label={getFormAriaLabel()}
      aria-busy={isLoading}
    >
      {/* Name Field */}
      <div className="form-field">
        <label 
          htmlFor="name" 
          className="form-label"
        >
          Full Name <span aria-hidden="true">*</span>
        </label>
        <input
          {...register("name")}
          ref={(e) => {
            register("name").ref(e);
            nameInputRef.current = e;
          }}
          type="text"
          id="name"
          placeholder="Enter your full name"
          autoComplete="name"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : "name-help"}
          className={`form-input ${errors.name ? "form-input--error" : ""}`}
          disabled={isLoading}
          required
        />
        {!errors.name && (
          <p id="name-help" className="form-help" aria-live="polite">
            At least 2 characters required
          </p>
        )}
        {errors.name && (
          <p 
            id="name-error"
            className="form-error"
            role="alert"
            aria-live="assertive"
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
          Email Address <span aria-hidden="true">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="your.email@example.com"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : "email-help"}
          className={`form-input ${errors.email ? "form-input--error" : ""}`}
          disabled={isLoading}
          required
        />
        {!errors.email && (
          <p id="email-help" className="form-help" aria-live="polite">
            We&apos;ll use this to respond to your message
          </p>
        )}
        {errors.email && (
          <p 
            id="email-error"
            className="form-error"
            role="alert"
            aria-live="assertive"
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
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Tell me about your project, collaboration ideas, or just say hello..."
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          className={`form-textarea ${errors.message ? "form-textarea--error" : ""}`}
          disabled={isLoading}
          maxLength={1000}
          required
        />
        {!errors.message && (
          <p id="message-help" className="form-help" aria-live="polite">
            Minimum 10 characters, maximum 1000 characters
          </p>
        )}
        {errors.message && (
          <p 
            id="message-error"
            className="form-error"
            role="alert"
            aria-live="assertive"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !isValid}
        className={`form-submit ${(!isValid && hasContent) ? "form-submit--disabled" : ""}`}
        aria-describedby="submit-help"
      >
        {isLoading ? (
          <>
            <Loader2 
              className="form-submit-icon form-submit-icon--loading" 
              aria-hidden="true"
              size={18}
            />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send 
              className="form-submit-icon" 
              aria-hidden="true"
              size={18}
            />
            <span>Send Message</span>
          </>
        )}
      </button>

      {/* Helper Text */}
      <div className="form-footer">
        <p id="submit-help" className="form-helper" aria-live="polite">
          Your message will be sent securely. I typically respond within 24-48 hours during business days.
        </p>
        
        {/* Form Status */}
        {mutation.isSuccess && (
          <p className="form-status form-status--success" role="status" aria-live="polite">
            ✓ Message sent successfully!
          </p>
        )}
        
        {mutation.isError && !isLoading && (
          <p className="form-status form-status--error" role="alert" aria-live="assertive">
            ✗ Failed to send message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}