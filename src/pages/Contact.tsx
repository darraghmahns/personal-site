// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../assets/styles/Contact.css';
// Import Formik and Yup for enhanced form handling
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Note: Formik has its own TypeScript support, so you don't need @types/formik
import * as Yup from 'yup';
// Optionally, import reCAPTCHA component
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init('NAOIVMA8Iq_XwL4q2'); // Replace with your actual public key
  }, []);

  const handleRecaptcha = (value: string | null) => {
    setRecaptchaValue(value);
  };

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

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    if (!recaptchaValue) {
      setStatus('FAILED');
      setMessage('Please complete the CAPTCHA.');
      return;
    }

    emailjs.send('service_szjyjzd', 'template_mh9bjm4', values, 'NAOIVMA8Iq_XwL4q2')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('SUCCESS');
        setMessage('Message sent successfully!');
        resetForm();
        setRecaptchaValue(null);
      }, (error) => {
        console.log('FAILED...', error);
        setStatus('FAILED');
        setMessage('Failed to send the message. Please try again later.');
      });
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
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6LebgkkqAAAAAP2R4gmEUWW1hE9GFClyIYVDLP-a"
              onChange={handleRecaptcha}
            />
          </div>
          <button type="submit">Send</button>
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