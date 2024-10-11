import { storeUserSession, clearUserSession, refreshAccessToken } from '../config/auth';

const logout = async () => {
	await clearUserSession();
};

const SignoutScreen = ({ navigation }) => {
	logout();
	navigation.replace('Login');
	return (<></>);
};

export default SignoutScreen