import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");

  const setValueName = (e) => {
    setName(e.target.value);
  };
  const setValueEmail = (e) => {
    setEmail(e.target.value);
  };
  const setValueImageURL = (e) => {
    setImageURL(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setImageURL("");
  };

  const saveContact = () => {
    console.log({ name, email, imageURL });

    ContactsCollection.insert({ name, email, imageURL });

    resetForm();
  };

  return (
    <form action="">
      <div>
        <label htmlFor="name">Name </label>
        <input id="name" type="text" onChange={setValueName} value={name} />
      </div>
      <div>
        <label htmlFor="email">Email </label>
        <input id="email" type="email" onChange={setValueEmail} value={email} />
      </div>
      <div>
        <label htmlFor="imageUrl">Image </label>
        <input
          id="imageUrl"
          type="text"
          onChange={setValueImageURL}
          value={imageURL}
        />
      </div>
      <div>
        <button type="button" onClick={saveContact}>
          Save Contact
        </button>
      </div>
    </form>
  );
};
