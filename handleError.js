const handleError = (err) => {
    if(err){
        console.log(err);
    }
}

const handleErrorRes = (err, res) => {
    if(err){
        console.log(err);
        res.end();
        return true;
    }
    else{
        return false;
    }
}

module.exports =  {handleError, handleErrorRes};