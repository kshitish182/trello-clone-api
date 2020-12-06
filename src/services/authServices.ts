import brcypt from 'bcrypt';
import Users from '../types/users';
import UserModal from '../Models/user';

const HASH_SALT_ROUND = 10;

async function getUserByLoginCred(email: string) {
  try {
    const result = await UserModal.find({ email: email });
    return result;
  } catch (err) {
    console.log(err, "Could'nt get user");

    return [];
  }
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
  // try {
  //   await UserModal.insertMany({
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //     password: data.password
  //   });

  //   return true
  // } catch(err) {
  //     console.log(err);

  //     return false;
  //   }

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
      return "Could'nt find the user";
    }

    const isUserAuthentic = await authenticateUser(password, user.password);

    if (!isUserAuthentic) {
      return "Could'nt login";
    }

    return 'Login successful';
  } catch (err) {
    console.log(err, 'there was a error');

    return "Could'nt login";
  }
};

export const registerService = async (data: Users) => {
  try {
    const { email, password } = data;
    const user = await getUserByLoginCred(email);

    if (user.length) {
      return 'User already exist';
    }

    const hashedPassword = await hashPassword(password);
    // const result = await registerUser({...data, password: hashedPassword});
    await registerUser({ ...data, password: hashedPassword });

    return 'Users registered successfully';
  } catch (err) {
    console.log(err, "COuld'nt login user");

    return "Users' could'nt be registered";
  }
};
