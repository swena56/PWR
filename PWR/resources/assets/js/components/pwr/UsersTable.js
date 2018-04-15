import React from 'react';

export default class UsersTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	name: null,
      users: null,
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
  updateUser(event){

    //event.preventDefault();
    let user_id = event.target.id;
    let admin_status = event.target.value;

    let users = this.state.users;
    users[user_id].admin = ( admin_status == "on" ) ? 0: 1;
    
    this.setState({users:users})
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
                    that.setState({ users: items });
                    console.log("Got users stats: ", items);
                  }
            },
            error: function (data, textStatus, errorThrown) {
                console.log("Error");
            },
        });  
  }


  updateAdminStatus(){

  	var enable_or_disable = "enable";
  	bootbox.confirm({
				    message: "Would you like "+enable_or_disable+" _username_'s admin status?",
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
				        console.log('This was logged in the callback: ' + result);
				    }
			});
  }

 
  render () {
  	//console.log(window);
    if( this.state.users ){
       console.log( this.state.users );
    }

  	var users = [
  		{ id: 0, name: 'Andrew Swenson', create_date: 'Jan 1, 2015', admin: true, store_id: 1953, usage: 50, start_date: '2017-08-01', end_date: '2018-04-14', activity: '10 secs' },
  		{ id: 1, name: 'Test User', create_date: 'Feb 2, 2016', admin: false, store_id: 1907, usage: 25, start_date: '2016-09-01', end_date: '2018-04-01', activity: '10 secs' },
  	];
  	var table_data = [];
  	for (var i = users.length - 1; i >= 0; i--) {
  		
  	
  	table_data.push(<tr key={users[i].id}>
                          <td className="text-center">
                            <div className="avatar">
                              <i className="fa fa-user-circle" style={{fontSize:'24px'}}></i>
                              <span className="avatar-status badge-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{users[i].name}</div>
                            <div className="small text-muted">
                              <span>New</span> | Registered: {users[i].create_date}
                            </div>
                          </td>
                          <td className="text-center">
                            <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
                            <div>{users[i].store_id}</div>
                          </td>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>{users[i].usage}%</strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">{users[i].start_date} - {users[i].end_date}</small>
                              </div>
                            </div>
                            <div className="progress progress-xs">
                              <div className="progress-bar bg-success" role="progressbar" style={{width: users[i].usage+'%'}} aria-valuenow={users[i].usage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </td>
                          <td className="text-center">
                             <label className="switch">
							  <input type="checkbox"/>
							  <span className="slider round"></span>
							</label>
                          </td>
                          <td>
                            <div className="small text-muted">Last login</div>
                            <strong>{users[i].activity}</strong>
                          </td>
                        </tr>);
	};
    return (
		<table className="table table-responsive-sm table-hover table-outline mb-0">
              <thead className="thead-light">
                <tr>
                  <th className="text-center">
                    <i className="icon-people"></i>
                  </th>
                  <th>User</th>
                  <th className="text-center">StoreId</th>
                  <th>Usage</th>
                  <th className="text-center">Admin</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {table_data}
              </tbody>
            </table>
    );
  }

}
