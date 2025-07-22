// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../assets/styles/Contact.css';
// Import Formik and Yup for enhanced form handling
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Declare grecaptcha for TypeScript
declare global {
  interface Window {
    grecaptcha: any;
  }
}

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState<boolean>(false);

  useEffect(() => {
    emailjs.init('NAOIVMA8Iq_XwL4q2');
    
    // Load reCAPTCHA v3 script (now works in both development and production)
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=6LeZ3IsrAAAAADvczC1OVV7GgOqB9b0p6GsIXfzq`;
    script.async = true;
    
    script.onload = () => {
      setRecaptchaLoaded(true);
      console.log('reCAPTCHA script loaded');
    };
    
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      setRecaptchaLoaded(false);
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
    message: Yup.string().required('Message is required.'),
  });

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      setIsSubmitting(true);
      
      // Execute reCAPTCHA v3 using the native API
      if (window.grecaptcha && window.grecaptcha.ready && recaptchaLoaded) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LeZ3IsrAAAAADvczC1OVV7GgOqB9b0p6GsIXfzq', {
            action: 'submit'
          }).then((token: string) => {
            if (token) {
              // Include the reCAPTCHA token in the email data
              const emailData = {
                ...values,
                'g-recaptcha-response': token
              };

              emailjs.send(
                'service_szjyjzd',
                'template_mh9bjm4',
                emailData,
                'NAOIVMA8Iq_XwL4q2'
              )
                .then((response) => {
                  console.log('SUCCESS!', response.status, response.text);
                  setStatus('SUCCESS');
                  setMessage('Message sent successfully!');
                  resetForm();
                })
                .catch((error) => {
                  console.log('FAILED...', error);
                  setStatus('FAILED');
                  setMessage('Failed to send the message. Please try again later.');
                })
                .finally(() => {
                  setIsSubmitting(false);
                });
            } else {
              setStatus('FAILED');
              setMessage('reCAPTCHA verification failed. Please try again.');
              setIsSubmitting(false);
            }
          }).catch((error: any) => {
            console.error('reCAPTCHA error:', error);
            setStatus('FAILED');
            setMessage('reCAPTCHA verification failed. Please try again.');
            setIsSubmitting(false);
          });
        });
      } else {
        // Fallback: send without reCAPTCHA if not loaded
        console.warn('reCAPTCHA not loaded, sending without verification');
        const emailData = {
          ...values
        };

        emailjs.send(
          'service_szjyjzd',
          'template_mh9bjm4',
          emailData,
          'NAOIVMA8Iq_XwL4q2'
        )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setStatus('SUCCESS');
            setMessage('Message sent successfully!');
            resetForm();
          })
          .catch((error) => {
            console.log('FAILED...', error);
            setStatus('FAILED');
            setMessage('Failed to send the message. Please try again later.');
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('FAILED');
      setMessage('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-container">
      <h2>Contact Me</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <Field as="textarea" id="message" name="message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </Form>
      </Formik>
      {status && (
        <p
          className={`alert ${status === 'SUCCESS' ? 'alert-success' : 'alert-failed'}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </p>
      )}
      <div className="contact-info">
        <h3>Get in Touch</h3>
        <p>Email: darraghmahns @ gmail.com</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/darraghmahns" target="_blank" rel="noopener noreferrer">darraghmahns</a></p>
      </div>
    </section>
  );
};

export default Contact;