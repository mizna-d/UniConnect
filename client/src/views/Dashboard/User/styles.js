import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    cards: {
        marginTop: 10
    },
    buttons: {
        marginTop: 15
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 22,
    },
    avatarImg: {
        alignItem: 'center',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    action: {
        marginBottom: 10,
    },
    paper: {
        height: '300px',
        textAlign: 'center',
        marginTop: 0
    },
    button: {
        height: '50px'
    },
    event: {
        height: '100px',
        textAlign: 'center'
    },
    container: {
        marginTop: 100
    }
}));