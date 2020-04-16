<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;
use Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        $data = $users->toArray();

        return response()->json(['data' => $data], 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        $data = $user->toArray();

        return response()->json(['data' => $data], 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirmation_password' => 'required|same:password',
            'create_permission' => 'boolean',
            'read_permission' => 'boolean',
            'update_permission' => 'boolean',
            'delete_permission' => 'boolean',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 417);
        }

        if(isset($input['create_permission']) && $input['create_permission'] == '1') {
            $rules['create_permission'] = true;
        } elseif(isset($input['create_permission']) && $input['create_permission'] == '0') {
            $rules['create_permission'] = false;
        }

        if(isset($input['read_permission']) && $input['read_permission'] == '1') {
            $rules['read_permission'] = true;
        } elseif(isset($input['read_permission']) && $input['read_permission'] == '0') {
            $rules['read_permission'] = false;
        }

        if(isset($input['update_permission']) && $input['update_permission'] == '1') {
            $rules['update_permission'] = true;
        } elseif(isset($input['update_permission']) && $input['update_permission'] == '0') {
            $rules['update_permission'] = false;
        }

        if(isset($input['delete_permission']) && $input['delete_permission'] == '1') {
            $rules['delete_permission'] = true;
        } elseif(isset($input['delete_permission']) && $input['delete_permission'] == '0') {
            $rules['delete_permission'] = false;
        }



        $user = User::create(array_merge([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ], $rules));

        $data['name'] = $user->name;
        $data['email'] = $user->email;
        return response()->json(['data' => $data], 200);
    }

    public function update(Request $request, User $user)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'create_permission' => 'boolean',
            'read_permission' => 'boolean',
            'update_permission' => 'boolean',
            'delete_permission' => 'boolean',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 417);
        }

        $user->name = $input['name'];

        if(isset($input['create_permission']) && $input['create_permission'] == '1') {
            $user->create_permission = true;
        } elseif(isset($input['create_permission']) && $input['create_permission'] == '0') {
            $user->create_permission = false;
        }

        if(isset($input['read_permission']) && $input['read_permission'] == '1') {
            $user->read_permission = true;
        } elseif(isset($input['read_permission']) && $input['read_permission'] == '0') {
            $user->read_permission = false;
        }

        if(isset($input['update_permission']) && $input['update_permission'] == '1') {
            $user->update_permission = true;
        } elseif(isset($input['update_permission']) && $input['update_permission'] == '0') {
            $user->update_permission = false;
        }

        if(isset($input['delete_permission']) && $input['delete_permission'] == '1') {
            $user->delete_permission = true;
        } elseif(isset($input['delete_permission']) && $input['delete_permission'] == '0') {
            $user->delete_permission = false;
        }

        $user->save();

        $data = $user->toArray();

        $response = [
            'message' => 'User updated successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }

    public function destory(User $user)
    {
        $user->delete();

        $data = $user->toArray();

        $response = [
            'message' => 'User deleted successfully.',
            'data' => $data,
        ];
        
        return response()->json($response, 200);
    }
}
