<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    public function login(Request $req)
    {
        $credentials = $req->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => '認証失敗'], 401);
        }

        $user = $req->user();
        $token = $user->createToken('lamp-token')->plainTextToken;

        return response()->json([
            'message' => 'ログイン成功',
            'token'   => $token,
            'user'    => $user,
        ]);
    }

    public function me(Request $req)
    {
        return $req->user();
    }

    public function logout(Request $req)
    {
        $req->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'ログアウト成功']);
    }
}