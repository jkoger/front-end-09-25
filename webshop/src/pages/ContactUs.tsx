import { type FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current === null) {
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label> <br />
      <input type="text" name="from_name" /> <br />
      <label>Email</label> <br />
      <input type="email" name="from_email" />
      <br />
      <label>Message</label> <br />
      <textarea name="message" /> <br />
      <button type="submit">Send</button> <br />
    </form>
  );
};
