import React, { Component } from 'react';
import './CommunityPage.css';
import axios from 'axios';
import DirectoryEntry from './DirectoryEntry';
import GiveProps from './GiveProps';
import PropsAppBar from './PropsAppBar';
import './CommunityPage.css';

class UserDirectory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            givingProps: false,
            propsRecipient: '',
        }
        this.goToProfileFromDirectory = this.goToProfileFromDirectory.bind(this)
        this.handleGivePropsBtn = this.handleGivePropsBtn.bind(this)
        this.doneGivingProps = this.doneGivingProps.bind(this)
    }
    // handle users clicking on a directory entry
    goToProfileFromDirectory(e, user) {
        console.log('clicked go to profile from directory, this was the user passed up:', user)
        // use browser router to go to profile page
    }
    // handle users clicking on button to give props in directory
    handleGivePropsBtn(e, recipient) {
        console.log('clicked give props from directory, this was the user passed up:', recipient)
        // show props form
        this.setState({
            givingProps: true,
            propsRecipient: recipient,
        })
    }
    doneGivingProps() {
        this.setState({
            givingProps: false,
            recipient: '',
        })
    }
    componentDidMount() {
        // get all users from db
        axios.get('/api/user')
        .then(res => {
            // upon reply, set the users in state
            this.setState({ 
                users: res.data
            })
        })
    }

    render() {
        // map the users to a list of elements for insertion
        let userList = this.state.users.map((user, i) => {
            return (
                <li  key={ i }  >
                    <DirectoryEntry 
                        user={ user }
                        goToProfile={ this.goToProfileFromDirectory } 
                        giveProps={ this.handleGivePropsBtn }/>
                </li>
            )
        })

        return (
            
            <div className="CommunityPageDiv">
                <div className="CommunityPageNavDiv">
                <PropsAppBar logout={ this.props.logout } />
                </div>
                <h1 className="CommunityPageText">UserDirectory.jsx</h1>
                <div className="UserDirectory">
                
                <ul>
                    {/* insert user list into page */}
                    { userList }
                </ul>
                <GiveProps show={ this.state.givingProps } done={ this.doneGivingProps } updateFormValue={ this.updateForm } sender={ this.props.user } recipient={ this.state.propsRecipient}/>
            </div>
            </div>
           
        )
    }
}


export default UserDirectory