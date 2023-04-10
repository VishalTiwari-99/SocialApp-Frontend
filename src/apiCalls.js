import axios from "axios";


export const loginCall = async (userCredential, dispatch) => {
    dispatch({type:"LOGIN_START"});
    try{
        let res = null;
        await axios.post("auth/login", userCredential, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            res = response
        });
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}