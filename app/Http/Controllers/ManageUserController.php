<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\User;

class ManageUserController extends Controller
{
    public function index()
    {
        $users = User::all();
        $data = $users->toArray();

        $current_user = Auth::user();

        return view('manage.users', ['users' => $data, 'current_user' => $current_user]);
    }
}
