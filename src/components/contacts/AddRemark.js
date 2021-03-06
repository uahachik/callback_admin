import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

class AddRemark extends Component {
  constructor(props) {
    super(props);
    this.remarkInput = React.createRef();
  }

  // fetching data from JsonAPI
  async componentDidMount() {
    const { id } = this.props.contact;
    // const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      other: contact.other,
      remark: contact.remark
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // get values from the state
    const { name, phone, email, other } = this.state;
    // get id from parameters
    const { id } = this.props.contact;

    //     // my temporary edit
    // const {showAddRemark} = this.props;    
    // // console.log(showAddRemark);

    const updContact = {
      name,
      phone,
      email,
      other,
      remark: this.remarkInput.current.value
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
  };

  render() {
    const { remark } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="btn w-50" style={remarkStyle}>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <input style={{width: "520px", padding: "5px", marginLeft: "8px", border: "1px solid #ccccccc"}}
                  type="text"                  
                  name="remark"
                  placeholder="Add a remark here"
                  value={remark}
                  defaultValue={remark}
                  ref={this.remarkInput}
                />
                <input
                  //  hidden
                  type="submit"
                  value="Delete"
                  className="fas fa-pencil-alt"
                  style={{float: "right", marginTop: "3px", fontWeight: "normal", color: "crimson"}}
                />
                <input
                  //  hidden
                  type="submit"
                  value="Add Remark"
                  className="fas fa-pencil-alt"
                  style={{float: "right", marginRight: "5px", marginTop: "3px", color: "green"}}
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const remarkStyle = {
  position: "absolute",
  right: "250px",
  top: "-32px",
  // padding: "10"
};

export default AddRemark;
