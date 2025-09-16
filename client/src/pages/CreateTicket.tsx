
import { useState } from 'react';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{title?: string; description?: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Title should not exceed 50 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters long';
    } else if (formData.description.trim().length > 200) {
      newErrors.description = 'Description should not exceed 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting ticket:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setFormData({ title: '', description: '' });
      
      // TODO: Show success message or redirect
      alert('Ticket created successfully!');
      
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-base-100 shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tickets
            </button>
            <div>
              <h1 className="text-3xl font-bold text-base-content">Create New Ticket</h1>
              <p className="text-base-content/70 mt-1">Submit a support request for assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-base-100 rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Title <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-base-content/60">
                    {formData.title.length}/50
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a brief, descriptive title for your issue"
                  className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                  maxLength={50}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.title}</span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Be specific and concise. This helps our support team understand your issue quickly.
                  </span>
                </label>
              </div>

              {/* Description Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Description <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-base-content/60">
                    {formData.description.length}/200
                  </span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide detailed information about your issue, including steps to reproduce, expected behavior, and any error messages you've encountered"
                  className={`textarea textarea-bordered h-32 w-full ${errors.description ? 'textarea-error' : ''}`}
                  maxLength={200}
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.description}</span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Include as much relevant detail as possible to help us resolve your issue efficiently.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Ticket...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Ticket
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setFormData({ title: '', description: '' })}
                  disabled={isSubmitting}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-base-100 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips for Better Support
            </h3>
            <div className="space-y-3 text-sm text-base-content/70">
              <div className="flex items-start gap-3">
                <span className="text-success">✓</span>
                <span>Use clear, descriptive titles that summarize the issue</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-success">✓</span>
                <span>Include specific error messages or codes when applicable</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-success">✓</span>
                <span>Mention what you were trying to do when the issue occurred</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-success">✓</span>
                <span>Specify your browser, device, or platform if relevant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
