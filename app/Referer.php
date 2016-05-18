<?php
namespace App;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Database\Eloquent\Model;

class Referer extends Model {

	protected $table = 'referer';
	
	protected $fillable = ['referer', 'count'];

	public static function referer() {
		if(is_null(app('Illuminate\Http\Request')->server('HTTP_REFERER')) || strripos(app('Illuminate\Http\Request')->server('HTTP_REFERER'), "joyskins.top")) {
			return true;
		}
		$refer = self::where('referer', app('Illuminate\Http\Request')->server('HTTP_REFERER'))->first();
		if(is_null($refer)) {
			self::create([
				'referer' => app('Illuminate\Http\Request')->server('HTTP_REFERER'),
				'count'	  => 1
			]);	
		} else {
			$refer->count = $refer->count + 1;
			$refer->save();
		}
		return true;
	}
}