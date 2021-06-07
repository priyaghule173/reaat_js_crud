import react, {Component} from "react";

class Myform extends Component{
    state ={
        form: {first_name: "", last_name:"", email:"", isEdit:false },
        btnName: "Save",
        btnClass: "ui primary button submit-button"
    };

    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            // console.log("update");
            this.setState({
                form: { ...this.props.customer,isEdit: true},
                btnName: "Update",
                btnClass: "ui orange button submit-button"
            })
        }
    }
    handleChange = event => {
        const { name,value }= event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({form});
    }
    onFormSubmit = (event) =>{
        event.preventDefault();

        //form validation
        if(this.formValidation()){
            // console.log("ready to create");
            //send daata to app
            this.props.onFormSubmit(this.state.form);
        }
        //change button to save
        this.setState({
            btnName:"Save",
            btnClass: "ui primary button submit-button"
        })
        //clear form fields
        this.clearFormFields();
    };
    formValidation =() =>{
        //firstname
        if(document.getElementsByName("first_name")[0].value === ""){
            alert("Enter First name");
            return false;
        }
        //lastnam
        if(document.getElementsByName("last_name")[0].value === ""){
            alert("Enter last name");
            return false;
        }
         //mail
        if(document.getElementsByName("email")[0].value === ""){
            alert("Enter email name");
            return false;
        }
        return true;
    };
    clearFormFields=() =>{
        //change form state
        this.setState({
            form: {first_name: "", last_name:"", email:"", isEdit:false }
        });
        //clear form fields
        document.querySelector(".form").reset();
    }
    render(){
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>first Name</label>
                        <input type="text" name="first_name" placeholder="first name" onChange={this.handleChange} value={this.state.form.first_name}></input>
                    </div>
                    <div className="four wide field">
                        <label>last Name</label>
                        <input type="text" name="last_name" placeholder="last name"  onChange={this.handleChange} value={this.state.form.last_name}></input>
                    </div>
                    <div className="four wide field">
                        <label>E-mail</label>
                        <input type="text" name="email" placeholder="joe@gmail.com"  onChange={this.handleChange} value={this.state.form.email}></input>
                    </div>
                    <div className="four wide field">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Myform;