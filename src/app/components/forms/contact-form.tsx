"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState, useRef, useId } from "react";
import { contactSchema, type ContactFormData } from "../../lib/validations";

async function submitContactForm(data: ContactFormData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.error || "Failed to send message");
  }

  return response.json();
}

export default function ContactForm() {
  const formId = useId();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const successAnnouncementRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const watchedFields = watch();

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Message sent successfully!");
      reset();
      setSubmitAttempted(false);
      // Focus and announce success for screen readers
      if (successAnnouncementRef.current) {
        successAnnouncementRef.current.focus();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setSubmitAttempted(true);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setSubmitAttempted(true);
    mutation.mutate(data);
  };

  const getFieldClassName = (fieldName: keyof ContactFormData, baseClasses: string) => {
    const hasError = errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const hasValue = watchedFields[fieldName];
    
    let classes = baseClasses;
    
    if (hasError && (isTouched || submitAttempted)) {
      classes += " border-red-500 focus:ring-red-500 focus:border-red-500";
    } else if (isTouched && hasValue && !hasError) {
      classes += " border-green-500 focus:ring-green-500 focus:border-green-500";
    }
    
    return classes;
  };

  return (
    <div>
      {/* Success announcement for screen readers */}
      <div
        ref={successAnnouncementRef}
        className="sr-only"
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        {mutation.isSuccess && "Your message has been sent successfully!"}
      </div>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6"
        aria-labelledby={`${formId}-title`}
        noValidate
      >
        <fieldset className="space-y-4">
          <legend className="sr-only" id={`${formId}-title`}>
            Contact Form - Send me a message
          </legend>
          
          <div>
            <label 
              htmlFor={`${formId}-name`} 
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
            >
              Full Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              {...register("name")}
              type="text"
              id={`${formId}-name`}
              autoComplete="name"
              className={getFieldClassName(
                "name",
                "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              )}
              placeholder="Enter your full name"
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              aria-invalid={errors.name ? "true" : "false"}
              disabled={mutation.isPending}
            />
            {errors.name && (
              <p 
                id={`${formId}-name-error`}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                <span className="font-medium">Error:</span> {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor={`${formId}-email`} 
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
            >
              Email Address <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              id={`${formId}-email`}
              autoComplete="email"
              className={getFieldClassName(
                "email",
                "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              )}
              placeholder="Enter your email address"
              aria-describedby={errors.email ? `${formId}-email-error` : `${formId}-email-help`}
              aria-invalid={errors.email ? "true" : "false"}
              disabled={mutation.isPending}
            />
            {!errors.email && (
              <p 
                id={`${formId}-email-help`}
                className="mt-1 text-xs text-gray-600 dark:text-gray-400"
              >
                I will use this to respond to your message
              </p>
            )}
            {errors.email && (
              <p 
                id={`${formId}-email-error`}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                <span className="font-medium">Error:</span> {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor={`${formId}-message`} 
              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
            >
              Message <span className="text-red-500" aria-label="required">*</span>
            </label>
            <textarea
              {...register("message")}
              id={`${formId}-message`}
              rows={5}
              className={getFieldClassName(
                "message",
                "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
              )}
              placeholder="Tell me about your project, question, or how we can collaborate..."
              aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-help`}
              aria-invalid={errors.message ? "true" : "false"}
              disabled={mutation.isPending}
            />
            {!errors.message && (
              <p 
                id={`${formId}-message-help`}
                className="mt-1 text-xs text-gray-600 dark:text-gray-400"
              >
                Minimum 10 characters, maximum 1000 characters ({watchedFields.message?.length || 0}/1000)
              </p>
            )}
            {errors.message && (
              <p 
                id={`${formId}-message-error`}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                <span className="font-medium">Error:</span> {errors.message.message}
              </p>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={mutation.isPending || (!isValid && submitAttempted)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          aria-describedby={`${formId}-submit-help`}
        >
          {mutation.isPending ? (
            <>
              <svg 
                className="animate-spin h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Sending Message...</span>
            </>
          ) : (
            "Send Message"
          )}
        </button>
        
        <p 
          id={`${formId}-submit-help`}
          className="text-xs text-gray-600 dark:text-gray-400 text-center"
        >
          I typically respond within 24-48 hours
        </p>
      </form>
    </div>
  );
}
