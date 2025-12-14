'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { contactSchema, type ContactFormData } from '../../lib/validations';
import { Loader2, Send } from 'lucide-react';

/**
 * Submit contact form data to API
 * Server-side validation and email sending
 */
async function submitContactForm(data: ContactFormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  // Handle successful response
  if (response.ok) {
    const contentType = response.headers.get('content-type') || '';
    
    // Parse JSON response
    if (contentType.includes('application/json')) {
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
  let errorMessage = 'Failed to send message. Please try again.';
  
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
    mode: 'onBlur', // Validate on blur for better UX
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      const successMessage = data?.message || "Message sent successfully! I'll get back to you soon.";
      toast.success(successMessage);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message. Please try again.');
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  const isLoading = mutation.isPending || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
        >
          Full Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="John Doe"
          autoComplete="name"
          disabled={isLoading}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.name && (
          <p 
            id="name-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
        >
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="john@example.com"
          autoComplete="email"
          disabled={isLoading}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <p 
            id="email-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
        >
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Tell me about your project or how we can work together..."
          disabled={isLoading}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {errors.message && (
          <p 
            id="message-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
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
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {/* Helper Text */}
      <p className="text-xs text-center text-gray-600 dark:text-gray-400">
        Your message will be sent securely. I typically respond within 24-48 hours.
      </p>
    </form>
  );
}