export default (file)=> {
    let fileValidate = ['.xlsx', '.csv']
    if (file === '' || !file) {
        return 'Require files'
    } else if (fileValidate.indexOf(file.name.substring(file.name.lastIndexOf('.'))) < 0) {
        return 'Please choose  correct file!!'
    } else return 0;
}