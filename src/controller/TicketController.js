import ticketModel from "../models/TicketModel.js";
const ticketController = {};

ticketController.getAllTicket = async (req, res) => {
  try {
    const tickets = await ticketModel.find();
    return res.status(200).json(tickets);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

ticketController.insertTicket = async (req, res) => {
  try {
    const {
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    } = req.body;
    const newTicket = new ticketModel({
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    });
    await newTicket.save();
    return res.status(200).json({ message: "Ticked saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

ticketController.updateTicket = async (req, res) => {
  try {
    const {
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    } = req.body;
    const updatedTicket = {
      customerId,
      quantity,
      purchaseDate,
      total,
      paymentStatus,
      transactionId,
    };
    await ticketModel.findByIdAndUpdate(req.params.id, updatedTicket, {
      new: true,
    });
    return res.status(200).json({ message: "Ticket updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

ticketController.deleteTicket = async (req, res) => {
  try {
    const ticketFound = await ticketModel.findById(req.params.id);
    await ticketModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Ticket deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ticketController;
