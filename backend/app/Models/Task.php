<?php

namespace App\Models;

use App\Jobs\SendTaskCreatedEmail;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'description', 'status'];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($task) {
            SendTaskCreatedEmail::dispatch($task);
        });
    }
}
