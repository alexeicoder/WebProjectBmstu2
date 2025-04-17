import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

// components
import Button from "../Button/Button";
import Input from "../Input/Input";
import Form from "../Form/Form";
import Label from "../Label/Label";
import Checkbox from "../Checkbox/Checkbox";
import FormMessageBlock from "../FormMessageBlock/FormMessageBlock";
import FormElement from "../FormElement/FormElement";

// data
import { ROUTES, SERVICE_AUTH } from "../../routes/routes";
import FullScreenLoading from "../FullScreenLoading/FullScreenLoading";

interface ErrorResponse {
    message: string;
}

const formHead = 'Вход в аккаунт';
const formFooter = <span>Нет аккаунта? <a href={ROUTES.SIGN_UP}>Зарегистрируйте</a></span>;

function SigninForm() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const changePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseError = () => {
        setErrorMessage(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                SERVICE_AUTH.LOGIN,
                { login, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                console.log("Response: ", response.data);
                navigate(ROUTES.HOME);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                setErrorMessage(axiosError.response.data?.message || "Произошла ошибка");
            } else if (axiosError.request) {
                setErrorMessage("Сервер недоступен. Попробуйте позднее.");
            } else {
                setErrorMessage("Произошла непредвиденная ошибка");
            }
        } finally {
            setLoading(false);
        }
    };

    // if (loading) {
    //     return <FullScreenLoading isLoading={true} />;
    // }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                head={formHead}
                footer={formFooter}
            >
                {errorMessage && (
                    <FormMessageBlock
                        type={'error'}
                        message={errorMessage}
                        onClose={handleCloseError}
                    />
                )}
                <FormElement>
                    <Label htmlFor={'login'}>Почта</Label>
                    <Input
                        id={'login'}
                        value={login}
                        type={'email'}
                        required={true}
                        autoComplete={'email'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                        placeholder={'Введите вашу почту'}
                    />
                </FormElement>
                <FormElement>
                    <Label htmlFor={'password'}>Пароль</Label>
                    <Input
                        id={'password'}
                        value={password}
                        type={showPassword ? 'text' : 'password'}
                        required={true}
                        autoComplete={'current-password'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        placeholder={'Введите пароль'}
                    />
                </FormElement>
                <FormElement>
                    <Checkbox
                        checkboxId='passwordVisibility'
                        labelText={'Показать пароль'}
                        onClick={changePasswordVisibility}
                        checked={showPassword}
                    />
                </FormElement>
                <FormElement>
                    <Button type="submit" className={'signinFormBtn'}>Войти</Button>
                </FormElement>
            </Form>
            {loading && <FullScreenLoading isLoading={true} />}
        </>
    );
}

export default SigninForm;