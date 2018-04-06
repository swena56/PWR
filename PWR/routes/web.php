<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/csstest', function () {
    return view('csstest');
});

//change position for production
Auth::routes();

Route::get('/', 'DeliveryController@orderDetails')->name('order-details');

Route::get('/get-order-details', 'DeliveryController@getOrderDetails');
Route::get('/get-drivers', 'DeliveryController@getDrivers');
Route::get('/get-driver-stats', 'DeliveryController@getDriverStats');

Route::get('/orders', 'DeliveryController@orders')->name('orders');
Route::get('/order-details', 'DeliveryController@orderDetails')->name('order-details');
Route::get('/order-details/{store_id}/{order_id}', 'DeliveryController@orderDetails')->name('order-details');
Route::get('/calender-dates', 'DeliveryController@getCalanderDates')->name('orders');
Route::post('/endpoint', 'DeliveryController@submit');

Route::get('/delivery', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}/{date}', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}/{date}/{driver}', 'DeliveryController@get')->name('home');


//update
Route::get('/order-details-update', 'DeliveryController@update')->name('order-details-update');

Route::get('/pwr', 'pwr_controller@index')->name('home');
Route::get('/pwr1', 'pwr1_controller@index')->name('home');
Route::get('/pwr2', 'pwr1_controller@nearsofttest')->name('home');



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
