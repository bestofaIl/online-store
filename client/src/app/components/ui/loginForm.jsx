import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuthError, logIn } from "../../store/users";

const LoginForm = () => {
    // const dispatch = useDispatch();
    // const loginError = useSelector(getAuthError());
    // const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required to fill"
            }
        },
        password: {
            isRequired: {
                message: "Password is required to fill"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        // const redirect = history?.location?.state?.from?.pathname
        //     ? history.location.state.from.pathname
        //     : "/";
        // dispatch(logIn({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Stay in
            </CheckBoxField>
            {/* {loginError && <p className="text-danger">{loginError}</p>} */}

            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
