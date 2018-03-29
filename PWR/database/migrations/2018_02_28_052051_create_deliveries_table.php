<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
           // $table->increments('id');
		 $table->string('store_id');
                $table->string('order_id')->primary();
                $table->string('timestamp');
                $table->string('phone')->nullable();
                $table->string('address')->nullable();
                $table->string('price')->nullable();
                $table->string('status')->nullable();
                $table->string('source')->nullable();
                $table->string('service')->nullable();
                $table->string('CSR')->nullable();
                $table->string('driver')->nullable();
                $table->string('description')->nullable();
		$table->double('tip',15,8)->nullable();
            	$table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}
