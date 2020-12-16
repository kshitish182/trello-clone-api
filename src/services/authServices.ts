import dotenv from 'dotenv';
import brcypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

import Users from '../types/users';
import UserModal from '../Models/user';

const HASH_SALT_ROUND = 10;

const createToken = (userInfo: { email: string }) => {
  return jsonwebtoken.sign(userInfo, process.env.SECRET_TOKEN_KEY as string);
};

async function getUserByLoginCred(email: string) {
  const result = await UserModal.find({ email: email }).select('-__v');
  return result;
}

async function authenticateUser(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const result = await brcypt.compare(password, hashedPassword);

    return result;
  } catch (err) {
    console.log(err, 'There was a error while compairing hash value');

    return false;
  }
}

async function hashPassword(password: string) {
  const result = await brcypt.hash(password, HASH_SALT_ROUND);

  return result;
}

async function registerUser(data: Users) {
  await UserModal.insertMany({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });
}

export const loginService = async (data: Pick<Users, 'email' | 'password'>) => {
  const { email, password } = data;
  try {
    const [user] = ((await getUserByLoginCred(email)) as unknown) as Users[];

    if (!user) {
      return {
        status: 404,
        message: "Could'nt find the user",
      };
    }

    const isUserAuthentic = await authenticateUser(password, user.password);

    if (!isUserAuthentic) {
      return {
        status: 403,
        message: 'Login failed - Incorrect user or password',
      };
    }

    const accessToken = createToken({ email: user.email });

    return {
      status: 200,
      message: 'Successfully logged in',
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          boards: user.boards,
        },
        accessToken: accessToken,
      },
    };
  } catch (err) {
    console.log(err, 'there was a error');

    return {
      status: 400,
      message: `Could'nt log in the user - ${err}`,
    };
  }
};

export const registerService = async (data: Users) => {
  try {
    const { email, password } = data;
    const user = await getUserByLoginCred(email);
    console.log(user);

    if (user.length) {
      return {
        status: 403,
        message: 'User already exists - Cannot re-register already existing user',
      };
    }

    const hashedPassword = await hashPassword(password);
    await registerUser({ ...data, password: hashedPassword });
    const accessToken = createToken({ email: data.email });

    return { status: 201, message: 'User has been registered sucessfully', data: { accessToken } };
  } catch (err) {
    console.log(err);

    return { status: 400, message: `User could'nt be registered - ${err}` };
  }
};
