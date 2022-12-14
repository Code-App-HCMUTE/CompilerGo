//library
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//icon
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { ConfigRouter } from '~/config';
import Button from '~/components/Button';
import { loginUser, loginGoogleUser } from '~/redux/apiRequest';
import { Alert, checkboxClasses, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';

const cx = classNames.bind(styles);
function Login() {
    const { enqueueSnackbar } = useSnackbar();

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginCheck = useSelector((state) => state.auth.login);
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            email: userName,
            password: password,
        };
        console.log(newUser);

        loginUser(newUser, dispatch, navigate, enqueueSnackbar);

        setOpen(true);
    };
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleLoginWithGoogle = async (e) => {
        e.preventDefault();
        window.open(`${process.env.REACT_APP_BASE_URL}/users/auth/google/`, '_self');
        loginGoogleUser(dispatch);
    };
    const handleLoginWithFacebook = () => {};
    useEffect(() => {}, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-login')}>
                <img src={images.connect} alt="logo"></img>
            </div>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h1>Login</h1>
                    <form className={cx('form')}>
                        <div>
                            <FaUser />
                            <input
                                placeholder="T??i kho???n ho???c email"
                                name="user"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <FaLock />
                            <input
                                type="password"
                                placeholder="M???t kh???u"
                                name="pass"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nh??? m???t kh???u</span>
                        </div>
                    </div>
                    <Button className={cx('btn-login')} onClick={handleLogin}>
                        ????ng nh???p
                    </Button>
                    <div className={cx('con-signup')}>
                        <span>N???u ch??a c?? t??i kho???n?</span>
                        <Link to={ConfigRouter.signup} className={cx('signup')}>
                            ????ng k??
                        </Link>
                    </div>
                    {/* <Snackbar
                        open={open}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        {!loginCheck.error ? (
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                login a success message!
                            </Alert>
                        ) : (
                            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                User name or password not exits!
                            </Alert>
                        )}
                    </Snackbar> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
