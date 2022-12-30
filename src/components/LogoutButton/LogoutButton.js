import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";

export default function LogoutButton() {

    const cookies = new Cookie();
    const navigate = useNavigate();

    const handleClick = () => {
        // logout
        cookies.remove('reusdereusApiKey')
        cookies.remove('reusdereusUser')
        navigate('/')

    }
    return (
        <>
            <button onClick={handleClick} className="logoutButton">Logout</button>
        </>
    )
}