import moment from "moment";

const fileFormat=(url="")=>{
    const fileExtension=url.split('.').pop();

    if(fileExtension==='jpg' || fileExtension==='jpeg' || fileExtension==='png' || fileExtension==='gif'){
        return 'image';
    }
    if(fileExtension==='mp4' || fileExtension==='ogg' || fileExtension==='webm'){
        return 'video';
    }
    if(fileExtension==='mp3' || fileExtension==='wav' ){
        return 'audio';
    }

        return 'file';
    
};


const transformImage=(url="",width=100)=>url;
const getLast7Days=()=>{
   const currentDate=moment();
   const Last7Days =[];
   for(let i=0;i<7;i++){
       Last7Days.unshift(currentDate.format('dddd'));
       currentDate.subtract(1,'days');
   }
   return Last7Days;
};



export {fileFormat,transformImage,getLast7Days}