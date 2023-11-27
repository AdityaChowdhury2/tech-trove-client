import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';

import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const axiosPublic = useAxiosPublic();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			const loggedUser = currentUser?.email;
			console.log('loggedUser', loggedUser);

			if (loggedUser) {
				axiosPublic
					.post('/api/v1/create-token', { email: loggedUser })
					.then(res => {
						setUser(currentUser);
						setLoading(false);
						console.log(res.data);
					});
			} else {
				axiosPublic
					.post('/api/v1/delete-token')
					.then(res => {
						console.log(res.data);
						setLoading(false);
						setUser(currentUser);
					})
					.catch(err => {
						console.log(err);
					});
			}
		});
		return () => unSubscribe();
	}, []);

	const googleProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUser = (name, photo = '') => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	const login = ({ email, password }) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const authInfo = {
		googleSignIn,
		user,
		loading,
		createUser,
		login,
		logout,
		updateUser,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export default AuthProvider;
