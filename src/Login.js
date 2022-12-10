import React, { useEffect, useState } from "react";
import showPassimg from "./passicon.png";

const Login = () => {
  const initialValues = {
    fn: "",
    em: "",
    ps: "",
  };
  const [data, setData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passShow, setPassShow] = useState(true);

  // value get --------------------

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // value submit -----------
  const handlerSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
  }, [formErrors]);

  // form valid.....
  const validate = (values) => {
    const errors = {};
    const regex = /[0-9a-zA-Z]{6,12}/;
    const regexEmail =
      /^[a-z0-9]{1}[a-z0-9._]{0,}\@[a-z0-9]{1}[a-z0-9-]{1,}\.[a-z]{2}[a-zA-Z.]{0,}$/i;
    if (!values.fn) {
      errors.fn = "Username is required!";
    }
    if (!values.em) {
      errors.em = "Email is required!";
    } else if (!regexEmail.test(values.em)) {
      errors.em = "This is not a valid email format";
    }
    if (!values.ps) {
      errors.ps = "Password is required!";
    } else if (!regex.test(values.ps)) {
      errors.ps = "Should be 6 to 12 Char...";
    }
    return errors;
  };
  // password show ...
  const showPass = () => {
    setPassShow(!passShow);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-10 mx-auto"></div>

          <div className="col-md-4 col-10 mx-auto">
            <h4 className="stu">Login From with Validation</h4>
            <form onSubmit={handlerSubmit}>
              <div className="mb-1">
                <label className="form-label">User Name:</label>
                <input
                  type="text"
                  name="fn"
                  value={data.fn}
                  className="form-control"
                  onChange={inputHandler}
                />
                <span className="text-danger">{formErrors.fn}</span>
              </div>
              <div className="mb-1">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="em"
                  value={data.em}
                  className="form-control"
                  onChange={inputHandler}
                />
                <span className="text-danger">{formErrors.em}</span>
              </div>
              <div className="mb-1">
                <label className="form-label">Password:</label>
                {passShow ? (
                  <input
                    type="password"
                    name="ps"
                    value={data.ps}
                    className="form-control"
                    onChange={inputHandler}
                  />
                ) : (
                  <input
                    type="text"
                    name="ps"
                    value={data.ps}
                    className="form-control"
                    onChange={inputHandler}
                  />
                )}
                <span>
                  <img
                    src={showPassimg}
                    alt={showPassimg}
                    height="30"
                    onClick={showPass}
                  />
                </span>
                <span className="text-danger">{formErrors.ps}</span>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>

          <div className="col-md-4 col-10 mx-auto"></div>
        </div>
      </div>
    </>
  );
};
export default Login;
