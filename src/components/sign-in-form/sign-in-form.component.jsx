import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import './sign-in-form.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        }
        catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password!');
                    break;
                case 'auth/user-not-found':
                    alert('User not found!');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const signUpWithGoogle = async () => {
        try {
            await signInWithGooglePopup(email, password);
        }
        catch(error) {
            console.log('Erro: ', error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});  
    }
 
    return(
        <div className='sign-in-container'> 
            <h2>Already have an account?</h2>
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type="button" buttonType={'google'} onClick={signUpWithGoogle}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    )    
}

export default SignInForm