const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking (or driving) over, we will have your order ready
      within the next 20 minutes.</p>
      ${order
        .map(
          (item) => `
        <div style="padding: 10px; border: 1px solid #cccccc; margin: 5px; display: inline-block;">
          <img src="${item.thumbnail}" alt="${item.name}" />
          <p style="font-size: 20px; margin: 0px;">${item.size} - ${item.name}</p>
          <p style="font-size: 20px; margin: 0px;">${item.price}</p>
        </div>
      `
        )
        .join('')}
      <p>
        Your total is <strong>${total}</strong>, which is due when you pick up
        your pizza${order.length > 1 ? 's' : ''}.
      </p>
    </div>
  `;

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const wait = async (ms = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const requiredFields = ['name', 'email', 'order'];
  const missingFields = [];

  for (const field of requiredFields) {
    if (!body[field].length) {
      if (field === 'order') {
        missingFields.push('you have not ordered any pizzas');
      } else {
        missingFields.push(field);
      }
    }
  }

  if (missingFields.length) {
    if (missingFields.length > 1) {
      missingFields[missingFields.length - 1] = `and ${
        missingFields[missingFields.length - 1]
      }`;
    }

    const combinedFields = missingFields.join(', ');

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops!  You are missing your ${combinedFields}.`,
      }),
    };
  }

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
