import React from 'react';
import '../CSS/Login.css';
import { TextField, makeStyles, Button, InputAdornment, Input } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserService from '../Services/UserService';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withRouter } from 'react-router';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const service = new UserService();

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}


const user = React.createRef();
const pass = React.createRef();
const save = React.createRef();

const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: true,
            email: "",
            password: "",
            emailError: false,
            passwordError: false,
            emailErrormsg: "",
            passwordErrmsg: "",
            visibility: false,
            key: "user",
            open: false,
            snackMessage: "",
            snackType: "",
            loader:false
        })
    }

    changeVisibility = () => {
        this.setState({ visibility: !this.state.visibility });
    }
    validationCheck = () => {
        this.setState({
            emailError: false,
            emailErrormsg: '',
            passwordError: false,
            passwordErrormsg: '',
        })
        var valid = true;



        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.email)) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Invalid Email address" })
            valid = false;
        }
        if (this.state.email.length == 0) {
            this.setState({ emailError: true })
            this.setState({ emailErrormsg: "Choose Email address" })
            valid = false;
        }


        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrormsg: "Enter a password" })
            valid = false;
        }

        return valid;

    }
    changeState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    changeLogin = () => {
        console.log("im working");
        this.setState({ login: !this.state.login })
    }
    login = () => {
        if (this.validationCheck()) {
            let data = {
                "email": this.state.email,
                "password": this.state.password,
            }
            console.log(data);
            this.handleToggle()
            service.userlogin(data).then((res) => {
                console.log(res);
                localStorage.setItem('Token', res.data.result.accessToken);
                this.setState({ snackType: "success", snackMessage: "Login successful", open: true, setOpen: true })
                this.handleClose()
                this.props.history.push('/home');

            }).catch((error) => {
                console.log(error);
                this.setState({ snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true })
                this.handleClose()
            })
        }
    }

    handleSnackClose = () => {
        this.setState({
            open: false,
            setOpen: false
        })
    }

    componentDidMount(){
        user.current.focus();
    }

    emailKeyPress(e) {
        if (e.charCode === 13) { // enter key pressed
          e.preventDefault();
          pass.current.focus();
        } 
    }

    pswdKeyPress(e) {
        if (e.charCode === 13) { // enter key pressed
          e.preventDefault();
          save.current.focus();
        } 
    }

    saveKeyPress(e) {
        if (e.key === "Enter") { // enter key pressed
          e.preventDefault();
          console.log("Save key Press")
          this.login();
        } 
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ loader:false});
    };

    handleToggle = () => {
      this.setState({ loader: !this.state.loader });
    };

    render() {
        const {classes} = this.props;
        return (

            <>
                <TextField inputRef={user} onKeyPress={this.emailKeyPress} id="outlined-basic" label="Email Id" variant="outlined"
                    onChange={this.changeState} name="email"
                    margin='dense' helperText={this.state.emailErrormsg} error={this.state.emailError}
                />
                <div>
                    <TextField inputRef={pass} onKeyPress={this.pswdKeyPress} id="outlined-basic" label="Password" variant="outlined" name="password"
                        margin='dense' helperText={this.state.passwordErrormsg} fullWidth error={this.state.passwordError}
                        type={this.state.visibility ? 'text' : 'password'}
                        onChange={this.changeState}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} /> : <VisibilityOff className="end" onClick={this.changeVisibility} />}
                            </InputAdornment>,
                        }}

                    />
                </div>
                <Button ref={save} onKeyPress={this.saveKeyPress} variant="contained" color="secondary" onClick={this.login} >Login</Button>
                {this.state.loader ?
        <Backdrop
          className={classes.backdrop}
          open={this.state.loader}
          onClick={this.handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>:<></>}
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <div className="line"></div>OR<div className="line"></div></div>
                <div className="inlineButtons1">
                    <Button variant="contained" className='button1' color="primary">Facebook</Button>
                    <Button variant="contained" className='button2' color="default"> Google</Button>
                </div>
                <div >
                    <Snackbar style={{width:"15%"}} open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackClose}  >
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </>

        )
    }
}
export default withRouter(withStyles(styles)(Login));
