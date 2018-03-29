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


Route::get('/', 'HomeController@index')->name('react_test');

Route::get('/get-order-details', 'DeliveryController@getOrderDetails');


Route::get('/orders', 'DeliveryController@orders')->name('orders');
Route::get('/order-details', 'DeliveryController@orderDetails')->name('order-details');
Route::get('/order-details/{store_id}/{order_id}', 'DeliveryController@orderDetails')->name('order-details');
Route::get('/calender-dates', 'DeliveryController@getCalanderDates')->name('orders');
Route::post('/endpoint', 'DeliveryController@submit');

Route::get('/delivery', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}/{date}', 'DeliveryController@get')->name('home');
Route::get('/delivery/{store_id}/{date}/{driver}', 'DeliveryController@get')->name('home');

//change position for production
Auth::routes();

Route::get('/pwr', 'pwr_controller@index')->name('home');
Route::get('/pwr1', 'pwr1_controller@index')->name('home');
Route::get('/pwr2', 'pwr1_controller@nearsofttest')->name('home');



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');