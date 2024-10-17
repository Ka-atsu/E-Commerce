<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('item_name'); // Item name
            $table->string('item_description'); // Item description
            $table->string('item_category'); // Item category
            $table->integer('item_available_quantity'); // Quantity available
            $table->decimal('item_amount', 8, 2); // Amount (with 2 decimal places)
            $table->string('item_barcode'); // Barcode
            $table->string('item_image'); // Barcode
            $table->timestamps(); // Created at and updated at
        });
    }

    public function down()
    {
        Schema::dropIfExists('products'); // Rollback
    }
}
