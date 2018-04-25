import React from 'react';

export default class UsersTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	name: null,
      users: [],
      loading: true,
      table_data: [],
      filter_search: '',
	  }
  }

  componentDidMount() {
      //bootbox Defaults
      bootbox.setDefaults({
  		  locale: "en",
  		  show: true,
  		  backdrop: true,
  		  closeButton: true,
  		  animate: true,
  		  className: "my-modal"
		  });

      this.getUserData();
  }

  getUserData(){

    let that = this;
      $.ajax({
            type: "GET",
            url: '/get-users',
            data: {},
            success: function (data) {
               if(data != undefined){
                    let items = JSON.parse(data);
                    that.setState({ users: items, table_data: items, loading: false });
                  }
            },
            error: function (data, textStatus, errorThrown) {
                console.log("Error");
            },
        });  
  }

  updateAdminStatus(event){

    event.preventDefault();
    let that = this,
    user_id = parseInt(event.target.id);  console.log(user_id);
    let admin_status = this.state.users[user_id].admin; console.log(admin_status);
    
  	bootbox.confirm({
				    message: "Are you sure you want to "+( admin_status ? "disable" : "enable" )+ " " + this.state.users[event.target.id].name + "'s admin status?",
				    backdrop: true,
				    buttons: {
				        confirm: {
				            label: 'Yes',
				            className: 'btn-success'
				        },
				        cancel: {
				            label: 'No',
				            className: 'btn-danger'
				        }
				    },
				    callback: function (result) {
				        
                if( result ){
                    console.log('Changing admin status:' + result);
                    var user = that.state.users[user_id];
                    user.admin = !user.admin;

                    var users = that.state.users;
                    users[user_id] = user;

                    that.setState({loading:true});

                    $.ajax({
                        type: "GET",
                        url: 'update-user',
                        data: { user_id: user.id, admin_status: user.admin  },
                        success: function (data) {
                          if( data == "User updated."){
                              console.log( data, "state");
                              that.setState({users: users, table_data:users, loading:false});                              
                          }
                        },
                        error: function (data, textStatus, errorThrown) {
                        },
                    });

                }
				    }
			});
  }

  filter(event){

    if( ! this.state.users || this.state.loading ){
      return;
    }

    var users = this.state.users;
    users =  users.filter(function(user) {
      //console.log( user.name.indexOf( event.target.value ), user );
      if ( user.name.toLowerCase().indexOf( event.target.value.toLowerCase() ) != -1 ){
        return user;
      }
    });

    this.setState({table_data:users});
  }

  date_diff(date){
    // Set the unit values in milliseconds.  
    var msecPerMinute = 1000 * 60;  
    var msecPerHour = msecPerMinute * 60;  
    var msecPerDay = msecPerHour * 24;  

    var date = new Date(date);  
    var dateMsec = Date.now();

    // Get the difference in milliseconds.  
    var interval = date.getTime() - dateMsec;

    // Calculate how many days the interval contains. Subtract that  
    // many days from the interval to determine the remainder.  
    var days = Math.floor(interval / msecPerDay );  
    interval = interval - (days * msecPerDay );  

    // Calculate the hours, minutes, and seconds.  
    var hours = Math.floor(interval / msecPerHour );  
    interval = interval - (hours * msecPerHour );  

    var minutes = Math.floor(interval / msecPerMinute );  
    interval = interval - (minutes * msecPerMinute );  

    var seconds = Math.floor(interval / 1000 );  

    // Display the result. 
    var results = "";
    if( days > 0 ){
       results = days + " days, ";
    }
    if( hours > 0 ){
       results += hours + " hours, ";
    }
    if( minutes > 0 ){
       results += minutes + " minutes, ";
    }
    if( seconds > 0 ){
       results += seconds + " seconds, ";
    }

    return results;
    return (days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds.");  
  }
 
  render () {

    return (
    <div className="users-table">
    <div className="loading style-2">
        content
    </div>
    <span>
      <input className="form-control" onChange={this.filter.bind(this)} type="text" placeholder="Search" name="search"/>
    </span>
		<table className="table table-responsive-sm table-hover table-outline mb-0">
              <thead className="thead-light">
                <tr>
                  <th>User</th>
                  <th className="text-center">StoreId</th>
                  <th>Usage</th>
                  <th className="text-center">Admin</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                
                {( this.state.loading ) ? (<tr><td><i className="fa fa-spinner fa-pulse" style={{fontSize:'24px'}}></i>Loading...</td></tr> ) : null }

                {
                  
                  this.state.table_data.map(( user, i ) => {
                  var store_id = (user.admin) ? (<i className="fa fa-star"/>) : ""; 
                  var usage = Math.floor(Math.random() * 100);
                  var time = this.date_diff(user.last_login);

                   return (
                        <tr key={user.id}>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <i className="fa fa-user-circle" style={{fontSize:'24px'}}></i>
                              </div>
                              <div className="float-right">
                                <strong>{user.name}</strong>
                                <div className="small text-muted">
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                            <div>{store_id}</div>
                          </td>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>{usage}%</strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">Extra details</small>
                              </div>
                            </div>
                            <div className="progress progress-xs">
                              <div className="progress-bar bg-success" role="progressbar" style={{width: usage +'%'}} aria-valuenow={usage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </td>
                          <td className="text-center">
                             <label className="switch">
                            <input id={i} type="checkbox" checked={!!user.admin} onChange={this.updateAdminStatus.bind(this)}/>
                            <span className="slider round"></span>
                          </label>
                          </td>
                          <td>
                            <div className="small text-muted">Last login</div>
                            <strong className="small">{time}</strong>
                            <div className="small text-muted">Register</div>
                            <strong className="small">{user.created_at}</strong>
                          </td>
                        </tr>
                      );
                    })

                }
              </tbody>
            </table>
            </div>
        
    );
  }

}
