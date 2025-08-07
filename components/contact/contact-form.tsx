import { FormEvent, useRef } from "react";
import classes from "./contact-form.module.css";

export default function ContactForm() {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  function sendMessageHandler(event: FormEvent) {
    event?.preventDefault();
    const enteredName = name.current!.value;
    const enteredEmail = email.current!.value;
    const enteredMessage = message.current!.value;

    if (
      enteredName.trim().length < 4 ||
      enteredMessage.trim().length < 10 ||
      enteredMessage.trim().length > 300 ||
      !enteredEmail.includes("@")
    ) {
      throw new Error("invalid credentials");
    }

    const enteredCredentials = {
      name: enteredName,
      email: enteredEmail,
      message: enteredMessage,
    };

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(enteredCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={email} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={name} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows={5} required ref={message}></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}
