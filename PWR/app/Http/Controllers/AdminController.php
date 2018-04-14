<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\DB;
use App\User;
//use Auth;

class AdminController extends Controller
{
    //
     function index(Guard $auth){

     	$user = $auth->user();

     	if( $user ){

     		$isAdmin = $user->admin;
     	    
	     	if( $isAdmin ){
                    
                    $results = DB::table('users')->selectRaw("id,name,admin")->get();

	     		return view('admin', ["admin"=>$isAdmin, "users" => json_encode($results) ] );	
	     	}	
     	}

     	return view('admin',["admin"=>false]);	
     }

     function getUsers(Guard $auth){

          $isAdmin = $auth->user()->admin;
          if( $isAdmin ){
               $results = DB::table('users')->selectRaw("id,name,admin")->get();
               return json_encode($results);     
          } else {
               return "not_admin";
          }
          
     }

     function makeAdmin(){

     	// update users set admin=1 where id = 1;

     }
}
