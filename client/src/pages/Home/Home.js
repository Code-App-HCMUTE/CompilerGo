import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';
//icon
import { BsCheck2Circle } from 'react-icons/bs';
//component
import Button from '~/components/Button/Button';
import images from '~/asset/images';
//routes
import { ConfigRouter } from '~/config';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <img src={images.backgroundHome} className={cx('backgroundImage')} alt="Background" />
            <div className={cx('container')}>
                <div className={cx('content-left')}>
                    <div className={cx('description')}>
                        <div>
                            <h5>LEARN TO CODE:</h5>
                            <br />
                            <h1 className={cx('text')}>FROM ZERO TO HERO</h1>
                            <p>Easier to get started with coding on Website</p>
                        </div>
                        <ul className={cx('convinient')}>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Learn code very easy
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Convenient environment
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Practice from easy to difficult
                            </li>
                            <li>
                                <BsCheck2Circle className={cx('icon_bx')} />
                                Compiler online use very easy and convenient
                            </li>
                        </ul>
                        <Button className={cx('start')} to={ConfigRouter.compiler}>
                            Started with compiler
                        </Button>
                    </div>
                </div>
                <div className={cx('content-right')}>
                    <div className={cx('card_language_1')}>
                        <div className={cx('card', 'one')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/bf4dca390c5742bda4dbf6344e859eb9.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice C++</h2>
                                <p>
                                    Kh??a h???c l???p tr??nh C++ c?? b???n cho ng?????i m???i b???t ?????u. Kh??a h???c n??y s??? cung c???p nh???ng
                                    ki???n th???c c?? b???n, d??? hi???u nh???t v??? ng??n ng??? l???p tr??nh C++.
                                </p>
                            </div>
                        </div>
                        {/* card_two */}
                        <div className={cx('card', 'two')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/3aa5f5e3e4cb4cb381288840a93c99eb.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice C#</h2>
                                <p>
                                    Kh??a h???c l???p tr??nh C# k??m th???c h??nh, kh??a h???c s??? gi??p b???n l??m quen v???i l???p tr??nh
                                    c??ng nh?? t???o n???n t???ng t?? duy v?? k??? n??ng c?? b???n khi gi???i c??c b??i t???p.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('card_language_2')}>
                        <div className={cx('card', 'one')}>
                            <img
                                src="https://cafedev.vn/wp-content/uploads/2020/03/cafedev_series_learn_java.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice Java</h2>
                                <p>
                                    Kh??a h???c l???p tr??nh Java, kh??a h???c n??y s??? l?? n???n t???ng cho kh??a Java n??ng cao ????? ti???n
                                    t???i Java Web hay l???p tr??nh Android, ...
                                </p>
                            </div>
                        </div>
                        <div className={cx('card', 'two')}>
                            <img
                                src="https://codelearn.io/CodeCamp/CodeCamp/Upload/Course/cf55489ccd434e8c81c61e6fffc9433f.jpg"
                                alt=""
                            />
                            <div className={cx('card_des')}>
                                <h2>Practice Python</h2>
                                <p>
                                    Kh??a h???c l???p tr??nh Python c?? b???n v???i c??c b??i t???p v?? l?? thuy???t d??? hi???u, h???c xong b???n
                                    c?? th??? t??? tin ????? t???i v???i c??c ch??? ????? n??ng cao h??n c???a Python.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
