import { UserModel } from '../models/user.model';
import bcryptjs from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { any } from 'joi';
import { csCompileService } from '../services/csCompile.service';
import { cppCompileService } from '../services/cppCompile.service';
import { JavaCompileService } from '../services/javaCompile.service';
import { pythonCompileService } from '../services/pythonCompile.service';
import { PracticeModel } from '../models/practice.model';
import axios from 'axios';
const encodedAccessToken = (userId) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            sub: userId,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '20s',
        },
    );
};

const encodedRefreshToken = (userId) => {
    return JWT.sign(
        {
            iss: 'VuThanhSang',
            sub: userId,
            // iat: new Date().getTime(),
            // exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.JWT_REFRESH,
        {
            expiresIn: '1w',
        },
    );
};
const register = async (data) => {
    try {
        const newUser = await UserModel.signUp(data);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

const login = async (email, password) => {
    try {
        const result = await UserModel.login(email);
        const isCorrectPassword = await isValidPassword(password, result.password);
        if (!isCorrectPassword) return { message: 'incorrect password' };
        return result;
    } catch (error) {}
};
const isValidPassword = async (signInPassword, password) => {
    try {
        return await bcryptjs.compare(signInPassword, password);
    } catch (error) {
        throw new Error(error);
    }
};
const getAllUser = async () => {
    try {
        const result = await UserModel.getAllUser();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};
const submitCode = async (data, fn) => {
    try {
        const input = await PracticeModel.findOneById(data.practiceId);
        const listResult = input.testCase.map(async (item) => {
            let c = null;
            await axios
                .post(`http://${process.env.APP_HOST}:3240/v1/compile/input`, {
                    chooseLanguage: data.language,
                    code: data.code,
                    input: item.input,
                })
                .then((data) => {
                    if (data.data.error) {
                        c = data.data.data.error;
                    } else {
                        c = data.data.data.output;
                    }
                })
                .finally(() => {});
            const temp = c?.replace(/(\r\n|\n|\r)/gm, ',').slice(0, -1);
            if (temp === item.output.toString()) {
                return { success: true };
            } else {
                return { success: false };
            }
        });
        let c = Promise.all(listResult).then((value) => {
            return value;
        });
        c.then(async (dataResult) => {
            const result = await UserModel.submitCode(data, dataResult);
            fn(result);
        });
    } catch (error) {}
};
export const UserService = {
    register,
    isValidPassword,
    encodedAccessToken,
    login,
    getAllUser,
    encodedRefreshToken,
    submitCode,
};
