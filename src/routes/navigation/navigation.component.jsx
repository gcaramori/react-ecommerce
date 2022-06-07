import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.scss';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const signOutHandler = async () => {
        const response = await signOutUser();
        
        setCurrentUser(null);
    }
    
    return(
        <Fragment>
            <div className="navigation">
                <Link className="nav-link" to='/'>
                    <CrwnLogo className='logo-container'></CrwnLogo>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation