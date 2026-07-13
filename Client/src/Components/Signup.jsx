import { useGoogleLogin , GoogleOAuthProvider } from '@react-oauth/google';

function GoogleSignup({name}) {

     const googleResponse = async (res) => {
       try {
        const code = res.code;
        const apiResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth?code=${code}`);
        
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
    <span className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#2f4d3a]" onClick={loginWithGoogle} >
        {name}
        </span>
    )
};



function Signup({name}) {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleSignup name={name} />
        </GoogleOAuthProvider>
    )
}


export default Signup;