<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        $validated_user = $request->validated();

        if(!$token = Auth::attempt($validated_user)){
            throw ValidationException::withMessages([
                'login'=>"credentials not matched"
            ]);
        }

        return response()->json([
            'token'=> $token
        ]);
    }

    public function logout()
    {

    }
}
