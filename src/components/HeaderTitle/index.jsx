import styles from './styles.module.css';
import {Link} from 'react-router-dom';

const HeaderTitle = () => {
    return (<>
        <Link to={'/posts'} className={styles.titleText}>아무 말 대잔치</Link>
    </>);
};

export default HeaderTitle;
