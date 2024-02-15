const contactModel = require("../model/contactModel");
const nodemail = require("nodemailer");
const createContactController = async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, email, phone, address } = req.body;

    const reviews = await new contactModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
    }).save();

    var sender = nodemail.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    var composemail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "reavel booking",
      html: `
      <h1 style="color : blue;"><center>welcome to halaash travel agency</center></h1>
      <p  style="text-align : center; font-size: bold; color:red;">firstname: ${firstname}</p>
      <p>lastname: ${lastname}</p>
      <p>address: ${address}</p>
      <h3>thanks for contacted us</h3>
      `,
    };
    sender.sendMail(composemail, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sended" + info.response);
      }
    });

    res.status(200).json({
      success: true,
      message: "review updated successfully",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Review",
      error,
    });
  }
};

const getContactController = async (req, res) => {
  try {
    const contact = await contactModel.find({});
    res.status(200).json({
      success: true,
      message: "contact fetched successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In Review",
      error,
    });
  }
};

const updateControllerContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, address } = req.body;

    // const updated = {
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    //   phone: phone,
    //   address: address,
    // };

    const updated = await contactModel.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phone,
        address,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In updated contact",
      error,
    });
  }
};

// const updateContactController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { firstname, lastname, email, phone, address } = req.body;

//     const updated = {
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       phone: phone,
//       address: address,
//     };

//     await contactModel.findByIdAndUpdate(id, updated, { new: true });
//     res.status(200).json({
//       success: true,
//       message: "updated successfully",
//       updated,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error In updated contact",
//       error,
//     });
//   }
// };
const getOneController = async (req, res) => {
  const { id } = req.params; // Assuming ID is passed as a route parameter

  try {
    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getOneContactController = async (req, res) => {
//   const { id } = req.params; // Assuming ID is passed as a route parameter

//   try {
//     const contact = await contactModel.findById(id);

//     if (!contact) {
//       return res.status(404).json({ message: "Contact not found" });
//     }

//     res.status(200).json(contact);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const deleteContactController = async (req, res) => {
  try {
    const { id } = req.params;
    await contactModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "contact deleted successfully",
      isDelete: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error In delelte contact",
      error,
    });
  }
};

module.exports = {
  createContactController,
  getContactController,
  // getOneContactController,
  getOneController,
  // updateContactController,
  updateControllerContact,
  deleteContactController,
};
