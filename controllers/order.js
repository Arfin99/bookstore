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

    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          ...(order_id && { _id: order_id }),
        },
      },
      {
        $project: {
          books: 1,
          shippingAddress: 1,
          billingAddress:1,
          paymentMethod:1,
          paymentStatus: 1,
          orderStatus:1,
          totalPrice: 1,
          "user._id": 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ];

    const orders = await Order.aggregate(pipeline);
    if (orders.length > 0) {
      res.send(orders);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
