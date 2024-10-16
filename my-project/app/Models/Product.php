<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'item_description',
        'item_category',
        'item_available_quantity',
        'item_amount',
        'item_barcode',
    ];
}
