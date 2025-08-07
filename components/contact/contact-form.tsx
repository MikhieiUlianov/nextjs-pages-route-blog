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

    fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(enteredCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <section className={classes.cotact}>
      <h1>How can i help you?</h1>
      <form onSubmit={sendMessageHandler} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={email} type="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={name} type="text" id="name" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea ref={message} id="message" rows={5} required />
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
    </section>
  );
}
