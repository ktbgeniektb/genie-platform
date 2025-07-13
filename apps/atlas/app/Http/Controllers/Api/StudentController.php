<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->update($request->only(['name', 'email']));
        return response()->json(['message' => '更新しました']);
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json(['message' => '削除しました']);
    }

    public function store(Request $request)
    {
        $student = Student::create($request->only(['name', 'email']));
        return response()->json($student);
    }
}
