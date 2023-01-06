import React from "react"
import { Wallet } from "./Wallet/Wallet"
import { ContactForm } from "./ContactForm/ContactForm"
import { ContactList } from "./ContactList/ContactList"

export const Home = () => (
    <>
        <Wallet />
        <ContactForm />
        <ContactList />
    </>
)