import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)
router.put('/:userId/orders', userController.addProductToOrder)
router.get('/:userId/orders', userController.getOrdersFromUser)
router.get(
  '/:userId/orders/total-price',
  userController.getTotalPriceOfOrdersFromUser,
)

export const userRoutes = router
