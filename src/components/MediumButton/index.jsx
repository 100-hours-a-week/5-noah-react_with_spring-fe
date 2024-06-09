import styles from './styles.module.css';

const MediumButton = ({
                          disable,
                          display,
                          value,
                          onClick,
                      }) => {
    const style = {
        backgroundColor: disable ? '#ACA0EB' : '#7F6AEE',
        display: display,
    };

    return (<button className={styles.button} style={style} disabled={disable}
                    onClick={onClick}>{value}</button>);
};

export default MediumButton;
