import styles from './styles.module.css';

// 나중에 onChange 로직 추가
const SmallButton = ({
                         disable,
                         display,
                         value,
                         onClick,
                     }) => {
    const style = {
        display: display,
    };

    return (<button className={styles.button} style={style} disabled={disable} onClick={onClick}>{value}</button>);
};

export default SmallButton;
