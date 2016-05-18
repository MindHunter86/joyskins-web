<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
	protected $table = 'bonus';
    protected $fillable = ['name', 'market_hash_name', 'classid', 'price', 'rarity'];
}
