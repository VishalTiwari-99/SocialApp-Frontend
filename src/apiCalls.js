import axios from "axios";


export const loginCall = async (userCredential, dispatch) => {
    const URL = process.env.REACT_APP_SERVER_URL;
    dispatch({type:"LOGIN_START"});
    try{
        let res = null;
        await axios.post(URL+"/auth/login", userCredential, {
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