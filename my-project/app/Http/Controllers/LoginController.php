<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'contact' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'contact' => $request->contact,
            'role' => 'user',  // Assigning default role to 'user'
        ]);

        return response()->json([
            'message' => 'Registration successful! You can now log in.',
            'user' => $user
        ], 201);
    }

    /**
     * Handle an incoming authentication request (Login).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        // Retrieve the user by name
        $user = User::where('name', $request->name)->first();

        // Check if the user exists and the password is correct
        if ($user && Hash::check($request->password, $user->password)) {
            // If using token-based authentication, generate a token here

            // For now, we'll just return the user data
            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
            ], 200);
        }

        // Return an error response if authentication fails
        return response()->json([
            'message' => 'Invalid username or password',
        ], 401);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Perform logout logic (if using token-based auth)
        Auth::logout();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
