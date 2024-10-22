<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final  class Login
{
    public function __invoke($root_, array $args)
    {
        $user = User::query()->where('email', $args['email'])->firstOrFail();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas não estão corretas.'],
            ]);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}
