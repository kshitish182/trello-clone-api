import brcypt from 'bcrypt';

import Users from '../types/users';
import UserModal from '../Models/user';
import { verifyToken, signToken } from '../utils/jwtToken';

const HASH_SALT_ROUND = 10;

async function getUserByLoginCred(email: string) {
  const result = await UserModal.find({ email: email }).populate('boards', 'title').select('-__v');
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
  return UserModal.insertMany({
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

    const accessToken = signToken(user.email);

    if (!accessToken) {
      return {
        status: 400,
        message: 'There was an error while creating access token',
      };
    }

    return {
      status: 200,
      message: 'Successfully logged in',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        boards: user.boards,
        email: email,
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

function doesUserExist(userEmail: string) {
  return UserModal.find({ email: userEmail })
    .then((data: any) => data)
    .catch((err) => {
      console.log(err);

      return [];
    });
}

export const registerService = async (data: Users) => {
  try {
    const { email, password } = data;
    const user = await doesUserExist(email);

    if (user.length > 0) {
      return {
        status: 403,
        message: 'User already exists - Cannot re-register already existing user',
      };
    }

    const hashedPassword = await hashPassword(password);
    const accessToken = signToken(email);
    const [userData]: any = await registerUser({ ...data, password: hashedPassword });

    if (!accessToken) {
      return {
        status: 400,
        message: 'There was an error while creating access token',
      };
    }

    return {
      status: 201,
      message: 'User has been registered sucessfully',
      data: {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        boards: userData.boards,
        accessToken: accessToken,
      },
    };
  } catch (err) {
    console.log(err);

    return { status: 400, message: `User could'nt be registered - ${err}` };
  }
};

export async function verifyJwtToken(payload: { accessToken: string; email: string }) {
  try {
    const isValid = verifyToken(payload.accessToken);

    if (!isValid) {
      return {
        status: 401,
        message: 'User token expired',
      };
    }

    const [user]: any = await getUserByLoginCred(payload.email);

    if (!user) {
      return {
        status: 404,
        message: "Could'nt find the user",
      };
    }

    return {
      status: 200,
      message: 'User is authorized',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        boards: user.boards,
      },
    };
  } catch (err) {
    return {
      status: 400,
      message: `There was an error - ${err}`,
    };
  }
}
