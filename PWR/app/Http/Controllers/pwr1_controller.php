<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Behat\Mink\Mink, 
     Behat\Mink\Session, 
     Behat\Mink\Driver\Selenium2Driver;

use Selenium\Client as SeleniumClient;

use Nearsoft\SeleniumClient\By;
use Nearsoft\SeleniumClient\SelectElement;
use Nearsoft\SeleniumClient\WebDriver;
use Nearsoft\SeleniumClient\DesiredCapabilities;

class pwr1_controller extends Controller
{
    //
    function index(){

$browser = 'chrome';
$url = 'http://example.com';

$mink = new Mink(
    array( 'selenium2' => new Session(new Selenium2Driver($browser, null, $url)),));

$mink->getSession('selenium2')->getPage()->findLink('More information...')->click();
	return "Done";

    }

    function nearsofttest(){
	//composer require nearsoft/php-selenium-client
	 $driver = new WebDriver();
	  $driver->get("www.nearsoft.com");
	return var_dump($driver);
	return "nearsoft";
    }
}
