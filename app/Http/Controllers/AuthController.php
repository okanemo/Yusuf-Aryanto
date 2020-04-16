<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\User;
use Validator;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 417);
        }

        $credentials = $request->only(['email', 'password']);

        if(Auth::attempt($credentials)) {
            $user = Auth::user();

            $scopes = array(
                ($user->create_permission ? 'create-users' : ''),
                ($user->read_permission ? 'read-users' : ''),
                ($user->update_permission ? 'update-users' : ''),
                ($user->delete_permission ? 'delete-users' : ''),
            );

            $data['token'] = $user->createToken('App', $scopes)->accessToken;
            return response()->json(['data' => $data], 200);
            // return redirect()->route('home', ['data' => $data]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirmation_password' => 'required|same:password',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 417);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'create_permission' => false,
            'read_permission' => true,
            'update_permission' => false,
            'delete_permission' => false,
        ]);

        $data['name'] = $user->name;
        $data['token'] = $user->createToken('App', ['read-users'])->accessToken;
        return response()->json(['data' => $data], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
