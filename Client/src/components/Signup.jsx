import { useGoogleLogin , GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch , useSelector } from 'react-redux'; 
import { setLoggedInUser , removeLoggedInUser } from '@/app/UserSlice';

function GoogleLogin({name}) {
    const loggedInUser = useSelector((state) => state?.user?.loggedInUser);
    const dispatch = useDispatch();

     const googleResponse = async (res) => {
       try {
        const code = res.code;
        const apiResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`, {
            credentials : "include"
        });
        const jsonResponse = await apiResponse.json();
       const loggedInUser = jsonResponse?.user;
       dispatch(setLoggedInUser(loggedInUser));
       } catch (error) {
        console.log('something went wrong' , error);
       }
     };

     const loginWithGoogle = useGoogleLogin({
        onSuccess : googleResponse,
        onError : googleResponse,
        flow : 'auth-code'
     });

     const logoutUser = async() => {
     try {
        const apiResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/logout` , {
            credentials : "include"
        });
        if(apiResponse.status === 200) {
            dispatch(removeLoggedInUser());
        }
       

     } catch (error) {
        console.log("something went wrong" , error);
     }
     };
     
     const handleClick = () => {
     if(loggedInUser) {
        logoutUser();
     } else {
        loginWithGoogle();
     }
     };

    return (
    <span className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#2f4d3a] cursor-pointer" onClick={handleClick} >
        {name}
        </span>
    )
};



function Login({name}) {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin name={name} />
        </GoogleOAuthProvider>
    )
}


export default Login;