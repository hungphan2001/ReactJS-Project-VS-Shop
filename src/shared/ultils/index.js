import { BASE_URL } from "../constants/app";
export const getImageProduct = (imageName)=>{
    if(imageName!==undefined)
    {
        return `${BASE_URL}/assets/uploads/products/${imageName}`;
    }
    return `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F4141669-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-vector-illustration&psig=AOvVaw3Q_aEk_TRMg1y5jgBzvhvr&ust=1686316507754000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMD7rNXgs_8CFQAAAAAdAAAAABAE`
    
}

export const formatPrice = new Intl.NumberFormat("vi-VN",{
    style:'currency',
    currency:'VND'
})
