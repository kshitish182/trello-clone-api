import brcypt from 'bcrypt';

import Users from '../types/users';
import UserModal from '../Models/user';

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

    return {
      status: 200,
      message: 'Successfully logged in',
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        boards: user.boards,
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

    return { status: 201, message: 'User has been registered sucessfully' };
  } catch (err) {
    console.log(err);

    return { status: 400, message: `User could'nt be registered - ${err}` };
  }
};
