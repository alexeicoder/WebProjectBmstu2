import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CallToAction from "../CallToAction/CallToAction";
import './Herosection.css';
import logo from '../../assets/logo.svg';
import { ROUTES } from "../../routes/routes";

function Herosection() {

    const navigate = useNavigate();

    const handleSigninClick = () => {
        navigate(ROUTES.SIGN_IN);
    }

    const handleSignupClick = () => {
        navigate(ROUTES.SIGN_UP);
    }

    return (
        <section>
            <div className='heroSectionContainer'>
                <div className='heroSection'>
                    <div className='heading'>
                        Food service
                    </div>
                    <div className='subheading'>
                        Доставка еды. За секунду.
                    </div>
                    {<CallToAction>
                        <Button className='signinBtn'
                            onClick={handleSigninClick}>Войти</Button>
                        <Button className='signupBtn'
                            onClick={handleSignupClick}>Зарегистрироваться</Button>
                    </CallToAction>}
                </div>
                {<img className='logo' src={logo} alt="Logo alt text" />}
            </div>
        </section>
    )
}

export default Herosection;