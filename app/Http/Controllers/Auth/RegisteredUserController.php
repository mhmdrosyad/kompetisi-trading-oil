<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'full_name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|max:255',
            'mt4_account_name' => 'required|string|max:255',
            'mt4_login_number' => 'required|string|max:255',
            'investor_password' => 'required|string|max:255',
            'province' => 'required|string',
            'regency' => 'required|string',
            'district' => 'required|string',
            'village' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $profileData = [
            'user_id' => $user->id,
            'full_name' => $request->full_name,
            'whatsapp_number' => $request->whatsapp_number,
            'mt4_account_name' => $request->mt4_account_name,
            'mt4_login_number' => $request->mt4_login_number,
            'investor_password' => $request->investor_password,
            'address' => $request->address ? $request->address . ', ' . $request->village . ', ' . $request->district . ', ' . $request->regency . ', ' . $request->province : $request->village . ', ' . $request->district . ', ' . $request->regency . ', ' . $request->province,
            'city_of_residence' => $request->regency ,
        ];

        $profile = Profile::create($profileData);

        $role = Role::find(2);

        if ($role) {  
            $user->assignRole($role);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
