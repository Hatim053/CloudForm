import { useGoogleLogin , GoogleOAuthProvider } from '@react-oauth/google';

function GoogleLogin({name}) {

     const googleResponse = async (res) => {
       try {
        const code = res.code;
        const apiResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`, {
            credentials : "include"
        });
        console.log(apiResponse);
       } catch (error) {
        console.log('something went wrong' , error);
       }
     };

     const loginWithGoogle = useGoogleLogin({
        onSuccess : googleResponse,
        onError : googleResponse,
        flow : 'auth-code'
     });


    return (
    <span className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#2f4d3a] cursor-pointer" onClick={loginWithGoogle} >
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