import { BASE_URL } from "../constants/app";
export const getImageProduct = (imageName)=>{
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}

export const formatPrice = new Intl.NumberFormat("vi-VN",{
    style:'currency',
    currency:'VND'
})
