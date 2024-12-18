"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hashingService_1 = __importDefault(require("../utils/hashingService"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const userRepository_1 = __importDefault(require("../../adapters/repository/userRepository"));
const userUseCase_1 = __importDefault(require("../../useCases/userUseCase"));
const userController_1 = __importDefault(require("../../adapters/controllers/userController"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const cartRepository_1 = require("../../adapters/repository/cartRepository");
const cartUseCase_1 = require("../../useCases/cartUseCase");
const cartController_1 = require("../../adapters/controllers/cartController");
const cartSchema_1 = __importDefault(require("../model/cartSchema"));
// import userAuth from "../middlewares/userAuth"
const whishlistRepository_1 = require("../../adapters/repository/whishlistRepository");
const whishlistSchema_1 = __importDefault(require("../model/whishlistSchema"));
const whishlistUseCase_1 = require("../../useCases/whishlistUseCase");
const whishlistController_1 = require("../../adapters/controllers/whishlistController");
const orderSchema_1 = __importDefault(require("../model/orderSchema"));
const productRepository_1 = require("../../adapters/repository/productRepository");
const productSchema_1 = __importDefault(require("../model/productSchema"));
const userRouter = express_1.default.Router();
const hashingService = new hashingService_1.default();
const JwtService = new jwtService_1.default();
const productRepository = new productRepository_1.ProductRepository(productSchema_1.default);
const cartRepository = new cartRepository_1.CartRepository(cartSchema_1.default);
const cartUseCase = new cartUseCase_1.CartUseCase(cartRepository, productRepository);
const cartController = new cartController_1.CartController(cartUseCase);
const UserRepository = new userRepository_1.default(userSchema_1.default, orderSchema_1.default);
const UserUseCase = new userUseCase_1.default(UserRepository, hashingService, JwtService, cartRepository, productRepository);
const userController = new userController_1.default(UserUseCase);
const wishlistRepository = new whishlistRepository_1.WishlistRepository(whishlistSchema_1.default);
const wishlistUseCase = new whishlistUseCase_1.WishlistUseCase(wishlistRepository);
const wishlistController = new whishlistController_1.WishlistController(wishlistUseCase);
// Routes
userRouter.get("/wishlist/:userId", wishlistController.getWishlist.bind(wishlistController));
userRouter.post("/wishlist/:userId", wishlistController.addToWishlist.bind(wishlistController));
userRouter.delete("/wishlist/:userId/:productId", wishlistController.removeFromWishlist.bind(wishlistController));
userRouter.get("/cart/:userId", cartController.getCart.bind(cartController));
userRouter.post("/cart/:userId", cartController.addToCart.bind(cartController));
userRouter.patch("/productQuantity", cartController.updateQuantity.bind(cartController));
userRouter.delete("/removeFromCart/:cartId/:productId", cartController.removeFromCart.bind(cartController));
userRouter.get("/orders/:userId", userController.getOrders.bind(userController));
userRouter.post("/placeOrder", userController.placeOrder.bind(userController));
userRouter.post("/address/:userId", userController.addAddress.bind(userController));
userRouter.get("/test", (req, res) => {
    res.send({ message: "successfully hosted" });
});
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
exports.default = userRouter;
