import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Practice.module.scss';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
//component style
import { Box, Tab, Alert } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';

import * as PracticeService from '~/services/PracticeService';
const cx = classNames.bind(styles);

function Practice() {
    const [value, setValue] = useState('1');
    const [title, setTitle] = useState([]);
    let user = useSelector((state) => state.auth.login?.currentUser);
    useEffect(() => {

        const ApiRequest = async () => {
            if (user.user) {
                const res = await PracticeService.getPracticeUser(user.user._id);
                setTitle(res.data);
                // axios
                //     .get(`http://localhost:3240/v1/practice/getList/${user.user._id}`)
                //     .then(function (response) {
                //         setTitle(response.data.data);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            }
        };
        ApiRequest();
    }, [user]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {!user.user ? (
                <div style={{ fontSize: '30px' }}>
                    <Alert severity="warning">Login Now</Alert>
                </div>
            ) : (
                <div className={cx('practice')}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="if-else" value="1" />
                                <Tab label="Vòng lặp" value="2" />
                                <Tab label="Mảng" value="3" />
                                <Tab label="Sắp xếp" value="4" />
                                <Tab label="Chuỗi" value="5" />
                                <Tab label="struct" value="6" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box>
                                <div>
                                    <Button className={cx('btn-all')}>tất cả</Button>
                                </div>
                                <table className={cx('list-ex')}>
                                    <tr>
                                        <th>Status</th>
                                        <th className={cx('title')}>Title</th>
                                        <th>Solution</th>
                                        <th>Acceptable</th>
                                        <th>Difficulty</th>
                                    </tr>
                                    {title.map((ti) => {
                                        return (
                                            <tr key={ti.practiceId}>
                                                <td>{ti.isCompleted ? 'yes' : 'no'}</td>
                                                <td>
                                                    <Link
                                                        className={cx('btn-ex')}
                                                        to={`/practice/solution/${ti.practiceId}`}
                                                    >
                                                        {ti.title}
                                                    </Link>
                                                </td>
                                                <td>{ti.isCompleted ? 'yes' : 'no'}</td>
                                                <td>50%</td>
                                                <td>{ti.difficult}</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                        <TabPanel value="4">Item Four</TabPanel>
                        <TabPanel value="5">Item Five</TabPanel>
                        <TabPanel value="6">Item Six</TabPanel>
                    </TabContext>

                    <div></div>
                </div>
            )}
        </>
    );
}

export default Practice;
