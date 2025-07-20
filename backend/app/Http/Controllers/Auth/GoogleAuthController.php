<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->stateless()->user();

            $findUser = User::where('google_id', $user->id)->first();

            if ($findUser) {
                Auth::login($findUser);
                $token = $findUser->createToken('authToken')->plainTextToken;
                return response()->json(['user' => $findUser, 'token' => $token]);
            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'google_id' => $user->id,
                    'password' => bcrypt(uniqid()), // Generate a random password
                ]);

                Auth::login($newUser);
                $token = $newUser->createToken('authToken')->plainTextToken;
                return response()->json(['user' => $newUser, 'token' => $token]);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to authenticate with Google.', 'message' => $e->getMessage()], 500);
        }
    }
}
