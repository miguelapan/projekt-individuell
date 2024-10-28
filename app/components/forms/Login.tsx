import { useAuth } from "@/app/context/contextProvider";
import { useState } from "react";

interface Props {
    modalHandler: () => void;
}

export const Login: React.FC<Props> = ({ modalHandler }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [loginSuccess, setLoginSuccess] = useState<string>('');
    const [isRegister, setIsRegister] = useState<boolean>(false); 

    const { login, user, createProfile } = useAuth();

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        try {
            await login(email, password);
            setLoginSuccess('Successfully logged in');
        } catch (err) {
            setLoginSuccess('Failed to log in');
            console.log(err);
        }
    };

    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmail('');
        setUsername('');
        setPassword('');
        try{
            await createProfile(email, password, username);
            setLoginSuccess('Successfully registered');
        }catch(err){
            console.log(err)
        }
    };

    return (
        <div className="login-modal">
            <form className="login-form" onSubmit={isRegister ? registerHandler : loginHandler}>
                <h2>{isRegister ? "Registrera" : "Logga in"}</h2>
                {isRegister && (
                    <div>
                        <input
                            type="text"
                            placeholder="användarnamn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginSuccess && <p>{loginSuccess}</p>}
                {user && <p>welcome {user.displayName}</p>}
                <button id="login-btn">{isRegister ? "Registrera" : "Logga in"}</button>
                <button className="modal-login-btn" onClick={modalHandler}>CLOSE</button>
                <button type="button" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "Redan medlem? Logga in" : "Inte medlem än?"}
                </button>
            </form>
        </div>
    );
};
