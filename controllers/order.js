import Order from "../models/Order.js";

export const addOrder = async (req, res) => {
  try {
    const {
      books,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,
    } = req.body;

    if (!books || !shippingAddress || !billingAddress || !paymentMethod) {
      return res.status(400).send("Missing required fields");
    }

    const order = new Order({
      userId: req.user._id,
      books,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,
    });

    await order.save();

    res.json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { order_id } = req.query;
    let query = {};
    if (order_id) {
      query = {
        _id: order_id,
      };
    }
    const orders = await Order.find(query);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
