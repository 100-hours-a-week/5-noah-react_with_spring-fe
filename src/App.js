import styles from './App.module.css';
import {Route, Routes} from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import PostsPage from './pages/Posts';
import PostPage from './pages/Post';
import CreatePostPage from './pages/CreatePost';
import UpdatePostPage from './pages/UpdatePost';
import UpdateUserProfilePage from './pages/UpdateUserProfile';
import UpdateUserPasswordPage from './pages/UpdateUserPassword';
import withNoAuthAccess from './hoc/withNoAuthAccess';
import withAuthAccess from './hoc/withAuthAccess';

const SignInPageWithNoAuthAccess = withNoAuthAccess(SignInPage);
const SignUpPageWithNoAuthAccess = withNoAuthAccess(SignUpPage);
const PostsPageWithAuthAccess = withAuthAccess(PostsPage, true);
const PostPageWithAuthAccess = withAuthAccess(PostPage, true);
const CreatePostPageWithAuthAccess = withAuthAccess(CreatePostPage, false);
const UpdatePostPageWithAuthAccess = withAuthAccess(UpdatePostPage, false);
const UpdateUserProfilePageWithAuthAccess = withAuthAccess(UpdateUserProfilePage, false);
const UpdateUserPasswordPageWithAuthAccess = withAuthAccess(UpdateUserPasswordPage, false);

function App() {
    return (<div className={styles.App}>
        <Routes>
            <Route path={'/'} element={<SignInPageWithNoAuthAccess/>}/>
            <Route path={'/sign-in'} element={<SignInPageWithNoAuthAccess/>}/>
            <Route path={'/sign-up'} element={<SignUpPageWithNoAuthAccess/>}/>
            <Route path={'/posts'} element={<PostsPageWithAuthAccess/>}/>
            <Route path={'/posts/:id'} element={<PostPageWithAuthAccess/>}/>
            <Route path={'/posts/create'} element={<CreatePostPageWithAuthAccess/>}/>
            <Route path={'/posts/:postId/update'} element={<UpdatePostPageWithAuthAccess/>}/>
            <Route path={'/users/update/profile'} element={<UpdateUserProfilePageWithAuthAccess/>}/>
            <Route path={'/users/update/password'} element={<UpdateUserPasswordPageWithAuthAccess/>}/>
        </Routes>
    </div>);
}

export default App;
