import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import Button from '../button/button.component';
import './sign-up-form.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('As senhas não estão iguais!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }
        catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email is already in use!');
            }
            else {
                console.log('user creation encoutered an error: ', error);
            }    
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});  
    }
 
    return(
        <div className='sign-up-container'> 
            <h2>Don't have account yet?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display name"
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    required 
                />

                <FormInput 
                    label="Email"
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    required
                />

                <FormInput 
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    required
                />

                <FormInput
                    label="Confirm password"
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    required
                />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )    
}

export default SignUpForm