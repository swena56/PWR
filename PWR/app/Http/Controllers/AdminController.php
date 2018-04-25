<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\DB;
use App\User;
use Auth;

class AdminController extends Controller
{
    //
     function index(Guard $auth){

     	$user = $auth->user();

     	if( $user ){

     		$isAdmin = $user->admin;
     	    
	     	if( $isAdmin ){
                    
                    $results = DB::table('users')->selectRaw("id,name,email,admin,created_at")->get();

	     		return view('admin', ["admin"=>$isAdmin, "users" => json_encode($results) ] );	
	     	}	
     	}

     	return view('admin',["admin"=>false]);	
     }

     function getUsers(Guard $auth){

          $isAdmin = $auth->user()->admin;
          if( $isAdmin ){
               $results = DB::table('users')->selectRaw("id,name,admin,email,last_login,created_at")->get();
               return json_encode($results);     
          } else {
               return "not_admin";
          }
          
     }

     function updateUser(Request $request){
          
          $user_id = $request->input("user_id");
          $admin_status = $request->input("admin_status");
          $logged_in = Auth::check();
          $user = Auth::user();
          if( $logged_in && $user->admin && $user_id != null ){

               if( $admin_status ){
                    $admin_status = 1;
               } else {
                    $admin_status = 0;
               }

               $results = DB::table('users')
               ->where('id', ["$user_id"])
               ->update(['admin' => $admin_status]);

               return "User updated.";
          }

          return "Failed";
     }
}
