<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Nearsoft\SeleniumClient\WebDriver;
use Nearsfot\SeleniumClient\Http\HttpClient;
use Nearsoft\SeleniumClient\DesiredCapabilities;
use Nearsoft\SeleniumClient\By; 


use Behat\Mink\Mink,
    Behat\Mink\Session,
    Behat\Mink\Driver\Selenium2Driver;

use Selenium\Client as SeleniumClient;

class pwr_controller extends Controller
{
	function index(){


$mink = new Mink(array(
    'selenium2' => new Session(new Selenium2Driver("chrome", null, "http://pwr.dominos.com/PWR/Login.aspx")),
));

$mink->setDefaultSessionName('selenium2');
$a =$mink->getSession()->visit("http://www.google.com");

//return var_dump($mink);

//$a = $mink->getPage();//->findLink('Chat')->click();
return var_dump($a);
	}

	function test(){

$webDriver = new WebDriver(); 
$webDriver->get("http://nearsoft-php-seleniumclient.herokuapp.com/sandbox/");
$webElement = $webDriver->findElement(By::id("txt1"));
return var_dump($webElement->describe());

	}
}
