<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class syncpwr extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pwr:sync {store_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
	$now = Carbon::now();
        $now->setTimezone('America/Chicago');

	if( $now->hour <= 4 && $now->hour > 10 ){
		return;
	}

        //run this command as a daemon
	$this->info("PWR Sync for ". $this->argument('store_id'));

	$store_id = $this->argument('store_id');

	
	
	if( is_numeric($store_id) ){
		$result = shell_exec("python pwr_sync.py $store_id");
		$this->info(var_dump($result));
	} else {
		$this->info("Invalid store_id");
	}

	

    }
}
