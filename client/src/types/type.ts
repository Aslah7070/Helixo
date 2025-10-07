
export interface DecodedToken {
  _id: string;
  name: string;
  role: string;
  expertId?:string
}

export interface IUser{
    name:string,
    email:string,
    password:string,
    role:"user"|"admin"
    _id:string
}


export interface IProduct {
  _id: string;      
  userId: string;  
  name: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;  
  updatedAt: string; 
  __v: number;
}

export interface AddProduct{
      name: string;
  price: number;
  category: string;
  stock: number;
}

export interface ICategories{
    name:string,
    total:number,
    items:number
}
