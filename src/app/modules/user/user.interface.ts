import { Model } from 'mongoose'

interface IOrders {
  productName: string
  price: number
  quantity: number
}

interface IUser {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?: IOrders[]
}

interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<IUser | null>
}

export { IUser, IOrders, IUserModel }
