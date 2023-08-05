import express from "express";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const neworder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      shippingAddress: req.body.shippingAddress,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await neworder.save();
    res.status(201).send({ message: "new order created", order });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const foundOrder = await Order.find({ user: req.user._id });
    if (foundOrder) {
      res.send(foundOrder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const foundOrder = await Order.findById(req.params.id);
    if (foundOrder) {
      res.send(foundOrder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const foundorder = await Order.findById(req.params.id);
    if (foundorder) {
      foundorder.isPaid = true;
      foundorder.paidAt = Date.now();
      foundorder.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await foundorder.save();
      res.send({ message: "Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

export default orderRouter;
