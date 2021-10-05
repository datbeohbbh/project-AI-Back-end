const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['jpeg','jpg','png','gif','psd','pdf','eps','ai','indd','raw'];
const MAGIC = 1211;
const BASE = 1000000007;

exports.hash_code = function(str){
    let hash_ret = 1;
    for(let i = 0;i < str.length;++i){
        hash_ret = (hash_ret * MAGIC + str.charCodeAt(i)) % BASE;
    }
    return hash_ret;
};

exports.get_name = function(str){
    const split_list = str.split('.');
    if(split_list.length < 2){
        return null;
    }
    split_list.pop();
    return split_list.join('.');
};

exports.get_extension = function(str){
    const split_list = str.split('.');
    return (split_list.length < 2 ? null : split_list[split_list.length - 1]);
};

exports.validate_extension = function(str){
    return (EXTENSIONS.indexOf(str) === -1 ? false : true);
};

exports.contains = function(image){
    const path_to_upload = path.resolve(__dirname,'../uploads');
    const images = fs.readdirSync(path_to_upload);
    return (images.indexOf(image) === -1 ? false : true);
};
