
@extends('layouts.app')

@section('content')
<div class="container">
            <div class="panel panel-default">
                
                <div class="panel-heading">Admin Panel</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    @unless (Auth::check())
                        <div>
                            You are not signed in, <a href="{{ route('login') }}">Login</a>
                        </div>
                    @endunless

                    @auth
                        @if ( Auth::user()->admin == 1 )
                            <div>
                                <div id="admin"></div>
                                
                            </div>
                            @else
                            <div>
                                <div> User does not have admin privaleges. </div> 
                            </div>
                        @endif                    
                    @endauth
                    
                </div>
            </div>
</div>
@endsection

