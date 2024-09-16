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



export {fileFormat,transformImage}