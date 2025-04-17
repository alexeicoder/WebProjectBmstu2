import { useState, FormEvent } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Form from "../Form/Form";
import Label from "../Label/Label";
import { ROUTES, SERVICE_AUTH } from "../../routes/routes";
import FormMessageBlock from "../FormMessageBlock/FormMessageBlock";
import FormElement from "../FormElement/FormElement";
import axios, { AxiosError } from "axios";
import FullScreenLoading from "../FullScreenLoading/FullScreenLoading";
import { useNavigate } from "react-router-dom";

const formHead = 'Регистрация';
const formFooter = <span>Уже есть аккаунт? <a href={ROUTES.SIGN_IN}>Войти</a></span>;

interface ErrorResponse {
    message: string;
}

function SignupForm() {

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null) // Для отображения ошибок
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(SERVICE_AUTH.REGISTER,
                { login, password, name },
                { withCredentials: true });
            if (response.status === 200) {
                console.log("Response: ", response.data);
                navigate(ROUTES.HOME);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                setErrorMessage(axiosError.response.data?.message || "Произошла ошибка");
            }
            else if (axiosError.request) {
                // Запрос был сделан, но ответ не был получен (например, сервер недоступен)
                setErrorMessage("Сервер недоступен. Попробуйте позднее.")
                // console.error('Сервер недоступен. Попробуйте позднее:', error.request);
            }
        }
        finally {
            setLoading(false);
        }
    };

    const handleCloseError = () => {
        setErrorMessage(null)
    };

    return (
        <>
            {/* {error && console.warn(error)} */}
            <Form onSubmit={handleSubmit}
                head={formHead}
                footer={formFooter}>
                {
                    errorMessage
                    &&
                    <FormMessageBlock
                        type={'error'}
                        message={errorMessage}
                        onClose={handleCloseError}
                    />
                }
                <FormElement>
                    <Label htmlFor={'name'}>Имя</Label>
                    <Input
                        id={'name'}
                        type={'text'}
                        value={name}
                        required={true}
                        autoComplete={'given-name'}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={'Ваше имя'}
                    />
                </FormElement>
                <FormElement>
                    <Label htmlFor={'email'}>Адрес почты</Label>
                    <Input
                        id={'email'}
                        type={'email'}
                        value={login}
                        required={true}
                        autoComplete={'email'}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder={'Адрес почты'}
                    />
                </FormElement>
                <FormElement>
                    <Label htmlFor={'password'}>Пароль</Label>
                    <Input
                        id={'password'}
                        type={'password'}
                        autoComplete={'new-password'}
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                    />
                </FormElement>
                <FormElement>
                    <Button
                        type={'submit'} className={'signupFormBtn'}
                    >Зарегистрироваться</Button>
                </FormElement>
            </Form>
            {loading && <FullScreenLoading isLoading={true} />}
        </>
    )

}

export default SignupForm;
