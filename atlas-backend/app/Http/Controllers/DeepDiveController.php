<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeepDiveController extends Controller
{
    public function answer(Request $request)
    {
        $answers = $request->only(['q1', 'q2', 'q3', 'q4', 'q5']);
        return view('deepdive.answer', compact('answers'));
    }
}