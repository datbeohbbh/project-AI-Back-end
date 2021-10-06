const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['jpeg','jpg','png','gif','psd','pdf','eps','ai','indd','raw'];
const MAGIC = 1211;
const BASE = 1000000007;
const path_to_upload = path.resolve(__dirname,'../uploads');

exports.hash_code = (str) => {
    let hash_ret = 1;
    for(let i = 0;i < str.length;++i){
        hash_ret = (hash_ret * MAGIC + str.charCodeAt(i)) % BASE;
    }
    return hash_ret;
};

exports.get_name = (str) => {
    const split_list = str.split('.');
    if(split_list.length < 2){
        return null;
    }
    split_list.pop();
    return split_list.join('.');
};

exports.get_extension = (str) => {
    const split_list = str.split('.');
    return (split_list.length < 2 ? null : split_list[split_list.length - 1]);
};

exports.validate_extension = (str) => {
    return (EXTENSIONS.indexOf(str) === -1 ? false : true);
};

exports.get_image_list = () => {
    const images = fs.readdirSync(path_to_upload);
    return images;
};

exports.contains = (image) => {
    const images = fs.readdirSync(path_to_upload);
    return (images.indexOf(image) === -1 ? false : true);
};
