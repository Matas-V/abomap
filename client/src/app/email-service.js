import { send, init } from "emailjs-com";

const serviceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
const userID = process.env.REACT_APP_EMAIL_USER_ID;

const sendEmail = (content) => {
  init(userID);
  const toSend = {
    from_name: 'apleistu.vietu.zemelapis@gmail.com',
    to_name: content.to_name,
    to_email: content.to_email,
  };
  send(serviceId, templateId, toSend)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default sendEmail;