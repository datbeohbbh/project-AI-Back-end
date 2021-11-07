const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['jpeg','jpg','png','gif','psd','pdf','eps','ai','indd','raw'];
const MAGIC = 1211;
const BASE = 1000000007;

const path_to_dir = (dir) => {
    return path.resolve(__dirname,`../${dir}`);
};

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

exports.get_image_list = (dir) => {
    const images = fs.readdirSync(path_to_dir(dir));
    return images;
};

exports.contains = (dir,image) => {
    const images = fs.readdirSync(path_to_dir(dir));
    return (images.indexOf(image) === -1 ? false : true);
};

exports.path_to_image = (dir,image) => {
    return path_to_dir(dir) + `/${image}`;
};

exports.save_file = (dir,image,buffer) => {
    if(!fs.existsSync(path_to_dir(dir))){
        throw new Error(`No such directory name ${dir}`);
    }
    fs.writeFileSync(path.resolve(path_to_dir(dir),image),buffer);
};
