import { db } from "../firebase/config";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "christopherscontactrescat@gmail.com",
    pass: "jjWbw456!",
  },
});

export const addCateringContact = async (_: null, args: any) => {
  // add to database
  const ref = db.collection("CateringContact");
  const res = await ref.add({
    ...args,
    archived: false,
  });

  const mailOptions = {
    from: "Contact <christopherscontactrescat@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
    to: "christopherscontactrescat@gmail.com",
    subject: "A new contact was made to catering", // email subject
    html: `<p style="font-size: 16px;">${
      args.firstName + " " + args.lastName
    } just contacted catering with the following information: </p>
		    <br />
		    <p>Event Date: ${args.dateOfEvent}</p>
		    <p>Number of Guests: ${args.guests}</p>
		    <p>Sender Email: ${args.email}</p>
		    <p>Sender Phone: ${args.phone}</p>
			<p>Method of Contact: ${args.methodOfContact}</p>
			<p>Date of Event: ${args.dateOfEvent}</p>
			<p>Guests: ${args.guests}</p>
			<p>Sender Information: ${args.info}</p>
		`, // email content in HTML
  };

  await transporter.sendMail(mailOptions);

  // get and return
  const data = await ref.doc(res.id).get();
  return { ...data.data(), id: ref.id };
};

export const addResContact = async (_: null, args: any) => {
  // add to database
  const ref = db.collection("ResContact");
  const res = await ref.add({
    ...args,
    archived: false,
  });

  const mailOptions = {
    from: "Contact <christopherscontactrescat@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
    to: "christopherscontactrescat@gmail.com",
    subject: "A new contact was made to the restaurant", // email subject
    html: `<p style="font-size: 16px;">${
      args.firstName + " " + args.lastName
    } just contacted the restaurant with the following message: </p>
		    <br />
			<p>Sender Email: ${args.email}</p>
		    <p>Subject: ${args.subject}</p>
		    <p>Message: ${args.message}</p>
		`, // email content in HTML
  };

  await transporter.sendMail(mailOptions);

  // get and return
  const data = await ref.doc(res.id).get();
  return { ...data.data(), id: ref.id };
};

export const addService = async (_: null, args: any) => {
  // add to database
  const ref = db.collection("Service");
  const res = await ref.add({
    ...args,
  });

  // get and return
  const data = await ref.doc(res.id).get();
  return { ...data.data(), id: ref.id };
};

export const archiveCateringContact = async (_: null, args: { id: string }) => {
  // update
  const ref = db.collection("CateringContact").doc(args.id);
  await ref.update({
    archived: true,
  });

  // get and return
  const data = await ref.get();
  return { ...data.data(), id: ref.id };
};

export const archiveResContact = async (_: null, args: { id: string }) => {
  // update
  const ref = db.collection("ResContact").doc(args.id);
  await ref.update({
    archived: true,
  });

  // get and return
  const data = await ref.get();
  return { ...data.data(), id: ref.id };
};

export const removeService = async (_: null, args: { id: string }) => {
  const ref = db.collection("Service").doc(args.id);
  await ref.delete();
  return args.id;
};
