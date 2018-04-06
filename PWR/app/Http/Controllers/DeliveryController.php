<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use utilphp\util;
use Carbon\Carbon;
use Datetime;
use Intervention\Httpauth\Httpauth;
use Auth;

use App\Delivery;


class DeliveryController extends Controller
{
    function index(){
		$users = DB::table('deliveries')->where('source', 'Delivery')->get();
		return util::var_dump($users);
    }

    function submit(Request $request){

		return "data";
		$data = $request->input("data");
		return "posted: " . var_dump($data);
    }    

    function getWorkDates($store_id, $json=false){

		$dates = DB::select(
				"SELECT SUBSTRING_INDEX(order_id, '#', 1) AS date FROM deliveries WHERE store_id = :store_id GROUP BY date",
				['store_id'=> $store_id]
			 );

		if( $json ){
			return 	$dates->toJson();
		} else{
			return $dates;
		return util::var_dump($dates);
	}
    }

    function getDrivers(Request $request){

    	$store_id = $request->input("store_id");
		$drivers = DB::table('deliveries')
			->select('driver')
			->where('store_id',[$store_id])
			->groupBy('driver')
			->get();

		return $drivers->toJson();
    }

    function get(Request $request, $store_id, $date=null, $driver=null){
		
		$store_id = $request->input("store_id");
		$driver = $request->input("driver");
		$date = $request->input("date");
	//		return util::var_dump( $request->headers );
		if( !Auth::check() ){
		if(array_key_exists( 'php-auth-user', $request->headers->all() ) == true && array_key_exists( 'php-auth-pw', $request->headers->all() ) == true ){

	//		return "valid";
			$user = $request->headers->all()['php-auth-user'][0];
	                $password = $request->headers->all()['php-auth-pw'][0];

			if( $user != "user" || $password != "password" ){
				return "Invalid Credentials";
			}		

		} else {
			return "Need to login";
		}
		}

		$now = Carbon::now();	
		$now->setTimezone('America/Chicago');

		$store_id = util::htmlentities($store_id, TRUE);

		if( $date != null ){
			if( $this->validateDate($date) == false ){
				return "invalid_date";
			}
			$date = util::htmlentities($date, TRUE);
		}

		$driver = util::htmlentities($driver, TRUE);

		$orders = null;
		if( $date == null ){

			if( $driver ){

				$orders = DB::table('deliveries')
				->selectRaw("*,TRIM(LEADING '$' FROM price) AS price")
				->whereRaw("store_id = ? AND driver = ? AND source = 'Delivery'", [$store_id, $driver])
		        ->get();
			} else {
				$orders = DB::table('deliveries')
				->selectRaw("*,TRIM(LEADING '$' FROM price) AS price")
				->whereRaw("store_id = ? AND source = 'Delivery'", [$store_id])
		        ->get();
			}

		} else {

			if( $driver ){
				$orders = Delivery::selectRaw("*,TRIM(LEADING '$' FROM price) AS price")->whereRaw("order_id LIKE '$date%' ")->whereRaw("store_id = ? AND driver = ? AND source = 'Delivery'", [$store_id, $driver])->get();
			} else {
				$orders = Delivery::selectRaw("*,TRIM(LEADING '$' FROM price) AS price")->whereRaw("order_id LIKE '$date%' ")->whereRaw("store_id = ? AND source = 'Delivery'", [$store_id])->get();
			}
		}

		if( Auth::check() ){
			return json_encode(array("results" => $orders));
		}
    }

    function validateDate($date, $format = 'Y-m-d')
    {
    	$d = DateTime::createFromFormat($format, $date);
		return $d && $d->format($format) == $date;
    }

    function orders(){
		return view('react_test');
    }

    function getOrderDetails(Request $request){
		$store_id = $request->input("store_id");
		$order_id = $request->input("order_id");
		
		$orders = Delivery::whereRaw("order_id LIKE ?", [$order_id])->get();
		return json_encode(array("results" => $orders));
		return "order_details: $store_id $order_id";	
    }

    function orderDetails(){
		return view('order_details');
    }

    function getCalanderDates(){
		$results = Delivery::selectRaw("SUBSTRING_INDEX(order_id,'#',1) AS date, count(*) AS number")
		->GroupBy('date')->get();
		return json_encode(array("results" => $results));

		//select SUBSTRING_INDEX(order_id, '#',1) AS date, count(*)  FROM deliveries GROUP by date;
		return "dates";
    }

    function update(Request $request){
    	//http://127.0.0.1:8081/order-details-update?store_id=1953&order_id=2018-03-28%23348080&tip=2.50&notes=mynotes
    	$store_id = $request->input("store_id");
		$order_id = $request->input("order_id");
		$notes = $request->input("notes");
		$tip = $request->input("tip");

    	if( $store_id && $order_id ){

			//'notes' => $notes
	    	$results = DB::table('deliveries')
	    		->where('store_id', ["$store_id"])
	    		->where('order_id', ["$order_id"])
	    		->update(['tip' => $tip]);

	    		return "updated";
    	}
    }

    function getDriverStats(Request $request){


    	$driver = $request->input("driver");
		$date = $request->input("date");

		if( $driver && $date ){

			//return stats like total tips, number deliveries
			

		}

    	return "Driver Stats";
    }

}
