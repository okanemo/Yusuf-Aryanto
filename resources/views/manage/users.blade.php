@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-lg-10 col-md-12">
            <div class="card">
                <div class="card-header container-fluid">
                    <div class="row">
                        <div class="col-md-10"><h3>Manage Users</h3></div>
                        <div class="col-md-2">
                            @if ($current_user['create_permission'])
                                <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#onAddUserModal">Add User</button>
                            @endif
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Can Create</th>
                                <th scope="col">Can Read</th>
                                <th scope="col">Can Update</th>
                                <th scope="col">Can Delete</th>
                                @if ($current_user['update_permission'] || $current_user['delete_permission'])
                                <th scope="col">Actions</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody>
                        @foreach ($users as $user)
                        <tr>
                            <td>
                                {{ $user['name'] }}
                            </td>
                            <td>
                                {{ $user['email'] }}
                            </td>
                            <td>
                                <input type="checkbox" disabled {{ $user['create_permission'] ? 'checked' : '' }} />
                            </td>
                            <td>
                                <input type="checkbox" disabled {{ $user['read_permission'] ? 'checked' : '' }} />
                            </td>
                            <td>
                                <input type="checkbox" disabled {{ $user['update_permission'] ? 'checked' : '' }} />
                            </td>
                            <td>
                                <input type="checkbox" disabled {{ $user['delete_permission'] ? 'checked' : '' }} />
                            </td>
                            @if ($current_user['update_permission'] || $current_user['delete_permission'])
                            <td>
                                <div class="btn-group btn-group-sm" role="group">
                                    @if ($current_user['update_permission'])
                                        <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#onUpdateUserModal">Update</button>
                                    @endif
                                    @if ($current_user['delete_permission'])
                                        <button class="btn btn-danger" type="button" data-toggle="modal" data-target="#onDeleteUserModal">Delete</button>
                                    @endif
                                </div>
                            </td>
                            @endif
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                </div>
            </div>

            @if ($current_user['create_permission'])
            <div class="modal fade" id="onAddUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        
                        {{ Form::open(array('action' => 'UserController@store')) }}

                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                {{ Form::label('name', 'Name') }}
                                {{ Form::text('name', '', array('class' => 'form-control', 'required' => true)) }}
                            </div>
                            <div class="form-group">
                                {{ Form::label('email', 'Email') }}
                                {{ Form::email('email', '', array('class' => 'form-control', 'required' => true)) }}
                            </div>
                            <div class="form-group">
                                {{ Form::label('password', 'Password') }}
                                {{ Form::password('password', array('class' => 'form-control', 'required' => true)) }}
                            </div>
                            <div class="form-group">
                                {{ Form::label('confirmation_password', 'Confirmation Password') }}
                                {{ Form::password('confirmation_password', array('class' => 'form-control', 'required' => true)) }}
                            </div>
                            <div class="form-group form-check">
                                {{ Form::checkbox('read_permission', 1, true, array('class' => 'form-check-input', 'id' => 'read_permission')) }}
                                {{ Form::label('read_permission', 'Can Read', array('class' => 'form-check-label')) }}
                            </div>
                            <div class="form-group form-check">
                                {{ Form::checkbox('create_permission', 1, false, array('class' => 'form-check-input', 'id' => 'create_permission')) }}
                                {{ Form::label('create_permission', 'Can Create', array('class' => 'form-check-label')) }}
                            </div>
                            <div class="form-group form-check">
                                {{ Form::checkbox('update_permission', 1, false, array('class' => 'form-check-input', 'id' => 'update_permission')) }}
                                {{ Form::label('update_permission', 'Can Update', array('class' => 'form-check-label')) }}
                            </div>
                            <div class="form-group form-check">
                                {{ Form::checkbox('delete_permission', 1, false, array('class' => 'form-check-input', 'id' => 'delete_permission')) }}
                                {{ Form::label('delete_permission', 'Can Delete', array('class' => 'form-check-label')) }}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            {{ Form::submit('Save', array('class' => 'btn btn-primary')) }}
                        </div>
                        
                        {{ Form::close() }}

                    </div>
                </div>
            </div>
            @endif

        </div>
    </div>
</div>
@endsection
