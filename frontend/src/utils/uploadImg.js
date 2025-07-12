import axiosInstance from "./axiosinstance";


const uploadImg= async(ImageFile)=>{
const formData = new FormData();
formData.append('image', ImageFile);

try{
const response = await axiosInstance.post('/upload-image', formData,{
    headers: {
        'Content-Type' : 'multipart/form-data',
    },
});
return response.data;

}catch(error){
console.error('Error uploading img', error);
throw error; 
}
};

export default uploadImg;

