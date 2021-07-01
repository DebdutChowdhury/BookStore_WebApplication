import React from 'react';
import '../CSS/LoginPart.css';
import LoginImage from '../Assets/loginImg.png';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import UserService from '../Services/UserService';
import Login from '../Pages/Login';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Signupbody from '../Pages/Signupbody';


const service = new UserService();

// function Alert(props) {
//   return <MuiAlert variant="filled" {...props} />;
// }

// const name = React.createRef();
// const email = React.createRef();
// const pass = React.createRef();
// const phone = React.createRef();
// const save = React.createRef();

export default class LoginPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            login: false,
            fullName: "",
            email: "",
            password: "",
            mobile: "",
            fullNameError: false,
            emailError: false,
            passwordError: false,
            mobileError: false,
            fullNameErrormsg: "",
            emailErrormsg: "",
            passwordErrmsg: "",
            mobileErrmsg: "",
            visibility: false,
            open: false,
            snackMessage: "",
            snackType: ""
        })
    }


    // validationCheck = () => {
    //     this.setState({
    //         fullNameError: false,
    //         fullNameErrormsg: '',
    //         emailError: false,
    //         emailErrormsg: '',
    //         passwordError: false,
    //         passwordErrormsg: '',
    //         mobileError: false,
    //         mobileErrormsg: ""
    //     })
    //     var valid = true;
    //     if (this.state.fullName.length == 0) {
    //         this.setState({ fullNameError: true })
    //         this.setState({ fullNameErrormsg: "Enter full name " })
    //         valid = false;
    //     }


    //     let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
    //     let pattern = new RegExp(patter);
    //     if (!pattern.test(this.state.email)) {
    //         this.setState({ emailError: true })
    //         this.setState({ emailErrormsg: "Invalid Email address" })
    //         valid = false;
    //     }
    //     if (this.state.email.length == 0) {
    //         this.setState({ emailError: true })
    //         this.setState({ emailErrormsg: "Choose Email address" })
    //         valid = false;
    //     }

    //     if (this.state.password.length < 8) {
    //         this.setState({ passwordError: true })
    //         this.setState({ passwordErrormsg: "password should be atleast 8 characters" })
    //         valid = false;
    //     }

    //     if (this.state.password.length == 0) {
    //         this.setState({ passwordError: true })
    //         this.setState({ passwordErrormsg: "Enter a password" })
    //         valid = false;
    //     }

    //     if (this.state.mobile.length == 0) {
    //         this.setState({ mobileError: true })
    //         this.setState({ mobileErrormsg: "Enter a mobile" })
    //         valid = false;
    //     }

    //     return valid;

    // }

    // changeState = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     this.setState({ [name]: value })
    // }


    changetoSignup = () => {
        this.setState({ login: true })
    }
    changetologin = () => {
        this.setState({ login: false })
    }
    // signUp = (e) => {
    //     e.preventDefault();
    //     if (this.validationCheck()) {
    //         let data = {
    //             "fullName": this.state.fullName,
    //             "email": this.state.email,
    //             "password": this.state.password,
    //             "phone": this.state.mobile
    //         }
    //         service.userRegistration(data).then((result) => {
    //             console.log(result);
    //             this.setState({ snackType: "success", snackMessage: "Login successful", open: true, setOpen: true })
    //         }).catch((error) => {
    //             console.log(error);
    //             this.setState({ snackType: "error", snackMessage: "Login Failed", open: true, setOpen: true })
    //         })
    //     }
    // }

    // changeVisibility = () => {
    //     this.setState({ visibility: !this.state.visibility });
    // }

    // handleSnackClose = () => {
    //     this.setState({
    //         open: false,
    //         setOpen: false
    //     })
    // }

    // componentDidMount(){
    //     name.current.focus();
    // }

    // nameKeyPress = (e) => {
    //     e.preventDefault()
    //     if(e.key === "Enter"){
    //         email.current.focus();
    //     }
    // }
    // emailKeyPress = (e) => {
    //     e.preventDefault()
    //     if(e.key === "Enter"){
    //         pass.current.focus();
    //     }
    // }

    // phoneKeyPress = (e) => {
    //     e.preventDefault()
    //     if(e.key === "Enter"){
    //         save.current.focus();
    //     }
    // }

    // saveKeyPress = (e) => {
    //     e.preventDefault()
    //     if(e.key === "Enter"){
    //         this.signUp();
    //     }
    // }


    render() {
        return (<>
            <div className="imagebody">
                <img src={LoginImage} style={{ borderRadius: '50%', width: '215px', height: '215px' }} alt="" />
                <div className="online"> ONLINE BOOK SHOPPING</div></div>
            <div className="form">
                <div className="inlinelinks">
                    <div onClick={this.changetoSignup} className={this.state.login === false ? "links" : "links2"}>Login</div>
                    <div onClick={this.changetologin} className={this.state.login === true ? "links" : "links2"}>Signup</div>
                </div>
                {this.state.login ? <Login /> : <Signupbody/>}
                {/* <TextField
                    id="outlined-basic"
                    label="Fullname"
                    className="textField"
                    inputRef={name}
                    onKeyPress={this.nameKeyPress}
                    variant="outlined"
                    margin='dense'
                    name="fullName"
                    error={this.state.fullNameError}
                    helperText={this.state.fullNameErrormsg}
                    onChange={(e) => this.changeState(e)}
                /> <TextField
                        id="outlined-basic"
                        label="Email "
                        className="textField"
                        inputRef={email}
                        onKeyPress={this.emailKeyPress}
                        variant="outlined"
                        margin='dense'
                        name="email"
                        onChange={(e) => this.changeState(e)}
                        error={this.state.emailError}
                        helperText={this.state.emailErrormsg}
                    /> <TextField
                        id="outlined-basic"
                        label="Password"
                        className="textField"
                        inputRef={pass}
                        onKeyPress={this.passKeyPress}
                        variant="outlined"
                        margin='dense'
                        name="password"
                        type={this.state.visibility ? 'text' : 'password'}
                        onChange={(e) => this.changeState(e)}
                        error={this.state.passwordError}
                        helperText={this.state.passwordErrormsg}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} /> : <VisibilityOff className="end" onClick={this.changeVisibility} />}
                            </InputAdornment>,
                        }}
                    /> <TextField
                        id="outlined-basic"
                        label="mobile"
                        variant="outlined"
                        margin='dense'
                        className="textField"
                        inputRef={phone}
                        onKeyPress={this.phoneKeyPress}
                        name="mobile"
                        onChange={(e) => this.changeState(e)}
                        error={this.state.mobileError}
                        helperText={this.state.mobileErrormsg}
                    />
                    <Button
                        variant="contained"
                        ref={save}
                        onKeyPress={this.saveKeyPress}
                        onClick={(e) => this.signUp(e)}
                    >
                        Signup
                    </Button> */}
                {/* </>} */}

            </div>
            {/* <div >
                    <Snackbar style={{width:"15%"}} open={this.state.open} autoHideDuration={3000} onClose={this.handleSnackClose}  >
                        <Alert severity={this.state.snackType}>
                            {this.state.snackMessage}
                        </Alert>
                    </Snackbar>
                </div> */}

        </>)
    }
}